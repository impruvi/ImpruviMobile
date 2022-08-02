import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {getCategoryDisplayValue} from "../../constants/categoryType";
import {Colors} from "../../constants/colors";
import CachedImage from "../CachedImage";
import {LongRequestType} from "../../model/longRequest";
import useLongRequest from "../../hooks/useLongRequest";
import CircularProgress from "react-native-circular-progress-indicator";

const DrillListItem = ({drill, onPress}) => {

    const {outstandingLongRequests} = useLongRequest();

    const isDrillPressable = () => {
        const outstandingRequestForDrill = getOutstandingRequestForDrill();
        if (!outstandingRequestForDrill) {
            return true;
        }

        return !!drill.demos?.front?.fileLocation
            && !!drill.demos?.side?.fileLocation
            && !!drill.demos?.close?.fileLocation
            && !!drill.demos?.frontThumbnail?.fileLocation
            && !!drill.demos?.sideThumbnail?.fileLocation
            && !!drill.demos?.closeThumbnail?.fileLocation
    }

    const onDrillPress = () => {
        if (isDrillPressable()) {
            onPress();
        }
    }

    const getOutstandingRequestForDrill = () => {
        const outstandingRequestsForDrill = outstandingLongRequests
            .filter(request => request.operation === LongRequestType.UpdateDrill)
            .filter(request => request.metadata.drillId === drill.drillId);
        return outstandingRequestsForDrill.length > 0 ? outstandingRequestsForDrill[0] : null;
    }

    const outstandingRequestForDrill = getOutstandingRequestForDrill();

    return (
        <TouchableOpacity style={styles.container} activeOpacity={.6} onPress={onDrillPress}>
            {!!drill?.demos?.frontThumbnail && (
                <CachedImage sourceUri={drill.demos.frontThumbnail.fileLocation} style={styles.thumbnail} />
            )}
            {!drill?.demos?.frontThumbnail && (
                <View style={styles.thumbnail}/>
            )}
            {!!outstandingRequestForDrill && (
                <View style={styles.loadingContainer}>
                    <CircularProgress
                        value={Math.floor(outstandingRequestForDrill.progress * 100)}
                        maxValue={100}
                        radius={15}
                        activeStrokeColor={'white'}
                        inActiveStrokeColor={'#aaa'}
                        progressValueColor={'transparent'}
                        titleStyle={styles.loadingTitleStyle}
                    />
                    <Text style={styles.loadingText}>Uploading...</Text>
                </View>
            )}
            <Text style={styles.title}>{drill.name}</Text>
            <Text style={styles.subTitle}>{getCategoryDisplayValue(drill.category)}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '32%',
        marginHorizontal: 2,
        marginBottom: 10,
        position: 'relative'
    },
    thumbnail: {
        borderRadius: 10,
        height: Dimensions.get('window').width / 3 - 16,
        width: Dimensions.get('window').width / 3 - 16,
    },
    loadingContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, .3)',
        borderRadius: 10,
        height: Dimensions.get('window').width / 3 - 16,
        width: Dimensions.get('window').width / 3 - 16,
    },
    loadingTitleStyle: {
        display: 'none'
    },
    loadingText: {
        color: 'white',
        fontSize: 12,
        marginTop: 2
    },
    title: {
        fontWeight: '600',
        marginTop: 5
    },
    subTitle: {
        color: Colors.TextSecondary
    }
})


export default DrillListItem;