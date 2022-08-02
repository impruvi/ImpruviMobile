import {useCallback, useRef, useState} from "react";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import useHttpClient from "../../hooks/useHttpClient";
import {FlatList, StyleSheet, View} from "react-native";
import VideoBackIcon from "../../components/VideoBackIcon";
import {StatusBar} from "expo-status-bar";
import PreviewSessionListItem from "./PreviewSessionListItem";

const PreviewSessionScreen = ({route}) => {

    const [session, setSession] = useState(route.params.session);
    const [currentDrillId, setCurrentDrillId] = useState();

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const firstLoad = useRef(true);

    useFocusEffect(
        useCallback(() => {
            if (firstLoad.current) {
                firstLoad.current = false;
                return;
            }
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
    const lastDrillId = session.drills[session.drills.length - 1].drillId;

    const extractKey = useCallback(item => item.drillId, []);
    const renderItem = useCallback(({item}) => {
        return (
            <PreviewSessionListItem item={item}
                                    currentDrillId={currentDrillId}
                                    shouldShowSwipeUpIndicator={currentDrillId !== lastDrillId}
                                    sessionNumber={session.sessionNumber}/>
        )
    }, [lastDrillId, currentDrillId]);

    return (
        <View style={styles.container}>
            <FlatList
                pagingEnabled
                data={session.drills}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                showsVerticalScrollIndicator={false}
                keyExtractor={extractKey}
                renderItem={renderItem}/>

            <VideoBackIcon onPress={navigation.goBack} />

            <StatusBar style="light" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
});

export default PreviewSessionScreen;