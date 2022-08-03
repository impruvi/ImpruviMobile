import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import HeadshotChip from "./HeadshotChip";
import {doesDrillHaveFeedback} from "../util/drillUtil";
import {CoachScreenNames} from "../screens/ScreenNames";
import {DrillVideoTab} from "../constants/drillVideoTab";
import {Colors} from "../constants/colors";
import {useNavigation} from "@react-navigation/native";
import {DayInMillis, getTimeRemainingDisplayText} from "../util/timeUtil";
import {getCompletedDateEpochMillis, getFirstDrillIdWithoutFeedback} from "../util/sessionUtil";
import {useCallback} from "react";

const ReviewTrainingListItem = ({playerSession, subscription}) => {

    const navigation = useNavigation();

    const getTimeToProvideFeedback = (session) => {
        return getTimeRemainingDisplayText(getCompletedDateEpochMillis(session) + DayInMillis);
    }

    const onItemPress = useCallback(() => {
        navigation.navigate(CoachScreenNames.Player, {
            player: playerSession.player,
            subscription: subscription
        });
    }, [playerSession, subscription]);

    const onProvideFeedbackPress = useCallback(() => {
        navigation.navigate(CoachScreenNames.Session, {
            session: playerSession.session,
            tab: DrillVideoTab.Submission,
            drillId: getFirstDrillIdWithoutFeedback(playerSession.session)
        });
    }, [playerSession]);

    const numberOfDrillsToReview = playerSession.session.drills.filter(drill => !doesDrillHaveFeedback(drill)).length;

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onItemPress}>
                <HeadshotChip firstName={playerSession.player.firstName}
                              lastName={playerSession.player.lastName}
                              image={playerSession.player.headshot}/>
            </TouchableOpacity>
            <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>
                    {playerSession.player.firstName} {playerSession.player.lastName}
                </Text>
                <Text style={styles.detailsSubtitle}>
                    {numberOfDrillsToReview} drills to review
                </Text>
            </View>
            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.button} onPress={onProvideFeedbackPress}>
                    <Text style={styles.buttonText}>Provide feedback</Text>
                </TouchableOpacity>
                <Text style={styles.timeText}>{getTimeToProvideFeedback(playerSession.session)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 15
    },
    detailsContainer: {
        flex: 1,
        paddingHorizontal: 10
    },
    actionsContainer: {
        alignItems: 'center'
    },
    detailsTitle: {
        fontWeight: '500',
        fontSize: 14
    },
    detailsSubtitle: {
        color: '#5E5E5E',
        marginTop: 3
    },
    button: {
        backgroundColor: '#f1f1f1',
        paddingVertical: 7,
        paddingHorizontal: 12,
        borderRadius: 20
    },
    buttonText: {
        color: Colors.Primary,
        fontWeight: '500'
    },
    timeText: {
        color: '#BEBEBE',
        fontSize: 12,
        marginTop: 2
    }
});

export default ReviewTrainingListItem;