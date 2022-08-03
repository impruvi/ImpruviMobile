import {Alert, StyleSheet, Text, View} from "react-native";
import React, {useCallback, useState} from "react";
import {DrillVideoAngle} from "../../../constants/drillVideoAngle";
import {useNavigation} from "@react-navigation/native";
import SideOption from "./SideOption";
import {PlayerScreenNames} from '../../../screens/ScreenNames';
import SubmitButton from "../SubmitButton";
import useAuth from "../../../hooks/useAuth";
import {UserType} from "../../../constants/userType";
import SlowIconWhite from '../../../assets/icons/PlayWhite.png';
import VideoIconWhite from '../../../assets/icons/VideoWhite.png';
import VideoIconRed from '../../../assets/icons/VideoRed.png';
import HelpIconWhite from '../../../assets/icons/HelpWhite.png';
import HelpPopup from "./help/HelpPopup";
import Footer from "../Footer";
import CachedVideo from "../../CachedVideo";
import DrillDetails from "../drill-details/DrillDetails";


const DemoVideos = (
    {
        shouldRender,
        shouldPlay,

        sessionNumber,
        shouldShowSwipeUpIndicator,

        drillId,
        name,
        description,
        notes,

        frontVideoUri,
        sideVideoUri,
        closeVideoUri,
        frontPosterUri,
        sidePosterUri,
        closePosterUri,

        hasSubmission,
        canSubmit,
        isSubmitting
    }) => {

    const [isHelpPopupOpen, setIsHelpPopupOpen] = useState(false);

    const [selectedAngle, setSelectedAngle] = useState(DrillVideoAngle.Front);
    const [playbackRate, setPlaybackRate] = useState(1.0);

    const navigation = useNavigation();
    const {userType} = useAuth();

    const onChangePlaybackRate = () => {
        if (playbackRate === .5) {
            setPlaybackRate(1.0);
        } else if (playbackRate === 1.0) {
            setPlaybackRate(.5);
        }
    }

    const selectFrontAngle = useCallback(() => {
        setSelectedAngle(DrillVideoAngle.Front);
    }, []);

    const selectSideAngle = useCallback(() => {
        setSelectedAngle(DrillVideoAngle.Side);
    }, []);

    const selectCloseAngle = useCallback(() => {
        setSelectedAngle(DrillVideoAngle.Close);
    }, []);

    const shouldShowSubmitButton = !!sessionNumber && !isSubmitting && userType === UserType.Player && !hasSubmission;
    const shouldShowSubmittedText = !!sessionNumber && userType === UserType.Player && hasSubmission;

    const onSubmitButtonPress = useCallback(() => {
        if (canSubmit) {
            navigation.navigate(PlayerScreenNames.DrillSubmission, {
                sessionNumber: sessionNumber,
                drillId: drillId
            });
        } else {
            Alert.alert('Please complete your previous sessions',
                'Submit videos and receive feedback for all of the training sessions preceding this session.', [
                {
                    text: 'Ok',
                },
            ]);
        }
    }, [canSubmit, sessionNumber, drillId]);

    return (
        <View style={shouldRender ? styles.container : styles.containerHidden}>
            <CachedVideo
                style={selectedAngle === DrillVideoAngle.Front ? styles.video : styles.videoHidden}
                videoSourceUri={frontVideoUri}
                posterSourceUri={frontPosterUri}
                resizeMode="cover"
                playbackRate={playbackRate}
                shouldPlay={shouldPlay && selectedAngle === DrillVideoAngle.Front}
                isLooping
            />
            <CachedVideo
                style={selectedAngle === DrillVideoAngle.Side ? styles.video : styles.videoHidden}
                videoSourceUri={sideVideoUri}
                posterSourceUri={sidePosterUri}
                resizeMode="cover"
                playbackRate={playbackRate}
                shouldPlay={shouldPlay && selectedAngle === DrillVideoAngle.Side}
                isLooping
            />
            <CachedVideo
                style={selectedAngle === DrillVideoAngle.Close ? styles.video : styles.videoHidden}
                videoSourceUri={closeVideoUri}
                posterSourceUri={closePosterUri}
                resizeMode="cover"
                playbackRate={playbackRate}
                shouldPlay={shouldPlay && selectedAngle === DrillVideoAngle.Close}
                isLooping
            />

            <Footer>
                <View style={styles.detailsContainer}>
                    <DrillDetails name={name}
                                  description={description}
                                  notes={notes}
                                  shouldShowSwipeUpIndicator={shouldShowSwipeUpIndicator}/>
                </View>
                <View>
                    <SideOption icon={SlowIconWhite}
                                text={playbackRate !== 1 ? `.${playbackRate.toString().split('.')[1]}x` : `${playbackRate}x`}
                                onPress={onChangePlaybackRate}/>
                    <SideOption icon={DrillVideoAngle.Front === selectedAngle ? VideoIconRed : VideoIconWhite}
                                text={'Front'}
                                onPress={selectFrontAngle}/>
                    <SideOption icon={DrillVideoAngle.Side === selectedAngle ? VideoIconRed : VideoIconWhite}
                                text={'Side'}
                                onPress={selectSideAngle}/>
                    <SideOption icon={DrillVideoAngle.Close === selectedAngle ? VideoIconRed : VideoIconWhite}
                                text={'Close'}
                                onPress={selectCloseAngle}/>
                </View>
                {!!sessionNumber && (
                    <View style={styles.submitButtonContainer}>
                        <View style={styles.placeholder} />
                        {shouldShowSubmitButton && (
                            <SubmitButton onPress={onSubmitButtonPress} text={'Submit your video'} />
                        )}
                        {shouldShowSubmittedText && (
                            <Text style={styles.noSubmitButtonText}>Your video is submitted!</Text>
                        )}
                        {isSubmitting && (
                            <Text style={styles.noSubmitButtonText}>Submitting...</Text>
                        )}
                        <View style={styles.helpOptionContainer}>
                            <SideOption icon={HelpIconWhite}
                                        text={'Help'}
                                        onPress={() => setIsHelpPopupOpen(true)}
                                        noMargin/>
                        </View>
                    </View>
                )}
            </Footer>

            <HelpPopup visible={isHelpPopupOpen}
                       close={() => setIsHelpPopupOpen(false)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    containerHidden: {
        display: 'none'
    },
    video: {
        flex: 1
    },
    videoHidden: {
        display: "none"
    },
    detailsContainer: {
        flex: 1,
        paddingHorizontal: 5
    },
    submitButtonContainer: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    placeholder: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    noSubmitButtonText: {
        color: 'white',
        fontWeight: '600'
    },
    helpOptionContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})

export default DemoVideos;