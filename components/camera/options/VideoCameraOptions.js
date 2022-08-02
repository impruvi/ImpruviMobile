import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faPhotoFilm, faRotate, faStopwatch, faXmarkLarge} from "@fortawesome/pro-light-svg-icons";
import Countdown from "../Countdown";
import {CameraType} from "expo-camera/build/Camera.types";
import {useNavigation} from "@react-navigation/native";
import {CameraStates} from "../cameraStates";
import {useCallback, useState} from "react";
import VideoCounter from "../VideoCounter";
import RecordButton from "./RecordButton";

const VideoCameraOptions = ({startRecording, stopRecording, cameraDirection, setCameraDirection, pickVideo, initialCountdown}) => {

    const [countDown, setCountDown] = useState(initialCountdown);
    const [cameraState, setCameraState] = useState(CameraStates.Ready);

    const navigation = useNavigation();

    const onClickTimer = useCallback(() => {
        if (countDown === 3) {
            setCountDown(10);
        } else if (countDown === 10) {
            setCountDown(0);
        } else {
            setCountDown(3);
        }
    }, [countDown, setCountDown]);

    const startRecord = useCallback(() => {
        setCameraState(CameraStates.Recording);
        startRecording();
    }, []);

    const stopRecord = useCallback(() => {
        setCameraState(CameraStates.Ready);
        stopRecording();
    }, []);

    const onClickRecord = useCallback(() => {
        if (cameraState === CameraStates.Ready) {
            if (countDown > 0) {
                setCameraState(CameraStates.CountDown);
            } else {
                startRecord();
            }
        } else if (cameraState === CameraStates.CountDown) {
            setCameraState(CameraStates.Ready);
        } else {
            stopRecord();
        }
    }, [cameraState, setCameraState, startRecord, stopRecord]);

    const switchCameraDirection = useCallback(() => {
        if (cameraDirection === CameraType.back) {
            setCameraDirection(CameraType.front);
        } else {
            setCameraDirection(CameraType.back);
        }
    }, [cameraDirection])

    return (
        <View style={styles.container}>
            {cameraState === CameraStates.Ready && (
                <TouchableOpacity onPress={navigation.goBack} style={styles.closeButtonContainer}>
                    <View style={styles.iconContainer}>
                        <FontAwesomeIcon icon={faXmarkLarge} style={styles.icon} size={23}/>
                    </View>
                </TouchableOpacity>
            )}
            {cameraState === CameraStates.Recording && (
                <View style={styles.recordingCounterContainer}>
                    <View style={styles.recordingCounterContainerInner}>
                        <VideoCounter style={styles.recordingCounter} onTimeout={stopRecord}/>
                    </View>
                </View>
            )}
            {cameraState === CameraStates.CountDown && (
                <View style={styles.countdownContainer}>
                    <Countdown start={countDown} style={styles.countdown} onCompletion={startRecord}/>
                </View>
            )}
            {cameraState === CameraStates.Ready && (
                <View style={styles.buttonSideContainer}>
                    <TouchableOpacity style={styles.buttonSide} onPress={onClickTimer}>
                        <View style={styles.iconContainer}>
                            <FontAwesomeIcon icon={faStopwatch} style={styles.timerIcon} size={25}/>
                            <View style={styles.timerIconTextContainer}>
                                <Text style={styles.timerIconText}>{countDown}<Text style={styles.timerIconTextSmall}>s</Text></Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonSide} onPress={switchCameraDirection}>
                        <View style={styles.iconContainer}>
                            <FontAwesomeIcon icon={faRotate} style={styles.icon} size={25}/>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
            <View style={styles.buttonBottomContainer}>
                <RecordButton isRecording={cameraState !== CameraStates.Ready}
                              startRecording={onClickRecord}/>
                {cameraState === CameraStates.Ready && (
                    <TouchableOpacity
                        style={styles.buttonBottom}
                        onPress={pickVideo}>
                        <View style={styles.iconContainer}>
                            <FontAwesomeIcon icon={faPhotoFilm} style={styles.icon} size={25}/>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
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
    iconContainer: {
        backgroundColor: 'rgba(0,0,0,.3)',
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        color: 'white'
    },
    timerIcon: {
        color: 'white',
        marginBottom: 4,
        marginRight: 4
    },
    timerIconTextContainer: {
        position: 'absolute',
        bottom: 10,
        left: 23,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 4,
        paddingVertical: 1
    },
    timerIconText: {
        fontWeight: '700',
        fontSize: 10,
        letterSpacing: -.7
    },
    timerIconTextSmall: {
        fontSize: 8
    },
    closeButtonContainer: {
        padding: 20
    },
    recordingCounterContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        alignItems: 'center',
        paddingTop: 10
    },
    recordingCounterContainerInner: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: 'rgba(241, 42, 80, 1)',
        borderRadius: 10
    },
    recordingCounter: {
        color: 'white',
        fontSize: 25
    },
    countdownContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    countdown: {
        fontSize: 150,
        fontWeight: '700',
        color: 'white'
    }
});

export default VideoCameraOptions;