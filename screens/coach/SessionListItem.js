import {memo} from 'react';
import DrillVideos from "../../components/drill-videos/DrillVideos";
import {LinearGradient} from "expo-linear-gradient";

const SessionListItem = (
    {
        item,
        selectedTab,
        isFocused,
        sessionNumber,
        playerId,
        shouldShowSwipeUpIndicator,
        outstandingLongRequest
    }) => {

    return (
        <>
            <DrillVideos
                selectedTab={selectedTab}
                isFocused={isFocused}
                drill={item}
                sessionNumber={sessionNumber}
                playerId={playerId}
                shouldShowSwipeUpIndicator={shouldShowSwipeUpIndicator}
                outstandingLongRequest={outstandingLongRequest}/>
            <LinearGradient
                colors={['rgba(0, 0, 0, .7)', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{width: '100%', height: 250, position: 'absolute', top: 0, left: 0}} />
        </>
    )
}

export default memo(SessionListItem);