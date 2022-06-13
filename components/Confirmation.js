import {Modal, Text, TouchableHighlight, View} from "react-native";
import {Colors} from "../constants/colors";

const Confirmation = ({isOpen, close, prompt, confirm}) => {
    return (
        <>
            {isOpen && (
                <View style={{position: 'absolute', height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, .2)'}} />
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isOpen}
                onRequestClose={close}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{backgroundColor: 'white', borderRadius: 10, position: 'relative', width: '80%'}}>
                        <View>
                            <View style={{width: '100%', padding: 25, alignItems: 'center', borderBottomWidth: 1, borderColor: Colors.Border}}>
                                <Text style={{fontSize: 16}}>{prompt}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableHighlight onPress={close} underlayColor="#EFF3F4"
                                                    style={{width: '50%', padding: 20, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderColor: Colors.Border}}>
                                    <Text>Cancel</Text>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={confirm} underlayColor="#EFF3F4"
                                                    style={{width: '50%', padding: 20, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text>Delete</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default Confirmation;