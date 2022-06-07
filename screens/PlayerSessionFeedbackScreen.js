import {FlatList, View} from "react-native";
import {useRef, useState} from "react";
import VideoBackIcon from "../components/VideoBackIcon";
import {useNavigation} from "@react-navigation/native";
import SessionProgress from "../components/SessionProgress";
import FeedbackVideos from "../components/FeedbackVideos";
import {StatusBar} from "expo-status-bar";

const PlayerSessionFeedbackScreen = ({route}) => {
    const navigation = useNavigation();
    const {session} = route.params;
    const [currentDrillId, setCurrentDrillId] = useState();

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
                    drill={item}
                    isLast={currentDrillId === session.drills[session.drills.length - 1].drill.drillId}
                    isVisible={currentDrillId === item.drill.drillId}/>}
            />

            <SessionProgress session={session} currentDrillId={currentDrillId}/>
            <VideoBackIcon onPress={() => navigation.goBack()} />

            <StatusBar style="light" />
        </View>
    )
}

export default PlayerSessionFeedbackScreen;
