import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {DrillVideoTab} from "../constants/drillVideoTab";
import {Colors} from "../constants/colors";

const DrillVideoTabs = ({selectedTab, setSelectedTab}) => {
    return (
        <View style={{position: 'absolute', width: '100%', top: 0, left: 0}}>
            <View style={{flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
                <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(DrillVideoTab.Demo)}>
                    <Text style={selectedTab === DrillVideoTab.Demo ? {...styles.tabText, ...styles.tabTextSelected} : styles.tabText}>
                        Demo
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(DrillVideoTab.Submission)}>
                    <Text style={selectedTab === DrillVideoTab.Submission ? {...styles.tabText, ...styles.tabTextSelected} : styles.tabText}>
                        Submission
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(DrillVideoTab.Feedback)}>
                    <Text style={selectedTab === DrillVideoTab.Feedback ? {...styles.tabText, ...styles.tabTextSelected} : styles.tabText}>
                        Feedback
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    tab: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
        flexDirection: 'row'
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
    }
});

export default DrillVideoTabs;