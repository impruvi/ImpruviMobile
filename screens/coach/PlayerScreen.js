import {ActivityIndicator, SafeAreaView, ScrollView, Text, View, StyleSheet} from 'react-native';
import {CoachScreenNames} from "../ScreenNames";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft} from "@fortawesome/pro-light-svg-icons";
import {Colors} from "../../constants/colors";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import HeaderCenter from "../../components/HeaderCenter";
import {useCallback, useMemo, useState, useRef, useEffect} from "react";
import useHttpClient from "../../hooks/useHttpClient";
import useError from "../../hooks/useError";
import useAuth from "../../hooks/useAuth";
import HeadshotChip from "../../components/HeadshotChip";
import PlayerTrainingListItem from "../../components/PlayerTrainingListItem";
import {doesPlayerNeedMoreSessions, getNumberOfSessionsCreatedForSubscription} from "../../util/playerUtil";
import {DayInMillis, getTimeRemainingDisplayText} from "../../util/timeUtil";
import EmptyPlaceholder from "../../components/EmptyPlaceholder";
import CreateTrainingsReminder from "./CreateTrainingsReminder";

const PlayerScreen = ({route}) => {

    const [player] = useState(route.params.player);
    const [subscription] = useState(route.params.subscription);
    const [sessions, setSessions] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {setError} = useError();
    const {coachId} = useAuth();

    const playerId = player.playerId;

    const getPlayerSessions = async () => {
        try {
            const allPlayerSessions = await httpClient.getPlayerSessionsForCoach(coachId);
            const sessions = allPlayerSessions.find(ps => ps.player.playerId === route.params.player.playerId).sessions;
            setSessions(sessions);
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
        }
    }

    const navigateToCreatOrEditSession = useCallback(() => {
        navigation.navigate(CoachScreenNames.CreateOrEditSession, {
            playerId: playerId
        });
    }, [playerId]);


    useFocusEffect(
        useCallback(() => {
            getPlayerSessions();
        }, [httpClient, navigation])
    );

    const needsMoreSessions = useMemo(() => doesPlayerNeedMoreSessions(subscription, sessions), [subscription, sessions]);
    const headerLeft = useMemo(() => (
        <FontAwesomeIcon icon={faAngleLeft} size={25}/>
    ), []);
    const headerRight = useMemo(() => (
        <View style={styles.addTrainingButtonContainer}>
            <Text style={styles.addTrainingButtonText}>Add training</Text>
        </View>
    ), [])

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaView}>
                <HeaderCenter left={headerLeft}
                              onLeftPress={navigation.goBack}
                              right={headerRight}
                              onRightPress={navigateToCreatOrEditSession}/>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <HeadshotChip firstName={player.firstName} lastName={player.lastName} image={player.headshot} size={80}/>
                        <Text style={styles.headerText}>{player.firstName} {player.lastName}</Text>
                    </View>

                    {needsMoreSessions && (
                        <CreateTrainingsReminder playerId={player.playerId}
                                                 firstName={player.firstName}
                                                 numberOfTrainingsInSubscription={subscription.plan.numberOfTrainings}
                                                 numberOfTrainingsCreatedForSubscription={getNumberOfSessionsCreatedForSubscription(subscription, sessions)}
                                                 currentPeriodStartDateEpochMillis={subscription.currentPeriodStartDateEpochMillis}/>
                    )}

                    {sessions.map(session => (
                        <PlayerTrainingListItem key={session.sessionNumber}
                                                session={session}
                                                onDelete={getPlayerSessions}
                                                setIsDeleting={setIsDeleting}
                                                playerId={player.playerId}/>
                    ))}
                    {sessions.length === 0 && (
                        <EmptyPlaceholder text={'No trainings'} />
                    )}
                </ScrollView>
            </SafeAreaView>

            {(isDeleting) && (
                <View style={styles.submittingContainer}>
                    <ActivityIndicator size="small" color="black"/>
                    <Text style={styles.submittingText}>Deleting training...</Text>
                </View>
            )}
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
    header: {
        alignItems: 'center',
        marginBottom: 10
    },
    headerText: {
        fontWeight: '600',
        marginTop: 3
    },
    submittingContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, .6)'
    },
    submittingText: {
        fontSize: 15,
        fontWeight: '500',
        marginTop: 10
    },
    addTrainingButtonContainer: {
        flexDirection: 'row'
    },
    addTrainingButtonText: {
        color: Colors.Primary,
        marginLeft: 5,
        fontWeight: '600'
    }
})

export default PlayerScreen;