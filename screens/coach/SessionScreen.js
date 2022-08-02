import {FlatList, StyleSheet, View} from 'react-native';
import {useFocusEffect, useIsFocused, useNavigation} from "@react-navigation/native";
import {useCallback, useEffect, useRef, useState} from "react";
import VideoBackIcon from "../../components/VideoBackIcon";
import {DrillVideoTab} from "../../constants/drillVideoTab";
import useHttpClient from "../../hooks/useHttpClient";
import {StatusBar} from "expo-status-bar";
import DrillVideoTabs from "../../components/drill-videos/DrillVideoTabs";
import {doesEveryDrillHaveFeedback, doesEveryDrillHaveSubmission} from "../../util/sessionUtil";
import {CoachScreenNames, PlayerScreenNames} from "../ScreenNames";
import useLongRequest from "../../hooks/useLongRequest";
import {doesDrillHaveFeedback, doesDrillHaveSubmission} from "../../util/drillUtil";
import SessionListItem from "./SessionListItem";
import {LongRequestType} from "../../model/longRequest";


const SessionScreen = ({route}) => {

    const [session, setSession] = useState(route.params.session);
    const [currentDrillId, setCurrentDrillId] = useState();
    const [selectedTab, setSelectedTab] = useState(!!route.params.tab ? route.params.tab : DrillVideoTab.Demo);
    const [outstandingRequestsForSession, setOutstandingRequestsForSession] = useState([]);

    const isFocused = useIsFocused();
    const {outstandingLongRequests} = useLongRequest();
    const navigation = useNavigation();
    const {httpClient} = useHttpClient();

    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentDrillId(viewableItems[0].item.drillId);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    const onOutstandingRequestsChange = async () => {
        const sessionDrillIds = session.drills.map(drill => drill.drillId);
        const requests = outstandingLongRequests
            .filter(request => request.operation === LongRequestType.CreateSubmission || request.operation === LongRequestType.CreateFeedback)
            .filter(request => sessionDrillIds.includes(request.metadata.drillId));

        if (requests.length !== outstandingRequestsForSession.length) {
            const sessions = await httpClient.getPlayerSessions(playerId);
            const updatedSession = sessions.find(s => s.sessionNumber === session.sessionNumber);
            const justCompleted = !doesEveryDrillHaveFeedback(session) && doesEveryDrillHaveFeedback(updatedSession);
            setSession(updatedSession);
            setOutstandingRequestsForSession(requests);
            if (justCompleted) {
                navigation.navigate(CoachScreenNames.SessionComplete);
            }
        }
    }

    useEffect(() => {
        onOutstandingRequestsChange();
    }, [outstandingLongRequests]);

    const lastDrillId = session.drills[session.drills.length - 1].drillId;
    const hasSubmission = doesDrillHaveSubmission(session.drills.find(drill => drill.drillId === currentDrillId));
    const hasFeedback = doesDrillHaveFeedback(session.drills.find(drill => drill.drillId === currentDrillId));
    const sessionNumber = session.sessionNumber;
    const playerId = session.playerId;

    const getOutstandingRequestForDrill = (drillId) => {
        const outstandingRequestsForDrill = outstandingRequestsForSession
            .filter(request => request.metadata.drillId === drillId);
        return outstandingRequestsForDrill.length > 0 ? outstandingRequestsForDrill[0] : null;
    }

    const renderItem = useCallback(({item}) => {
        return (
            <SessionListItem
                item={item}
                selectedTab={selectedTab}
                isFocused={currentDrillId === item.drillId && isFocused}
                sessionNumber={sessionNumber}
                playerId={playerId}
                shouldShowSwipeUpIndicator={currentDrillId !== lastDrillId}
                outstandingLongRequest={getOutstandingRequestForDrill(item.drillId)}/>
        );
    }, [currentDrillId, selectedTab, sessionNumber, playerId, isFocused, outstandingRequestsForSession]);

    const extractKey = useCallback((item) => {
        return item.drillId;
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                pagingEnabled
                data={session.drills}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                showsVerticalScrollIndicator={false}
                keyExtractor={extractKey}
                renderItem={renderItem}
            />

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