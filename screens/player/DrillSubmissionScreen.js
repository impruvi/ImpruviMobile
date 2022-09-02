import {Alert, StyleSheet, View} from "react-native";
import {useState} from "react";
import VideoCamera from "../../components/camera/VideoCamera";
import VideoPreview from "../../components/camera/VideoPreview";
import {useNavigation} from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import useError from "../../hooks/useError";
import {LongRequest, LongRequestType} from "../../model/longRequest";
import useLongRequest from "../../hooks/useLongRequest";
import {generateThumbnail} from "../../util/thumbnailUtil";
import * as Linking from "expo-linking";
import useGoogleAnalyticsClient from "../../hooks/useGoogleAnalyticsClient";


const DrillSubmissionScreen = ({route}) => {
    const [video, setVideo] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {executeLongRequest} = useLongRequest();
    const {gaClient} = useGoogleAnalyticsClient();
    const {setError} = useError();
    const {playerId} = useAuth();
    const navigation = useNavigation();
    const {sessionNumber, drillId} = route.params;

    const onSubmit = async () => {
        try {
            setIsSubmitting(true);
            const thumbnail = await generateThumbnail(video);
            const input = {
                playerId,
                sessionNumber,
                drillId,
                video,
                videoThumbnail: thumbnail
            }
            executeLongRequest(new LongRequest(LongRequestType.CreateSubmission, {drillId: drillId, thumbnail: thumbnail}, input))
            setIsSubmitting(false);
            gaClient.sendGeneralEvent("submit_drill");
            navigation.goBack();
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
            setIsSubmitting(false);
        }
    }

    const onNoAccess = () => {
        navigation.goBack();
        Alert.alert('You must enable access to your camera roll.', '', [
            {
                text: 'Settings',
                onPress: () => Linking.openURL("app-settings:"),
            }
        ]);
    }

    return (
        <View style={styles.container}>
            {!video && (
                <VideoCamera setVideo={setVideo}
                             maximumDurationInSeconds={30}
                             onNoAccess={onNoAccess}/>
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
