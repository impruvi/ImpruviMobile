import {useWindowDimensions, View} from "react-native";
import {DrillVideoTab} from "../../constants/drillVideoTab";
import DemoVideos from "./demo/DemoVideos";
import SubmissionVideo from "./submission/SubmissionVideo";
import FeedbackVideo from "./feedback/FeedbackVideo";

const DrillVideos = ({session, drill, isVisible, isLast, selectedTab}) => {

    const {height} = useWindowDimensions();

    return (
        <View key={drill.drillId} style={{height: height, position: 'relative'}}>
            <DemoVideos session={session}
                        drill={drill}
                        isVisible={isVisible}
                        shouldHide={!isVisible || selectedTab !== DrillVideoTab.Demo}
                        isLast={isLast}/>

            <SubmissionVideo session={session}
                             drill={drill}
                             isVisible={isVisible}
                             shouldHide={!isVisible || selectedTab !== DrillVideoTab.Submission}
                             isLast={isLast}/>

            <FeedbackVideo drill={drill}
                           isVisible={isVisible}
                           shouldHide={!isVisible || selectedTab !== DrillVideoTab.Feedback}
                           isLast={isLast}/>

        </View>
    )
}

export default DrillVideos;