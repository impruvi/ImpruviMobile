import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {useCallback, useState} from "react";
import useHttpClient from "../hooks/useHttpClient";
import useAuth from "../hooks/useAuth";
import SessionOverview from "../components/SessionOverview";
import {ScreenNames} from "./ScreenNames";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {doesEveryDrillHaveSubmission} from "../util/sessionUtil";


const PlayerTrainingScreen = () => {
    const navigation = useNavigation();
    const [sessions, setSessions] = useState([]);
    const [nextSession, setNextSession] = useState();
    const {httpClient} = useHttpClient();
    const {userId} = useAuth();

    useFocusEffect(
        useCallback(() => {
            httpClient.getPlayerSessions(userId).then(allSessions => {
                setSessions(allSessions);
                const incompleteSessions = allSessions.filter(session => !doesEveryDrillHaveSubmission(session));
                if (incompleteSessions.length > 0) {
                    setNextSession(incompleteSessions[0]);
                } else {
                    setNextSession(null);
                }
            });
        }, [httpClient, navigation])
    );

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <Text style={styles.header}>
                    Next session
                </Text>

                {!!nextSession && (
                    <SessionOverview session={nextSession} startSession={() => navigation.navigate(
                        {
                            name: ScreenNames.PlayerSessionNavigator,
                            merge: true,
                            params: {
                                screen: ScreenNames.PlayerSession,
                                params: {
                                    session: nextSession
                                }
                            }
                        })}/>
                )}
                {!nextSession && (
                    <View>
                        <Text>No more sessions</Text>
                    </View>
                )}
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
    }
});

export default PlayerTrainingScreen;
