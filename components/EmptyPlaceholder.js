import {Image, StyleSheet, Text, View} from "react-native";
import EmptyGreyIcon from "../assets/icons/EmptyGrey.png";

const EmptyPlaceholder = ({text, subText}) => {
    return (
        <View style={styles.container}>
            <Image source={EmptyGreyIcon} style={styles.image}/>
            <Text style={styles.text}>{text}</Text>
            <Text style={styles.subText}>{subText}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 25,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain'
    },
    text: {
        color: '#BFBFBF',
        fontWeight: '500',
        fontSize: 13
    },
    subText: {
        color: '#BFBFBF',
        fontSize: 13,
        marginTop: 10,
        paddingHorizontal: 20,
        textAlign: 'center'
    }
})

export default EmptyPlaceholder;