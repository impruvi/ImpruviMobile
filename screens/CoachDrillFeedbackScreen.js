import {StyleSheet, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import DrillSubmissionCamera from "../components/DrillSubmissionCamera";
import DrillSubmissionPreview from "../components/DrillSubmissionPreview";
import {useState} from "react";
import {CameraType} from "expo-camera/build/Camera.types";
import useHttpClient from "../hooks/useHttpClient";
import useError from "../hooks/useError";

const CoachDrillFeedbackScreen = ({route}) => {
    const [video, setVideo] = useState();
    const {setError} = useError();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {httpClient} = useHttpClient();
    const navigation = useNavigation();
    const {session, drillId} = route.params;

    const onSubmit = async () => {
        try {
            setIsSubmitting(true);
            await httpClient.submitDrillFeedback(session.userId, session.sessionNumber, drillId, video);
            setIsSubmitting(false);
            navigation.goBack();
        } catch (e) {
            console.error(e);
            setError('An error occurred. Please try again.');
        }
    }

    return (
        <View style={styles.container}>
            {!video && (
                <DrillSubmissionCamera
                    setVideo={setVideo}
                    initialCameraDirection={CameraType.front}
                    initialCountdown={0}/>
            )}
            {!!video && (
                <DrillSubmissionPreview
                    video={video}
                    cancel={() => setVideo(null)}
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

export default CoachDrillFeedbackScreen;