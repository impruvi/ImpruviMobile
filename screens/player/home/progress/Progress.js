import {Image, Text, View} from "react-native";
import Lightning from "../../../../assets/icons/LightningDark.png";
import {doesDrillHaveSubmission} from "../../../../util/drillUtil";
import {doesEveryDrillHaveSubmission} from "../../../../util/sessionUtil";
import {useEffect, useState} from "react";
import useHttpClient from "../../../../hooks/useHttpClient";
import {doesEverySessionInPlanHaveSubmission} from "../../../../util/playerUtil";

const Progress = ({sessions, player}) => {

    const [subscription, setSubscription] = useState();

    const {httpClient} = useHttpClient();

    const getSubscription = async () => {
        try {
            const sub = await httpClient.getSubscription(player.coachId, player.playerId);
            setSubscription(sub);
        } catch (e) {
            console.log(e);
        }
    };

    const getNumberOfDrillsCompleted = () => {
        return sessions.flatMap(session => session.drills.filter(doesDrillHaveSubmission)).length
    }

    const getNumberOfSessionsCompleted = () => {
        return sessions.filter(doesEveryDrillHaveSubmission).length;
    }

    const getTotalNumberOfDrills = () => {
        return sessions.flatMap(session => session.drills).length;
    }

    const getTotalNumberOfSessions = () => {
        return sessions.length;
    }

    useEffect(() => {
        getSubscription();
    }, []);

    return (
        <View style={{width: '100%', paddingHorizontal: 15, marginTop: 15}}>
            <View style={{
                marginTop: 10,
                width: '100%',
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: .15,
                shadowRadius: 4,
                padding: 20,
                borderRadius: 15,
                backgroundColor: 'white'
            }}>
                <Text style={{fontWeight: '600', fontSize: 18}}>Progress this month</Text>
                {doesEverySessionInPlanHaveSubmission(subscription, sessions) && (
                    <Text style={{marginTop: 5, color: '#6B6B6B', fontSize: 12,}}>
                        🎉 You've completed all of your trainings for this month.
                        You will receive new trainings once your subscription is renewed
                    </Text>
                )}
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 20}}>
                    <View style={{alignItems: 'center', justifyContent: 'flex-end', width: '45%'}}>
                        <Text style={{fontSize: 14, fontWeight: '600', textAlign: 'center'}}>Completed trainings</Text>
                        <Text style={{fontSize: 35, marginTop: 8, fontWeight: '600'}}>
                            {getNumberOfSessionsCompleted()}
                            <Text style={{color: '#888', fontSize: 18}}>/ {getTotalNumberOfSessions()}</Text>
                        </Text>
                    </View>
                    <Image source={Lightning} style={{width: 20, height: 20, resizeMode: 'contain', marginBottom: 5}}/>
                    <View style={{alignItems: 'center', justifyContent: 'flex-end', width: '45%'}}>
                        <Text style={{fontSize: 14, fontWeight: '600', textAlign: 'center'}}>Completed drills</Text>
                        <Text style={{fontSize: 35, marginTop: 8, fontWeight: '600'}}>
                            {getNumberOfDrillsCompleted()}
                            <Text style={{color: '#888', fontSize: 18}}>/ {getTotalNumberOfDrills()}</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default Progress;