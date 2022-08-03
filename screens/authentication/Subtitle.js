import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Colors} from "../../constants/colors";

const Subtitle = ({text, linkText, onPress}) => {

    return (
        <>
            <Text style={styles.subtitle}>{text}</Text>
            <TouchableOpacity style={styles.subtitleButton} onPress={onPress}>
                <Text style={styles.subtitleButtonText}>{linkText}</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    subtitle: {
        fontWeight: '600',
        marginTop: 10,
        fontSize: 13
    },
    subtitleButton: {
        marginBottom: 30
    },
    subtitleButtonText: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.Primary,
        textDecorationLine: 'underline'
    },
})

export default Subtitle;