import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import useHttpClient from "../hooks/useHttpClient";
import useAuth from "../hooks/useAuth";
import SessionOverview from "../components/SessionOverview";
import {ScreenNames} from "./ScreenNames";
import {useNavigation} from "@react-navigation/native";


const TrainingScreen = () => {
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
                    Next session
                </Text>

                {sessions.length > 0 && (
                    <SessionOverview session={sessions[0]} startSession={() => navigation.navigate(ScreenNames.Session, {
                        session: sessions[0]
                    })}/>
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
        fontSize: 25,
        fontWeight: '600',
        marginBottom: 10
    }
});

export default TrainingScreen;
