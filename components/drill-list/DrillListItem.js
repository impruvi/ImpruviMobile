import {Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {getCategoryDisplayValue} from "../../constants/categoryType";
import {Colors} from "../../constants/colors";
import CachedImage from "../CachedImage";
import {LongRequestType} from "../../model/longRequest";
import useLongRequest from "../../hooks/useLongRequest";
import CircularProgress from "react-native-circular-progress-indicator";

const DrillListItem = ({drill, onPress}) => {

    const {outstandingLongRequests} = useLongRequest();
    const {width} = useWindowDimensions();

    const imageDimension = width / 3 - 16;

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
        <TouchableOpacity style={{width: '32%', marginHorizontal: 2, marginBottom: 10, position: 'relative'}}
                          activeOpacity={.6}
                          onPress={onDrillPress}>
            {!!drill?.demos?.frontThumbnail && (
                <CachedImage sourceUri={drill.demos.frontThumbnail.fileLocation} style={{width: imageDimension, height: imageDimension, borderRadius: 10}} />
            )}
            {!drill?.demos?.frontThumbnail && (
                <View style={{width: imageDimension, height: imageDimension, borderRadius: 10}}/>
            )}
            {!!outstandingRequestForDrill && (
                <View style={{position: 'absolute', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, .3)', width: imageDimension, height: imageDimension, borderRadius: 10}}>
                    <CircularProgress
                        value={Math.floor(outstandingRequestForDrill.progress * 100)}
                        maxValue={100}
                        radius={15}
                        activeStrokeColor={'white'}
                        inActiveStrokeColor={'#aaa'}
                        progressValueColor={'transparent'}
                        titleStyle={{display: 'none'}}
                    />
                    <Text style={{color: 'white', fontSize: 12, marginTop: 2}}>Uploading...</Text>
                </View>
            )}
            <Text style={{fontWeight: '600', marginTop: 5}}>{drill.name}</Text>
            <Text style={{color: Colors.TextSecondary}}>{getCategoryDisplayValue(drill.category)}</Text>
        </TouchableOpacity>
    )
}

export default DrillListItem;