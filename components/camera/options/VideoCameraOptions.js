import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faPhotoFilm, faRotate, faStopwatch, faXmarkLarge} from "@fortawesome/pro-light-svg-icons";
import Countdown from "../Countdown";
import {CameraType} from "expo-camera/build/Camera.types";
import {useNavigation} from "@react-navigation/native";
import {CameraStates} from "../cameraStates";
import {useCallback, useState} from "react";
import VideoCounter from "../VideoCounter";

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

    const startRecord = () => {
        setCameraState(CameraStates.Recording);
        startRecording();
    }

    const stopRecord = () => {
        setCameraState(CameraStates.Ready);
        stopRecording();
    }

    const onClickRecord = useCallback(async () => {
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

    return (
        <View style={{flex: 1, position: 'relative'}}>
            {cameraState === CameraStates.Ready && (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: 20}}>
                    <View style={styles.icon}>
                        <FontAwesomeIcon icon={faXmarkLarge} style={{color: 'white'}} size={23}/>
                    </View>
                </TouchableOpacity>
            )}
            {cameraState === CameraStates.Recording && (
                <View style={{position: 'absolute', top: 0, left: 0, width: '100%', alignItems: 'center', paddingTop: 10}}>
                    <View style={{paddingVertical: 5, paddingHorizontal: 15, backgroundColor: 'rgba(241, 42, 80, 1)', borderRadius: 10}}>
                        <VideoCounter style={{color: 'white', fontSize: 25}} onTimeout={stopRecord}/>
                    </View>
                </View>
            )}
            {cameraState === CameraStates.CountDown && (
                <View style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Countdown
                        start={countDown}
                        style={{fontSize: 150, fontWeight: '700', color: 'white'}}
                        onCompletion={startRecord}/>
                </View>
            )}
            {cameraState === CameraStates.Ready && (
                <View style={styles.buttonSideContainer}>
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
                    <TouchableOpacity
                        style={styles.buttonSide}
                        onPress={() => {
                            setCameraDirection(cameraDirection === CameraType.back ? CameraType.front : CameraType.back);
                        }}>
                        <View style={styles.icon}>
                            <FontAwesomeIcon icon={faRotate} style={{color: 'white'}} size={25}/>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
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
                        onPress={pickVideo}>
                        <View style={styles.icon}>
                            <FontAwesomeIcon icon={faPhotoFilm} style={{color: 'white'}} size={25}/>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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

export default VideoCameraOptions;