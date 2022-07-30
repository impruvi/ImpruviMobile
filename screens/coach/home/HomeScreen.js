import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useCallback, useEffect, useState} from "react";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import useHttpClient from "../../../hooks/useHttpClient";
import useAuth from "../../../hooks/useAuth";
import {Colors} from "../../../constants/colors";
import {CoachScreenNames} from "../../ScreenNames";
import useError from "../../../hooks/useError";
import Loader from "../../../components/Loader";
import Reload from "../../../components/Reload";
import {StatusBar} from "expo-status-bar";
import HeaderCenter from "../../../components/HeaderCenter";
import ReviewTrainingListItem from "../../../components/ReviewTrainingListItem";
import CreateTrainingsListItem from "../../../components/CreateTrainingsListItem";
import {
    findSubscription,
    getPlayersAndSubscriptionsRequiringTrainings,
    getPlayerSessionsRequiringFeedback
} from "../../../util/playerUtil";
import EmptyPlaceholder from "../../../components/EmptyPlaceholder";
import HeadshotChip from "../../../components/HeadshotChip";


const HomeScreen = () => {

    const [coach, setCoach] = useState();
    const [playersAndSubscriptionsRequiringTrainings, setPlayersAndSubscriptionsRequiringTrainings] = useState([]);
    const [playerSessionsRequiringFeedback, setPlayerSessionsRequiringFeedback] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {coachId} = useAuth();
    const {setError} = useError();

    const initialize = async () => {
        setIsLoading(true);
        setHasError(false);
        await initializeLazy();
        setIsLoading(false);
    }

    const initializeLazy = async () => {
        try {
            httpClient.getCoach(coachId).then(setCoach);
            const [allPlayerSessions, playersAndSubscriptions] = await Promise.all([
                httpClient.getPlayerSessionsForCoach(coachId),
                httpClient.getPlayersAndSubscriptionsForCoach(coachId)
            ]);

            setPlayerSessionsRequiringFeedback(getPlayerSessionsRequiringFeedback(allPlayerSessions));
            setPlayersAndSubscriptionsRequiringTrainings(getPlayersAndSubscriptionsRequiringTrainings(allPlayerSessions, playersAndSubscriptions));
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
            setHasError(true);
        }
    }

    useEffect(() => {
        initialize();
    }, []);

    useFocusEffect(
        useCallback(() => {
            initializeLazy();
        }, [httpClient, navigation])
    );

    return (
        <View style={{flex: 1}}>
            <SafeAreaView style={{flex: 1}}>
                <HeaderCenter title={'Home'}
                              hasBorder={true}
                              right={(
                                  <HeadshotChip image={coach?.headshot} firstName={coach?.firstName} lastName={coach?.lastName} size={40} />
                              )}
                              onRightPress={() => navigation.navigate(CoachScreenNames.Profile)}/>
                {isLoading && <Loader/>}
                {!isLoading && (
                    <>
                        {hasError && <Reload onReload={initialize}/>}
                        {!hasError && (
                            <ScrollView showsVerticalScrollIndicator={false} style={{paddingHorizontal: 15, paddingVertical: 15}}>
                                <Text style={styles.title}>Review trainings</Text>

                                {playerSessionsRequiringFeedback.length > 0 && playerSessionsRequiringFeedback.slice(0,3).map(playerSession => (
                                    <ReviewTrainingListItem playerSession={playerSession}
                                                            subscription={findSubscription(playerSession.player, playersAndSubscriptionsRequiringTrainings)}
                                                            key={playerSession.player.playerId}/>
                                ))}
                                {playerSessionsRequiringFeedback.length === 0 && (
                                    <EmptyPlaceholder text={'No sessions to review'} />
                                )}
                                {playerSessionsRequiringFeedback.length > 0 && (
                                    <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate(CoachScreenNames.ReviewTrainings, {
                                        playerSessionsRequiringFeedback: playerSessionsRequiringFeedback,
                                        playersAndSubscriptionsRequiringTrainings: playersAndSubscriptionsRequiringTrainings
                                    })}>
                                        <Text style={styles.viewAllButtonText}>View all ({playerSessionsRequiringFeedback.length})</Text>
                                    </TouchableOpacity>
                                )}

                                <Text style={styles.title}>Create training plans</Text>
                                {playersAndSubscriptionsRequiringTrainings.length > 0 && playersAndSubscriptionsRequiringTrainings.slice(0,3).map(playerRequiringTrainings => (
                                    <CreateTrainingsListItem playerRequiringTrainings={playerRequiringTrainings}
                                                             subscription={findSubscription(playerRequiringTrainings.player, playersAndSubscriptionsRequiringTrainings)}
                                                             key={playerRequiringTrainings.player.playerId}/>
                                ))}
                                {playersAndSubscriptionsRequiringTrainings.length === 0 && (
                                    <EmptyPlaceholder text={'No trainings to create'} />
                                )}
                                {playersAndSubscriptionsRequiringTrainings.length > 0 && (
                                    <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate(CoachScreenNames.CreateTrainingPlans, {
                                        playersAndSubscriptionsRequiringTrainings: playersAndSubscriptionsRequiringTrainings
                                    })}>
                                        <Text style={styles.viewAllButtonText}>View all ({playersAndSubscriptionsRequiringTrainings.length})</Text>
                                    </TouchableOpacity>
                                )}
                            </ScrollView>
                        )}
                    </>
                )}
            </SafeAreaView>

            <StatusBar style="dark" />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: '600'
    },
    viewAllButton: {
        width: '100%',
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#E7E7E7',
        marginTop: 15,
        marginBottom: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },
    viewAllButtonText: {
        color: Colors.Primary,
        fontWeight: '500'
    }
});

export default HomeScreen;