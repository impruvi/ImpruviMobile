import {SafeAreaView, TouchableOpacity, View, StyleSheet} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft} from "@fortawesome/pro-light-svg-icons";

const VideoBackIcon = ({onPress}) => {
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <TouchableOpacity onPress={onPress} style={styles.button}>
                    <FontAwesomeIcon icon={faAngleLeft} style={styles.icon} size={30}/>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute'
    },
    button: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 5
    },
    icon: {
        fontSize: 80,
        color: 'white',
        flex: 1
    }
});

export default VideoBackIcon;
