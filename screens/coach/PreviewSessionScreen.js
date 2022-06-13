import {useCallback, useRef, useState} from "react";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import useHttpClient from "../../hooks/useHttpClient";
import {FlatList, useWindowDimensions, View} from "react-native";
import SessionProgress from "../../components/SessionProgress";
import VideoBackIcon from "../../components/VideoBackIcon";
import {StatusBar} from "expo-status-bar";
import DemoVideos from "../../components/demo/DemoVideos";

const PreviewSessionScreen = ({route}) => {

    const [session, setSession] = useState(route.params.session);
    const [currentDrillId, setCurrentDrillId] = useState();

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {height, width} = useWindowDimensions();

    useFocusEffect(
        useCallback(() => {
            httpClient.getPlayerSessions(session.userId).then(sessions => {
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
                    <View style={{height: height}}>
                        <DemoVideos
                            session={session}
                            drill={item}
                            isVisible={currentDrillId === item.drillId}
                            isLast={currentDrillId === session.drills[session.drills.length - 1].drillId}/>
                    </View>
                )}
            />

            <SessionProgress session={session} currentDrillId={currentDrillId}/>
            <VideoBackIcon onPress={() => navigation.goBack()} />

            <StatusBar style="light" />
        </View>
    )
}

export default PreviewSessionScreen;