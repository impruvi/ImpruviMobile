import {useWindowDimensions, View} from "react-native";
import {DrillVideoTab} from "../../constants/drillVideoTab";
import DemoVideos from "./demo/DemoVideos";
import SubmissionVideo from "./submission/SubmissionVideo";
import FeedbackVideo from "./feedback/FeedbackVideo";

const DrillVideos = ({session, drill, isVisible, selectedTab, isFirstSession, canSubmit}) => {

    const {height} = useWindowDimensions();

    return (
        <View key={drill.drillId} style={{height: height, position: 'relative'}}>
            <DemoVideos session={session}
                        drill={drill}
                        isVisible={isVisible && selectedTab === DrillVideoTab.Demo}
                        isFirstSession={isFirstSession}
                        canSubmit={canSubmit}/>

            <SubmissionVideo session={session}
                             drill={drill}
                             isVisible={isVisible && selectedTab === DrillVideoTab.Submission}/>

            <FeedbackVideo session={session}
                           drill={drill}
                           isVisible={isVisible && selectedTab === DrillVideoTab.Feedback}/>
        </View>
    )
}

export default DrillVideos;