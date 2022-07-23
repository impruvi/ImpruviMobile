import {Image, useWindowDimensions, View, ActivityIndicator} from "react-native";
import {DrillVideoTab} from "../../constants/drillVideoTab";
import DemoVideos from "./demo/DemoVideos";
import SubmissionVideo from "./submission/SubmissionVideo";
import FeedbackVideo from "./feedback/FeedbackVideo";
import {LongRequestType} from "../../model/longRequest";
import useLongRequest from "../../hooks/useLongRequest";

const DrillVideos = ({session, drill, isVisible, selectedTab, canSubmit}) => {

    const {height} = useWindowDimensions();
    const {outstandingLongRequests} = useLongRequest();

    const getOutstandingRequestForDrill = () => {
        const outstandingRequestsForDrill = outstandingLongRequests
            .filter(request => request.operation === LongRequestType.CreateSubmission || request.operation === LongRequestType.CreateFeedback)
            .filter(request => request.metadata.drillId === drill.drillId);
        return outstandingRequestsForDrill.length > 0 ? outstandingRequestsForDrill[0] : null;
    }

    const outstandingRequestForDrill = getOutstandingRequestForDrill();

    return (
        <View key={drill.drillId} style={{height: height, position: 'relative'}}>
            <DemoVideos session={session}
                        drill={drill}
                        isVisible={isVisible && selectedTab === DrillVideoTab.Demo}
                        isSubmitting={!!outstandingRequestForDrill}
                        canSubmit={canSubmit}/>

            <SubmissionVideo session={session}
                             drill={drill}
                             isSubmitting={!!outstandingRequestForDrill}
                             isVisible={isVisible && selectedTab === DrillVideoTab.Submission}/>

            <FeedbackVideo session={session}
                           drill={drill}
                           isVisible={isVisible && selectedTab === DrillVideoTab.Feedback}/>

            {!!outstandingRequestForDrill && (
                <View style={{position: 'absolute', top: 110, left: 10}}>
                    <View style={{height: 100, width: 60, backgroundColor: 'white', borderRadius: 10, overflow: 'hidden', position: 'relative'}}>
                        <Image source={outstandingRequestForDrill.metadata.thumbnail} style={{width: 60, height: 100}}/>
                        <View style={{position: 'absolute', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, .3)', width: 60, height: 100}}>
                            <ActivityIndicator size="small" color="white"/>
                        </View>
                    </View>
                </View>
            )}
        </View>
    )
}

export default DrillVideos;