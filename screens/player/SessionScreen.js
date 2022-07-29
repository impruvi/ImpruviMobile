import {FlatList, View} from "react-native";
import React, {useCallback, useEffect, useRef, useState} from "react";
import VideoBackIcon from "../../components/VideoBackIcon";
import {useFocusEffect, useIsFocused, useNavigation} from "@react-navigation/native";
import DrillVideos from "../../components/drill-videos/DrillVideos";
import {StatusBar} from "expo-status-bar";
import {LinearGradient} from "expo-linear-gradient";
import {DrillVideoTab} from "../../constants/drillVideoTab";
import DrillVideoTabs from "../../components/drill-videos/DrillVideoTabs";
import useHttpClient from "../../hooks/useHttpClient";
import {canSubmitForSession, doesAnyDrillHaveFeedback, doesEveryDrillHaveSubmission} from "../../util/sessionUtil";
import useAuth from "../../hooks/useAuth";
import {PlayerScreenNames} from "../ScreenNames";
import {doesDrillHaveFeedback, doesDrillHaveSubmission} from "../../util/drillUtil";
import useLongRequest from "../../hooks/useLongRequest";

const SessionScreen = ({route}) => {

    const [sessions, setSessions] = useState([]);
    const [session, setSession] = useState(route.params.session);

    const [currentDrillId, setCurrentDrillId] = useState(route.params.drillId);
    const [selectedTab, setSelectedTab] = useState(!!route.params.selectedTab ? route.params.selectedTab : DrillVideoTab.Demo);

    const isFocused = useIsFocused();
    const {outstandingLongRequests} = useLongRequest();
    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {player} = useAuth();
    const listRef = useRef();
    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentDrillId(viewableItems[0].item.drillId);
    }).current;
    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;


    const markFeedbackAsViewed = async () => {
        try {
            if (doesAnyDrillHaveFeedback(session) && !session.hasViewedFeedback) {
                await httpClient.markFeedbackAsViewed(session.sessionNumber, player.playerId);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getSessionLazy = () => {
        httpClient.getPlayerSessions(player.playerId).then(sessions => {
            setSessions(sessions);
            const matchingSession = sessions.find(sess => sess.sessionNumber === session.sessionNumber);
            const justCompleted = !doesEveryDrillHaveSubmission(session) && doesEveryDrillHaveSubmission(matchingSession);
            setSession(matchingSession);
            if (justCompleted) {
                navigation.navigate(PlayerScreenNames.SessionComplete);
            }
        });
    }

    useFocusEffect(
        useCallback(() => {
            getSessionLazy();
        }, [httpClient, navigation])
    );

    useEffect(() => {
        markFeedbackAsViewed();
    }, [markFeedbackAsViewed]);

    useEffect(() => {
        getSessionLazy();
    }, [outstandingLongRequests])

    return (
        <View style={{flex: 1, backgroundColor: 'black'}}>
            <FlatList
                ref={listRef}
                initialScrollIndex={session.drills.map(drill => drill.drillId).indexOf(route.params.drillId)}
                onScrollToIndexFailed={info => {
                    const wait = new Promise(resolve => setTimeout(resolve, 0));
                    wait.then(() => {
                        listRef.current?.scrollToIndex({ index: info.index, animated: false });
                    });
                }}
                pagingEnabled
                data={session.drills}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                keyExtractor={(item) => item.drillId}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) =>
                    <>
                        <DrillVideos
                            session={session}
                            drill={item}
                            isLast={currentDrillId === session.drills[session.drills.length - 1].drillId}
                            selectedTab={selectedTab}
                            isDrillFocused={isFocused && currentDrillId === item.drillId}
                            canSubmit={canSubmitForSession(sessions, session)}/>
                        <LinearGradient
                            colors={['rgba(0, 0, 0, .6)', 'transparent']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={{width: '100%', height: 200, position: 'absolute', top: 0, left: 0}} />
                    </>
            }/>

            <DrillVideoTabs selectedTab={selectedTab}
                            setSelectedTab={setSelectedTab}
                            hasSubmission={doesDrillHaveSubmission(session.drills.find(drill => drill.drillId === currentDrillId))}
                            hasFeedback={doesDrillHaveFeedback(session.drills.find(drill => drill.drillId === currentDrillId))}/>
            <VideoBackIcon onPress={navigation.goBack} />

            <StatusBar style="light" />
        </View>
    )
}

export default SessionScreen;
