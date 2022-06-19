import {StyleSheet, Text, TouchableOpacity} from "react-native";

const Button = ({onNextSlide, style, textStyle}) => {
    return (
        <TouchableOpacity onPress={onNextSlide} style={{...styles.button, ...style}}>
            <Text style={{...styles.buttonText, ...textStyle}}>Continue</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 60,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 60,
        marginTop: 50
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 15
    }
});

export default Button;