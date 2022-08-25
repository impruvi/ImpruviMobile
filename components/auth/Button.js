import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Colors} from "../../constants/colors";

const Button = ({isSubmitting, submit, text}) => {
    return (
        <TouchableOpacity style={isSubmitting ? styles.submittingButton : styles.button} onPress={submit}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        backgroundColor: Colors.Primary,
        borderRadius: 10,
    },
    submittingButton: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: 'rgba(243, 81, 86, .6)'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white'
    },
})

export default Button;
