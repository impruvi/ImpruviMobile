import {Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheckCircle} from "@fortawesome/pro-light-svg-icons";
import {Colors} from "../../constants/colors";

const SessionCard = ({navigateToSession}) => {
    return (
        <View style={{backgroundColor: 'white', padding: 15, borderRadius: 20, marginBottom: 12, position: 'relative'}}>
            <Text style={{fontSize: 18, fontWeight: '500', marginBottom: 10}}>Training 1:</Text>
            <View style={{flexDirection: 'row', marginBottom: 5}}>
                <FontAwesomeIcon icon={faCheckCircle}  style={{marginRight: 6, color: 'green'}}/>
                <Text style={{color: 'green'}}>Session complete</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <FontAwesomeIcon icon={faCheckCircle}  style={{marginRight: 6, color: 'green'}}/>
                <Text style={{color: 'green'}}>Feedback available</Text>
            </View>
            <View style={{width: '100%', alignItems: 'flex-end'}}>
                <TouchableOpacity style={{backgroundColor: Colors.Primary, paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20}} onPress={navigateToSession}>
                    <Text style={{color: 'white'}}>View training</Text>
                </TouchableOpacity>
            </View>
            <View style={{position: 'absolute', top: 12, right: 30}}>
                <Text style={{color: Colors.Primary, fontSize: 20, fontWeight: '600'}}>ü</Text>
            </View>
        </View>
    )
}

export default SessionCard;