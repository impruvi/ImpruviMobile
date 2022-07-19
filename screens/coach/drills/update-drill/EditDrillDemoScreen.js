import {StyleSheet, View} from 'react-native';
import VideoCamera from "../../../../components/camera/VideoCamera";
import {useState} from "react";
import VideoPreview from "../../../../components/camera/VideoPreview";
import {StatusBar} from "expo-status-bar";
import {useNavigation} from "@react-navigation/native";

const EditDrillDemoScreen = ({route}) => {

    const navigation = useNavigation();

    const [video, setVideo] = useState(route.params.video);

    const onSelectVideo = () => {
        route.params.setVideo(video);
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            {!video && (
                <VideoCamera setVideo={setVideo} initialCountdown={0}/>
            )}
            {!!video && (
                <VideoPreview video={video}
                              onCancel={() => setVideo(null)}
                              onSubmit={onSelectVideo}/>
            )}

            <StatusBar style="light" />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    }
});

export default EditDrillDemoScreen;