import {FlatList, Text, TouchableOpacity, useWindowDimensions, View, StyleSheet, SafeAreaView} from "react-native";
import {Video} from "expo-av";
import {useEffect, useRef, useState} from "react";
import {DrillVideoAngles} from "../constants/drillVideoAngles";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faVideo, faPlus} from '@fortawesome/pro-light-svg-icons';
import {LinearGradient} from "expo-linear-gradient";
import {Colors} from "../constants/colors";
import {useNavigation} from "@react-navigation/native";
import VideoBackIcon from "../components/VideoBackIcon";
import {faCheck, faCheckCircle} from "@fortawesome/pro-solid-svg-icons";
import {doesDrillHaveSubmission} from "../util/drillUtil";
import SessionProgress from "../components/SessionProgress";
import Angles from "../components/Angles";
import {Camera} from "expo-camera";
import {CameraType} from "expo-camera/build/Camera.types";
import SubmitCamera from "../components/SubmitCamera";


const DrillVideos = ({drill, selectedAngle, isVisible, playbackRate}) => {
    const {height} = useWindowDimensions();
    const frontRef = useRef();
    const sideRef = useRef();
    const closeUpRef = useRef();

    useEffect(() => {
        if (!isVisible) {
            frontRef.current.pauseAsync();
            sideRef.current.pauseAsync();
            closeUpRef.current.pauseAsync();
        } else {
            if (selectedAngle === DrillVideoAngles.Front) {
                frontRef.current.playAsync();
                sideRef.current.pauseAsync();
                closeUpRef.current.pauseAsync();
            } else if (selectedAngle === DrillVideoAngles.Side) {
                sideRef.current.playAsync();
                frontRef.current.pauseAsync();
                closeUpRef.current.pauseAsync();
            } else {
                closeUpRef.current.playAsync();
                frontRef.current.pauseAsync();
                sideRef.current.pauseAsync();
            }
        }
    }, [isVisible, selectedAngle]);

    return (
        <View key={drill.drillId} style={{height: height, position: 'relative'}}>
            <Video
                ref={frontRef}
                style={selectedAngle === DrillVideoAngles.Front ? {flex: 1} : {display: 'none'}}
                source={{
                    uri: drill.videos.front.fileLocation,
                }}
                resizeMode="cover"
                rate={playbackRate}
                isLooping/>
            <Video
                ref={sideRef}
                style={selectedAngle === DrillVideoAngles.Side ? {flex: 1} : {display: 'none'}}
                source={{
                    uri: drill.videos.side.fileLocation,
                }}
                resizeMode="cover"
                rate={playbackRate}
                isLooping/>
            <Video
                ref={closeUpRef}
                style={selectedAngle === DrillVideoAngles.CloseUp ? {flex: 1} : {display: 'none'}}
                source={{
                    uri: drill.videos.closeUp.fileLocation,
                }}
                resizeMode="cover"
                rate={playbackRate}
                isLooping/>
        </View>
    )
}

const SessionScreen = ({route}) => {
    const {height} = useWindowDimensions();

    const [selectedAngle, setSelectedAngle] = useState(DrillVideoAngles.Front);
    const [currentDrillId, setCurrentDrillId] = useState();
    const [playbackRate, setPlaybackRate] = useState(1.0);

    const [isCameraShowing, setIsCameraShowing] = useState(false);

    const navigation = useNavigation();
    const {session} = route.params;

    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentDrillId(viewableItems[0].item.drill.drillId);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;


    const onChangePlaybackRate = () => {
        if (playbackRate === .5) {
            setPlaybackRate(1.0);
        } else if (playbackRate === 1.0) {
            setPlaybackRate(.5);
        }
    }

    return (
        <View style={{flex: 1}}>
            <FlatList
                pagingEnabled
                data={session.drills}
                onViewableItemsChanged={viewableItemsChanged}
                bounces={false}
                viewabilityConfig={viewConfig}
                keyExtractor={(item) => item.drill.drillId}
                renderItem={({item}) => <DrillVideos
                    drill={item.drill}
                    selectedAngle={selectedAngle}
                    isVisible={currentDrillId === item.drill.drillId}
                    playbackRate={playbackRate}/>}
            />

            <Angles selectedAngle={selectedAngle} setSelectedAngle={setSelectedAngle}/>
            <SessionProgress session={session} currentDrillId={currentDrillId}/>

            <View style={{position: 'absolute', height: 100, width: '100%', bottom: 0, left: 0}}>
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,.4)']}
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 1}}
                    style={{flex: 1, width: '100%'}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity style={styles.submitButton}>
                            <FontAwesomeIcon icon={faPlus} style={styles.submitButtonIcon}/>
                            <Text style={styles.submitButtonText}>Submit your video</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>

            <View style={{position: 'absolute', height: 100, width: '100%', top: 0, left: 0}}>
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,.4)']}
                    start={{x: 0, y: 1}}
                    end={{x: 0, y: 0}}
                    style={{flex: 1, width: '100%'}}>
                    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
                        <TouchableOpacity style={{backgroundColor: 'rgba(255, 255, 255, .3)', flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20}} onPress={onChangePlaybackRate}>
                            <Text style={styles.submitButtonText}>Playback rate: {playbackRate}</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </LinearGradient>
            </View>

            <VideoBackIcon onPress={() => navigation.goBack()}/>

            {isCameraShowing && (
                <View style={{position: 'absolute', top: 0, left: 0, width: '100%', height: height, backgroundColor: 'red'}}>
                    <SubmitCamera />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({

    submitButton: {
        paddingVertical: 10,
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
        color: 'white'
    }
});

export default SessionScreen;
