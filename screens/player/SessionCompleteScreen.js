import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {PlayerScreenNames} from "../ScreenNames";
import {Colors} from "../../constants/colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheckCircle, faXmarkLarge} from "@fortawesome/pro-light-svg-icons";
import {useCallback, useEffect, useState} from 'react';
import useHttpClient from "../../hooks/useHttpClient";
import useAuth from "../../hooks/useAuth";
import {doesEverySessionInPlanHaveSubmission} from "../../util/playerUtil";
import useGoogleAnalyticsClient from "../../hooks/useGoogleAnalyticsClient";

const SessionCompleteScreen = () => {

    const [subscription, setSubscription] = useState();
    const [sessions, setSessions] = useState();

    const {playerId} = useAuth();
    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {gaClient} = useGoogleAnalyticsClient();

    const initialize = async () => {
        gaClient.sendGeneralEvent("session_complete");
        const [sessions, subscription] = await Promise.all([
            httpClient.getPlayerSessions(playerId),
            httpClient.getSubscription(playerId)
        ]);

        setSessions(sessions);
        setSubscription(subscription);
    }

    const onClose = useCallback(() => {
        if (doesEverySessionInPlanHaveSubmission(subscription, sessions)) {
            navigation.navigate(PlayerScreenNames.TrainingPlanComplete);
        } else {
            navigation.navigate(PlayerScreenNames.Home)
        }
    }, [subscription, sessions]);

    useEffect(() => {
        initialize();
    }, []);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose} >
                    <FontAwesomeIcon icon={faXmarkLarge} size={25} style={styles.icon}/>
                </TouchableOpacity>

                <FontAwesomeIcon icon={faCheckCircle} size={120} style={styles.icon}/>
                <Text style={styles.title}>Session complete!</Text>
                <Text style={styles.subtitle}>Your coach will provide you feedback within 24 hours</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: Colors.Primary
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    icon: {
        color: 'white'
    },
    title: {
        color: 'white',
        fontSize: 35,
        fontWeight: '600',
        marginTop: 10
    },
    subtitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 15
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 20
    }
})

export default SessionCompleteScreen;
