import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useCallback, useState, useEffect} from "react";
import useHttpClient from "../hooks/useHttpClient";
import useAuth from "../hooks/useAuth";
import {commonStyles} from "../styles/commonStyles";
import SubmissionStatus from "../components/SubmissionStatus";
import FeedbackStatus from "../components/FeedbackStatus";
import {Colors} from "../constants/colors";
import {ScreenNames} from "./ScreenNames";
import {doesDrillHaveFeedback, doesDrillHaveSubmission} from "../util/drillUtil";
import useError from "../hooks/useError";
import Loader from "../components/Loader";
import Reload from "../components/Reload";
import {StatusBar} from "expo-status-bar";

const CoachSessionsScreen = () => {
    const [allPlayerSessions, setAllPlayerSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {userId} = useAuth();
    const {setError} = useError();

    const getAllPlayerSessions = async () => {
        setIsLoading(true);
        setHasError(false);
        await getAllPlayerSessionsLazy();
        setIsLoading(false);
    }

    const getAllPlayerSessionsLazy = async () => {
        try {
            const sessions = await httpClient.getCoachSessions(userId);
            setAllPlayerSessions(sessions);
        } catch (e) {
            console.error(e);
            setError('An error occurred. Please try again.');
            setHasError(true);
        }
    }

    useEffect(() => {
        getAllPlayerSessions();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getAllPlayerSessionsLazy();
        }, [httpClient, navigation])
    );

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <Text style={styles.header}>
                    All sessions
                </Text>
                {isLoading && <Loader/>}
                {!isLoading && (
                    <>
                        {hasError && <Reload onReload={getAllPlayerSessions}/>}
                        {!hasError && (
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {allPlayerSessions.length === 0 && (
                                    <View>
                                        <Text>No sessions</Text>
                                    </View>
                                )}
                                {allPlayerSessions.length > 0 && allPlayerSessions.map(playerSessions => (
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
                                                        <Text style={{color: 'white', fontWeight: '600'}}>View Session</Text>
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

export default CoachSessionsScreen;