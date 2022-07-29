import {ActivityIndicator, Image, Text, TouchableOpacity, View} from 'react-native';
import {doesDrillHaveFeedback, doesDrillHaveSubmission} from "../../../util/drillUtil";
import React, {useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import {CoachScreenNames} from "../../../screens/ScreenNames";
import {UserType} from "../../../constants/userType";
import useAuth from "../../../hooks/useAuth";
import {useNavigation} from "@react-navigation/native";
import SubmitButton from "../SubmitButton";
import Footer from "../Footer";
import {isLastDrillInSession} from "../../../util/sessionUtil";
import SwipeIconYellow from "../../../assets/icons/SwipeYellow.png";
import CachedVideo from "../../CachedVideo";
import InfoSheet from "../demo/InfoSheet";

const FeedbackVideo = ({isDrillFocused, isTabSelected, drill, session}) => {

    const [feedbackStatus, setFeedbackStatus] = useState({});
    const [isInfoShowing, setIsInfoShowing] = useState(false);

    const {userType} = useAuth();

    const navigation = useNavigation();

    const shouldShowSubmitFeedbackButton = () => {
        return userType === UserType.Coach
            && doesDrillHaveSubmission(drill)
            && !doesDrillHaveFeedback(drill);
    }

    const shouldShowActivityIndicator = () => {
        if (!isTabSelected || !isDrillFocused) {
            return false;
        }

        if (!doesDrillHaveFeedback(drill)) {
            return false;
        }
        return !feedbackStatus.isLoaded || feedbackStatus.isBuffering;
    }
    return (
        <View key={drill.drillId} style={isTabSelected ? {flex: 1, position: 'relative'} : {display: 'none'}}>
            {doesDrillHaveFeedback(drill) && (
                <CachedVideo
                    style={{flex: 1}}
                    videoSourceUri={(isTabSelected && isDrillFocused) || feedbackStatus.isLoaded
                        ? drill.feedback.fileLocation
                        : null}
                    posterSourceUri={drill.feedbackThumbnail?.fileLocation}
                    resizeMode="cover"
                    shouldPlay={isTabSelected && isDrillFocused}
                    isLooping
                    onPlaybackStatusUpdate={status => setFeedbackStatus(() => status)}
                />
            )}
            {!doesDrillHaveFeedback(drill) &&  (
                <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white'}}>No feedback</Text>
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
                <View style={{width: '100%', alignItems: 'center'}}>
                    {shouldShowSubmitFeedbackButton() && (
                        <SubmitButton onPress={() => {
                            navigation.navigate(CoachScreenNames.DrillFeedback, {
                                session: session,
                                drillId: drill.drillId
                            })
                        }} text={'Submit feedback'}/>
                    )}
                </View>
            </Footer>

            <InfoSheet isOpen={isInfoShowing}
                       onClose={() => setIsInfoShowing(false)}
                       drill={drill}/>
        </View>
    )
}

export default FeedbackVideo;