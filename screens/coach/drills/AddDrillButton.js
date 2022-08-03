import {memo, useCallback} from 'react';
import {CoachScreenNames} from "../../ScreenNames";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Colors} from "../../../constants/colors";

const AddDrillButton = () => {

    const navigation = useNavigation();

    const onPress = useCallback(() => {
        navigation.navigate(CoachScreenNames.CreateOrEditDrill);
    }, []);

    return (
        <TouchableOpacity onPress={onPress}
                          style={styles.button}>
            <Text style={styles.buttonText}>Add a drill</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 5,
        flexDirection: 'row'
    },
    buttonText: {
        color: Colors.Primary,
        marginLeft: 5,
        fontWeight: '600'
    }
})

export default memo(AddDrillButton);