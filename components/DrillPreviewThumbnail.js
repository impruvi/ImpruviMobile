import {TouchableOpacity, StyleSheet} from "react-native";
import {AuthScreenNames} from "../screens/ScreenNames";
import CachedImage from "./CachedImage";
import {useNavigation} from "@react-navigation/native";
import {useCallback} from "react";
import useGoogleAnalyticsClient from "../hooks/useGoogleAnalyticsClient";

const DrillPreviewThumbnail = ({drill}) => {

    const navigation = useNavigation();
    const {gaClient} = useGoogleAnalyticsClient();

    const onPress = useCallback(() => {
        gaClient.sendGeneralEvent("preview_drill");
        navigation.navigate(AuthScreenNames.PreviewDrill, {
            drill: drill
        });
    }, [drill]);

    return (
        <TouchableOpacity style={styles.preview} onPress={onPress}>
            <CachedImage sourceUri={drill.demos.frontThumbnail.fileLocation} style={styles.previewThumbnail}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    preview: {
        width: '48%',
        marginBottom: 15
    },
    previewThumbnail: {
        borderRadius: 5,
        width: '100%',
        height: 200,
        resizeMode: 'cover'
    },
})

export default DrillPreviewThumbnail;
