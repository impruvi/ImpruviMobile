import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {memo, useRef, useState} from "react";
import {Video} from "expo-av";
import {FeedbackTabs} from "../constants/feedbackTabs";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAnglesDown, faPlus} from "@fortawesome/pro-light-svg-icons";
import {Colors} from "../constants/colors";
import {doesDrillHaveFeedback, doesDrillHaveSubmission} from "../util/drillUtil";
import {ScreenNames} from "../screens/ScreenNames";
import {useNavigation} from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

const FeedbackVideos = ({session, drill, isVisible, isLast, initialSelectedTab = FeedbackTabs.Feedback}) => {

    const [selectedTab, setSelectedTab] = useState(initialSelectedTab);
    const [demoStatus, setDemoStatus] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState({});
    const [feedbackStatus, setFeedbackStatus] = useState({});

    const {userType} = useAuth();
    const navigation = useNavigation();
    const {height} = useWindowDimensions();
    const demoRef = useRef();
    const submissionRef = useRef();
    const feedbackRef = useRef();

    const shouldShowActivityIndicator = () => {
        if (!isVisible) {
            return false;
        }

        if (selectedTab === FeedbackTabs.Demo) {
            return !demoStatus.isLoaded || demoStatus.isBuffering;
        } else if (selectedTab === FeedbackTabs.Submission) {
            if (!doesDrillHaveSubmission(drill)) {
                return false;
            }
            return !submissionStatus.isLoaded || submissionStatus.isBuffering;
        } else {
            if (!doesDrillHaveFeedback(drill)) {
                return false;
            }
            return !feedbackStatus.isLoaded || feedbackStatus.isBuffering;
        }
    }

    const shouldShowSubmitFeedbackButton = () => {
        return userType === 'Coach'
            && doesDrillHaveSubmission(drill)
            && !doesDrillHaveFeedback(drill);
    }

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
                isLooping
                onPlaybackStatusUpdate={status => setDemoStatus(() => status)}
            />
            {doesDrillHaveSubmission(drill) && (
                <Video
                    ref={submissionRef}
                    style={selectedTab === FeedbackTabs.Submission ? {flex: 1} : {display: 'none'}}
                    source={{
                        uri: drill.submission.fileLocation,
                    }}
                    resizeMode="cover"
                    shouldPlay={isVisible && selectedTab === FeedbackTabs.Submission}
                    isLooping
                    onPlaybackStatusUpdate={status => setSubmissionStatus(() => status)}
                />
            )}
            {!doesDrillHaveSubmission(drill) && selectedTab === FeedbackTabs.Submission &&  (
                <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white'}}>No submission</Text>
                </View>
            )}
            {doesDrillHaveFeedback(drill) && (
                <Video
                    ref={feedbackRef}
                    style={selectedTab === FeedbackTabs.Feedback ? {flex: 1} : {display: 'none'}}
                    source={{
                        uri: drill.feedback.fileLocation,
                    }}
                    resizeMode="cover"
                    shouldPlay={isVisible && selectedTab === FeedbackTabs.Feedback}
                    isLooping
                    onPlaybackStatusUpdate={status => setFeedbackStatus(() => status)}
                />
            )}
            {!doesDrillHaveFeedback(drill) && selectedTab === FeedbackTabs.Feedback &&  (
                <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white'}}>No feedback</Text>
                </View>
            )}

            {shouldShowActivityIndicator() && (
                <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="white"/>
                </View>
            )}


            <View style={{position: 'absolute', width: '100%', top: 0, left: 0}}>
                <View style={{flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
                    <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(FeedbackTabs.Demo)}>
                        <Text style={selectedTab === FeedbackTabs.Demo ? {...styles.tabText, ...styles.tabTextSelected} : styles.tabText}>
                            Demo
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(FeedbackTabs.Submission)}>
                        <Text style={selectedTab === FeedbackTabs.Submission ? {...styles.tabText, ...styles.tabTextSelected} : styles.tabText}>
                            Submission
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(FeedbackTabs.Feedback)}>
                        <Text style={selectedTab === FeedbackTabs.Feedback ? {...styles.tabText, ...styles.tabTextSelected} : styles.tabText}>
                            Feedback
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{position: 'absolute', width: '100%', bottom: 0, left: 0}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 40}}>
                    {shouldShowSubmitFeedbackButton() && (
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => navigation.navigate(ScreenNames.CoachDrillFeedback, {
                                session: session,
                                drillId: drill.drill.drillId
                            })}>
                            <FontAwesomeIcon icon={faPlus} style={styles.submitButtonIcon}/>
                            <Text style={styles.submitButtonText}>Submit feedback</Text>
                        </TouchableOpacity>
                    )}
                    {!shouldShowSubmitFeedbackButton() && !isLast && (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <FontAwesomeIcon icon={faAnglesDown} style={{color: 'white'}} size={30}/>
                            <Text style={{color: 'white', marginVertical: 5, fontWeight: '500', fontSize: 16}}>Next drill</Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tab: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    tabText: {
        color: Colors.TextSecondary,
        fontWeight: '600',
        fontSize: 14
    },
    tabTextSelected: {
        color: 'white',
        fontWeight: '800',
        fontSize: 18
    },

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

export default memo(FeedbackVideos);