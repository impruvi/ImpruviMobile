import {Image, StyleSheet, Text, TouchableOpacity} from "react-native";

const SideOption = ({icon, text, onPress, noMargin}) => {
    return (
        <TouchableOpacity onPress={onPress} style={noMargin ? styles.containerNoMargin : styles.container}>
            <Image source={icon} style={styles.icon}/>
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
        marginBottom: 15
    },
    containerNoMargin: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 48,
        height: 48,
        borderRadius: 20,
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
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