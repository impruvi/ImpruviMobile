import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAnglesDown} from "@fortawesome/pro-light-svg-icons";
import {Text, View} from "react-native";

const NextDrillIndicator = () => {
    return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <FontAwesomeIcon icon={faAnglesDown} style={{color: 'white'}} size={30}/>
            <Text style={{color: 'white', marginVertical: 5, fontWeight: '500', fontSize: 16}}>Next drill</Text>
        </View>
    )
}

export default NextDrillIndicator;