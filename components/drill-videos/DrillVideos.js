import {Dimensions, StyleSheet, View} from "react-native";
import {DrillVideoTab} from "../../constants/drillVideoTab";
import DemoVideos from "./demo/DemoVideos";
import SubmissionVideo from "./submission/SubmissionVideo";
import FeedbackVideo from "./feedback/FeedbackVideo";
import OutstandingUpload from "./outstanding-upload/OutstandingUpload";
import {doesDrillHaveFeedback, doesDrillHaveSubmission} from "../../util/drillUtil";
import {LongRequestType} from "../../model/longRequest";

const DrillVideos = (
    {
        selectedTab,
        isFocused,

        drill,

        sessionNumber,
        playerId,
        canSubmit,
        shouldShowSwipeUpIndicator,
        outstandingLongRequest
    }) => {

    const hasSubmission = doesDrillHaveSubmission(drill);
    const hasFeedback = doesDrillHaveFeedback(drill);

    return (
        <View style={styles.container}>
            <DemoVideos shouldRender={selectedTab === DrillVideoTab.Demo}
                        shouldPlay={isFocused && selectedTab === DrillVideoTab.Demo}

                        sessionNumber={sessionNumber}
                        shouldShowSwipeUpIndicator={shouldShowSwipeUpIndicator}

                        drillId={drill.drillId}
                        name={drill.name}
                        description={drill.description}
                        notes={drill.notes}

                        frontVideoUri={drill.demos.front.fileLocation}
                        sideVideoUri={drill.demos.side.fileLocation}
                        closeVideoUri={drill.demos.close.fileLocation}
                        frontPosterUri={drill.demos.frontThumbnail.fileLocation}
                        sidePosterUri={drill.demos.sideThumbnail.fileLocation}
                        closePosterUri={drill.demos.closeThumbnail.fileLocation}

                        hasSubmission={hasSubmission}
                        canSubmit={canSubmit}
                        isSubmitting={!!outstandingLongRequest
                            && outstandingLongRequest.operation === LongRequestType.CreateSubmission}/>

            <SubmissionVideo shouldRender={selectedTab === DrillVideoTab.Submission}
                             shouldPlay={isFocused && selectedTab === DrillVideoTab.Submission}

                             sessionNumber={sessionNumber}
                             shouldShowSwipeUpIndicator={shouldShowSwipeUpIndicator}

                             drillId={drill.drillId}
                             name={drill.name}
                             description={drill.description}
                             notes={drill.notes}
                             videoUri={drill.submission?.fileLocation}
                             posterUri={drill.submissionThumbnail?.fileLocation}

                             hasSubmission={hasSubmission}
                             hasFeedback={hasFeedback}
                             playerId={playerId}
                             isSubmitting={!!outstandingLongRequest &&
                                 (outstandingLongRequest.operation === LongRequestType.CreateSubmission
                                     || outstandingLongRequest.operation === LongRequestType.CreateFeedback)}/>

            <FeedbackVideo shouldRender={selectedTab === DrillVideoTab.Feedback}
                           shouldPlay={isFocused && selectedTab === DrillVideoTab.Feedback}

                           sessionNumber={sessionNumber}
                           shouldShowSwipeUpIndicator={shouldShowSwipeUpIndicator}

                           drillId={drill.drillId}
                           name={drill.name}
                           description={drill.description}
                           notes={drill.notes}
                           videoUri={drill.feedback?.fileLocation}
                           posterUri={drill.feedbackThumbnail?.fileLocation}

                           hasFeedback={hasFeedback}
                           hasSubmission={hasSubmission}
                           playerId={playerId}
                           isSubmitting={!!outstandingLongRequest
                               && outstandingLongRequest.operation === LongRequestType.CreateFeedback}/>

            {!!outstandingLongRequest && (
                <OutstandingUpload imageUri={outstandingLongRequest.metadata.thumbnail.uri}/>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        position: 'relative'
    }
});

export default DrillVideos;