import {FlatList, StyleSheet, View} from "react-native";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import VideoBackIcon from "../../components/VideoBackIcon";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import {DrillVideoTab} from "../../constants/drillVideoTab";
import DrillVideoTabs from "../../components/drill-videos/DrillVideoTabs";
import useHttpClient from "../../hooks/useHttpClient";
import {canSubmitForSession, doesAnyDrillHaveFeedback, doesEveryDrillHaveSubmission} from "../../util/sessionUtil";
import useAuth from "../../hooks/useAuth";
import {PlayerScreenNames} from "../ScreenNames";
import {doesDrillHaveFeedback, doesDrillHaveSubmission} from "../../util/drillUtil";
import SessionListItem from "./SessionListItem";
import useLongRequest from "../../hooks/useLongRequest";
import {LongRequestType} from "../../model/longRequest";

const SessionScreen = ({route}) => {

    const [session, setSession] = useState(route.params.session);
    const [canSubmit, setCanSubmit] = useState(false);
    const [currentDrillId, setCurrentDrillId] = useState(route.params.drillId);
    const [selectedTab, setSelectedTab] = useState(!!route.params.selectedTab ? route.params.selectedTab : DrillVideoTab.Demo);
    const [outstandingRequestsForSession, setOutstandingRequestsForSession] = useState([]);

    const {outstandingLongRequests} = useLongRequest();
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {playerId} = useAuth();
    const listRef = useRef();
    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentDrillId(viewableItems[0].item.drillId);
    }).current;
    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    const initialScrollIndex = useMemo(() => session.drills.map(drill => drill.drillId).indexOf(route.params.drillId), []);
    const lastDrillId = useMemo(() => session.drills[session.drills.length - 1].drillId, []);
    const hasSubmission = doesDrillHaveSubmission(session.drills.find(drill => drill.drillId === currentDrillId));
    const hasFeedback = doesDrillHaveFeedback(session.drills.find(drill => drill.drillId === currentDrillId));
    const hasViewedFeedback = session.hasViewedFeedback;
    const doesSessionHaveFeedback = doesAnyDrillHaveFeedback(session);
    const sessionNumber = session.sessionNumber;

    const onScrollToIndexFailed = useCallback((info) => {
        const wait = new Promise(resolve => setTimeout(resolve, 0));
        wait.then(() => {
            listRef.current?.scrollToIndex({ index: info.index, animated: false });
        });
    }, [listRef]);

    const markFeedbackAsViewed = async () => {
        try {
            if (doesSessionHaveFeedback && !hasViewedFeedback) {
                await httpClient.markFeedbackAsViewed(sessionNumber, playerId);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getCanSubmit = async () => {
        const sessions = await httpClient.getPlayerSessions(playerId);
        const canSubmit = canSubmitForSession(sessions, session);
        setCanSubmit(canSubmit);
    }

    const onOutstandingRequestsChange = async () => {
        const sessionDrillIds = session.drills.map(drill => drill.drillId);
        const requests = outstandingLongRequests
            .filter(request => request.operation === LongRequestType.CreateSubmission || request.operation === LongRequestType.CreateFeedback)
            .filter(request => sessionDrillIds.includes(request.metadata.drillId));

        if (requests.length !== outstandingRequestsForSession.length) {
            const sessions = await httpClient.getPlayerSessions(playerId);
            const updatedSession = sessions.find(s => s.sessionNumber === session.sessionNumber);
            const justCompleted = !doesEveryDrillHaveSubmission(session) && doesEveryDrillHaveSubmission(updatedSession);
            setSession(updatedSession);
            setOutstandingRequestsForSession(requests);
            if (justCompleted) {
                navigation.navigate(PlayerScreenNames.SessionComplete);
            }
        }
    }

    const getOutstandingRequestForDrill = (drillId) => {
        const outstandingRequestsForDrill = outstandingRequestsForSession
            .filter(request => request.metadata.drillId === drillId);
        return outstandingRequestsForDrill.length > 0 ? outstandingRequestsForDrill[0] : null;
    }

    useEffect(() => {
        onOutstandingRequestsChange();
    }, [outstandingLongRequests])

    useEffect(() => {
        markFeedbackAsViewed();
        getCanSubmit();
    }, []);

    const renderItem = useCallback(({item}) => {
        return (
            <SessionListItem
                item={item}
                selectedTab={selectedTab}
                isFocused={currentDrillId === item.drillId && isFocused}
                sessionNumber={sessionNumber}
                playerId={playerId}
                shouldShowSwipeUpIndicator={currentDrillId !== lastDrillId}
                canSubmit={canSubmit}
                outstandingLongRequest={getOutstandingRequestForDrill(item.drillId)}/>
        );
    }, [selectedTab, currentDrillId, sessionNumber, playerId, lastDrillId, canSubmit, isFocused, outstandingRequestsForSession]);

    const extractKey = useCallback((item) => {
        return item.drillId;
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                ref={listRef}
                initialScrollIndex={initialScrollIndex}
                onScrollToIndexFailed={onScrollToIndexFailed}
                pagingEnabled
                data={session.drills}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                showsVerticalScrollIndicator={false}
                keyExtractor={extractKey}
                renderItem={renderItem}/>

            <DrillVideoTabs selectedTab={selectedTab}
                            setSelectedTab={setSelectedTab}
                            hasSubmission={hasSubmission}
                            hasFeedback={hasFeedback}/>
            <VideoBackIcon onPress={navigation.goBack} />

            <StatusBar style="light" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    }
})

export default SessionScreen;
