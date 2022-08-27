import {StyleSheet, View} from "react-native";
import DemoVideos from "../../components/drill-videos/demo/DemoVideos";
import {LinearGradient} from "expo-linear-gradient";
import VideoBackIcon from "../../components/VideoBackIcon";
import {StatusBar} from "expo-status-bar";
import {useNavigation} from "@react-navigation/native";

const gradientColors = ['rgba(0, 0, 0, .7)', 'transparent'];
const gradientStart = { x: 0, y: 0 };
const gradientEnd = { x: 0, y: 1 };

const PreviewDrillScreen = ({route}) => {

    const {drill} = route.params;

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <DemoVideos shouldRender
                        shouldPlay={true}

                        drillId={drill.drillId}
                        name={drill.name}
                        description={drill.description}
                        notes={drill.notes}

                        frontVideoUri={drill.demos.front.fileLocation}
                        sideVideoUri={drill.demos.side.fileLocation}
                        closeVideoUri={drill.demos.close.fileLocation}
                        frontPosterUri={drill.demos.frontThumbnail.fileLocation}
                        sidePosterUri={drill.demos.sideThumbnail.fileLocation}
                        closePosterUri={drill.demos.closeThumbnail.fileLocation}/>
            <LinearGradient
                colors={gradientColors}
                start={gradientStart}
                end={gradientEnd}
                style={styles.gradient} />


            <VideoBackIcon onPress={navigation.goBack} />

            <StatusBar style="light" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    gradient: {
        width: '100%',
        height: 200,
        position: 'absolute',
        top: 0,
        left: 0
    },
});

export default PreviewDrillScreen;
