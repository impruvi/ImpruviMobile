import {StyleSheet, Text, TouchableOpacity, View, SafeAreaView} from "react-native";
import {DrillVideoTab} from "../../constants/drillVideoTab";
import {Colors} from "../../constants/colors";

const DrillVideoTabs = ({selectedTab, setSelectedTab, hasSubmission, hasFeedback}) => {
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(DrillVideoTab.Demo)}>
                        <Text style={selectedTab === DrillVideoTab.Demo ? styles.tabTextSelected : styles.tabText}>
                            Demo
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(DrillVideoTab.Submission)}>
                        <Text style={selectedTab === DrillVideoTab.Submission ? styles.tabTextSelected : styles.tabText}>
                            Submission
                        </Text>
                        {hasSubmission && (
                            <View style={styles.dot}/>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(DrillVideoTab.Feedback)}>
                        <Text style={selectedTab === DrillVideoTab.Feedback ? styles.tabTextSelected : styles.tabText}>
                            Feedback
                        </Text>
                        {hasFeedback && (
                            <View style={styles.dot}/>
                        )}
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0
    },
    content: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 40,
        marginTop: 5,
    },
    tab: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: 'center',
        flexDirection: 'row',
    },
    tabText: {
        color: Colors.TextLightSecondary,
        fontWeight: '600',
        fontSize: 14,
        textShadowColor: 'rgba(0, 0, 0, .2)',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 1
    },
    tabTextSelected: {
        color: 'white',
        fontWeight: '800',
        fontSize: 18,
        textShadowColor: 'rgba(0, 0, 0, .3)',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 2
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 5,
        backgroundColor: Colors.Primary,
        position: 'absolute',
        top: 8,
        right: 2
    }
});

export default DrillVideoTabs;