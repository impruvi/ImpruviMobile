import {Modal, View} from "react-native";

const ModalWithBackdrop = ({children, visible, close, onBackdropPress}) => {
    return (
        <Modal animationType="none"
               visible={visible}
               transparent={true}>
            {visible && (
                <View style={{position: 'absolute', height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, .2)'}}
                                          onPress={onBackdropPress}>
                </View>
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={close}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    {children}
                </View>
            </Modal>
        </Modal>
    )
}

export default ModalWithBackdrop;