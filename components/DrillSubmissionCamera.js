import {useNavigation} from "@react-navigation/native";
import {CameraType} from "expo-camera/build/Camera.types";
import {Camera} from "expo-camera";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faRotate, faStopwatch, faXmarkLarge} from "@fortawesome/pro-light-svg-icons";
import {Colors} from "../constants/colors";
import VideoCounter from "./VideoCounter";
import Countdown from "./Countdown";
import {useEffect, useRef, useState} from "react";


const CameraStates = {
    Neutral: 'Neutral',
    CountDown: 'CountDown',
    Recording: 'Recording',
}

const DrillSubmissionCamera = ({setVideo}) => {
    const cameraRef = useRef();
    const navigation = useNavigation();
    const [cameraDirection, setCameraDirection] = useState(CameraType.back);
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraState, setCameraState] = useState(CameraStates.Neutral);
    const [countDown, setCountDown] = useState(3);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

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
        setCameraState(CameraStates.Neutral);
        cameraRef.current.stopRecording();
    }

    const onClickRecord = async () => {
        if (cameraState === CameraStates.Neutral) {
            if (countDown > 0) {
                setCameraState(CameraStates.CountDown);
            } else {
                await startRecording();
            }
        } else if (cameraState === CameraStates.CountDown) {
            setCameraState(CameraStates.Neutral);
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
        <Camera style={styles.camera} type={cameraDirection} ref={cameraRef}>
            <SafeAreaView style={{flex: 1}}>
                <View style={{flex: 1, position: 'relative'}}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: 20}}>
                        <FontAwesomeIcon icon={faXmarkLarge} style={{color: 'white'}} size={25}/>
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
                    <View style={styles.buttonContainer}>
                        {cameraState === CameraStates.Neutral && (
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    setCameraDirection(cameraDirection === CameraType.back ? CameraType.front : CameraType.back);
                                }}>
                                <FontAwesomeIcon icon={faRotate} style={{color: 'white'}} size={30}/>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity style={{width: 85, height: 85, borderColor: 'rgba(241, 42, 80, .5)', borderRadius: 90, borderWidth: 7, alignItems: 'center', justifyContent: 'center'}} onPress={onClickRecord}>
                            {cameraState === CameraStates.Neutral && (
                                <View style={{width: 60, height: 60, backgroundColor: 'rgba(241, 42, 80, 1)', borderRadius: 80}} />
                            )}
                            {cameraState !== CameraStates.Neutral && (
                                <View style={{width: 30, height: 30, backgroundColor: 'rgba(241, 42, 80, 1)', borderRadius: 4}} />
                            )}
                        </TouchableOpacity>
                        {cameraState === CameraStates.Neutral && (
                            <TouchableOpacity
                                style={styles.button}
                                onPress={onClickTimer}>
                                <FontAwesomeIcon icon={faStopwatch} style={{color: 'white'}} size={30}/>
                                <Text style={{fontWeight: '600', color: 'white'}}>{countDown}s</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </SafeAreaView>
        </Camera>
    )
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
        position: 'relative',
    },
    buttonContainer: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 40
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});

export default DrillSubmissionCamera;