import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Colors} from "../../constants/colors";

const SubmitButton = ({onPress, text}) => {
    return (
        <TouchableOpacity style={styles.submitButton} onPress={onPress}>
            <Text style={styles.submitButtonText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    submitButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: Colors.Primary,
        borderRadius: 40,
        flexDirection: 'row'
    },
    submitButtonIcon: {
        color: 'white',
        marginRight: 10
    },
    submitButtonText: {
        color: 'white',
        fontSize: 15
    }
});

export default SubmitButton;