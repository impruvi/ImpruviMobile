import {FlatList, View} from 'react-native';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useCallback, useRef, useState} from "react";
import FeedbackVideos from "../components/FeedbackVideos";
import SessionProgress from "../components/SessionProgress";
import VideoBackIcon from "../components/VideoBackIcon";
import {FeedbackTabs} from "../constants/feedbackTabs";
import useHttpClient from "../hooks/useHttpClient";
import {StatusBar} from "expo-status-bar";


const CoachSessionFeedbackScreen = ({route}) => {
    const [session, setSession] = useState(route.params.session);
    const [currentDrillId, setCurrentDrillId] = useState();

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();

    useFocusEffect(
        useCallback(() => {
            httpClient.getPlayerSessions(session.userId).then(sessions => {
                const matchingSession = sessions.find(sess => sess.sessionNumber === session.sessionNumber);
                setSession(matchingSession);
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
                pagingEnabled
                data={session.drills}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                keyExtractor={(item) => item.drill.drillId}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => <FeedbackVideos
                    session={session}
                    drill={item}
                    isVisible={currentDrillId === item.drill.drillId}
                    isLast={currentDrillId === session.drills[session.drills.length - 1].drill.drillId}
                    initialSelectedTab={FeedbackTabs.Submission}/>}
            />

            <SessionProgress session={session} currentDrillId={currentDrillId}/>
            <VideoBackIcon onPress={() => navigation.goBack()} />

            <StatusBar style="light" />
        </View>
    )
}

export default CoachSessionFeedbackScreen;