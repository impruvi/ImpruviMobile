import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {PlayerScreenNames} from "../ScreenNames";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheckCircle, faXmarkLarge} from "@fortawesome/pro-light-svg-icons";
import {useNavigation} from "@react-navigation/native";

const TrainingPlanCompleteScreen = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20}}>
                <TouchableOpacity style={{position: 'absolute', top: 0, left: 0, padding: 20}}
                                  onPress={() => navigation.navigate(PlayerScreenNames.Home)} >
                    <FontAwesomeIcon icon={faXmarkLarge} size={25}/>
                </TouchableOpacity>

                <FontAwesomeIcon icon={faCheckCircle} size={120}/>
                <Text style={{fontSize: 35, fontWeight: '600', marginTop: 10}}>Training plan completed!</Text>
                <Text style={{fontSize: 18, fontWeight: '500', textAlign: 'center', marginTop: 15}}>
                    You have completed all of your trainings for this month. You will receive new trainings once your
                    subscription is renewed.
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default TrainingPlanCompleteScreen;