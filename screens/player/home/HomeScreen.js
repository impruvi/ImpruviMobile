import {Image, StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useCallback, useEffect, useRef, useState} from "react";
import useAuth from "../../../hooks/useAuth";
import useError from "../../../hooks/useError";
import useHttpClient from "../../../hooks/useHttpClient";
import SwipeIcon from '../../../assets/icons/SwipeGrey.png'
import HeaderScrollView from "./header-scroll-view/HeaderScrollView";
import Week from "./week/Week";
import Header from "./header/Header";
import Progress from "./progress/Progress";
import ReloadableScreen from "../../../components/ReloadableScreen";


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
    const firstLoad = useRef(true);

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
            if (firstLoad.current) {
                firstLoad.current = false;
                return;
            }
            getSessionsLazy();
        }, [httpClient, navigation])
    );

    useEffect(() => {
        initialize();
    }, []);

    return (
        <View style={styles.container}>
            <ReloadableScreen isLoading={isLoading}
                              hasError={hasError}
                              onReload={initialize}
                              render={() => (
                                  <HeaderScrollView imageFileLocation={coach?.headerImage?.fileLocation}>
                                      <Header player={player}
                                              coach={coach}/>
                                      <Week sessions={sessions} />

                                      {sessions.length > 0 && (
                                          <View style={styles.helpContainer}>
                                              <Image source={SwipeIcon} style={styles.helpImage}/>
                                              <Text style={styles.helpText}>
                                                  swipe to view past and future trainings
                                              </Text>
                                          </View>
                                      )}

                                      <Progress sessions={sessions}
                                                playerId={playerId}/>
                                  </HeaderScrollView>
                              )}/>

            <StatusBar style="dark" />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    helpContainer: {
        flexDirection: 'row',
        flex: 1,
        paddingHorizontal: 15
    },
    helpImage: {
        width: 20,
        height: 20
    },
    helpText: {
        marginLeft: 5,
        color: '#6B6B6B',
        fontSize: 12,
        flex: 1,
        flexWrap: 'wrap'
    }
});

export default HomeScreen;
