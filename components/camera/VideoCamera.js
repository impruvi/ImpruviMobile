import {CameraType} from "expo-camera/build/Camera.types";
import {Camera} from "expo-camera";
import {StyleSheet, Text, View} from "react-native";
import {useCallback, useEffect, useRef, useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import VideoCameraOptions from "./options/VideoCameraOptions";
import {SafeAreaView} from 'react-native-safe-area-context';
import {UIImagePickerControllerQualityType} from "expo-image-picker/src/ImagePicker.types";

const VideoCamera = ({setVideo, initialCameraDirection = CameraType.back, initialCountdown = 3, maximumDurationInSeconds = 5 * 60}) => {

    const cameraRef = useRef();
    const [cameraDirection, setCameraDirection] = useState(initialCameraDirection);
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const pickVideo = useCallback(async () => {
        // No permissions request is necessary for launching the image library
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 0,
            videoQuality: UIImagePickerControllerQualityType.Low,
            videoMaxDuration: maximumDurationInSeconds
        });

        if (!result.cancelled) {
            setVideo({uri: result.uri});
        }
    }, [setVideo]);

    const startRecording = useCallback(async () => {
        const video = await cameraRef.current.recordAsync({
            // mute: true, // for whatever reason, allowing audio causes video recording to glitch: https://github.com/expo/expo/issues/8538
            maxDuration: maximumDurationInSeconds,
        });
        setVideo(video);
    }, [cameraRef, setVideo]);

    const stopRecording = useCallback(async () => {
        cameraRef.current.stopRecording();
    }, [cameraRef]);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Camera style={styles.camera} type={cameraDirection} ref={cameraRef}>
                <VideoCameraOptions initialCountdown={initialCountdown}
                                    startRecording={startRecording}
                                    stopRecording={stopRecording}
                                    cameraDirection={cameraDirection}
                                    setCameraDirection={setCameraDirection}
                                    pickVideo={pickVideo}/>
            </Camera>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    camera: {
        flex: 1,
        position: 'relative',
    }
});

export default VideoCamera;