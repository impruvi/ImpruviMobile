import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {useCallback, useState, useEffect} from "react";
import useHttpClient from "../hooks/useHttpClient";
import useAuth from "../hooks/useAuth";
import SessionOverview from "../components/SessionOverview";
import {ScreenNames} from "./ScreenNames";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {doesEveryDrillHaveSubmission} from "../util/sessionUtil";
import useError from "../hooks/useError";
import Loader from "../components/Loader";
import Reload from "../components/Reload";
import {StatusBar} from "expo-status-bar";


const PlayerTrainingScreen = () => {
    const [nextSession, setNextSession] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {userId} = useAuth();
    const {setError} = useError();

    const getNextSession = async () => {
        setIsLoading(true);
        setHasError(false);
        await getNextSessionLazy();
        setIsLoading(false);
    }

    const getNextSessionLazy = async () => {
        try {
            const allSessions = await httpClient.getPlayerSessions(userId);
            const incompleteSessions = allSessions.filter(session => !doesEveryDrillHaveSubmission(session));
            if (incompleteSessions.length > 0) {
                setNextSession(incompleteSessions[0]);
            } else {
                setNextSession(null);
            }
        } catch (e) {
            console.error(e);
            setError('An error occurred. Please try again.');
            setHasError(true);
        }
    }

    useEffect(() => {
        getNextSession();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getNextSessionLazy();
        }, [httpClient, navigation])
    );

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <Text style={styles.header}>
                    Next session
                </Text>

                {isLoading && <Loader/>}
                {!isLoading && (
                    <>
                        {hasError && <Reload onReload={getNextSession}/>}
                        {!hasError && (
                            <>
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
                            </>
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
    }
});

export default PlayerTrainingScreen;