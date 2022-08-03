import {memo} from 'react';
import {StyleSheet, Text, View} from "react-native";

const Title = ({text, value, includeMargin}) => {
    return (
        <View style={includeMargin ? styles.containerWithMargin : styles.container}>
            <View style={styles.label}>
                <Text style={styles.labelText}>{text}</Text>
            </View>
            <Text>{value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    containerWithMargin: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20
    },
    label: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    labelText: {
        marginLeft: 5,
        fontWeight: '500'
    }
})

export default memo(Title);
