import {FlatList, View} from "react-native";
import {useCallback, useRef, useState} from "react";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import VideoBackIcon from "../components/VideoBackIcon";
import SessionProgress from "../components/SessionProgress";
import DemoVideos from "../components/DemoVideos";
import {ScreenNames} from "./ScreenNames";
import useHttpClient from "../hooks/useHttpClient";
import useAuth from "../hooks/useAuth";
import {doesEveryDrillHaveSubmission} from "../util/sessionUtil";

const PlayerSessionScreen = ({route}) => {
    const [currentDrillId, setCurrentDrillId] = useState();

    const [session, setSession] = useState(route.params.session);

    const listRef = useRef();
    const {httpClient} = useHttpClient();
    const navigation = useNavigation();
    const {userId} = useAuth();

    useFocusEffect(
        useCallback(() => {
            httpClient.getPlayerSessions(userId).then(sessions => {
                const matchingSession = sessions.find(sess => sess.sessionNumber === session.sessionNumber);
                setSession(matchingSession);
                if (doesEveryDrillHaveSubmission(matchingSession)) {
                    navigation.navigate(ScreenNames.PlayerSessionComplete);
                }
            });
        }, [httpClient, navigation])
    );

    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentDrillId(viewableItems[0].item.drill.drillId);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    return (
        <View style={{flex: 1, backgroundColor: 'black'}}>
            <FlatList
                ref={listRef}
                pagingEnabled
                data={session.drills}
                onViewableItemsChanged={viewableItemsChanged}
                bounces={false}
                viewabilityConfig={viewConfig}
                keyExtractor={(item) => item.drill.drillId}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => <DemoVideos
                    session={session}
                    drill={item}
                    isLast={currentDrillId === session.drills[session.drills.length - 1].drill.drillId}
                    isVisible={currentDrillId === item.drill.drillId}/>}
            />

            <SessionProgress session={session} currentDrillId={currentDrillId}/>
            <VideoBackIcon onPress={() => navigation.goBack()}/>
        </View>
    )
}

export default PlayerSessionScreen;
