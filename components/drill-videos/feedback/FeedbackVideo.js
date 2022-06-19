import {ActivityIndicator, Text, View} from 'react-native';
import {doesDrillHaveFeedback, doesDrillHaveSubmission} from "../../../util/drillUtil";
import {Video} from "expo-av";
import {useCallback, useRef, useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import {CoachScreenNames} from "../../../screens/ScreenNames";
import {UserType} from "../../../constants/userType";
import useAuth from "../../../hooks/useAuth";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import NextDrillIndicator from "../NextDrillIndicator";
import SubmitButton from "../SubmitButton";
import Footer from "../Footer";

const FeedbackVideo = ({drill, shouldHide, isVisible, isLast}) => {

    const [feedbackStatus, setFeedbackStatus] = useState({});

    const feedbackRef = useRef();
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
        <View key={drill.drillId} style={shouldHide ? {display: 'none'} : {flex: 1, position: 'relative'}}>
            {(isVisible || feedbackStatus.isLoaded) && doesDrillHaveFeedback(drill) && (
                <Video
                    ref={feedbackRef}
                    style={shouldHide ? {display: 'none'} : {flex: 1}}
                    source={{
                        uri: drill.feedback.fileLocation,
                    }}
                    resizeMode="cover"
                    shouldPlay={isVisible && !shouldHide && isFocused}
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
                colors={['rgba(0, 0, 0, .4)', 'transparent']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={{width: '100%', height: 175, position: 'absolute', bottom: 0, left: 0}} />

            <Footer>
                {shouldShowSubmitFeedbackButton() && (
                    <SubmitButton onPress={() => {
                        setIsFocused(false);
                        navigation.navigate(CoachScreenNames.DrillFeedback, {
                            session: session,
                            drillId: drill.drillId
                        })
                    }} text={'Submit feedback'}/>
                )}
                {!shouldShowSubmitFeedbackButton() && !isLast && (
                    <NextDrillIndicator />
                )}
            </Footer>
        </View>
    )
}

export default FeedbackVideo;