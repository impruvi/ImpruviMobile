import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useCallback, useEffect, useState} from "react";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import useHttpClient from "../../hooks/useHttpClient";
import useAuth from "../../hooks/useAuth";
import DrillSubmissionStatus from "../../components/status/DrillSubmissionStatus";
import DrillFeedbackStatus from "../../components/status/DrillFeedbackStatus";
import {Colors} from "../../constants/colors";
import {CoachScreenNames} from "../ScreenNames";
import {doesDrillHaveFeedback, doesDrillHaveSubmission} from "../../util/drillUtil";
import useError from "../../hooks/useError";
import Loader from "../../components/Loader";
import Reload from "../../components/Reload";
import {StatusBar} from "expo-status-bar";
import HeaderText from "../../components/HeaderText";
import PaddedScreen from "../../components/PaddedScreen";
import Box from "../../components/Box";

const HomeScreen = () => {
    const [incompletePlayerSessions, setIncompletePlayerSessions] = useState([]);
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

    const getTimeToProvideFeedback = (session) => {
        const dayInMillis = 24 * 60 * 60 * 1000;
        const hourInMillis = 60 * 60 * 1000;
        const minuteInMillis = 60 * 1000;
        const currentTimeEpochMillis = Date.now();
        const submissionTimeEpochMillis = Math.max(...session.drills.map(drill =>
            !!drill.submission ? drill.submission.uploadDateEpochMillis : -1
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
            const allPlayerSessions = await httpClient.getCoachSessions(coach.coachId);
            const incompleteSessions = allPlayerSessions.map(playerSessions => {
                const incompleteSessionsForPlayer = playerSessions.sessions.filter(session =>
                    session.drills.some(drill => doesDrillHaveSubmission(drill) && !doesDrillHaveFeedback(drill))
                );
                return incompleteSessionsForPlayer.length > 0
                    ? {
                        player: playerSessions.player,
                        sessions: incompleteSessionsForPlayer
                    }
                    : null;
            }).filter(playerSessions => !!playerSessions);
            setIncompletePlayerSessions(incompleteSessions);
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
        <PaddedScreen>
            <HeaderText text={'Sessions to review'}/>
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
                                <View key={playerSessions.player.playerId}>
                                    <Text style={styles.subHeader}>{playerSessions.player.firstName} {playerSessions.player.lastName}</Text>
                                    {playerSessions.sessions.map(session => (
                                        <TouchableOpacity activeOpacity={.6}
                                                          key={session.sessionNumber}
                                                          onPress={() => navigation.navigate(CoachScreenNames.Session, {
                                                              session: session
                                                          })}>
                                            <Box style={{padding: 15}}>
                                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'space-between'}}>
                                                    <Text style={{fontSize: 24, fontWeight: '500',  marginRight: 10}}>Session {session.sessionNumber}</Text>
                                                    <Text style={{fontSize: 12, width: 120, color: Colors.TextSecondary, textAlign: 'right'}}>{getTimeToProvideFeedback(session)}</Text>
                                                </View>
                                                {session.drills.map(drill => (
                                                    <View style={{marginVertical: 10}} key={drill.drillId}>
                                                        <Text style={styles.drillName}>
                                                            {drill.name}
                                                        </Text>

                                                        <DrillSubmissionStatus drill={drill}/>
                                                        <DrillFeedbackStatus drill={drill}/>
                                                    </View>
                                                ))}
                                            </Box>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ))}
                        </ScrollView>
                    )}
                </>
            )}

            <StatusBar style="dark" />
        </PaddedScreen>
    )
}

const styles = StyleSheet.create({
    subHeader: {
        marginVertical: 10,
        fontWeight: '600'
    },
    drillName: {
        width: '100%',
        marginBottom: 8,
        fontWeight: '500'
    },
    button: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 13,
        borderRadius: 30,
        backgroundColor: Colors.Primary,
        marginTop: 15
    }
});

export default HomeScreen;