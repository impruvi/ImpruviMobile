import {StyleSheet, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import VideoCamera from "../../components/camera/VideoCamera";
import VideoPreview from "../../components/camera/VideoPreview";
import {useState} from "react";
import {CameraType} from "expo-camera/build/Camera.types";
import useHttpClient from "../../hooks/useHttpClient";
import useError from "../../hooks/useError";
import useAuth from "../../hooks/useAuth";

const DrillFeedbackScreen = ({route}) => {
    const [video, setVideo] = useState();
    const {setError} = useError();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {httpClient} = useHttpClient();
    const navigation = useNavigation();
    const {coach} = useAuth();
    const {session, drillId} = route.params;

    const onSubmit = async () => {
        try {
            setIsSubmitting(true);
            await httpClient.createFeedback({
                coachId: coach.coachId,
                playerId: session.playerId,
                sessionNumber: session.sessionNumber,
                drillId: drillId,
                video: video
            });
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