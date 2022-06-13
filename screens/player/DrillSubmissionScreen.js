import {StyleSheet, View} from "react-native";
import {useState} from "react";
import VideoCamera from "../../components/camera/VideoCamera";
import VideoPreview from "../../components/camera/VideoPreview";
import {useNavigation} from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import useHttpClient from "../../hooks/useHttpClient";
import useError from "../../hooks/useError";


const DrillSubmissionScreen = ({route}) => {
    const [video, setVideo] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {setError} = useError();
    const {player} = useAuth();
    const {httpClient} = useHttpClient();
    const navigation = useNavigation();
    const {sessionNumber, drillId} = route.params;

    const onSubmit = async () => {
        try {
            setIsSubmitting(true);
            await httpClient.createSubmission(player.playerId, sessionNumber, drillId, video);
            setIsSubmitting(false);
            navigation.goBack();
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
        }
    }

    return (
        <View style={styles.container}>
            {!video && (
                <VideoCamera setVideo={setVideo}/>
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
