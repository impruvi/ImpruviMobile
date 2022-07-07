import {Image, StyleSheet, Text, TouchableOpacity} from "react-native";

const SideOption = ({icon, text, onPress, color = 'white', marginBottom = 15}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{...styles.container, marginBottom: marginBottom}}>
            <Image source={icon} style={{width: 30, height: 30, resizeMode: 'contain'}}/>
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