import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {memo, useCallback, useRef, useState} from "react";
import {Video} from "expo-av";
import {FeedbackTab} from "../constants/feedbackTab";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAnglesDown, faPlus} from "@fortawesome/pro-light-svg-icons";
import {Colors} from "../constants/colors";
import {doesDrillHaveFeedback, doesDrillHaveSubmission} from "../util/drillUtil";
import {CoachScreenNames} from "../screens/ScreenNames";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import {UserType} from "../constants/userType";
import {LinearGradient} from "expo-linear-gradient";

const FeedbackVideos = ({session, drill, isVisible, isLast, initialSelectedTab = FeedbackTab.Submission}) => {

    const [selectedTab, setSelectedTab] = useState(initialSelectedTab);
    const [demoStatus, setDemoStatus] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState({});
    const [feedbackStatus, setFeedbackStatus] = useState({});
    const [isFocused, setIsFocused] = useState(true);

    const {userType} = useAuth();
    const navigation = useNavigation();
    const {height} = useWindowDimensions();
    const demoRef = useRef();
    const submissionRef = useRef();
    const feedbackRef = useRef();

    useFocusEffect(
        useCallback(() => {
            setIsFocused(true);
        }, [navigation])
    );

    const shouldShowActivityIndicator = () => {
        if (!isVisible) {
            return false;
        }

        if (selectedTab === FeedbackTab.Demo) {
            return !demoStatus.isLoaded || demoStatus.isBuffering;
        } else if (selectedTab === FeedbackTab.Submission) {
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
        return userType === UserType.Coach
            && doesDrillHaveSubmission(drill)
            && !doesDrillHaveFeedback(drill);
    }

    return (
        <View key={drill.drillId} style={{height: height, position: 'relative'}}>
            {((isVisible && selectedTab === FeedbackTab.Demo) || demoStatus.isLoaded) && (
                <Video
                    ref={demoRef}
                    style={selectedTab === FeedbackTab.Demo ? {flex: 1} : {display: 'none'}}
                    source={{
                        uri: drill.demos.front.fileLocation,
                    }}
                    resizeMode="cover"
                    shouldPlay={isFocused && isVisible && selectedTab === FeedbackTab.Demo}
                    isLooping
                    isMuted
                    onPlaybackStatusUpdate={status => setDemoStatus(() => status)}
                />
            )}
            {((isVisible && selectedTab === FeedbackTab.Submission) || submissionStatus.isLoaded) && doesDrillHaveSubmission(drill) && (
                <Video
                    ref={submissionRef}
                    style={selectedTab === FeedbackTab.Submission ? {flex: 1} : {display: 'none'}}
                    source={{
                        uri: drill.submission.fileLocation,
                    }}
                    resizeMode="cover"
                    shouldPlay={isFocused && isVisible && selectedTab === FeedbackTab.Submission}
                    isLooping
                    onPlaybackStatusUpdate={status => setSubmissionStatus(() => status)}
                />
            )}
            {!doesDrillHaveSubmission(drill) && selectedTab === FeedbackTab.Submission &&  (
                <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white'}}>No submission</Text>
                </View>
            )}
            {((isVisible && selectedTab === FeedbackTab.Feedback) || feedbackStatus.isLoaded) && doesDrillHaveFeedback(drill) && (
                <Video
                    ref={feedbackRef}
                    style={selectedTab === FeedbackTab.Feedback ? {flex: 1} : {display: 'none'}}
                    source={{
                        uri: drill.feedback.fileLocation,
                    }}
                    resizeMode="cover"
                    shouldPlay={isFocused && isVisible && selectedTab === FeedbackTab.Feedback}
                    isLooping
                    onPlaybackStatusUpdate={status => setFeedbackStatus(() => status)}
                />
            )}
            {!doesDrillHaveFeedback(drill) && selectedTab === FeedbackTab.Feedback &&  (
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
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{width: '100%', height: 175, position: 'absolute', top: 0, left: 0}} />

            <LinearGradient
                colors={['rgba(0, 0, 0, .4)', 'transparent']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={{width: '100%', height: 175, position: 'absolute', bottom: 0, left: 0}} />

            <LinearGradient
                colors={['rgba(0, 0, 0, .3)', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{width: 175, height: '100%', position: 'absolute', top: 0, left: 0}} />

            <View style={{position: 'absolute', width: '100%', top: 0, left: 0}}>
                <View style={{flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
                    <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(FeedbackTab.Demo)}>
                        <Text style={selectedTab === FeedbackTab.Demo ? {...styles.tabText, ...styles.tabTextSelected} : styles.tabText}>
                            Demo
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(FeedbackTab.Submission)}>
                        <Text style={selectedTab === FeedbackTab.Submission ? {...styles.tabText, ...styles.tabTextSelected} : styles.tabText}>
                            Submission
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(FeedbackTab.Feedback)}>
                        <Text style={selectedTab === FeedbackTab.Feedback ? {...styles.tabText, ...styles.tabTextSelected} : styles.tabText}>
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
                            onPress={() => {
                                setIsFocused(false);
                                navigation.navigate(CoachScreenNames.DrillFeedback, {
                                    session: session,
                                    drillId: drill.drillId
                                })
                            }}>
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
        color: Colors.TextLightSecondary,
        fontWeight: '600',
        fontSize: 14,
        textShadowColor: 'rgba(0, 0, 0, .2)',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 1
    },
    tabTextSelected: {
        color: 'white',
        fontWeight: '800',
        fontSize: 18,
        textShadowColor: 'rgba(0, 0, 0, .3)',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 2
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