import {useWindowDimensions, View} from "react-native";
import {useRef, memo} from "react";
import {Video} from "expo-av";
import {FeedbackTabs} from "../constants/feedbackTabs";

const FeedbackVideos = ({drill, isVisible, selectedTab}) => {

    const {height} = useWindowDimensions();
    const demoRef = useRef();
    const submissionRef = useRef();
    const feedbackRef = useRef();

    return (
        <View key={drill.drillId} style={{height: height, position: 'relative'}}>
            <Video
                ref={demoRef}
                style={selectedTab === FeedbackTabs.Demo ? {flex: 1} : {display: 'none'}}
                source={{
                    uri: drill.drill.videos.front.fileLocation,
                }}
                resizeMode="cover"
                shouldPlay={isVisible && selectedTab === FeedbackTabs.Demo}
                isLooping/>
            <Video
                ref={submissionRef}
                style={selectedTab === FeedbackTabs.Submission ? {flex: 1} : {display: 'none'}}
                source={{
                    uri: drill.submission.fileLocation,
                }}
                resizeMode="cover"
                shouldPlay={isVisible && selectedTab === FeedbackTabs.Submission}
                isLooping/>
            <Video
                ref={feedbackRef}
                style={selectedTab === FeedbackTabs.Feedback ? {flex: 1} : {display: 'none'}}
                source={{
                    uri: drill.feedback.fileLocation,
                }}
                resizeMode="cover"
                shouldPlay={isVisible && selectedTab === FeedbackTabs.Feedback}
                isLooping/>
        </View>
    )
}

export default memo(FeedbackVideos);