import {BottomSheetModal, BottomSheetView, useBottomSheetTimingConfigs} from "@gorhom/bottom-sheet";
import {Text, View} from "react-native";
import {useEffect, useRef} from 'react';
import CachedImage from "../../CachedImage";

const InfoSheet = ({isOpen, onClose, drill}) => {

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

    return (
        <BottomSheetModal
            ref={sheetRef}
            index={0}
            snapPoints={snapPoints}
            animationConfigs={animationConfigs}
            onDismiss={onClose}
            onChange={index => {
                if (index === 0) {
                    onClose();
                }
            }}
            enablePanDownToClose={true}
            enableOverDrag={false}
            style={{shadowColor: 'black', shadowOffset: { width: 0, height: 1 }, shadowOpacity: .15, shadowRadius: 5}}>
            <BottomSheetView>
                <View style={{paddingHorizontal: 20}}>
                    <Text style={{fontWeight: '600', fontSize: 18}}>{drill.name}</Text>
                </View>
                <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
                    <View style={{marginBottom: 20}}>
                        <Text style={{fontWeight: '600', marginBottom: 5, fontSize: 15}}>Description</Text>
                        <Text>{drill.description}</Text>
                    </View>
                    <View>
                        <Text style={{fontWeight: '600', marginBottom: 5, fontSize: 15}}>Notes from your coach</Text>
                        <Text>{drill.notes}</Text>
                    </View>
                    {!!drill.diagramFileLocation && (
                        <CachedImage source={{uri: drill.diagramFileLocation}} style={{width: '100%', minHeight: 280, marginTop: 10, resizeMode: 'contain'}} />
                    )}
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    )
}

export default InfoSheet;