import {Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowRotateRight} from "@fortawesome/pro-regular-svg-icons";

const Reload = ({onReload}) => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={onReload} style={{flexDirection: 'row'}}>
                <FontAwesomeIcon icon={faArrowRotateRight} style={{marginRight: 5}}/>
                <Text style={{fontSize: 15, fontWeight: '500'}}>Reload</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Reload;