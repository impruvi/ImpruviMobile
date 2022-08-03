import {Image, StyleSheet, Text, View} from "react-native";
import Lightning from "../../../../assets/icons/LightningDark.png";
import {doesDrillHaveSubmission} from "../../../../util/drillUtil";
import {doesEveryDrillHaveSubmission} from "../../../../util/sessionUtil";
import {useEffect, useState} from "react";
import useHttpClient from "../../../../hooks/useHttpClient";
import {doesEverySessionInPlanHaveSubmission} from "../../../../util/playerUtil";
import useAuth from "../../../../hooks/useAuth";

const Progress = ({sessions}) => {

    const [hasCompletedTrainingsForMonth, setHasCompletedTrainingsForMonth] = useState(false);

    const {playerId} = useAuth();
    const {httpClient} = useHttpClient();

    const getSubscription = async () => {
        try {
            const subscription = await httpClient.getSubscription(playerId);
            setHasCompletedTrainingsForMonth(
                doesEverySessionInPlanHaveSubmission(subscription, sessions)
            );
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getSubscription();
    }, []);

    const numberOfDrillsCompleted = sessions.flatMap(session => session.drills.filter(doesDrillHaveSubmission)).length;
    const numberOfSessionsCompleted = sessions.filter(doesEveryDrillHaveSubmission).length;
    const totalNumberOfDrills = sessions.flatMap(session => session.drills).length
    const totalNumberOfSessions = sessions.length;


    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Progress this month</Text>
                {hasCompletedTrainingsForMonth && (
                    <Text style={styles.completedTrainingText}>
                        🎉 You've completed all of your trainings for this month.
                        You will receive new trainings once your subscription is renewed
                    </Text>
                )}
                <View style={styles.content}>
                    <View style={styles.statContainer}>
                        <Text style={styles.statTitle}>Completed trainings</Text>
                        <Text style={styles.statText}>
                            {numberOfSessionsCompleted}
                            <Text style={styles.statSubtext}>/ {totalNumberOfSessions}</Text>
                        </Text>
                    </View>
                    <Image source={Lightning} style={styles.icon}/>
                    <View style={styles.statContainer}>
                        <Text style={styles.statTitle}>Completed drills</Text>
                        <Text style={styles.statText}>
                            {numberOfDrillsCompleted}
                            <Text style={styles.statSubtext}>/ {totalNumberOfDrills}</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 15,
        marginTop: 15
    },
    box: {
        marginTop: 10,
        width: '100%',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: .15,
        shadowRadius: 4,
        padding: 20,
        borderRadius: 15,
        backgroundColor: 'white'
    },
    title: {
        fontWeight: '600',
        fontSize: 18
    },
    completedTrainingText: {
        marginTop: 5,
        color: '#6B6B6B',
        fontSize: 12
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 20
    },
    statContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '45%'
    },
    statTitle: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center'
    },
    statText: {
        fontSize: 35,
        marginTop: 8,
        fontWeight: '600'
    },
    statSubtext: {
        color: '#888',
        fontSize: 18
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginBottom: 5
    }
})

export default Progress;