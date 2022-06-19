import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Colors} from "../../constants/colors";
import {PlayerScreenNames} from '../ScreenNames';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useCallback, useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";
import useError from "../../hooks/useError";
import useHttpClient from "../../hooks/useHttpClient";
import SessionCard from "../../components/on-demand/SessionCard";
import HomeSlides from "../../components/home-slides/HomeSlides";
import Calendar from "../../components/calendar/Calendar";

const Tabs = {
    List: 'LIST',
    Calendar: 'CALENDAR'
}

const TrainingScreen = () => {

    const [sessions, setSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [selectedTab, setSelectedTab] = useState(Tabs.Calendar);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {player} = useAuth();
    const {setError} = useError();


    const getSessions = async () => {
        setIsLoading(true);
        setHasError(false);
        await getSessionsLazy();
        setIsLoading(false);
    }

    const getSessionsLazy = async () => {
        try {
            const allSessions = await httpClient.getPlayerSessions(player.playerId);
            setSessions(allSessions);
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
            setHasError(true);
        }
    }

    useEffect(() => {
        getSessions();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getSessionsLazy();
        }, [httpClient, navigation])
    );

    const navigateToCoach = () => {
        navigation.navigate(PlayerScreenNames.CoachDetails)
    }

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                    <View style={{paddingHorizontal: 15, marginTop: 10}}>
                        <Text style={{marginBottom: 15, marginTop: 5, fontSize: 22}}>{player.firstName}'s training plan</Text>
                    </View>


                    <HomeSlides navigateToCoach={navigateToCoach} sessions={sessions}/>

                    <View style={{paddingHorizontal: 15, marginTop: 10}}>
                        <View style={{flexDirection: 'row', marginBottom: 15}}>
                            <TouchableOpacity onPress={() => setSelectedTab(Tabs.Calendar)}
                                              style={{paddingVertical: 6, paddingHorizontal: 10, flexDirection: 'row', borderBottomWidth: selectedTab === Tabs.Calendar ? 2 : 0, borderColor: Colors.Primary}}>
                                <Text style={{fontWeight: '500', color: selectedTab === Tabs.Calendar ? Colors.Primary: 'black'}}>Calendar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setSelectedTab(Tabs.List)}
                                              style={{paddingVertical: 6, paddingHorizontal: 10, flexDirection: 'row', borderBottomWidth: selectedTab === Tabs.List ? 2 : 0, marginLeft: 10, borderColor: Colors.Primary}}>
                                <Text style={{fontWeight: '500', color: selectedTab === Tabs.List ? Colors.Primary: 'black'}}>Sessions</Text>
                            </TouchableOpacity>
                        </View>

                        {selectedTab === Tabs.List && sessions.map(session => (
                            <SessionCard session={session} key={session.sessionNumber}/>
                        ))}

                        {selectedTab === Tabs.Calendar && (
                            <Calendar sessions={sessions}/>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>

            <StatusBar style="dark" />
        </View>
    )
};

export default TrainingScreen;
