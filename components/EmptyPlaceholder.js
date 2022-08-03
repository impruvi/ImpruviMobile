import {Image, StyleSheet, Text, View} from "react-native";
import EmptyGreyIcon from "../assets/icons/EmptyGrey.png";

const EmptyPlaceholder = ({text}) => {
    return (
        <View style={styles.container}>
            <Image source={EmptyGreyIcon} style={styles.image}/>
            <Text style={styles.text}>{text}</Text>
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
    }
})

export default EmptyPlaceholder;