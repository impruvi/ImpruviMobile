import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import HeadshotChip from "./HeadshotChip";
import {CoachScreenNames} from "../screens/ScreenNames";
import {Colors} from "../constants/colors";
import {useNavigation} from "@react-navigation/native";
import {DayInMillis, getTimeRemainingDisplayText} from "../util/timeUtil";
import {useCallback} from "react";

const CreateTrainingsListItem = ({playerRequiringTrainings, subscription}) => {

    const navigation = useNavigation();

    const timeToCreateTrainings = getTimeRemainingDisplayText(subscription.currentPeriodStartDateEpochMillis + DayInMillis);

    const navigateToPlayer = useCallback(() => {
        navigation.navigate(CoachScreenNames.Player, {
            player: playerRequiringTrainings.player,
            subscription: subscription
        });
    }, [playerRequiringTrainings, subscription]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={navigateToPlayer}>
                <HeadshotChip firstName={playerRequiringTrainings.player.firstName}
                              lastName={playerRequiringTrainings.player.lastName}
                              image={playerRequiringTrainings.player.headshot}/>
            </TouchableOpacity>
            <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>
                    {playerRequiringTrainings.player.firstName} {playerRequiringTrainings.player.lastName}
                </Text>
                <Text style={styles.detailsSubtitle}>
                    Purchased {subscription.plan.numberOfTrainings} trainings
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={navigateToPlayer}>
                    <Text style={styles.buttonText}>Create trainings</Text>
                </TouchableOpacity>
                <Text style={styles.timeText}>{timeToCreateTrainings}</Text>
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
    detailsTitle: {
        fontWeight: '500',
        fontSize: 14
    },
    detailsSubtitle: {
        color: '#5E5E5E',
        marginTop: 3
    },
    buttonContainer: {
        alignItems: 'center'
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

export default CreateTrainingsListItem;