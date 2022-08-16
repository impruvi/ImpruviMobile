import {Alert, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import {Colors} from "../constants/colors";
import {
    doesAnyDrillHaveSubmission,
    doesEveryDrillHaveFeedback,
    doesEveryDrillHaveSubmission,
    getCompletedDateEpochMillis,
    getFirstDrillIdWithoutFeedback,
    getNumberOfCompletedFeedbacks
} from "../util/sessionUtil";
import moment from "moment";
import ThreeDotsBlack from "../assets/icons/ThreeDotsBlack.png";
import {CoachScreenNames} from "../screens/ScreenNames";
import {useNavigation} from "@react-navigation/native";
import useHttpClient from "../hooks/useHttpClient";
import useError from "../hooks/useError";
import {DayInMillis, getTimeRemainingDisplayText} from "../util/timeUtil";
import {DrillVideoTab} from "../constants/drillVideoTab";
import {useCallback} from "react";

const PlayerTrainingListItem = ({playerId, session, setIsDeleting, onDelete}) => {

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {setError} = useError();

    const deleteTraining = useCallback(async (session) => {
        setIsDeleting(true);
        try {
            await httpClient.deleteSession({
                playerId: playerId,
                sessionNumber: session.sessionNumber
            });
            await onDelete();
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
        }
        setIsDeleting(false);
    }, [session, playerId]);

    const onOptionsClick = useCallback(() => {
        Alert.alert(`Training ${session.sessionNumber}`, '', [
            {
                text: 'Delete',
                onPress: () => {
                    if (session.sessionNumber === 1) {
                        Alert.alert(`You can not delete the intro session`, '', [
                            {
                                text: 'Ok',
                            }
                        ]);
                    } else {
                        Alert.alert(`Are you sure you want to delete training ${session.sessionNumber}`, '', [
                            {
                                text: 'Delete',
                                onPress: () => deleteTraining(session),
                                style: 'destructive'
                            },
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            }
                        ]);
                    }
                },
                style: 'destructive'
            },
            {
                text: 'Edit',
                onPress: () => navigation.navigate(CoachScreenNames.CreateOrEditSession, {
                    playerId: playerId,
                    session: session
                }),
                style: 'default',
            },
            {
                text: 'Cancel',
                style: 'cancel',
            },
        ]);
    }, [session, playerId]);

    const onPreviewSessionPress = useCallback(() => {
        navigation.navigate(CoachScreenNames.Session, {
            session: session
        });
    }, [session]);

    const onProvideFeedbackPress = useCallback(() => {
        navigation.navigate(CoachScreenNames.Session, {
            session: session,
            tab: DrillVideoTab.Submission,
            drillId: getFirstDrillIdWithoutFeedback(session)
        })
    }, [session]);


    const areAllSubmissionsComplete = doesEveryDrillHaveSubmission(session);
    const isAllFeedbackProvided = doesEveryDrillHaveFeedback(session);
    const needsFeedback = areAllSubmissionsComplete && !isAllFeedbackProvided;
    const canEdit = !doesAnyDrillHaveSubmission(session);
    const timeToProvideFeedback = getTimeRemainingDisplayText(getCompletedDateEpochMillis(session) + DayInMillis);

    return (
        <TouchableHighlight onPress={onPreviewSessionPress} underlayColor="#EFF3F4" style={styles.touchableHighlight}>
            <View style={styles.container}>
                <View style={needsFeedback ? styles.feedbackIconActive : styles.feedbackIcon}/>
                <View style={styles.detailsContainer}>
                    <Text style={isAllFeedbackProvided ? styles.detailsTitleCompleted : styles.detailsTitle}>
                        Training {session.sessionNumber} {session.isIntroSession && (
                            <Text style={styles.detailsSubtext}>
                                (Intro session)
                            </Text>)}
                    </Text>
                    <Text style={isAllFeedbackProvided ? styles.detailsSubtitleCompleted : styles.detailsSubtitle}>
                        {!areAllSubmissionsComplete
                            ? `${session.drills.length} drills`
                            : `${getNumberOfCompletedFeedbacks(session)}/${session.drills.length} feedbacks provided`}
                    </Text>
                </View>
                {isAllFeedbackProvided && (
                    <Text style={styles.completedTimeText}>
                        Completed on {moment.unix(getCompletedDateEpochMillis(session) / 1000).format("MM/DD/YYYY")}
                    </Text>
                )}
                {needsFeedback && (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={onProvideFeedbackPress}>
                            <Text style={styles.buttonText}>Provide feedback</Text>
                        </TouchableOpacity>
                        <Text style={styles.timeRemainingText}>
                            {timeToProvideFeedback}
                        </Text>
                    </View>
                )}
                {canEdit && (
                    <TouchableOpacity style={styles.optionsButton} onPress={onOptionsClick}>
                        <Image source={ThreeDotsBlack} style={styles.optionsIcon} />
                    </TouchableOpacity>
                )}
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    touchableHighlight: {
        paddingHorizontal: 15
    },
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: Colors.Border
    },
    detailsContainer: {
        flex: 1
    },
    detailsTitleCompleted: {
        color: '#BEBEBE',
        fontSize: 14,
        fontWeight: '500'
    },
    detailsTitle: {
        fontSize: 14,
        fontWeight: '500'
    },
    detailsSubtext: {
        color: '#aaa'
    },
    detailsSubtitleCompleted: {
        color: '#BEBEBE',
        marginTop: 3
    },
    detailsSubtitle: {
        color: '#505050',
        marginTop: 3
    },
    feedbackIconActive: {
        backgroundColor: Colors.Primary,
        width: 6,
        height: 6,
        borderRadius: 6,
        marginRight: 8
    },
    feedbackIcon: {
        width: 6,
        height: 6,
        borderRadius: 6,
        marginRight: 8
    },
    buttonContainer: {
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#F1F1F1',
        paddingVertical: 7,
        paddingHorizontal: 12,
        borderRadius: 20
    },
    buttonText: {
        color: Colors.Primary,
        fontWeight: '500'
    },
    completedTimeText: {
        color: '#BEBEBE',
        fontSize: 12,
        fontWeight: '500'
    },
    timeRemainingText: {
        marginTop: 3,
        color: '#BEBEBE',
        fontSize: 12
    },
    optionsButton: {
        padding: 10
    },
    optionsIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    }
})

export default PlayerTrainingListItem;