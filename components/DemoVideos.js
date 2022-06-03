import {useWindowDimensions, View} from "react-native";
import {useRef, memo} from "react";
import {DrillVideoAngles} from "../constants/drillVideoAngles";
import {Video} from "expo-av";

const DemoVideos = ({drill, selectedAngle, isVisible, playbackRate}) => {
    const {height} = useWindowDimensions();
    const frontRef = useRef();
    const sideRef = useRef();
    const closeUpRef = useRef();

    return (
        <View key={drill.drillId} style={{height: height, position: 'relative'}}>
            <Video
                ref={frontRef}
                style={selectedAngle === DrillVideoAngles.Front ? {flex: 1} : {display: 'none'}}
                source={{
                    uri: drill.videos.front.fileLocation,
                }}
                resizeMode="cover"
                rate={playbackRate}
                shouldPlay={isVisible && selectedAngle === DrillVideoAngles.Front}
                isLooping/>
            <Video
                ref={sideRef}
                style={selectedAngle === DrillVideoAngles.Side ? {flex: 1} : {display: 'none'}}
                source={{
                    uri: drill.videos.side.fileLocation,
                }}
                resizeMode="cover"
                rate={playbackRate}
                shouldPlay={isVisible && selectedAngle === DrillVideoAngles.Side}
                isLooping/>
            <Video
                ref={closeUpRef}
                style={selectedAngle === DrillVideoAngles.CloseUp ? {flex: 1} : {display: 'none'}}
                source={{
                    uri: drill.videos.closeUp.fileLocation,
                }}
                resizeMode="cover"
                rate={playbackRate}
                shouldPlay={isVisible && selectedAngle === DrillVideoAngles.CloseUp}
                isLooping/>
        </View>
    )
}

export default memo(DemoVideos);