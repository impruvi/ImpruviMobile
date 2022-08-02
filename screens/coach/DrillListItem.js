import {memo, useCallback} from 'react';
import {Image, Text, TouchableHighlight, TouchableOpacity, View, StyleSheet} from "react-native";
import {Colors} from "../../constants/colors";
import ThreeDotsBlack from "../../assets/icons/ThreeDotsBlack.png";
import {CoachScreenNames} from "../ScreenNames";
import {useNavigation} from "@react-navigation/native";

const underlayColor = '#EFF3F4';

const DrillListItem = ({drill, idx, onOptionClick}) => {

    const navigation = useNavigation();

    const navigateToDrill = useCallback((drill) => {
        navigation.navigate(CoachScreenNames.Drill, {
            drill: drill
        });
    }, [drill]);

    const optionPressed = useCallback(() => {
        onOptionClick(drill);
    }, [drill]);

    return (
        <TouchableHighlight onPress={navigateToDrill} underlayColor={underlayColor} key={drill.drillId}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.nameText}>{drill.name} (Drill {idx + 1})</Text>
                    <Text style={styles.notesText}>{drill.notes}</Text>
                </View>
                <TouchableOpacity style={styles.optionButton} onPress={optionPressed}>
                    <Image source={ThreeDotsBlack} style={styles.optionIcon}/>
                </TouchableOpacity>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: Colors.Border
    },
    textContainer: {
        flex: 1
    },
    nameText: {
        fontWeight: '500',
        fontSize: 14
    },
    notesText: {
        color: '#505050',
        marginTop: 3
    },
    optionButton: {
        padding: 10
    },
    optionIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    }
})

export default memo(DrillListItem);