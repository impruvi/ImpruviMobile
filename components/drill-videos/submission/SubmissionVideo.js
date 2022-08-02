import React, {useCallback} from "react";
import {StyleSheet, Text, View} from "react-native";
import Footer from "../Footer";
import SubmitButton from "../SubmitButton";
import {CoachScreenNames} from "../../../screens/ScreenNames";
import {useNavigation} from "@react-navigation/native";
import useAuth from "../../../hooks/useAuth";
import {UserType} from "../../../constants/userType";
import CachedVideo from "../../CachedVideo";
import DrillDetails from "../drill-details/DrillDetails";
import NoContent from "../no-content/NoContent";

const SubmissionVideo = (
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

        hasSubmission,
        hasFeedback,
        playerId,
        isSubmitting
    }) => {

    const navigation = useNavigation();
    const {userType} = useAuth();

    const openSubmitFeedbackScreen = useCallback(() => {
        navigation.navigate(CoachScreenNames.DrillFeedback, {
            playerId: playerId,
            sessionNumber: sessionNumber,
            drillId: drillId
        });
    }, [playerId, sessionNumber, drillId]);

    const shouldShowSubmitFeedbackButton = userType === UserType.Coach && !isSubmitting && hasSubmission && !hasFeedback;

    return (
        <View style={shouldRender ? styles.container : styles.containerHidden}>
            {hasSubmission && (
                <CachedVideo
                    style={styles.video}
                    videoSourceUri={videoUri}
                    posterSourceUri={posterUri}
                    resizeMode="cover"
                    shouldPlay={shouldPlay}
                    isLooping
                />
            )}
            {!hasSubmission && <NoContent text={'No submission'}/>}

            <Footer>
                <View style={styles.detailsContainer}>
                    <DrillDetails name={name}
                                  description={description}
                                  notes={notes}
                                  shouldShowSwipeUpIndicator={shouldShowSwipeUpIndicator}/>
                </View>
                <View style={styles.submitButtonContainer}>
                    {shouldShowSubmitFeedbackButton && (
                        <SubmitButton onPress={openSubmitFeedbackScreen} text={'Submit feedback'}/>
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

export default SubmissionVideo;