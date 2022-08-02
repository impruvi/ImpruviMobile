import {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";

const RecordButton = ({isRecording, startRecording}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={startRecording}>
            {!isRecording && (
                <View style={styles.readyIcon} />
            )}
            {isRecording && (
                <View style={styles.recordingIcon} />
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 85,
        height: 85,
        borderColor: 'rgba(241, 42, 80, .5)',
        borderRadius: 90,
        borderWidth: 7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    readyIcon: {
        width: 60,
        height: 60,
        backgroundColor: 'rgba(241, 42, 80, 1)',
        borderRadius: 80
    },
    recordingIcon: {
        width: 30,
        height: 30,
        backgroundColor: 'rgba(241, 42, 80, 1)',
        borderRadius: 4
    }
})

export default memo(RecordButton);