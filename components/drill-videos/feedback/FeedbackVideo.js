import {ActivityIndicator, Image, Text, TouchableOpacity, View} from 'react-native';
import {doesDrillHaveFeedback, doesDrillHaveSubmission} from "../../../util/drillUtil";
import React, {useCallback, useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import {CoachScreenNames} from "../../../screens/ScreenNames";
import {UserType} from "../../../constants/userType";
import useAuth from "../../../hooks/useAuth";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import SubmitButton from "../SubmitButton";
import Footer from "../Footer";
import {isLastDrillInSession} from "../../../util/sessionUtil";
import SwipeIconYellow from "../../../assets/icons/SwipeYellow.png";
import CachedVideo from "../../CachedVideo";
import InfoSheet from "../demo/InfoSheet";

const FeedbackVideo = ({session, drill, isVisible}) => {

    const [feedbackStatus, setFeedbackStatus] = useState({});
    const [isInfoShowing, setIsInfoShowing] = useState(false);

    const {userType} = useAuth();
    const [isFocused, setIsFocused] = useState(true);

    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            setIsFocused(true);
        }, [navigation])
    );

    const shouldShowSubmitFeedbackButton = () => {
        return userType === UserType.Coach
            && doesDrillHaveSubmission(drill)
            && !doesDrillHaveFeedback(drill);
    }

    const shouldShowActivityIndicator = () => {
        if (!isVisible) {
            return false;
        }

        if (!doesDrillHaveFeedback(drill)) {
            return false;
        }
        return !feedbackStatus.isLoaded || feedbackStatus.isBuffering;
    }
    return (
        <View key={drill.drillId} style={!isVisible ? {display: 'none'} : {flex: 1, position: 'relative'}}>
            {(isVisible || feedbackStatus.isLoaded) && doesDrillHaveFeedback(drill) && (
                <CachedVideo
                    style={!isVisible ? {display: 'none'} : {flex: 1}}
                    source={{
                        uri: drill.feedback.fileLocation,
                    }}
                    resizeMode="cover"
                    shouldPlay={isVisible && isFocused}
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
                            setIsFocused(false);
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