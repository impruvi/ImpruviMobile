import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {Video} from "expo-av";
import {useEffect, useRef, useState} from "react";
import VideoBackIcon from "../components/VideoBackIcon";
import {useNavigation} from "@react-navigation/native";
import {LinearGradient} from "expo-linear-gradient";
import {Colors} from "../constants/colors";
import SessionProgress from "../components/SessionProgress";

const Tabs = {
    Demo: 'Demo',
    Submission: 'Submission',
    Feedback: 'Feedback'
}

const DrillVideos = ({drill, isVisible, selectedTab}) => {
    const {height} = useWindowDimensions();
    const demoRef = useRef();
    const submissionRef = useRef();
    const feedbackRef = useRef();

    useEffect(() => {
        if (!isVisible) {
            demoRef.current.pauseAsync();
            submissionRef.current.pauseAsync();
            feedbackRef.current.pauseAsync();
        } else {
            if (selectedTab === Tabs.Demo) {
                demoRef.current.playAsync();
                submissionRef.current.pauseAsync();
                feedbackRef.current.pauseAsync();
            } else if (selectedTab === Tabs.Submission) {
                demoRef.current.pauseAsync();
                submissionRef.current.playAsync();
                feedbackRef.current.pauseAsync();
            } else {
                demoRef.current.pauseAsync();
                submissionRef.current.pauseAsync();
                feedbackRef.current.playAsync();
            }
        }
    }, [isVisible, selectedTab]);

    return (
        <View key={drill.drillId} style={{height: height, position: 'relative'}}>
            <Video
                ref={demoRef}
                style={selectedTab === Tabs.Demo ? {flex: 1} : {display: 'none'}}
                source={{
                    uri: drill.drill.videos.front.fileLocation,
                }}
                resizeMode="cover"
                isLooping/>
            <Video
                ref={submissionRef}
                style={selectedTab === Tabs.Submission ? {flex: 1} : {display: 'none'}}
                source={{
                    uri: drill.submission.fileLocation,
                }}
                resizeMode="cover"
                isLooping/>
            <Video
                ref={feedbackRef}
                style={selectedTab === Tabs.Feedback ? {flex: 1} : {display: 'none'}}
                source={{
                    uri: drill.feedback.fileLocation,
                }}
                resizeMode="cover"
                isLooping/>
        </View>
    )
}

const SessionFeedbackScreen = ({route}) => {
    const navigation = useNavigation();
    const {session} = route.params;
    const {height} = useWindowDimensions();
    const [currentDrillId, setCurrentDrillId] = useState();
    const [selectedTab, setSelectedTab] = useState(Tabs.Feedback);

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
                renderItem={({item}) => <DrillVideos
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
                        <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(Tabs.Demo)}>
                            <Text style={selectedTab === Tabs.Demo ? {...styles.tabText, ...styles.tabTextSelected} : styles.tabText}>
                                Demo
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(Tabs.Submission)}>
                            <Text style={selectedTab === Tabs.Submission ? {...styles.tabText, ...styles.tabTextSelected} : styles.tabText}>
                                Submission
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(Tabs.Feedback)}>
                            <Text style={selectedTab === Tabs.Feedback ? {...styles.tabText, ...styles.tabTextSelected} : styles.tabText}>
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
