import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import useHttpClient from "../../hooks/useHttpClient";
import useAuth from "../../hooks/useAuth";
import {useCallback, useEffect, useState} from "react";
import {PlayerScreenNames} from "../ScreenNames";
import {Colors} from "../../constants/colors";
import SubmissionStatus from "../../components/SubmissionStatus";
import FeedbackStatus from "../../components/FeedbackStatus";
import useError from "../../hooks/useError";
import Loader from "../../components/Loader";
import Reload from "../../components/Reload";
import {StatusBar} from "expo-status-bar";
import Box from "../../components/Box";


const FeedbackScreen = () => {
    const [sessions, setSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {player} = useAuth();
    const {setError} = useError();

    const getPlayerSessions = async () => {
        setIsLoading(true);
        setHasError(false);
        await getPlayerSessionsLazy();
        setIsLoading(false);
    }

    const getPlayerSessionsLazy = async () => {
        try {
            const allSessions = await httpClient.getPlayerSessions(player.playerId);
            setSessions(allSessions);
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
            setHasError(true);
        }
    }

    useEffect(() => {
        getPlayerSessions();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getPlayerSessionsLazy();
        }, [httpClient, navigation])
    );

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <Text style={styles.header}>
                    Feedback
                </Text>

                {isLoading && <Loader/>}
                {!isLoading && (
                    <>
                        {hasError && <Reload onReload={getPlayerSessions}/>}
                        {!hasError && (
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {sessions.length === 0 && (
                                    <Text>No feedback</Text>
                                )}
                                {sessions.map(session => (
                                    <TouchableOpacity key={session.sessionNumber}
                                                      activeOpacity={.6}
                                                      onPress={() => navigation.navigate(PlayerScreenNames.SessionFeedback, {
                                                          session: session
                                                      })}>
                                        <Box style={{padding: 15}} key={session.sessionNumber}>
                                            <Text style={{fontSize: 20, fontWeight: '500', marginBottom: 10}}>Session {session.sessionNumber}</Text>
                                            {session.drills.map(drill => (
                                                <View style={{marginVertical: 10}} key={drill.drillId}>
                                                    <Text style={styles.drillName}>
                                                        {drill.name}
                                                    </Text>

                                                    <SubmissionStatus drill={drill}/>
                                                    <FeedbackStatus drill={drill}/>
                                                </View>
                                            ))}
                                            {/*<TouchableOpacity style={styles.button}*/}
                                            {/*                  onPress={() => navigation.navigate(PlayerScreenNames.SessionFeedback, {*/}
                                            {/*                      session: session*/}
                                            {/*                  })}>*/}
                                            {/*    <Text style={{color: 'white', fontWeight: '600'}}>View feedback</Text>*/}
                                            {/*</TouchableOpacity>*/}
                                        </Box>
                                    </TouchableOpacity>
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

export default FeedbackScreen;
