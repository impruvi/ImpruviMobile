import {StyleSheet, View} from "react-native";
import {useEffect, useState} from "react";
import DrillSubmissionCamera from "../components/DrillSubmissionCamera";
import DrillSubmissionPreview from "../components/DrillSubmissionPreview";
import {useNavigation} from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import useHttpClient from "../hooks/useHttpClient";
import useError from "../hooks/useError";


const PlayerDrillSubmissionScreen = ({route}) => {
    const [video, setVideo] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {setError} = useError();
    const {userId} = useAuth();
    const {httpClient} = useHttpClient();
    const navigation = useNavigation();
    const {sessionNumber, drillId} = route.params;

    const onSubmit = async () => {
        try {
            setIsSubmitting(true);
            await httpClient.submitDrillVideo(userId, sessionNumber, drillId, video);
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
                <DrillSubmissionCamera setVideo={setVideo}/>
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    }
});

export default PlayerDrillSubmissionScreen;
