import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {useRef, useState} from "react";
import VideoBackIcon from "../components/VideoBackIcon";
import {useNavigation} from "@react-navigation/native";
import {LinearGradient} from "expo-linear-gradient";
import {Colors} from "../constants/colors";
import SessionProgress from "../components/SessionProgress";
import FeedbackVideos from "../components/FeedbackVideos";
import {FeedbackTabs} from "../constants/feedbackTabs";

const SessionFeedbackScreen = ({route}) => {
    const navigation = useNavigation();
    const {session} = route.params;
    const [currentDrillId, setCurrentDrillId] = useState();
    const [selectedTab, setSelectedTab] = useState(FeedbackTabs.Feedback);

    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentDrillId(viewableItems[0].item.drill.drillId);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    return (
        <View style={{flex: 1}}>
            <FlatList
                pagingEnabled
                data={session.drills}
                onViewableItemsChanged={viewableItemsChanged}
                bounces={false}
                viewabilityConfig={viewConfig}
                keyExtractor={(item) => item.drill.drillId}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => <FeedbackVideos
                    drill={item}
                    selectedTab={selectedTab}
                    isVisible={currentDrillId === item.drill.drillId}/>}
            />

            <SessionProgress session={session} currentDrillId={currentDrillId}/>

            <View style={{position: 'absolute', height: 85, width: '100%', top: 0, left: 0}}>
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,.4)']}
                    start={{x: 0, y: 1}}
                    end={{x: 0, y: 0}}
                    style={{flex: 1, width: '100%'}}>
                    <SafeAreaView style={{flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                        <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(FeedbackTabs.Demo)}>
                            <Text style={selectedTab === FeedbackTabs.Demo ? {...styles.tabText, ...styles.tabTextSelected} : styles.tabText}>
                                Demo
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(FeedbackTabs.Submission)}>
                            <Text style={selectedTab === FeedbackTabs.Submission ? {...styles.tabText, ...styles.tabTextSelected} : styles.tabText}>
                                Submission
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(FeedbackTabs.Feedback)}>
                            <Text style={selectedTab === FeedbackTabs.Feedback ? {...styles.tabText, ...styles.tabTextSelected} : styles.tabText}>
                                Feedback
                            </Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </LinearGradient>
            </View>

            <VideoBackIcon onPress={() => navigation.goBack()} />
        </View>
    )
}

const styles = StyleSheet.create({
    tab: {
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: 'row'
    },
    tabText: {
        color: Colors.TextSecondary,
        fontWeight: '500',
        fontSize: 15
    },
    tabTextSelected: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16
    }
});

export default SessionFeedbackScreen;
