import {memo, useCallback} from 'react';
import HeadshotChip from "../../../components/HeadshotChip";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

const InboxEntryListItem = ({item, navigateToSession}) => {

    const sessionNumber = item.metadata.sessionNumber;

    const onPress = useCallback(() => {
        navigateToSession(sessionNumber);
    }, [sessionNumber, navigateToSession]);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <HeadshotChip image={{fileLocation: item.actor.image}} firstName={item.actor.firstName} lastName={item.actor.lastName} size={45}/>
            <View style={styles.textContentContainer}>
                <Text style={styles.text}>{item.displayText}</Text>
                <Text style={styles.date}>{item.displayDate}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center'
    },
    textContentContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        marginLeft: 10
    },
    text: {
        flex: 1,
        flexWrap: 'wrap',
        fontWeight: '500'
    },
    date: {
        marginTop: 5,
        color: '#878787',
        fontWeight: '500',
        fontSize: 12
    }
})

export default memo(InboxEntryListItem);
