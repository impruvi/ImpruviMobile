import {memo} from 'react';
import {StyleSheet} from "react-native";
import DrillVideos from "../../components/drill-videos/DrillVideos";
import {LinearGradient} from "expo-linear-gradient";

const gradientColors = ['rgba(0, 0, 0, .7)', 'transparent'];
const gradientStart = { x: 0, y: 0 };
const gradientEnd = { x: 0, y: 1 };

const SessionListItem = (
    {
        item,

        isFocused,

        selectedTab,
        sessionNumber,
        playerId,
        shouldShowSwipeUpIndicator,
        canSubmit,
        isExpired,
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
                canSubmit={canSubmit}
                isExpired={isExpired}
                outstandingLongRequest={outstandingLongRequest}/>
            <LinearGradient
                colors={gradientColors}
                start={gradientStart}
                end={gradientEnd}
                style={styles.gradient} />
        </>
    )
}

const styles = StyleSheet.create({
    gradient: {
        width: '100%',
        height: 250,
        position: 'absolute',
        top: 0,
        left: 0
    }
});

export default memo(SessionListItem);
