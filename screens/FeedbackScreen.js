import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import useHttpClient from "../hooks/useHttpClient";
import useAuth from "../hooks/useAuth";
import {useEffect, useState} from "react";
import {commonStyles} from '../styles/commonStyles';
import {ScreenNames} from "./ScreenNames";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faCheck} from '@fortawesome/pro-light-svg-icons';
import {doesDrillHaveFeedback, doesDrillHaveSubmission} from "../util/drillUtil";

const FeedbackScreen = () => {
    const navigation = useNavigation();
    const [sessions, setSessions] = useState([]);
    const {httpClient} = useHttpClient();
    const {userId} = useAuth();

    useEffect(() => {
        httpClient.getSessions(userId).then(setSessions);
    }, []);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <Text style={styles.header}>
                    Feedback
                </Text>

                <ScrollView>
                    {sessions.map(session => (
                        <View style={commonStyles.row}>
                            <TouchableOpacity style={commonStyles.box} onPress={() => navigation.navigate(ScreenNames.SessionFeedback, {
                                session: session
                            })}>
                                <Text style={{fontSize: 18, fontWeight: '500'}}>Session {session.sessionNumber}</Text>
                                {session.drills.map(drill => (
                                    <View style={{flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10}} key={drill.drill.drillId}>
                                        <Text style={styles.drillName}>
                                            {drill.drill.name}
                                        </Text>
                                        {doesDrillHaveSubmission(drill)  && (
                                            <View style={styles.status}>
                                                <FontAwesomeIcon icon={faCheck} style={styles.statusIcon} size={12}/>
                                                <Text style={styles.statusText}>Submission</Text>
                                            </View>
                                        )}
                                        {doesDrillHaveFeedback(drill) && (
                                            <View style={styles.status}>
                                                <FontAwesomeIcon icon={faCheck} style={styles.statusIcon} size={12}/>
                                                <Text style={styles.statusText}>Feedback</Text>
                                            </View>
                                        )}
                                    </View>
                                ))}
                            </TouchableOpacity>
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
    },
    status: {
        marginRight: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    statusIcon: {
        color: '#04BE60',
        marginRight: 5
    },
    statusText: {
        color: '#04BE60',
        fontSize: 12
    }
});

export default FeedbackScreen;
