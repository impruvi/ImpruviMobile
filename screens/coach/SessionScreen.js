import {FlatList, View} from 'react-native';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useCallback, useRef, useState} from "react";
import DrillVideos from "../../components/drill-videos/DrillVideos";
import SessionProgress from "../../components/SessionProgress";
import VideoBackIcon from "../../components/VideoBackIcon";
import {DrillVideoTab} from "../../constants/drillVideoTab";
import useHttpClient from "../../hooks/useHttpClient";
import {StatusBar} from "expo-status-bar";
import DrillVideoTabs from "../../components/DrillVideoTabs";
import {LinearGradient} from "expo-linear-gradient";


const SessionScreen = ({route}) => {
    const [session, setSession] = useState(route.params.session);
    const [currentDrillId, setCurrentDrillId] = useState();
    const [selectedTab, setSelectedTab] = useState(DrillVideoTab.Submission);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();

    useFocusEffect(
        useCallback(() => {
            httpClient.getPlayerSessions(session.playerId).then(sessions => {
                const matchingSession = sessions.find(sess => sess.sessionNumber === session.sessionNumber);
                setSession(matchingSession);
            });
        }, [httpClient, navigation])
    );

    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentDrillId(viewableItems[0].item.drillId);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    return (
        <View style={{flex: 1, backgroundColor: 'black'}}>
            <FlatList
                pagingEnabled
                data={session.drills}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                keyExtractor={(item) => item.drillId}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
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
                )}
            />

            <DrillVideoTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
            <SessionProgress session={session} currentDrillId={currentDrillId}/>
            <VideoBackIcon onPress={() => navigation.goBack()} />

            <StatusBar style="light" />
        </View>
    )
}

export default SessionScreen;