import {ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useCallback, useEffect, useState} from "react";
import useHttpClient from "../../hooks/useHttpClient";
import useAuth from "../../hooks/useAuth";
import useError from "../../hooks/useError";
import Loader from "../../components/Loader";
import Reload from "../../components/Reload";
import {StatusBar} from "expo-status-bar";
import HeaderText from "../../components/HeaderText";
import PaddedScreen from "../../components/PaddedScreen";
import Box from "../../components/Box";
import {CoachScreenNames} from "../ScreenNames";
import {doesDrillHaveFeedback, doesDrillHaveSubmission} from "../../util/drillUtil";
import {Colors} from "../../constants/colors";

const PlayersScreen = () => {
    const [allPlayerSessions, setAllPlayerSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {coach} = useAuth();
    const {setError} = useError();

    const getAllPlayerSessions = async () => {
        setIsLoading(true);
        setHasError(false);
        await getAllPlayerSessionsLazy();
        setIsLoading(false);
    }

    const getAllPlayerSessionsLazy = async () => {
        try {
            const sessions = await httpClient.getCoachSessions(coach.coachId);
            setAllPlayerSessions(sessions);
        } catch (e) {
            console.log(e);
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

    const getSessionsPendingFeedback = (playerSessions) => {
        return playerSessions.sessions.filter(session => {
            return session.drills.filter(drill =>
                !doesDrillHaveFeedback(drill) && doesDrillHaveSubmission(drill)
            ).length > 0;
        });
    }

    const getCompletedSessions = (playerSessions) => {
        return playerSessions.sessions.filter(session => {
            return session.drills.filter(drill =>
                doesDrillHaveSubmission(drill) && doesDrillHaveFeedback(drill)
            ).length === session.drills.length;
        });
    }

    const getNotStartedSessions = (playerSessions) => {
        return playerSessions.sessions.filter(session => {
            return session.drills.filter(drill =>
                doesDrillHaveSubmission(drill)
            ).length === 0;
        });
    }

    return (
        <PaddedScreen>
            <HeaderText text={'Your players'}/>
            {isLoading && <Loader/>}
            {!isLoading && (
                <>
                    {hasError && <Reload onReload={getAllPlayerSessions}/>}
                    {!hasError && (
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {allPlayerSessions.length === 0 && (
                                <View>
                                    <Text>No players</Text>
                                </View>
                            )}
                            {allPlayerSessions.map(playerSessions => (
                                <TouchableOpacity activeOpacity={.6} key={playerSessions.player.playerId} style={{marginTop: 10}} onPress={() => navigation.navigate(CoachScreenNames.Player, {
                                    playerSessions: playerSessions
                                })}>
                                    <Box key={playerSessions.player.playerId}>
                                        <View style={{padding: 10}}>
                                            <Text style={styles.subHeader}>{playerSessions.player.firstName} {playerSessions.player.lastName}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                                            <View style={styles.sessionStat}>
                                                <Text style={styles.sessionStatValue}>{getCompletedSessions(playerSessions).length}</Text>
                                                <Text style={styles.sessionStatText}>Completed sessions</Text>
                                            </View>
                                            <View style={styles.sessionStat}>
                                                <Text style={styles.sessionStatValue}>{getNotStartedSessions(playerSessions).length}</Text>
                                                <Text style={styles.sessionStatText}>Not started sessions</Text>
                                            </View>
                                            <View style={styles.sessionStat}>
                                                <Text style={styles.sessionStatValue}>{getSessionsPendingFeedback(playerSessions).length}</Text>
                                                <Text style={styles.sessionStatText}>Sessions pending feedback</Text>
                                            </View>
                                        </View>
                                    </Box>
                                </TouchableOpacity>
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
    sessionStat: {
        width: '33%',
        padding: 5,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    sessionStatValue: {
        fontSize: 25,
        fontWeight: '300'
    },
    sessionStatText: {
        textAlign: 'center',
        fontSize: 12,
        color: Colors.TextSecondary
    }
});

export default PlayersScreen;