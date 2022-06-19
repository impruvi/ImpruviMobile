import {useRef, useState} from "react";
import {ActivityIndicator, Text, View} from "react-native";
import {doesDrillHaveFeedback, doesDrillHaveSubmission} from "../../../util/drillUtil";
import {Video} from "expo-av";
import {LinearGradient} from "expo-linear-gradient";
import Footer from "../Footer";
import NextDrillIndicator from "../NextDrillIndicator";
import SubmitButton from "../SubmitButton";
import {CoachScreenNames} from "../../../screens/ScreenNames";
import {useNavigation} from "@react-navigation/native";
import useAuth from "../../../hooks/useAuth";
import {UserType} from "../../../constants/userType";

const SubmissionVideo = ({isVisible, shouldHide, drill, session, isLast}) => {

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
        <View key={drill.drillId} style={shouldHide ? {display: 'none'} : {flex: 1, position: 'relative'}}>
            {(isVisible || submissionStatus.isLoaded) && doesDrillHaveSubmission(drill) && (
                <Video
                    ref={submissionRef}
                    style={shouldHide ? {display: 'none'} : {flex: 1}}
                    source={{
                        uri: drill.submission.fileLocation,
                    }}
                    resizeMode="cover"
                    shouldPlay={isVisible && !shouldHide}
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
                colors={['rgba(0, 0, 0, .4)', 'transparent']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={{width: '100%', height: 175, position: 'absolute', bottom: 0, left: 0}} />

            <Footer>
                {shouldShowSubmitButton() && (
                    <SubmitButton onPress={() => navigation.navigate(CoachScreenNames.DrillFeedback, {
                        session: session,
                        drillId: drill.drillId
                    })} text={'Submit feedback'} />
                )}
                {!shouldShowSubmitButton() && !isLast && (
                    <NextDrillIndicator />
                )}
            </Footer>
        </View>
    )
}

export default SubmissionVideo;