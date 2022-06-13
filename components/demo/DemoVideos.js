import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useRef, useState} from "react";
import {DrillVideoAngle} from "../../constants/drillVideoAngle";
import {Video} from "expo-av";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faForwardStep, faInfoCircle, faVideo} from "@fortawesome/pro-solid-svg-icons";
import {faAnglesDown, faPlus} from "@fortawesome/pro-light-svg-icons";
import {doesDrillHaveSubmission} from "../../util/drillUtil";
import {useNavigation} from "@react-navigation/native";
import {Colors} from "../../constants/colors";
import SideOption from "./SideOption";
import {LinearGradient} from "expo-linear-gradient";
import {PlayerScreenNames} from '../../screens/ScreenNames';


const DemoVideos = ({session, drill, isVisible, isLast, shouldShowSubmissionOptions, openInfo}) => {

    const [selectedAngle, setSelectedAngle] = useState(DrillVideoAngle.Front);
    const [playbackRate, setPlaybackRate] = useState(1.0);

    const [frontStatus, setFrontStatus] = useState({});
    const [sideStatus, setSideStatus] = useState({});
    const [closeStatus, setCloseStatus] = useState({});

    const navigation = useNavigation();
    const frontRef = useRef();
    const sideRef = useRef();
    const closeRef = useRef();

    const onChangePlaybackRate = () => {
        if (playbackRate === .5) {
            setPlaybackRate(1.0);
        } else if (playbackRate === 1.0) {
            setPlaybackRate(.5);
        }
    }

    const shouldShowActivityIndicator = () => {
        if (!isVisible) {
            return false;
        }

        if (selectedAngle === DrillVideoAngle.Front) {
            return !frontStatus.isLoaded || frontStatus.isBuffering;
        } else if (selectedAngle === DrillVideoAngle.Side) {
            return !sideStatus.isLoaded || sideStatus.isBuffering;
        } else {
            return !closeStatus.isLoaded || closeStatus.isBuffering;
        }
    }

    return (
        <View key={drill.drillId} style={{flex: 1, position: 'relative'}}>
            {((isVisible && selectedAngle === DrillVideoAngle.Front) || frontStatus.isLoaded) && (
                <Video
                    ref={frontRef}
                    style={selectedAngle === DrillVideoAngle.Front ? {flex: 1} : {display: 'none'}}
                    source={{
                        uri: drill.demos.front.fileLocation,
                    }}
                    resizeMode="cover"
                    rate={playbackRate}
                    shouldPlay={isVisible && selectedAngle === DrillVideoAngle.Front}
                    isLooping
                    isMuted
                    onPlaybackStatusUpdate={status => setFrontStatus(() => status)}
                />
            )}
            {((isVisible && selectedAngle === DrillVideoAngle.Side) || sideStatus.isLoaded) && (
                <Video
                    ref={sideRef}
                    style={selectedAngle === DrillVideoAngle.Side ? {flex: 1} : {display: 'none'}}
                    source={{
                        uri: drill.demos.side.fileLocation,
                    }}
                    resizeMode="cover"
                    rate={playbackRate}
                    shouldPlay={isVisible && selectedAngle === DrillVideoAngle.Side}
                    isLooping
                    isMuted
                    onPlaybackStatusUpdate={status => setSideStatus(() => status)}
                />
            )}
            {((isVisible && selectedAngle === DrillVideoAngle.Close) || closeStatus.isLoaded) && (
                <Video
                    ref={closeRef}
                    style={selectedAngle === DrillVideoAngle.Close ? {flex: 1} : {display: 'none'}}
                    source={{
                        uri: drill.demos.close.fileLocation,
                    }}
                    resizeMode="cover"
                    rate={playbackRate}
                    shouldPlay={isVisible && selectedAngle === DrillVideoAngle.Close}
                    isLooping
                    isMuted
                    onPlaybackStatusUpdate={status => setCloseStatus(() => status)}
                />
            )}
            {shouldShowActivityIndicator() && (
                <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="small" color="white"/>
                </View>
            )}

            <LinearGradient
                colors={['rgba(0, 0, 0, .4)', 'transparent']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={{width: '100%', height: 175, position: 'absolute', bottom: 0, left: 0}} />

            <LinearGradient
                colors={['rgba(0, 0, 0, .3)', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{width: '100%', height: 175, position: 'absolute', top: 0, left: 0}} />

            <LinearGradient
                colors={['rgba(0, 0, 0, .3)', 'transparent']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={{width: 175, height: '100%', position: 'absolute', top: 0, right: 0}} />

            <LinearGradient
                colors={['rgba(0, 0, 0, .3)', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{width: 175, height: '100%', position: 'absolute', top: 0, left: 0}} />

            <View style={{position: 'absolute', bottom: 0, right: 0}}>
                <View style={{paddingBottom: 80, paddingRight: 10}}>
                    <SideOption icon={faInfoCircle}
                                text={'Info'}
                                onPress={openInfo}/>
                    <SideOption icon={faForwardStep}
                                text={playbackRate !== 1 ? `.${playbackRate.toString().split('.')[1]}x` : `${playbackRate}x`}
                                onPress={onChangePlaybackRate}/>
                    <SideOption icon={faVideo}
                                text={'Front'}
                                color={DrillVideoAngle.Front === selectedAngle ? Colors.Primary : 'white'}
                                onPress={() => setSelectedAngle(DrillVideoAngle.Front)}/>
                    <SideOption icon={faVideo}
                                text={'Side'}
                                color={DrillVideoAngle.Side === selectedAngle ? Colors.Primary : 'white'}
                                onPress={() => setSelectedAngle(DrillVideoAngle.Side)}/>
                    <SideOption icon={faVideo}
                                text={'Close'}
                                color={DrillVideoAngle.Close === selectedAngle ? Colors.Primary : 'white'}
                                onPress={() => setSelectedAngle(DrillVideoAngle.Close)}/>
                </View>
            </View>

            {shouldShowSubmissionOptions && (
                <View style={{position: 'absolute', width: '100%', bottom: 0, left: 0}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 40}}>
                        {!doesDrillHaveSubmission(drill) && (
                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={() => navigation.navigate(PlayerScreenNames.DrillSubmission, {
                                    sessionNumber: session.sessionNumber,
                                    drillId: drill.drillId
                                })}>
                                <FontAwesomeIcon icon={faPlus} style={styles.submitButtonIcon}/>
                                <Text style={styles.submitButtonText}>Submit your video</Text>
                            </TouchableOpacity>
                        )}
                        {doesDrillHaveSubmission(drill) && (
                            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                {!isLast && (
                                    <>
                                        <Text style={{color: 'white', marginVertical: 5, fontWeight: '500', fontSize: 16}}>Next drill</Text>
                                        <FontAwesomeIcon icon={faAnglesDown} style={{color: 'white'}} size={30}/>
                                    </>
                                )}
                            </View>
                        )}
                    </View>
                </View>
            )}

            {/*<InfoSheet isOpen={isInfoShowing} onClose={() => setIsInfoShowing(false)} drill={drill}/>*/}

        </View>
    )
}

const styles = StyleSheet.create({
    submitButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: Colors.Primary,
        borderRadius: 40,
        flexDirection: 'row'
    },
    submitButtonIcon: {
        color: 'white',
        marginRight: 10
    },
    submitButtonText: {
        color: 'white',
        fontSize: 15
    }
});

export default DemoVideos;