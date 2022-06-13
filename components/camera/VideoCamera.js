import {useNavigation} from "@react-navigation/native";
import {CameraType} from "expo-camera/build/Camera.types";
import {Camera} from "expo-camera";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faPhotoFilm, faRotate, faStopwatch, faXmarkLarge} from "@fortawesome/pro-light-svg-icons";
import VideoCounter from "./VideoCounter";
import Countdown from "../Countdown";
import {useEffect, useRef, useState} from "react";
import * as ImagePicker from 'expo-image-picker';


const CameraStates = {
    Ready: 'Ready',
    CountDown: 'CountDown',
    Recording: 'Recording',
}

const VideoCamera = ({setVideo, initialCameraDirection = CameraType.back, initialCountdown = 3}) => {
    const cameraRef = useRef();
    const navigation = useNavigation();
    const [cameraDirection, setCameraDirection] = useState(initialCameraDirection);
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraState, setCameraState] = useState(CameraStates.Ready);
    const [countDown, setCountDown] = useState(initialCountdown);
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setVideo({uri: result.uri});
        }
    };

    const onClickTimer = () => {
        if (countDown === 3) {
            setCountDown(10);
        } else if (countDown === 10) {
            setCountDown(0);
        } else {
            setCountDown(3);
        }
    }

    const startRecording = async () => {
        setCameraState(CameraStates.Recording);
        let video = await cameraRef.current.recordAsync();
        setVideo(video);
    }

    const stopRecording = async () => {
        setCameraState(CameraStates.Ready);
        cameraRef.current.stopRecording();
    }

    const onClickRecord = async () => {
        if (cameraState === CameraStates.Ready) {
            if (countDown > 0) {
                setCameraState(CameraStates.CountDown);
            } else {
                await startRecording();
            }
        } else if (cameraState === CameraStates.CountDown) {
            setCameraState(CameraStates.Ready);
        } else {
            await stopRecording();
        }
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
            <Camera style={styles.camera} type={cameraDirection} ref={cameraRef}>
                <View style={{flex: 1, position: 'relative'}}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: 20}}>
                        <View style={styles.icon}>
                            <FontAwesomeIcon icon={faXmarkLarge} style={{color: 'white'}} size={23}/>
                        </View>
                    </TouchableOpacity>
                    {cameraState === CameraStates.Recording && (
                        <View style={{position: 'absolute', top: 0, left: 0, width: '100%', alignItems: 'center', paddingTop: 10}}>
                            <View style={{paddingVertical: 5, paddingHorizontal: 15, backgroundColor: 'rgba(241, 42, 80, 1)', borderRadius: 10}}>
                                <VideoCounter style={{color: 'white', fontSize: 25}} />
                            </View>
                        </View>
                    )}
                    {cameraState === CameraStates.CountDown && (
                        <View style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <Countdown
                                start={countDown}
                                style={{fontSize: 150, fontWeight: '700', color: 'white'}}
                                onCompletion={startRecording}/>
                        </View>
                    )}
                    <View style={styles.buttonSideContainer}>
                        {cameraState === CameraStates.Ready && (
                            <TouchableOpacity
                                style={styles.buttonSide}
                                onPress={onClickTimer}>
                                <View style={styles.icon}>
                                    <FontAwesomeIcon icon={faStopwatch} style={{color: 'white', marginBottom: 4, marginRight: 4}} size={25}/>
                                    <View style={{position: 'absolute', bottom: 10, left: 23, backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 4, paddingVertical: 1}}>
                                        <Text style={{fontWeight: '700', fontSize: 10, letterSpacing: -.7}}>{countDown}<Text style={{fontSize: 8}}>s</Text></Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        {cameraState === CameraStates.Ready && (
                            <TouchableOpacity
                                style={styles.buttonSide}
                                onPress={() => {
                                    setCameraDirection(cameraDirection === CameraType.back ? CameraType.front : CameraType.back);
                                }}>
                                <View style={styles.icon}>
                                    <FontAwesomeIcon icon={faRotate} style={{color: 'white'}} size={25}/>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.buttonBottomContainer}>
                        <TouchableOpacity style={{width: 85, height: 85, borderColor: 'rgba(241, 42, 80, .5)', borderRadius: 90, borderWidth: 7, alignItems: 'center', justifyContent: 'center'}} onPress={onClickRecord}>
                            {cameraState === CameraStates.Ready && (
                                <View style={{width: 60, height: 60, backgroundColor: 'rgba(241, 42, 80, 1)', borderRadius: 80}} />
                            )}
                            {cameraState !== CameraStates.Ready && (
                                <View style={{width: 30, height: 30, backgroundColor: 'rgba(241, 42, 80, 1)', borderRadius: 4}} />
                            )}
                        </TouchableOpacity>
                        {cameraState === CameraStates.Ready && (
                            <TouchableOpacity
                                style={styles.buttonBottom}
                                onPress={pickImage}>
                                <View style={styles.icon}>
                                    <FontAwesomeIcon icon={faPhotoFilm} style={{color: 'white'}} size={25}/>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </Camera>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
        position: 'relative',
    },
    buttonBottomContainer: {
        position: 'absolute',
        left: 0,
        bottom: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonSideContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        height: '100%',
        paddingVertical: 15,
        alignItems: 'center'
    },
    buttonBottom: {
        position: 'absolute',
        right: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
    },
    buttonSide: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    icon: {
        backgroundColor: 'rgba(0,0,0,.3)',
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default VideoCamera;