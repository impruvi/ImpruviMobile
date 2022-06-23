import {Modal, Text, TouchableHighlight, View} from "react-native";
import {Colors} from "../constants/colors";
import ModalWithBackdrop from "./ModalWithBackdrop";

const Confirmation = ({isOpen, close, prompt, confirm, confirmText='Confirm', cancelText='Cancel'}) => {
    return (
        <ModalWithBackdrop visible={isOpen} close={close}>
            <View style={{backgroundColor: 'white', borderRadius: 10, position: 'relative', width: '80%'}}>
                <View>
                    <View style={{width: '100%', padding: 25, alignItems: 'center', borderBottomWidth: 1, borderColor: Colors.Border}}>
                        <Text style={{fontSize: 16}}>{prompt}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableHighlight onPress={close} underlayColor="#EFF3F4"
                                            style={{width: '50%', padding: 20, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderColor: Colors.Border}}>
                            <Text>{cancelText}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={confirm} underlayColor="#EFF3F4"
                                            style={{width: '50%', padding: 20, justifyContent: 'center', alignItems: 'center'}}>
                            <Text>{confirmText}</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </ModalWithBackdrop>
    )
}

export default Confirmation;