import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {commonStyles} from '../styles/commonStyles';
import {useCallback, useState, useEffect} from "react";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import useHttpClient from "../hooks/useHttpClient";
import useAuth from "../hooks/useAuth";
import SubmissionStatus from "../components/SubmissionStatus";
import FeedbackStatus from "../components/FeedbackStatus";
import {Colors} from "../constants/colors";
import {ScreenNames} from "./ScreenNames";
import {doesDrillHaveFeedback, doesDrillHaveSubmission} from "../util/drillUtil";
import useError from "../hooks/useError";
import Loader from "../components/Loader";
import Reload from "../components/Reload";
import {StatusBar} from "expo-status-bar";

const CoachHomeScreen = () => {
    const [incompletePlayerSessions, setIncompletePlayerSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {userId} = useAuth();
    const {setError} = useError();

    const getIncompletePlayerSessions = async () => {
        setIsLoading(true);
        setHasError(false);
        await getIncompletePlayerSessionsLazy();
        setIsLoading(false);
    }

    const getTimeToProvideFeedback = (session) => {
        const dayInMillis = 24 * 60 * 60 * 1000;
        const hourInMillis = 60 * 60 * 1000;
        const minuteInMillis = 60 * 1000;
        const currentTimeEpochMillis = Date.now();
        const submissionTimeEpochMillis = Math.max(...session.drills.map(drill =>
            drill.submission.creationDateEpochMillis
        ));

        const timeRemainingMillis = submissionTimeEpochMillis + dayInMillis - currentTimeEpochMillis;
        if (timeRemainingMillis > hourInMillis) {
            return `${Math.floor(timeRemainingMillis / hourInMillis)} hrs remaining to provide feedback`
        } else {
            return `${Math.floor(timeRemainingMillis / minuteInMillis)} minutes remaining to provide feedback`
        }
    }

    const getIncompletePlayerSessionsLazy = async () => {
        try {
            const allPlayerSessions = await httpClient.getCoachSessions(userId);
            const incompleteSessions = allPlayerSessions.map(playerSessions => {
                const incompleteSessionsForPlayer = playerSessions.sessions.filter(session =>
                    session.drills.some(drill => doesDrillHaveSubmission(drill) && !doesDrillHaveFeedback(drill))
                );
                return incompleteSessionsForPlayer.length > 0
                    ? {
                        user: playerSessions.user,
                        sessions: incompleteSessionsForPlayer
                    }
                    : null;
            }).filter(playerSessions => !!playerSessions);
            setIncompletePlayerSessions(incompleteSessions);
        } catch (e) {
            console.error(e);
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
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <Text style={styles.header}>
                    Sessions to review
                </Text>
                {isLoading && <Loader/>}
                {!isLoading && (
                    <>
                        {hasError && <Reload onReload={getIncompletePlayerSessions}/>}
                        {!hasError && (
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {incompletePlayerSessions.length === 0 && (
                                    <View>
                                        <Text>No sessions to review</Text>
                                    </View>
                                )}
                                {incompletePlayerSessions.length > 0 && incompletePlayerSessions.map(playerSessions => (
                                    <View key={playerSessions.user.userId}>
                                        <Text style={styles.subHeader}>{playerSessions.user.name}</Text>
                                        {playerSessions.sessions.map(session => (
                                            <View style={commonStyles.row} key={session.sessionNumber}>
                                                <View style={commonStyles.box}>
                                                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'space-between'}}>
                                                        <Text style={{fontSize: 24, fontWeight: '500',  marginRight: 10}}>Session {session.sessionNumber}</Text>
                                                        <Text style={{fontSize: 12, width: 120, color: Colors.TextSecondary, textAlign: 'right', fontWeight: '500'}}>{getTimeToProvideFeedback(session)}</Text>
                                                    </View>
                                                    {session.drills.map(drill => (
                                                        <View style={{marginVertical: 10}} key={drill.drill.drillId}>
                                                            <Text style={styles.drillName}>
                                                                {drill.drill.name}
                                                            </Text>

                                                            <SubmissionStatus drill={drill}/>
                                                            <FeedbackStatus drill={drill}/>
                                                        </View>
                                                    ))}
                                                    <TouchableOpacity style={{width: '100%', justifyContent: 'center', alignItems: 'center', paddingVertical: 13, borderRadius: 30, backgroundColor: Colors.Primary, marginTop: 15}}
                                                                      onPress={() => navigation.navigate(
                                                                          {
                                                                              name: ScreenNames.CoachFeedbackNavigator,
                                                                              merge: true,
                                                                              params: {
                                                                                  screen: ScreenNames.CoachSessionFeedback,
                                                                                  params: {
                                                                                      session: session
                                                                                  }
                                                                              }
                                                                          })}>
                                                        <Text style={{color: 'white', fontWeight: '600'}}>Provide feedback</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                ))}
                            </ScrollView>
                        )}
                    </>
                )}
            </View>

            <StatusBar style="dark" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#EFF3F4'
    },
    container: {
        flex: 1,
        paddingHorizontal: 15
    },
    header: {
        fontSize: 25,
        fontWeight: '600',
        marginBottom: 10
    },
    subHeader: {
        marginVertical: 10,
        fontWeight: '600'
    },
    drillName: {
        width: '100%',
        marginBottom: 8,
        fontWeight: '500'
    }
});

export default CoachHomeScreen;