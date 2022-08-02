import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowRotateRight} from "@fortawesome/pro-regular-svg-icons";

const Reload = ({onReload, color='black'}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onReload} style={styles.button}>
                <FontAwesomeIcon icon={faArrowRotateRight} style={{...styles.icon, color: color}}/>
                <Text style={{...styles.text, color: color}}>Reload</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        flexDirection: 'row'
    },
    icon: {
        marginRight: 5,
    },
    text: {
        fontSize: 15,
        fontWeight: '500',
    }
})

export default Reload;