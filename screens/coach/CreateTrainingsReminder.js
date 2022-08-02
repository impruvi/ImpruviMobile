import {memo, useCallback, useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "../../constants/colors";
import {CoachScreenNames} from "../ScreenNames";
import {DayInMillis, getTimeRemainingDisplayText} from "../../util/timeUtil";
import {useNavigation} from "@react-navigation/native";

const CreateTrainingsReminder = (
    {
        playerId,
        firstName,
        numberOfTrainingsInSubscription,
        numberOfTrainingsCreatedForSubscription,
        currentPeriodStartDateEpochMillis
    }) => {

    const navigation = useNavigation();

    const timeRemaining = useMemo(() =>
        getTimeRemainingDisplayText(currentPeriodStartDateEpochMillis + DayInMillis),
        [currentPeriodStartDateEpochMillis]
    );

    const navigateToSession = useCallback(() => {
        navigation.navigate(CoachScreenNames.CreateOrEditSession, {
            playerId: playerId
        });
    }, [playerId])

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>
                    {firstName} subscribed for {numberOfTrainingsInSubscription} new training sessions.
                    Add {numberOfTrainingsInSubscription - numberOfTrainingsCreatedForSubscription} more trainings
                </Text>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.button} onPress={navigateToSession}>
                        <Text style={styles.buttonText}>Add a training</Text>
                    </TouchableOpacity>
                    <Text style={styles.timeRemaining}>{timeRemaining}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15
    },
    content: {
        padding: 20,
        borderWidth: 1,
        borderColor: Colors.Border,
        borderRadius: 15,
        marginBottom: 15
    },
    title: {
        fontWeight: '500'
    },
    footer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 15,
        alignItems: 'center'
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: Colors.Primary
    },
    buttonText: {
        color: 'white',
        fontWeight: '500'
    },
    timeRemaining: {
        color: '#BEBEBE',
        fontSize: 12,
        fontWeight: '500'
    }
})

export default memo(CreateTrainingsReminder);