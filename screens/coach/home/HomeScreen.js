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
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faUser} from "@fortawesome/pro-light-svg-icons";
import ReviewTrainingListItem from "../../../components/ReviewTrainingListItem";
import CreateTrainingsListItem from "../../../components/CreateTrainingsListItem";
import {doesPlayerNeedMoreTrainings, getSessionsRequiringFeedback} from "../../../util/playerUtil";
import EmptyPlaceholder from "../../../components/EmptyPlaceholder";
import HeadshotChip from "../../../components/HeadshotChip";


const HomeScreen = () => {
    const [playersRequiringTrainings, setPlayersRequiringTrainings] = useState([]);
    const [playerSessionsRequiringFeedback, setPlayerSessionsRequiringFeedback] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {coach} = useAuth();
    const {setError} = useError();

    const getIncompletePlayerSessions = async () => {
        setIsLoading(true);
        setHasError(false);
        await getIncompletePlayerSessionsLazy();
        setIsLoading(false);
    }

    const getIncompletePlayerSessionsLazy = async () => {
        try {
            const allPlayerSessions = await httpClient.getCoachSessions(coach.coachId);
            const requiringFeedback = allPlayerSessions.map(playerSessions => {
                const sessionsRequiringFeedback = getSessionsRequiringFeedback(playerSessions.sessions);
                return !!sessionsRequiringFeedback
                    ? {
                        player: playerSessions.player,
                        session: sessionsRequiringFeedback
                    }
                    : null;
            }).filter(playerSessions => !!playerSessions);
            setPlayerSessionsRequiringFeedback(requiringFeedback);

            const requiringTrainings = allPlayerSessions.map(playerSession => {
                if (!playerSession.player.subscription || playerSession.player.subscription.currentPeriodStartDateEpochMillis <= 0) {
                    return null;
                }
                const subscriptionStartDateEpochMillis = playerSession.player.subscription.currentPeriodStartDateEpochMillis;
                const numberOfSessionsInSubscription = playerSession.player.subscription.numberOfSessions;
                if (doesPlayerNeedMoreTrainings(playerSession.player, playerSession.sessions)) {
                    return {
                        numberOfSessionsInSubscription: numberOfSessionsInSubscription,
                        player: playerSession.player,
                        subscriptionStartDateEpochMillis: subscriptionStartDateEpochMillis
                    };
                } else {
                    return null;
                }
            }).filter(player => !!player);
            setPlayersRequiringTrainings(requiringTrainings);
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
            setHasError(true);
        }
    }

    useEffect(() => {
        getIncompletePlayerSessions();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getIncompletePlayerSessionsLazy();
        }, [httpClient, navigation])
    );

    return (
        <View style={{flex: 1}}>
            <SafeAreaView style={{flex: 1}}>
                <HeaderCenter title={'Home'}
                              hasBorder={true}
                              right={(
                                  <View style={{width: 40, height: 40, borderRadius: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', overflow: 'hidden'}}>
                                      {!!coach.headshot && coach.headshot.uploadDateEpochMillis > 0 && (
                                          <HeadshotChip image={coach.headshot} firstName={coach.firstName} lastName={coach.lastName} size={40} />
                                      )}
                                      {(!coach.headshot || coach.headshot.uploadDateEpochMillis === 0) && (
                                          <FontAwesomeIcon icon={faUser} size={25}/>
                                      )}
                                  </View>
                              )}
                              onRightPress={() => navigation.navigate(CoachScreenNames.Profile)}/>
                {isLoading && <Loader/>}
                {!isLoading && (
                    <>
                        {hasError && <Reload onReload={getIncompletePlayerSessions}/>}
                        {!hasError && (
                            <ScrollView showsVerticalScrollIndicator={false} style={{paddingHorizontal: 15, paddingVertical: 15}}>
                                <Text style={styles.title}>Review trainings</Text>

                                {playerSessionsRequiringFeedback.length > 0 && playerSessionsRequiringFeedback.slice(0,3).map(playerSession => (
                                    <ReviewTrainingListItem playerSession={playerSession} key={playerSession.player.playerId}/>
                                ))}
                                {playerSessionsRequiringFeedback.length === 0 && (
                                    <EmptyPlaceholder text={'No sessions to review'} />
                                )}
                                {playerSessionsRequiringFeedback.length > 0 && (
                                    <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate(CoachScreenNames.ReviewTrainings, {
                                        incompletePlayerSessions: playerSessionsRequiringFeedback
                                    })}>
                                        <Text style={styles.viewAllButtonText}>View all ({playerSessionsRequiringFeedback.length})</Text>
                                    </TouchableOpacity>
                                )}

                                <Text style={styles.title}>Create training plans</Text>
                                {playersRequiringTrainings.length > 0 && playersRequiringTrainings.slice(0,3).map(playerRequiringTrainings => (
                                    <CreateTrainingsListItem playerRequiringTrainings={playerRequiringTrainings} key={playerRequiringTrainings.player.playerId}/>
                                ))}
                                {playersRequiringTrainings.length === 0 && (
                                    <EmptyPlaceholder text={'No trainings to create'} />
                                )}
                                {playersRequiringTrainings.length > 0 && (
                                    <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate(CoachScreenNames.CreateTrainingPlans, {
                                        playersRequiringTrainings: playersRequiringTrainings
                                    })}>
                                        <Text style={styles.viewAllButtonText}>View all ({playersRequiringTrainings.length})</Text>
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