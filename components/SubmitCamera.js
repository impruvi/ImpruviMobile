import {Camera} from "expo-camera";
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {CameraType} from "expo-camera/build/Camera.types";
import {useState} from "react";

const SubmitCamera = () => {
    const [type, setType] = useState(CameraType.back);

    return (
        <Camera style={styles.camera} type={type}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setType(type === CameraType.back ? CameraType.front : CameraType.back);
                    }}>
                    <Text style={styles.text}> Flip </Text>
                </TouchableOpacity>
            </View>
        </Camera>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});

export default SubmitCamera;
