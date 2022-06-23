import {Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faXmarkLarge} from "@fortawesome/pro-light-svg-icons";
import {Colors} from "../../../constants/colors";
import ModalWithBackdrop from "../../ModalWithBackdrop";

const NoSubmitPopup = ({visible, close}) => {

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
                        <Text style={{color: 'white', textAlign: 'center'}}>You can only submit videos for current or past trainings.</Text>
                        <Text style={{color: 'white', textAlign: 'center', marginTop: 20}}>However, you can still watch and practice all the drills in your plan!</Text>
                    </View>
                </View>
            </View>
        </ModalWithBackdrop>
    )
}

export default NoSubmitPopup;