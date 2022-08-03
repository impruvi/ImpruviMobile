import {Modal, StyleSheet, View} from "react-native";
import {useEffect, useState} from "react";

const ModalWithBackdrop = ({children, visible, close, onBackdropPress}) => {

    const [isBackVisible, setIsBackVisible] = useState(visible);

    useEffect(() => {
        if (!visible) {
            setTimeout(() => {
                setIsBackVisible(false);
            }, 200);
        } else {
            setIsBackVisible(true);
        }
    }, [visible]);


    return (
        <Modal animationType="none" visible={isBackVisible} transparent={true}>
            {visible && (
                <View style={styles.backdrop} onPress={onBackdropPress} />
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={close}>
                <View style={styles.container}>
                    {children}
                </View>
            </Modal>
        </Modal>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, .2)'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ModalWithBackdrop;