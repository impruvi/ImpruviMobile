import {SafeAreaView, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft} from "@fortawesome/pro-light-svg-icons";

const VideoBackIcon = ({onPress}) => {
    return (
        <View style={{position: 'absolute'}}>
            <SafeAreaView>
                <TouchableOpacity onPress={onPress} style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginTop: 5}}>
                    <FontAwesomeIcon icon={faAngleLeft} style={{fontSize: 80, color: 'white', flex: 1}} size={30}/>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}

export default VideoBackIcon;
