import {StyleSheet} from "react-native";

export const commonStyles = StyleSheet.create({
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'stretch'
    },
    half: {
        width: '49%',
        height: '100%'
    },
    box: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        marginBottom: 5,
        borderRadius: 15,
        padding: 20,
        shadowColor: '#E2E5E6',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2
    }
});
