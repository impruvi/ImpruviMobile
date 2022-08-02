import {SafeAreaView, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Colors} from "../../constants/colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheckCircle, faXmarkLarge} from "@fortawesome/pro-light-svg-icons";
import {useCallback} from "react";

const SessionCompleteScreen = () => {

    const navigation = useNavigation();

    const goBack = useCallback(() => {
        navigation.pop(2);
    }, []);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.buttonContainer}
                                  onPress={goBack} >
                    <FontAwesomeIcon icon={faXmarkLarge}
                                     size={25}
                                     style={styles.icon}/>
                </TouchableOpacity>

                <FontAwesomeIcon icon={faCheckCircle}
                                 size={120}
                                 style={styles.icon}/>
                <Text style={styles.title}>Session complete!</Text>
                <Text style={styles.subtitle}>You have provided feedback for all of the drills in the session</Text>
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
    buttonContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 20
    }
})

export default SessionCompleteScreen;