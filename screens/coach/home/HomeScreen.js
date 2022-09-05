import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useCallback, useEffect, useRef, useState} from "react";
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
    const firstLoad = useRef();

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
            if (firstLoad.current) {
                firstLoad.current = false;
                return;
            }
            initializeLazy();
        }, [httpClient, navigation])
    );

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaView}>
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
                            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                                <Text style={styles.title}>Review Trainings</Text>

                                {playerSessionsRequiringFeedback.length > 0 && playerSessionsRequiringFeedback.slice(0,3).map(playerSession => (
                                    <ReviewTrainingListItem playerSession={playerSession}
                                                            subscription={findSubscription(playerSession.player, playerSessionsRequiringFeedback)}
                                                            key={playerSession.player.playerId}/>
                                ))}
                                {playerSessionsRequiringFeedback.length === 0 && (
                                    <EmptyPlaceholder text={'No sessins to review'} />
                                )}
                                {playerSessionsRequiringFeedback.length > 0 && (
                                    <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate(CoachScreenNames.ReviewTrainings, {
                                        playerSessionsRequiringFeedback: playerSessionsRequiringFeedback,
                                        playersAndSubscriptionsRequiringTrainings: playersAndSubscriptionsRequiringTrainings
                                    })}>
                                        <Text style={styles.viewAllButtonText}>View all ({playerSessionsRequiringFeedback.length})</Text>
                                    </TouchableOpacity>
                                )}

                                <Text style={styles.title}>Create Training Plans</Text>
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
                                <Text style={styles.title}>Manage Default Session</Text>
                                {coach?.introSessionDrills === null && (
                                    <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate(CoachScreenNames.CreateOrEditSession, {
                                        session: null,
                                        isDefaultSession: true,
                                        coach: coach
                                    })}>
                                        <Text style={styles.viewAllButtonText}>Create Default Session</Text>
                                    </TouchableOpacity>
                                )}
                                {coach?.introSessionDrills && (
                                    <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate(CoachScreenNames.CreateOrEditSession, {
                                        session: { drills: coach?.introSessionDrills },
                                        isDefaultSession: true,
                                        coach: coach
                                    })}>
                                        <Text style={styles.viewAllButtonText}>Update Default Session</Text>
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
    container: {
        flex: 1
    },
    safeAreaView: {
        flex: 1
    },
    scrollView: {
        paddingHorizontal: 15,
        paddingVertical: 15
    },
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