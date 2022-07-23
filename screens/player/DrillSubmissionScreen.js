import {StyleSheet, View} from "react-native";
import {useState} from "react";
import VideoCamera from "../../components/camera/VideoCamera";
import VideoPreview from "../../components/camera/VideoPreview";
import {useNavigation} from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import useError from "../../hooks/useError";
import {LongRequest, LongRequestType} from "../../model/longRequest";
import useLongRequest from "../../hooks/useLongRequest";
import {generateThumbnail} from "../../util/thumbnailUtil";


const DrillSubmissionScreen = ({route}) => {
    const [video, setVideo] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {executeLongRequest} = useLongRequest();
    const {setError} = useError();
    const {player} = useAuth();
    const navigation = useNavigation();
    const {sessionNumber, drillId} = route.params;

    const onSubmit = async () => {
        try {
            setIsSubmitting(true);
            const input = {
                playerId: player.playerId,
                sessionNumber,
                drillId,
                video
            }
            const thumbnail = await generateThumbnail(video);
            executeLongRequest(new LongRequest(LongRequestType.CreateSubmission, {drillId: drillId, thumbnail: thumbnail}, input))
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
                <VideoCamera setVideo={setVideo} maximumDurationInSeconds={30}/>
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    }
});

export default DrillSubmissionScreen;
