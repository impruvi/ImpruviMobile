import {memo} from 'react';
import {TouchableOpacity, View, StyleSheet} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faXmarkLarge} from "@fortawesome/pro-light-svg-icons";

const CloseButton = () => {
    return (
        <TouchableOpacity onPress={navigation.goBack} style={styles.container}>
            <View style={styles.icon}>
                <FontAwesomeIcon icon={faXmarkLarge} style={} size={23}/>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    iconContainer: {

    },
    icon: {
        color: 'white'
    }
});

export default memo(CloseButton);