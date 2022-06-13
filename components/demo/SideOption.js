import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

const SideOption = ({icon, text, onPress, color = 'white'}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <FontAwesomeIcon icon={icon}
                             style={{...styles.icon, color: color}}
                             size={30}/>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 48,
        height: 48,
        borderRadius: 20,
        marginBottom: 15,
    },
    icon: {
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, .6)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2
    },
    text: {
        color: 'white',
        fontSize: 11,
        fontWeight: '600',
        textShadowColor: 'rgba(0, 0, 0, .6)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2
    }
});

export default SideOption;