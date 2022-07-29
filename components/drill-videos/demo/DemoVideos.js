import {ActivityIndicator, Alert, Image, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {DrillVideoAngle} from "../../../constants/drillVideoAngle";
import {doesDrillHaveSubmission} from "../../../util/drillUtil";
import {useNavigation} from "@react-navigation/native";
import SideOption from "./SideOption";
import {LinearGradient} from "expo-linear-gradient";
import {PlayerScreenNames} from '../../../screens/ScreenNames';
import InfoSheet from './InfoSheet';
import SubmitButton from "../SubmitButton";
import useAuth from "../../../hooks/useAuth";
import {UserType} from "../../../constants/userType";
import SlowIconWhite from '../../../assets/icons/PlayWhite.png';
import VideoIconWhite from '../../../assets/icons/VideoWhite.png';
import VideoIconRed from '../../../assets/icons/VideoRed.png';
import HelpIconWhite from '../../../assets/icons/HelpWhite.png';
import SwipeIconYellow from '../../../assets/icons/SwipeYellow.png';
import HelpPopup from "./help/HelpPopup";
import {isLastDrillInSession} from "../../../util/sessionUtil";
import Footer from "../Footer";
import CachedVideo from "../../CachedVideo";


const DemoVideos = ({isDrillFocused, isTabSelected, drill, session, canSubmit, isSubmitting}) => {

    const [isHelpPopupOpen, setIsHelpPopupOpen] = useState(false);

    const [selectedAngle, setSelectedAngle] = useState(DrillVideoAngle.Front);
    const [playbackRate, setPlaybackRate] = useState(1.0);

    const [frontStatus, setFrontStatus] = useState({});
    const [sideStatus, setSideStatus] = useState({});
    const [closeStatus, setCloseStatus] = useState({});
    const [isInfoShowing, setIsInfoShowing] = useState(false);

    const navigation = useNavigation();
    const {userType} = useAuth();

    const onChangePlaybackRate = () => {
        if (playbackRate === .5) {
            setPlaybackRate(1.0);
        } else if (playbackRate === 1.0) {
            setPlaybackRate(.5);
        }
    }

    const shouldShowSubmitButton = () => {
        return !!session
            && !isSubmitting
            && userType === UserType.Player
            && !doesDrillHaveSubmission(drill);
    }

    const shouldShowSubmittedButton = () => {
        return !!session
            && userType === UserType.Player
            && doesDrillHaveSubmission(drill);
    }

    const shouldShowSubmittingButton = () => {
        return isSubmitting;
    }

    const shouldShowActivityIndicator = () => {
        if (!isDrillFocused || !isTabSelected) {
            return false;
        }

        if (selectedAngle === DrillVideoAngle.Front) {
            return !frontStatus.isLoaded || frontStatus.isBuffering;
        } else if (selectedAngle === DrillVideoAngle.Side) {
            return !sideStatus.isLoaded || sideStatus.isBuffering;
        } else {
            return !closeStatus.isLoaded || closeStatus.isBuffering;
        }
    };

    const onSubmitButtonPress = () => {
        if (canSubmit) {
            navigation.navigate(PlayerScreenNames.DrillSubmission, {
                sessionNumber: session.sessionNumber,
                drillId: drill.drillId
            });
        } else {
            Alert.alert('Please complete your previous sessions',
                'Submit videos and receive feedback for all of the training sessions preceding this session.', [
                {
                    text: 'Ok',
                },
            ]);
        }
    }

    return (
        <View key={drill.drillId} style={isTabSelected ? {flex: 1, position: 'relative'} : {display: 'none'}}>
            <CachedVideo
                style={selectedAngle === DrillVideoAngle.Front ? {flex: 1} : {display: 'none'}}
                videoSourceUri={(isTabSelected && isDrillFocused && selectedAngle === DrillVideoAngle.Front) || frontStatus.isLoaded
                    ? drill.demos?.front?.fileLocation
                    : null}
                posterSourceUri={drill.demos?.frontThumbnail?.fileLocation}
                resizeMode="cover"
                playbackRate={playbackRate}
                shouldPlay={isTabSelected && isDrillFocused && selectedAngle === DrillVideoAngle.Front}
                isLooping
                onPlaybackStatusUpdate={status => setFrontStatus(() => status)}
            />
            <CachedVideo
                style={selectedAngle === DrillVideoAngle.Side ? {flex: 1} : {display: 'none'}}
                videoSourceUri={(isTabSelected && isDrillFocused && selectedAngle === DrillVideoAngle.Side) || sideStatus.isLoaded
                    ? drill.demos?.side?.fileLocation
                    : null}
                posterSourceUri={drill.demos?.sideThumbnail?.fileLocation}
                resizeMode="cover"
                playbackRate={playbackRate}
                shouldPlay={isTabSelected && isDrillFocused && selectedAngle === DrillVideoAngle.Side}
                isLooping
                onPlaybackStatusUpdate={status => setSideStatus(() => status)}
            />
            <CachedVideo
                style={selectedAngle === DrillVideoAngle.Close ? {flex: 1} : {display: 'none'}}
                videoSourceUri={(isTabSelected && isDrillFocused && selectedAngle === DrillVideoAngle.Close) || closeStatus.isLoaded
                    ? drill.demos?.close?.fileLocation
                    : null}
                posterSourceUri={drill.demos?.closeThumbnail?.fileLocation}
                resizeMode="cover"
                playbackRate={playbackRate}
                shouldPlay={isTabSelected && isDrillFocused && selectedAngle === DrillVideoAngle.Close}
                isLooping
                onPlaybackStatusUpdate={status => setCloseStatus(() => status)}
            />

            {shouldShowActivityIndicator() && (
                <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="small" color="white"/>
                </View>
            )}

            <LinearGradient
                colors={['rgba(0, 0, 0, .7)', 'transparent']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={{width: '100%', height: 500, position: 'absolute', bottom: 0, left: 0, zIndex: 10}} />

            <Footer>
                <View style={{flex: 1, paddingHorizontal: 5}}>
                    {!!session && !isLastDrillInSession(drill, session) && (
                        <View style={{marginBottom: 20, alignItems: 'center', width: 60}}>
                            <Image source={SwipeIconYellow} style={{width: 35, height: 35, resizeMode: 'contain'}}/>
                            <Text style={{color: 'white', textAlign: 'center', fontSize: 12}}>Swipe up for next drill</Text>
                        </View>
                    )}

                    <Text style={{color: 'white', fontWeight: '600', marginBottom: 5, fontSize: 16}}>
                        {drill.name} {!!session && `(drill ${session.drills.indexOf(drill) + 1}/${session.drills.length})`}
                    </Text>
                    <Text style={{color: 'white'}}>
                        {drill.description.replace(/\n|\r/g, "")}
                    </Text>
                    <TouchableOpacity style={{paddingVertical: 5}} onPress={() => setIsInfoShowing(true)}>
                        <Text style={{color: 'white', textDecorationLine: 'underline'}}>See more</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <SideOption icon={SlowIconWhite}
                                text={playbackRate !== 1 ? `.${playbackRate.toString().split('.')[1]}x` : `${playbackRate}x`}
                                onPress={onChangePlaybackRate}/>
                    <SideOption icon={DrillVideoAngle.Front === selectedAngle ? VideoIconRed : VideoIconWhite}
                                text={'Front'}
                                onPress={() => setSelectedAngle(DrillVideoAngle.Front)}/>
                    <SideOption icon={DrillVideoAngle.Side === selectedAngle ? VideoIconRed : VideoIconWhite}
                                text={'Side'}
                                onPress={() => setSelectedAngle(DrillVideoAngle.Side)}/>
                    <SideOption icon={DrillVideoAngle.Close === selectedAngle ? VideoIconRed : VideoIconWhite}
                                text={'Close'}
                                onPress={() => setSelectedAngle(DrillVideoAngle.Close)}/>
                </View>
                {!!session && (
                    <View style={{width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}} />
                        {shouldShowSubmitButton() && (
                            <SubmitButton onPress={onSubmitButtonPress} text={'Submit your video'} />
                        )}
                        {shouldShowSubmittedButton() && (
                            <Text style={{color: 'white', fontWeight: '600'}}>Your video is submitted!</Text>
                        )}
                        {shouldShowSubmittingButton() && (
                            <Text style={{color: 'white', fontWeight: '600'}}>Submitting...</Text>
                        )}
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                            <SideOption icon={HelpIconWhite}
                                        text={'Help'}
                                        onPress={() => setIsHelpPopupOpen(true)}
                                        marginBottom={0}/>
                        </View>
                    </View>
                )}
            </Footer>

            <InfoSheet isOpen={isInfoShowing}
                       onClose={() => setIsInfoShowing(false)}
                       drill={drill}/>
            <HelpPopup visible={isHelpPopupOpen}
                       close={() => setIsHelpPopupOpen(false)}/>

        </View>
    )
}

export default DemoVideos;