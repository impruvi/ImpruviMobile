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
import Toggle from "./toggle/Toggle";
import {HomeTab} from "./tab";
import Month from "./month/Month";
import Loader from "../../../components/Loader";
import Reload from "../../../components/Reload";


const HomeScreen = () => {

    const [sessions, setSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [selectedTab, setSelectedTab] = useState(HomeTab.Week);

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

    return (
        <View style={{flex: 1}}>
            <HeaderScrollView>
                <Header />

                {isLoading && (
                    <View style={{height: 200}}>
                        <Loader />
                    </View>
                )}
                {!isLoading && (
                    <>
                        {hasError && (
                            <View style={{height: 200}}>
                                <Reload onReload={getSessions}/>
                            </View>
                        )}
                        {!hasError && (
                            <>
                                <Week sessions={sessions} visible={selectedTab === HomeTab.Week}/>
                                <Month sessions={sessions} visible={selectedTab === HomeTab.Month}/>

                                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15}}>
                                    <View style={{flexDirection: 'row', flex: 1}}>
                                        <Image source={SwipeIcon} style={{width: 20, height: 20}}/>
                                        <Text style={{marginLeft: 5, color: '#6B6B6B', fontSize: 12, flex: 1, flexWrap: 'wrap'}}>
                                            swipe to view past and future {selectedTab === HomeTab.Month ? 'months' : 'trainings'}
                                        </Text>
                                    </View>
                                    <Toggle setSelectedTab={setSelectedTab} selectedTab={selectedTab}/>
                                </View>

                                <Progress sessions={sessions}/>
                            </>
                        )}
                    </>
                )}


            </HeaderScrollView>

            <StatusBar style="dark" />
        </View>
    )
};

export default HomeScreen;