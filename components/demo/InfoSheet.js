import BottomSheet, {BottomSheetView, useBottomSheetTimingConfigs} from "@gorhom/bottom-sheet";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faXmarkLarge} from "@fortawesome/pro-light-svg-icons";
import {Colors} from "../../constants/colors";
import {useEffect, useRef} from 'react';

const InfoSheet = ({isOpen, onClose, drill}) => {

    const sheetRef = useRef();
    const snapPoints = ['65%'];
    const animationConfigs = useBottomSheetTimingConfigs({
        duration: 250,
    });

    useEffect(() => {
        if (isOpen) {
            sheetRef.current?.snapToIndex(0);
        }
    }, [isOpen]);

    return (
        <BottomSheet
            ref={sheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            onClose={onClose}
            animationConfigs={animationConfigs}
            index={-1}>
            <BottomSheetView>
                <View style={{paddingHorizontal: 20}}>
                    <Text style={{fontWeight: '600', fontSize: 18}}>{drill.name}</Text>
                </View>
                <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
                    <View style={{marginBottom: 15, marginTop: 2}}>
                        <Text style={{fontWeight: '500', color: Colors.TextSecondary}}>
                            {drill.estimatedDurationMinutes} minutes
                        </Text>
                    </View>
                    <View>
                        <Text>{drill.notes}</Text>
                    </View>
                    {!!drill.diagramFileLocation && (
                        <Image source={{uri: drill.diagramFileLocation}} style={{width: '100%', minHeight: 280, marginTop: 10, resizeMode: 'contain'}}/>
                    )}
                </View>
            </BottomSheetView>
        </BottomSheet>
    )
}

export default InfoSheet;