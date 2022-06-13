import {FlatList, useWindowDimensions, View} from "react-native";
import {useCallback, useRef, useState} from "react";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import VideoBackIcon from "../../components/VideoBackIcon";
import SessionProgress from "../../components/SessionProgress";
import DemoVideos from "../../components/demo/DemoVideos";
import {PlayerScreenNames} from "../ScreenNames";
import useHttpClient from "../../hooks/useHttpClient";
import useAuth from "../../hooks/useAuth";
import {doesEveryDrillHaveSubmission} from "../../util/sessionUtil";
import {StatusBar} from "expo-status-bar";
import InfoSheet from "../../components/demo/InfoSheet";

const SessionScreen = ({route}) => {
    const [currentDrillId, setCurrentDrillId] = useState();

    const [session, setSession] = useState(route.params.session);
    const [isInfoShowing, setIsInfoShowing] = useState(false);

    const {height} = useWindowDimensions();
    const listRef = useRef();
    const {httpClient} = useHttpClient();
    const navigation = useNavigation();
    const {player} = useAuth();

    useFocusEffect(
        useCallback(() => {
            httpClient.getPlayerSessions(player.playerId).then(sessions => {
                const matchingSession = sessions.find(sess => sess.sessionNumber === session.sessionNumber);
                setSession(matchingSession);
                if (doesEveryDrillHaveSubmission(matchingSession)) {
                    navigation.navigate(PlayerScreenNames.SessionComplete);
                }
            });
        }, [httpClient, navigation])
    );

    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentDrillId(viewableItems[0].item.drillId);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    const currentDrill = session.drills.find(drill => drill.drillId === currentDrillId);
    return (
        <View style={{flex: 1, backgroundColor: 'black'}}>
            <FlatList
                ref={listRef}
                pagingEnabled
                data={session.drills}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                keyExtractor={(item) => item.drillId}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) =>
                    <View style={{height: height}}>
                        <DemoVideos
                            session={session}
                            drill={item}
                            isLast={currentDrillId === session.drills[session.drills.length - 1].drillId}
                            isVisible={currentDrillId === item.drillId}
                            openInfo={() => setIsInfoShowing(true)}
                            shouldShowSubmissionOptions={true}/>
                    </View>
                }
            />

            <SessionProgress session={session} currentDrillId={currentDrillId}/>
            <VideoBackIcon onPress={() => navigation.goBack()}/>

            {currentDrill && (
                <InfoSheet isOpen={isInfoShowing}
                           drill={currentDrill}
                           onClose={() => setIsInfoShowing(false)}/>
            )}

            <StatusBar style="light" />
        </View>
    )
}

export default SessionScreen;
