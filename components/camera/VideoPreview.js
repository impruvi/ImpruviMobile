import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Video} from "expo-av";
import {Colors} from "../../constants/colors";
import {SafeAreaView} from 'react-native-safe-area-context';

const safeAreaEdges = ['bottom', 'left', 'right', 'top'];

const VideoPreview = ({video, onCancel, onSubmit, isSubmitting}) => {

    return (
        <View style={styles.container}>
            <SafeAreaView edges={safeAreaEdges} style={styles.safeAreaView}>
                <View style={styles.content}>
                    <Video
                        style={styles.video}
                        source={video}
                        resizeMode="cover"
                        shouldPlay={true}
                        isLooping/>

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.buttonSecondary} onPress={onCancel}>
                            <Text style={styles.buttonSecondaryText}>Retake</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonPrimary} onPress={onSubmit}>
                            <Text style={styles.buttonPrimaryText}>Select</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

            {isSubmitting && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="white"/>
                    <Text style={styles.loadingText}>Submitting...</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    safeAreaView: {
        flex: 1
    },
    content: {
        flex: 1,
        position: 'relative'
    },
    video: {
        flex: 1
    },
    buttonsContainer: {
        width: '100%',
        alignItems: 'flex-end',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonSecondary: {
        width: '49%',
        backgroundColor: 'white',
        paddingVertical: 12,
        borderRadius: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonPrimary: {
        width: '49%',
        backgroundColor: Colors.Primary,
        paddingVertical: 12,
        borderRadius: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonSecondaryText: {
        fontWeight: '600'
    },
    buttonPrimaryText: {
        color: 'white',
        fontWeight: '600'
    },
    loadingContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, .4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
        marginTop: 10
    }
});


export default VideoPreview;