import {SafeAreaView, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {useEffect, useState} from "react";
import useHttpClient from "../hooks/useHttpClient";
import useAuth from "../hooks/useAuth";
import {Colors} from "../constants/colors";
import SessionOverview from "../components/SessionOverview";

const Tabs = {
    NextSession: 'NextSession',
    FullPlan: 'FullPlan'
}

const Training = () => {
    const [selectedTab, setSelectedTab] = useState(Tabs.NextSession);
    const [sessions, setSessions] = useState([]);
    const {httpClient} = useHttpClient();
    const {userId} = useAuth();

    useEffect(() => {
        httpClient.getSessions(userId).then(setSessions);
    }, []);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <View style={styles.tabs}>
                    <TouchableOpacity style={selectedTab === Tabs.NextSession ? {...styles.tab, ...styles.tabSelected} : styles.tab}
                                      onPress={() => setSelectedTab(Tabs.NextSession)}>
                        <Text style={selectedTab === Tabs.NextSession ? {...styles.tabText, ...styles.tabSelectedText} : styles.tabText}>
                            Next session
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={selectedTab === Tabs.FullPlan ? {...styles.tab, ...styles.tabSelected} : styles.tab}
                                      onPress={() => setSelectedTab(Tabs.FullPlan)}>
                        <Text style={selectedTab === Tabs.FullPlan ? {...styles.tabText, ...styles.tabSelectedText} : styles.tabText}>
                            Full plan
                        </Text>
                    </TouchableOpacity>
                </View>

                {selectedTab === Tabs.NextSession && sessions.length > 0 && (
                    <SessionOverview session={sessions[0]} />
                )}
                {selectedTab === Tabs.FullPlan && (
                    <View>
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#EFF3F4'
    },
    container: {
        flex: 1,
        paddingHorizontal: 15
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    headerOption: {
        paddingVertical: 10,
        paddingHorizontal: 26,
        borderRadius: 12,
        marginHorizontal: 5
    },
    headerOptionSelected: {
        backgroundColor: Colors.Primary,
    },
    headerOptionText: {
        fontWeight: '600',
        color: '#212022'
    },
    headerOptionTextSelected: {
        color: 'white'
    },

    tabs: {
        flexDirection: 'row',
        marginVertical: 10
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabSelected: {
        backgroundColor: Colors.PrimaryWashed,
    },
    tabText: {
        fontWeight: '500'
    },
    tabSelectedText: {
        color: Colors.Primary
    }
})

export default Training;
