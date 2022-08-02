import {BottomSheetModal, BottomSheetView, useBottomSheetTimingConfigs} from "@gorhom/bottom-sheet";
import {StyleSheet, Text, View} from "react-native";
import {useCallback, useEffect, useRef} from 'react';

const InfoSheet = ({isOpen, onClose, name, description, notes}) => {

    const sheetRef = useRef();
    const snapPoints = ['65%'];
    const animationConfigs = useBottomSheetTimingConfigs({
        duration: 250,
    });

    useEffect(() => {
        if (isOpen) {
            sheetRef.current?.present();
        }
    }, [isOpen]);

    const onChange = useCallback((index) => {
        if (index === 0) {
            onClose();
        }
    }, []);

    return (
        <BottomSheetModal
            ref={sheetRef}
            index={0}
            snapPoints={snapPoints}
            animationConfigs={animationConfigs}
            onDismiss={onClose}
            onChange={onChange}
            enablePanDownToClose={true}
            enableOverDrag={false}
            style={styles.modalStyle}>
            <BottomSheetView>
                <View style={styles.content}>
                    <View style={styles.section}>
                        <Text style={styles.name}>{name}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.description}>Description</Text>
                        <Text>{description}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.notes}>Notes from your coach</Text>
                        <Text>{notes}</Text>
                    </View>
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    )
}

const styles = StyleSheet.create({
    modalStyle: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: .15,
        shadowRadius: 5
    },
    content: {
        paddingHorizontal: 20
    },
    section: {
        marginBottom: 20
    },
    name: {
        fontWeight: '600',
        fontSize: 18,
    },
    description: {
        fontWeight: '600',
        marginBottom: 5,
        fontSize: 15
    },
    notes: {
        fontWeight: '600',
        marginBottom: 5,
        fontSize: 15
    }
})

export default InfoSheet;