import {SafeAreaView, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {PlayerScreenNames} from "../ScreenNames";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheckCircle, faXmarkLarge} from "@fortawesome/pro-light-svg-icons";
import {useNavigation} from "@react-navigation/native";
import {useCallback} from "react";

const TrainingPlanCompleteScreen = () => {

    const navigation = useNavigation();

    const navigateToHome = useCallback(() => {
        navigation.navigate(PlayerScreenNames.Home);
    }, []);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.closeIcon} onPress={navigateToHome} >
                    <FontAwesomeIcon icon={faXmarkLarge} size={25}/>
                </TouchableOpacity>

                <FontAwesomeIcon icon={faCheckCircle} size={120}/>
                <Text style={styles.title}>Training plan completed!</Text>
                <Text style={styles.subtitle}>
                    You have completed all of your trainings for this month.
                    You will receive new trainings once your subscription is renewed.
                </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    closeIcon: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 20
    },
    title: {
        fontSize: 35,
        fontWeight: '600',
        marginTop: 10
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 15
    }
});

export default TrainingPlanCompleteScreen;