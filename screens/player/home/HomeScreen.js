import {Image, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useCallback, useEffect, useState} from "react";
import useAuth from "../../../hooks/useAuth";
import useError from "../../../hooks/useError";
import useHttpClient from "../../../hooks/useHttpClient";
import SwipeIcon from '../../../assets/icons/SwipeGrey.png'
import HeaderScrollView from "./header-scroll-view/HeaderScrollView";
import Week from "./week/Week";
import Header from "./header/Header";
import Progress from "./progress/Progress";
import Loader from "../../../components/Loader";
import Reload from "../../../components/Reload";


const HomeScreen = () => {

    const [player, setPlayer] = useState();
    const [coach, setCoach] = useState();
    const [sessions, setSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {playerId} = useAuth();
    const {setError} = useError();

    const getSessionsLazy = async () => {
        try {
            const sessions = await httpClient.getPlayerSessions(playerId);
            setSessions(sessions);
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
        }
    }

    const initialize = async () => {
        setIsLoading(true);
        try {
            const [player, sessions] = await Promise.all([
                httpClient.getPlayer(playerId),
                httpClient.getPlayerSessions(playerId)
            ]);
            const coach = await httpClient.getCoach(player.coachId);
            setPlayer(player);
            setCoach(coach);
            setSessions(sessions);
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
            setHasError(true);
        }
        setIsLoading(false);
    };


    useFocusEffect(
        useCallback(() => {
            getSessionsLazy();
        }, [httpClient, navigation])
    );

    useEffect(() => {
        initialize();
    }, []);

    return (
        <View style={{flex: 1}}>
            {isLoading && (
                <View style={{height: 200}}>
                    <Loader />
                </View>
            )}
            {!isLoading && (
                <>
                    {hasError && (
                        <View style={{height: 200}}>
                            <Reload onReload={initialize}/>
                        </View>
                    )}
                    {!hasError && (
                        <HeaderScrollView imageFileLocation={coach?.headerImage?.fileLocation}>
                            <Header player={player}
                                    coach={coach}/>
                            <Week sessions={sessions} />

                            {sessions.length > 0 && (
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15}}>
                                    <View style={{flexDirection: 'row', flex: 1}}>
                                        <Image source={SwipeIcon} style={{width: 20, height: 20}}/>
                                        <Text style={{marginLeft: 5, color: '#6B6B6B', fontSize: 12, flex: 1, flexWrap: 'wrap'}}>
                                            swipe to view past and future trainings
                                        </Text>
                                    </View>
                                </View>
                            )}

                            <Progress sessions={sessions}
                                      playerId={playerId}/>
                        </HeaderScrollView>
                    )}
                </>
            )}

            <StatusBar style="dark" />
        </View>
    )
};

export default HomeScreen;
