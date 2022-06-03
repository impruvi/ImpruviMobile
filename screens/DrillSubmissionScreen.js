import {StyleSheet, View} from "react-native";
import {useState} from "react";
import DrillSubmissionCamera from "../components/DrillSubmissionCamera";
import DrillSubmissionPreview from "../components/DrillSubmissionPreview";
import {useNavigation} from "@react-navigation/native";


const DrillSubmissionScreen = ({route}) => {
    const navigation = useNavigation();
    const [video, setVideo] = useState();
    const {sessionNumber, drillId} = route.params;


    return (
        <View style={styles.container}>
            {!video && (
                <DrillSubmissionCamera setVideo={setVideo}/>
            )}
            {!!video && (
                <DrillSubmissionPreview
                    video={video}
                    cancel={() => setVideo(null)}
                    sessionNumber={sessionNumber}
                    drillId={drillId}
                    onComplete={() => navigation.goBack()}/>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    camera: {
        flex: 1,
        position: 'relative',
    },
    buttonContainer: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 40
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});

export default DrillSubmissionScreen;
