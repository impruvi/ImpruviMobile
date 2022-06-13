import {Video} from "expo-av";


const VideoThumbnail = ({video, style}) => {

    return (
        <Video
            style={style}
            source={video}
            resizeMode="contain"
            shouldPlay={false}/>
    )
}

export default VideoThumbnail;
