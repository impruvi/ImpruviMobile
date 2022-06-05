import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {commonStyles} from '../styles/commonStyles';
import {useCallback, useState} from "react";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import useHttpClient from "../hooks/useHttpClient";
import useAuth from "../hooks/useAuth";
import SubmissionStatus from "../components/SubmissionStatus";
import FeedbackStatus from "../components/FeedbackStatus";
import {Colors} from "../constants/colors";
import {ScreenNames} from "./ScreenNames";
import {doesDrillHaveFeedback, doesDrillHaveSubmission} from "../util/drillUtil";

const CoachHomeScreen = () => {
    const navigation = useNavigation();
    const [incompletePlayerSessions, setIncompletePlayerSessions] = useState([]);
    const {httpClient} = useHttpClient();
    const {userId} = useAuth();

    useFocusEffect(
        useCallback(() => {
            httpClient.getCoachSessions(userId).then(allPlayerSessions => {
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
            });
        }, [httpClient, navigation])
    );

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <Text style={styles.header}>
                    Sessions to review
                </Text>
                <ScrollView>
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
                                        <Text style={{fontSize: 24, fontWeight: '500', marginBottom: 10}}>Session {session.sessionNumber}</Text>
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
            </View>
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