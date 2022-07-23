import {FlatList, View} from 'react-native';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useCallback, useEffect, useRef, useState} from "react";
import DrillVideos from "../../components/drill-videos/DrillVideos";
import VideoBackIcon from "../../components/VideoBackIcon";
import {DrillVideoTab} from "../../constants/drillVideoTab";
import useHttpClient from "../../hooks/useHttpClient";
import {StatusBar} from "expo-status-bar";
import DrillVideoTabs from "../../components/drill-videos/DrillVideoTabs";
import {LinearGradient} from "expo-linear-gradient";
import {doesEveryDrillHaveFeedback} from "../../util/sessionUtil";
import {CoachScreenNames} from "../ScreenNames";
import useLongRequest from "../../hooks/useLongRequest";
import {doesDrillHaveFeedback, doesDrillHaveSubmission} from "../../util/drillUtil";


const SessionScreen = ({route}) => {
    const [session, setSession] = useState(route.params.session);
    const [currentDrillId, setCurrentDrillId] = useState();
    const [selectedTab, setSelectedTab] = useState(!!route.params.tab ? route.params.tab : DrillVideoTab.Demo);

    const {outstandingLongRequests} = useLongRequest();
    const navigation = useNavigation();
    const {httpClient} = useHttpClient();

    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentDrillId(viewableItems[0].item.drillId);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;


    const getSessionLazy = () => {
        httpClient.getPlayerSessions(session.playerId).then(sessions => {
            const matchingSession = sessions.find(sess => sess.sessionNumber === session.sessionNumber);
            setSession(matchingSession);

            const justCompleted = !doesEveryDrillHaveFeedback(session) && doesEveryDrillHaveFeedback(matchingSession);
            if (justCompleted) {
                navigation.navigate(CoachScreenNames.SessionComplete);
            }
        });
    }

    useFocusEffect(
        useCallback(() => {
            getSessionLazy();
        }, [httpClient, navigation])
    );

    useEffect(() => {
        getSessionLazy();
    }, [outstandingLongRequests])


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

            <DrillVideoTabs selectedTab={selectedTab}
                            setSelectedTab={setSelectedTab}
                            hasSubmission={doesDrillHaveSubmission(session.drills.find(drill => drill.drillId === currentDrillId))}
                            hasFeedback={doesDrillHaveFeedback(session.drills.find(drill => drill.drillId === currentDrillId))}/>
            <VideoBackIcon onPress={() => navigation.goBack()} />

            <StatusBar style="light" />
        </View>
    )
}

export default SessionScreen;