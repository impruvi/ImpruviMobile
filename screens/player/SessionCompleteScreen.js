import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {PlayerScreenNames} from "../ScreenNames";
import {Colors} from "../../constants/colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheckCircle, faXmarkLarge} from "@fortawesome/pro-light-svg-icons";
import {useEffect, useState} from 'react';
import useHttpClient from "../../hooks/useHttpClient";
import useAuth from "../../hooks/useAuth";
import {doesEverySessionInPlanHaveSubmission} from "../../util/playerUtil";

const SessionCompleteScreen = () => {

    const [subscription, setSubscription] = useState();
    const [sessions, setSessions] = useState();

    const {player} = useAuth();
    const navigation = useNavigation();
    const {httpClient} = useHttpClient();

    const initialize = async () => {
        const [sessions, subscription] = await Promise.all([
            httpClient.getPlayerSessions(player.playerId),
            httpClient.getSubscription(player.coachId, player.playerId)
        ]);

        setSessions(sessions);
        setSubscription(subscription);
    }

    const onClose = () => {
        if (doesEverySessionInPlanHaveSubmission(subscription, sessions)) {
            navigation.navigate(PlayerScreenNames.TrainingPlanComplete);
        } else {
            navigation.navigate(PlayerScreenNames.Home)
        }
    }

    useEffect(() => {
        initialize();
    }, []);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.Primary}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20}}>
                <TouchableOpacity style={{position: 'absolute', top: 0, left: 0, padding: 20}}
                                  onPress={onClose} >
                    <FontAwesomeIcon icon={faXmarkLarge} size={25} style={{color: 'white'}}/>
                </TouchableOpacity>

                <FontAwesomeIcon icon={faCheckCircle} size={120} style={{color: 'white'}}/>
                <Text style={{color: 'white', fontSize: 35, fontWeight: '600', marginTop: 10}}>Session complete!</Text>
                <Text style={{color: 'white', fontSize: 18, fontWeight: '500', textAlign: 'center', marginTop: 15}}>Your coach will provide you feedback within 24 hours</Text>
            </View>
        </SafeAreaView>
    );
};

export default SessionCompleteScreen;