import {memo} from 'react';
import DemoVideos from "../../components/drill-videos/demo/DemoVideos";
import {doesDrillHaveSubmission} from "../../util/drillUtil";
import {Dimensions, StyleSheet, View} from "react-native";

const PreviewSessionListItem = ({item, currentDrillId, shouldShowSwipeUpIndicator, sessionNumber}) => {

    return (
        <View style={styles.listItemContainer}>
            <DemoVideos
                shouldRender
                shouldPlay={currentDrillId === item.drillId}

                sessionNumber={sessionNumber}
                shouldShowSwipeUpIndicator={shouldShowSwipeUpIndicator}

                drillId={item.drillId}
                name={item.name}
                description={item.description}
                notes={item.notes}

                frontVideoUri={item.demos.front.fileLocation}
                sideVideoUri={item.demos.side.fileLocation}
                closeVideoUri={item.demos.close.fileLocation}
                frontPosterUri={item.demos.frontThumbnail.fileLocation}
                sidePosterUri={item.demos.sideThumbnail.fileLocation}
                closePosterUri={item.demos.closeThumbnail.fileLocation}

                hasSubmission={doesDrillHaveSubmission(item)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    listItemContainer: {
        height: Dimensions.get('window').height
    }
});

export default memo(PreviewSessionListItem);
