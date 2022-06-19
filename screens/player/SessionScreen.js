import {FlatList, View} from "react-native";
import {useCallback, useRef, useState} from "react";
import VideoBackIcon from "../../components/VideoBackIcon";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import SessionProgress from "../../components/SessionProgress";
import DrillVideos from "../../components/drill-videos/DrillVideos";
import {StatusBar} from "expo-status-bar";
import {LinearGradient} from "expo-linear-gradient";
import {DrillVideoTab} from "../../constants/drillVideoTab";
import DrillVideoTabs from "../../components/DrillVideoTabs";
import useHttpClient from "../../hooks/useHttpClient";
import {doesEveryDrillHaveSubmission} from "../../util/sessionUtil";
import useAuth from "../../hooks/useAuth";
import {PlayerScreenNames} from "../ScreenNames";

const SessionScreen = ({route}) => {

    const [session, setSession] = useState(route.params.session);

    const [currentDrillId, setCurrentDrillId] = useState(route.params.drillId);
    const [selectedTab, setSelectedTab] = useState(DrillVideoTab.Demo);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {player} = useAuth();
    const listRef = useRef();
    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentDrillId(viewableItems[0].item.drillId);
    }).current;
    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    useFocusEffect(
        useCallback(() => {
            httpClient.getPlayerSessions(player.playerId).then(sessions => {
                const matchingSession = sessions.find(sess => sess.sessionNumber === session.sessionNumber);

                const justCompleted = !doesEveryDrillHaveSubmission(session) && doesEveryDrillHaveSubmission(matchingSession);
                setSession(matchingSession);
                if (justCompleted) {
                    navigation.navigate(PlayerScreenNames.SessionComplete);
                }
            });
        }, [httpClient, navigation])
    );

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
                            isVisible={currentDrillId === item.drillId}
                            selectedTab={selectedTab}/>
                        <LinearGradient
                            colors={['rgba(0, 0, 0, .4)', 'transparent']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={{width: '100%', height: 175, position: 'absolute', top: 0, left: 0}} />
                        <LinearGradient
                            colors={['rgba(0, 0, 0, .3)', 'transparent']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{width: 175, height: '100%', position: 'absolute', top: 0, left: 0}} />
                    </>
            }/>

            <DrillVideoTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
            <SessionProgress session={session} currentDrillId={currentDrillId}/>
            <VideoBackIcon onPress={() => navigation.goBack()} />

            <StatusBar style="light" />
        </View>
    )
}

export default SessionScreen;
