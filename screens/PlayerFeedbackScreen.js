import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import useHttpClient from "../hooks/useHttpClient";
import useAuth from "../hooks/useAuth";
import {useCallback, useState} from "react";
import {commonStyles} from '../styles/commonStyles';
import {ScreenNames} from "./ScreenNames";
import {Colors} from "../constants/colors";
import SubmissionStatus from "../components/SubmissionStatus";
import FeedbackStatus from "../components/FeedbackStatus";


const PlayerFeedbackScreen = () => {
    const navigation = useNavigation();
    const [sessions, setSessions] = useState([]);
    const {httpClient} = useHttpClient();
    const {userId} = useAuth();

    useFocusEffect(
        useCallback(() => {
            httpClient.getPlayerSessions(userId).then(setSessions);
        }, [httpClient, navigation])
    );

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <Text style={styles.header}>
                    Feedback
                </Text>

                <ScrollView>
                    {sessions.map(session => (
                        <View style={commonStyles.row} key={session.sessionNumber}>
                            <View style={commonStyles.box}>
                                <Text style={{fontSize: 24, fontWeight: '500', marginBottom: 10}}>Session {session.sessionNumber}</Text>
                                {session.drills.map(drill => (
                                    <View style={{marginVertical: 10}} key={drill.drill.drillId}>
                                        <Text style={styles.drillName}>
                                            {drill.drill.name}
                                        </Text>

                                        <SubmissionStatus drill={drill}/>
                                        <FeedbackStatus drill={drill}/>
                                    </View>
                                ))}
                                <TouchableOpacity style={{width: '100%', justifyContent: 'center', alignItems: 'center', paddingVertical: 13, borderRadius: 30, backgroundColor: Colors.Primary, marginTop: 15}}
                                                  onPress={() => navigation.navigate(ScreenNames.PlayerSessionFeedback, {
                                                      session: session
                                                  })}>
                                    <Text style={{color: 'white', fontWeight: '600'}}>View feedback</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
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
        fontSize: 25,
        fontWeight: '600',
        marginBottom: 10
    },
    drillName: {
        width: '100%',
        marginBottom: 8,
        fontWeight: '500'
    }
});

export default PlayerFeedbackScreen;
