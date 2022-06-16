import {SafeAreaView, ScrollView, Text, View, TouchableOpacity} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Colors} from "../../constants/colors";
import {PlayerScreenNames} from '../ScreenNames';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useCallback, useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";
import useError from "../../hooks/useError";
import useHttpClient from "../../hooks/useHttpClient";
import {doesEveryDrillHaveSubmission} from "../../util/sessionUtil";
import SessionCard from "../../components/on-demand/SessionCard";
import HomeSlides from "../../components/home-slides/HomeSlides";
import Calendar from "../../components/calendar/Calendar";
import SpaceBetweenComponent from "../../components/SpaceBetweenComponent";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCalendarDays, faListUl} from "@fortawesome/pro-light-svg-icons";
import CoachOverview from "../../components/home-slides/CoachOverview";

const Tabs = {
    List: 'LIST',
    Calendar: 'CALENDAR'
}

const TrainingScreen = () => {

    const [nextSession, setNextSession] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [selectedTab, setSelectedTab] = useState(Tabs.Calendar);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {player} = useAuth();
    const {setError} = useError();


    const getNextSession = async () => {
        setIsLoading(true);
        setHasError(false);
        await getNextSessionLazy();
        setIsLoading(false);
    }

    const getNextSessionLazy = async () => {
        try {
            const allSessions = await httpClient.getPlayerSessions(player.playerId);
            const incompleteSessions = allSessions.filter(session => !doesEveryDrillHaveSubmission(session));
            if (incompleteSessions.length > 0) {
                setNextSession(incompleteSessions[0]);
            } else {
                setNextSession(null);
            }
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
            setHasError(true);
        }
    }

    useEffect(() => {
        getNextSession();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getNextSessionLazy();
        }, [httpClient, navigation])
    );

    if (!nextSession) {
        return <View></View>
    }

    const navigateToSession = () => {
        navigation.navigate(PlayerScreenNames.SessionDetails, {
            session: nextSession
        });
    }

    const startSession = () => {
        navigation.navigate(
            {
                name: PlayerScreenNames.SessionNavigator,
                merge: true,
                params: {
                    screen: PlayerScreenNames.Session,
                    params: {
                        session: nextSession
                    }
                }
            });
    }

    const navigateToCoach = () => {
        navigation.navigate(PlayerScreenNames.CoachBio)
    }

    return (
        <View style={{flex: 1}}>
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                    <View style={{paddingHorizontal: 15}}>
                        <Text style={{marginBottom: 15, marginTop: 5, fontSize: 24}}>Hey, Beckett</Text>
                        {/*<Text style={{marginBottom: 5, color: Colors.TextSecondary}}>YOUR COACH</Text>*/}
                        {/*<CoachOverview />*/}
                    </View>


                    <HomeSlides navigateToCoach={navigateToCoach}/>

                    <View style={{paddingHorizontal: 15}}>
                        <Text style={{marginBottom: 5, color: Colors.TextSecondary}}>YOUR TRAINING</Text>
                        <View style={{flexDirection: 'row', marginBottom: 15}}>
                            <TouchableOpacity onPress={() => setSelectedTab(Tabs.Calendar)}
                                              style={{paddingVertical: 6, paddingHorizontal: 15, flexDirection: 'row', backgroundColor: selectedTab === Tabs.Calendar ? Colors.Primary : 'white', borderRadius: 20}}>
                                <Text style={{fontWeight: '500', color: selectedTab === Tabs.Calendar ? 'white': 'black'}}>Calendar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setSelectedTab(Tabs.List)}
                                              style={{paddingVertical: 6, paddingHorizontal: 15, flexDirection: 'row', backgroundColor: selectedTab === Tabs.List ? Colors.Primary : 'white', borderRadius: 20, marginLeft: 10}}>
                                <Text style={{fontWeight: '500', color: selectedTab === Tabs.List ? 'white': 'black'}}>Sessions</Text>
                            </TouchableOpacity>
                        </View>

                        {selectedTab === Tabs.List && (
                            <>
                                <SessionCard navigateToSession={navigateToSession}/>
                                <SessionCard navigateToSession={navigateToSession}/>
                                <SessionCard navigateToSession={navigateToSession}/>
                            </>
                        )}
                        {selectedTab === Tabs.Calendar && (
                            <Calendar navigateToSession={navigateToSession} startSession={startSession}/>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>

            <StatusBar style="dark" />
        </View>
    )
};

export default TrainingScreen;
