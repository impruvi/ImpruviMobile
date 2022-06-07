import {
    ActivityIndicator,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View
} from "react-native";
import {memo, useEffect, useRef, useState} from "react";
import {DrillVideoAngles} from "../constants/drillVideoAngles";
import {Video} from "expo-av";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faInfoCircle} from "@fortawesome/pro-solid-svg-icons";
import Angles from "./Angles";
import {faAnglesDown, faPlus, faXmarkLarge} from "@fortawesome/pro-light-svg-icons";
import {doesDrillHaveSubmission} from "../util/drillUtil";
import {ScreenNames} from "../screens/ScreenNames";
import {useNavigation} from "@react-navigation/native";
import {Colors} from "../constants/colors";

const DemoVideos = ({session, drill, isVisible, isLast}) => {
    const [hasAutoShownInfo, setHasAutoShownInfo] = useState(false);
    const [isInfoShowing, setIsInfoShowing] = useState(false);
    const [selectedAngle, setSelectedAngle] = useState(DrillVideoAngles.Front);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const [frontStatus, setFrontStatus] = useState({});
    const [sideStatus, setSideStatus] = useState({});
    const [closeUpStatus, setCloseUpStatus] = useState({});

    const navigation = useNavigation();
    const {height} = useWindowDimensions();
    const frontRef = useRef();
    const sideRef = useRef();
    const closeUpRef = useRef();

    useEffect(() => {
        if (hasAutoShownInfo || !isVisible || !frontStatus.isLoaded || frontStatus.isBuffering) {
            return;
        }

        setIsInfoShowing(true);
        setHasAutoShownInfo(true);
    }, [isVisible, frontStatus]);

    const onChangePlaybackRate = () => {
        if (playbackRate === .5) {
            setPlaybackRate(1.0);
        } else if (playbackRate === 1.0) {
            setPlaybackRate(.5);
        }
    }

    const onInfoPress = () => {
        setIsInfoShowing(true);
    }

    const shouldShowActivityIndicator = () => {
        if (!isVisible) {
            return false;
        }

        if (selectedAngle === DrillVideoAngles.Front) {
            return !frontStatus.isLoaded || frontStatus.isBuffering;
        } else if (selectedAngle === DrillVideoAngles.Side) {
            return !sideStatus.isLoaded || sideStatus.isBuffering;
        } else {
            return !closeUpStatus.isLoaded || closeUpStatus.isBuffering;
        }
    }


    return (
        <View key={drill.drill.drillId} style={{height: height, position: 'relative'}}>
            <Video
                ref={frontRef}
                style={selectedAngle === DrillVideoAngles.Front ? {flex: 1} : {display: 'none'}}
                source={{
                    uri: drill.drill.videos.front.fileLocation,
                }}
                resizeMode="cover"
                rate={playbackRate}
                shouldPlay={isVisible && selectedAngle === DrillVideoAngles.Front}
                isLooping
                onPlaybackStatusUpdate={status => setFrontStatus(() => status)}
            />
            <Video
                ref={sideRef}
                style={selectedAngle === DrillVideoAngles.Side ? {flex: 1} : {display: 'none'}}
                source={{
                    uri: drill.drill.videos.side.fileLocation,
                }}
                resizeMode="cover"
                rate={playbackRate}
                shouldPlay={isVisible && selectedAngle === DrillVideoAngles.Side}
                isLooping
                onPlaybackStatusUpdate={status => setSideStatus(() => status)}
            />
            <Video
                ref={closeUpRef}
                style={selectedAngle === DrillVideoAngles.CloseUp ? {flex: 1} : {display: 'none'}}
                source={{
                    uri: drill.drill.videos.closeUp.fileLocation,
                }}
                resizeMode="cover"
                rate={playbackRate}
                shouldPlay={isVisible && selectedAngle === DrillVideoAngles.CloseUp}
                isLooping
                onPlaybackStatusUpdate={status => setCloseUpStatus(() => status)}
            />
            {shouldShowActivityIndicator() && (
                <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="small" color="white"/>
                </View>
            )}

            <View style={{position: 'absolute', bottom: 0, right: 0}}>
                <View style={{paddingBottom: 80, paddingRight: 15}}>
                    <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', marginBottom: 20}} onPress={onInfoPress}>
                        <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 3}}>
                            <FontAwesomeIcon icon={faInfoCircle} style={{color: 'rgba(255, 255, 255, .9)'}} size={30}/>
                        </View>
                        <Text style={{color: 'white', fontSize: 13, fontWeight: '500',
                            textShadowColor: 'rgba(0, 0, 0, .4)',
                            textShadowOffset: {width: 0, height: 0},
                            textShadowRadius: 2
                        }}>
                            Info
                        </Text>
                    </TouchableOpacity>
                    <Angles selectedAngle={selectedAngle} setSelectedAngle={setSelectedAngle}/>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isInfoShowing}
                onRequestClose={() => setIsInfoShowing(!isInfoShowing)}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{backgroundColor: 'white', borderRadius: 20, position: 'relative', width: '80%'}}>
                        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', position: 'relative', justifyContent: 'center', padding: 20}}>
                            <TouchableOpacity onPress={() => setIsInfoShowing(false)} style={{padding: 20, position: 'absolute', left: 0, top: 0}}>
                                <FontAwesomeIcon icon={faXmarkLarge} size={25}/>
                            </TouchableOpacity>
                            <Text style={{fontWeight: '600', fontSize: 18}}>{drill.drill.name}</Text>
                        </View>
                        <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
                            <View style={{marginBottom: 10}}>
                                <Text style={{fontWeight: '600'}}>Description</Text>
                                <Text>{drill.drill.description}</Text>
                            </View>
                            <View>
                                <Text style={{fontWeight: '600'}}>Tips</Text>
                                {drill.tips.map(tip => (
                                    <Text key={tip}>{tip}</Text>
                                ))}
                            </View>
                            <Image source={{uri: drill.drill.diagramFileLocation}} style={{width: '100%', height: 280, marginTop: 10, resizeMode: 'cover'}}/>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={{position: 'absolute', height: 100, width: '100%', top: 0, left: 0}}>
                <View style={{flex: 1, alignItems: 'center', marginTop: 50}}>
                    <TouchableOpacity style={{backgroundColor: 'rgba(255, 255, 255, .3)', flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20}} onPress={onChangePlaybackRate}>
                        <Text style={styles.submitButtonText}>Playback rate: {playbackRate}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{position: 'absolute', width: '100%', bottom: 0, left: 0}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 40}}>
                    {!doesDrillHaveSubmission(drill) && (
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => navigation.navigate(ScreenNames.PlayerDrillSubmission, {
                                sessionNumber: session.sessionNumber,
                                drillId: drill.drill.drillId
                            })}>
                            <FontAwesomeIcon icon={faPlus} style={styles.submitButtonIcon}/>
                            <Text style={styles.submitButtonText}>Submit your video</Text>
                        </TouchableOpacity>
                    )}
                    {doesDrillHaveSubmission(drill) && (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            {!isLast && (
                                <FontAwesomeIcon icon={faAnglesDown} style={{color: 'white'}} size={30}/>
                            )}
                            <Text style={{color: 'white', marginVertical: 5, fontWeight: '500', fontSize: 16}}>Your video is submitted</Text>
                        </View>
                    )}
                </View>
            </View>
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

export default memo(DemoVideos);