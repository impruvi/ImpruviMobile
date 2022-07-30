import {StyleSheet, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import VideoCamera from "../../components/camera/VideoCamera";
import VideoPreview from "../../components/camera/VideoPreview";
import {useState} from "react";
import {CameraType} from "expo-camera/build/Camera.types";
import useError from "../../hooks/useError";
import useAuth from "../../hooks/useAuth";
import {LongRequest, LongRequestType} from "../../model/longRequest";
import useLongRequest from "../../hooks/useLongRequest";
import {generateThumbnail} from "../../util/thumbnailUtil";

const DrillFeedbackScreen = ({route}) => {
    const [video, setVideo] = useState();
    const {setError} = useError();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {executeLongRequest} = useLongRequest();
    const navigation = useNavigation();
    const {coachId} = useAuth();
    const {session, drillId} = route.params;

    const onSubmit = async () => {
        try {
            setIsSubmitting(true);
            const thumbnail = await generateThumbnail(video);
            const input = {
                coachId: coachId,
                playerId: session.playerId,
                sessionNumber: session.sessionNumber,
                drillId: drillId,
                video: video,
                videoThumbnail: thumbnail
            };
            executeLongRequest(new LongRequest(LongRequestType.CreateFeedback, {drillId: drillId, thumbnail: thumbnail}, input))
            setIsSubmitting(false);
            navigation.goBack();
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
            setIsSubmitting(false);
        }
    }

    return (
        <View style={styles.container}>
            {!video && (
                <VideoCamera
                    setVideo={setVideo}
                    initialCameraDirection={CameraType.front}
                    initialCountdown={0}/>
            )}
            {!!video && (
                <VideoPreview
                    video={video}
                    onCancel={() => setVideo(null)}
                    isSubmitting={isSubmitting}
                    onSubmit={onSubmit}/>
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    }
});

export default DrillFeedbackScreen;