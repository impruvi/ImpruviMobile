import ModalWithBackdrop from "../../ModalWithBackdrop";
import {Text, TouchableOpacity, View} from "react-native";
import {Colors} from "../../../constants/colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faXmarkLarge} from "@fortawesome/pro-light-svg-icons";

const SubmitVideoPromptPopup = ({visible, close}) => {

    return (
        <ModalWithBackdrop visible={visible}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{backgroundColor: Colors.Primary, borderRadius: 20, width: 300}}>
                    <View style={{padding: 10, alignItems: 'flex-end'}}>
                        <TouchableOpacity style={{padding: 5}} onPress={close}>
                            <FontAwesomeIcon icon={faXmarkLarge} size={20} style={{color: 'white'}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
                        <Text style={{color: 'white', textAlign: 'center'}}>While doing each drill, submit a 30 second video to your coach!</Text>
                        <Text style={{color: 'white', textAlign: 'center', marginTop: 20}}>Take the video directly on the app, or upload one from your library</Text>
                    </View>
                </View>
            </View>
        </ModalWithBackdrop>
    )
}

export default SubmitVideoPromptPopup;