import React, {useRef, useState} from "react";
import {ActivityIndicator, Image, Text, View} from "react-native";
import {doesDrillHaveFeedback, doesDrillHaveSubmission} from "../../../util/drillUtil";
import {Video} from "expo-av";
import {LinearGradient} from "expo-linear-gradient";
import Footer from "../Footer";
import SubmitButton from "../SubmitButton";
import {CoachScreenNames} from "../../../screens/ScreenNames";
import {useNavigation} from "@react-navigation/native";
import useAuth from "../../../hooks/useAuth";
import {UserType} from "../../../constants/userType";
import {isLastDrillInSession} from "../../../util/sessionUtil";
import SwipeIconYellow from "../../../assets/icons/SwipeYellow.png";

const SubmissionVideo = ({isVisible, drill, session}) => {

    const [submissionStatus, setSubmissionStatus] = useState({});

    const navigation = useNavigation();
    const {userType} = useAuth();
    const submissionRef = useRef();

    const shouldShowActivityIndicator = () => {
        if (!isVisible) {
            return false;
        }

        if (!doesDrillHaveSubmission(drill)) {
            return false;
        }
        return !submissionStatus.isLoaded || submissionStatus.isBuffering;
    }

    const shouldShowSubmitButton = () => {
        return userType === UserType.Coach
            && doesDrillHaveSubmission(drill)
            && !doesDrillHaveFeedback(drill);
    }

    return (
        <View key={drill.drillId} style={!isVisible ? {display: 'none'} : {flex: 1, position: 'relative'}}>
            {(isVisible || submissionStatus.isLoaded) && doesDrillHaveSubmission(drill) && (
                <Video
                    ref={submissionRef}
                    style={!isVisible ? {display: 'none'} : {flex: 1}}
                    source={{
                        uri: drill.submission.fileLocation,
                    }}
                    resizeMode="cover"
                    shouldPlay={isVisible}
                    isLooping
                    onPlaybackStatusUpdate={status => setSubmissionStatus(() => status)}
                />
            )}
            {!doesDrillHaveSubmission(drill) &&  (
                <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white'}}>No submission</Text>
                </View>
            )}
            {shouldShowActivityIndicator() && (
                <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="small" color="white"/>
                </View>
            )}

            <LinearGradient
                colors={['rgba(0, 0, 0, .6)', 'transparent']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={{width: '100%', height: 400, position: 'absolute', bottom: 0, left: 0}} />

            <Footer>
                <View style={{width: '100%'}}>
                    {!isLastDrillInSession(drill, session) && (
                        <View style={{marginBottom: 20, alignItems: 'center', width: 60}}>
                            <Image source={SwipeIconYellow} style={{width: 35, height: 35, resizeMode: 'contain'}}/>
                            <Text style={{color: 'white', textAlign: 'center', fontSize: 12}}>Swipe up for next drill</Text>
                        </View>
                    )}
                </View>
                <View style={{width: '100%', alignItems: 'center'}}>
                    {shouldShowSubmitButton() && (
                        <SubmitButton onPress={() => navigation.navigate(CoachScreenNames.DrillFeedback, {
                            session: session,
                            drillId: drill.drillId
                        })} text={'Submit feedback'} />
                    )}
                </View>
            </Footer>
        </View>
    )
}

export default SubmissionVideo;