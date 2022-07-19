import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {PlayerScreenNames} from "../ScreenNames";
import {Colors} from "../../constants/colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheckCircle, faXmarkLarge} from "@fortawesome/pro-light-svg-icons";
import {useEffect, useState} from 'react';
import useHttpClient from "../../hooks/useHttpClient";
import useAuth from "../../hooks/useAuth";
import {doesEveryDrillHaveSubmission} from "../../util/sessionUtil";

const SessionCompleteScreen = () => {

    const [hasCompletedAllTrainings, setHasCompletedAllTrainings] = useState(false);

    const {player} = useAuth();
    const navigation = useNavigation();
    const {httpClient} = useHttpClient();

    const getHasCompletedAllTrainings = async () => {
        const sessions = await httpClient.getPlayerSessions(player.playerId);
        setHasCompletedAllTrainings(sessions.filter(session => !doesEveryDrillHaveSubmission(session)).length === 0);
    }

    const onClose = () => {
        if (hasCompletedAllTrainings) {
            navigation.navigate(PlayerScreenNames.TrainingPlanComplete);
        } else {
            navigation.navigate(PlayerScreenNames.Home)
        }
    }

    useEffect(() => {
        getHasCompletedAllTrainings();
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