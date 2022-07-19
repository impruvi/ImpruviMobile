import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Colors} from "../../constants/colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheckCircle, faXmarkLarge} from "@fortawesome/pro-light-svg-icons";

const SessionCompleteScreen = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.Primary}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20}}>
                <TouchableOpacity style={{position: 'absolute', top: 0, left: 0, padding: 20}}
                                  onPress={() => navigation.pop(2)} >
                    <FontAwesomeIcon icon={faXmarkLarge} size={25} style={{color: 'white'}}/>
                </TouchableOpacity>

                <FontAwesomeIcon icon={faCheckCircle} size={120} style={{color: 'white'}}/>
                <Text style={{color: 'white', fontSize: 35, fontWeight: '600', marginTop: 10}}>Session complete!</Text>
                <Text style={{color: 'white', fontSize: 18, fontWeight: '500', textAlign: 'center', marginTop: 15}}>You have provided feedback for all of the drills in the session</Text>
            </View>
        </SafeAreaView>
    );
};

export default SessionCompleteScreen;