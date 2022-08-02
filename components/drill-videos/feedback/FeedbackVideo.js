import {StyleSheet, Text, View} from 'react-native';
import React from "react";
import {CoachScreenNames} from "../../../screens/ScreenNames";
import {UserType} from "../../../constants/userType";
import useAuth from "../../../hooks/useAuth";
import {useNavigation} from "@react-navigation/native";
import SubmitButton from "../SubmitButton";
import Footer from "../Footer";
import CachedVideo from "../../CachedVideo";
import DrillDetails from "../drill-details/DrillDetails";
import NoContent from "../no-content/NoContent";

const FeedbackVideo = (
    {
        shouldRender,
        shouldPlay,

        sessionNumber,
        shouldShowSwipeUpIndicator,

        drillId,
        name,
        description,
        notes,
        videoUri,
        posterUri,

        hasFeedback,
        hasSubmission,
        playerId,
        isSubmitting
    }) => {

    const {userType} = useAuth();
    const navigation = useNavigation();

    const shouldShowSubmitFeedbackButton = userType === UserType.Coach && !isSubmitting && hasSubmission && !hasFeedback;

    return (
        <View style={shouldRender ? styles.container : styles.containerHidden}>
            {hasFeedback && (
                <CachedVideo
                    style={styles.video}
                    videoSourceUri={videoUri}
                    posterSourceUri={posterUri}
                    resizeMode="cover"
                    shouldPlay={shouldPlay}
                    isLooping
                />
            )}
            {!hasFeedback && <NoContent text={'No feedback'}/>}

            <Footer>
                <View style={styles.detailsContainer}>
                    <DrillDetails name={name}
                                  description={description}
                                  notes={notes}
                                  shouldShowSwipeUpIndicator={shouldShowSwipeUpIndicator}/>
                </View>
                <View style={styles.submitButtonContainer}>
                    {shouldShowSubmitFeedbackButton && (
                        <SubmitButton onPress={() => {
                            navigation.navigate(CoachScreenNames.DrillFeedback, {
                                playerId: playerId,
                                sessionNumber: sessionNumber,
                                drillId: drillId
                            })
                        }} text={'Submit feedback'}/>
                    )}
                    {isSubmitting && (
                        <Text style={styles.submittingText}>Submitting...</Text>
                    )}
                </View>
            </Footer>
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
    detailsContainer: {
        width: '100%'
    },
    submitButtonContainer: {
        width: '100%',
        alignItems: 'center'
    },
    submittingText: {
        color: 'white',
        fontWeight: '600'
    }
});

export default FeedbackVideo;