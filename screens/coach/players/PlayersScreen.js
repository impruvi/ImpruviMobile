import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useCallback, useEffect, useRef, useState} from "react";
import useHttpClient from "../../../hooks/useHttpClient";
import useAuth from "../../../hooks/useAuth";
import useError from "../../../hooks/useError";
import Loader from "../../../components/Loader";
import Reload from "../../../components/Reload";
import {StatusBar} from "expo-status-bar";
import {CoachScreenNames} from "../../ScreenNames";
import {Colors} from "../../../constants/colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faMagnifyingGlass, faXmarkCircle} from "@fortawesome/pro-light-svg-icons";
import HeadshotChip from "../../../components/HeadshotChip";
import {doesAnySessionRequireFeedback, doesPlayerNeedMoreTrainings} from "../../../util/playerUtil";
import EmptyPlaceholder from "../../../components/EmptyPlaceholder";


function comparePlayerSessions( playerSession1, playerSession2 ) {
    if ( playerSession1.player.firstName < playerSession2.player.firstName ){
        return -1;
    }
    if ( playerSession1.player.firstName > playerSession2.player.firstName ){
        return 1;
    }
    return 0;
}

const PlayersScreen = () => {
    const [searchInput, setSearchInput] = useState('');
    const [allPlayerSessions, setAllPlayerSessions] = useState([]);
    const [visiblePlayerSessions, setVisiblePlayerSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const searchInputRef = useRef();
    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {coach} = useAuth();
    const {setError} = useError();

    const getAllPlayerSessions = async () => {
        setIsLoading(true);
        setHasError(false);
        await getAllPlayerSessionsLazy();
        setIsLoading(false);
    }

    const getAllPlayerSessionsLazy = async () => {
        try {
            const playerSessions = await httpClient.getCoachSessions(coach.coachId);
            setAllPlayerSessions(playerSessions);
            updateVisiblePlayerSessions(searchInput, playerSessions);
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
            setHasError(true);
        }
    }

    const onSearchInputChange = (text) => {
        setSearchInput(text);
        updateVisiblePlayerSessions(text, allPlayerSessions);
    }

    const updateVisiblePlayerSessions = (input, allPlayerSessions) => {
        if (!input || input.length === 0) {
            setVisiblePlayerSessions(allPlayerSessions.sort(comparePlayerSessions));
        } else {
            const matchingPlayerSessions = allPlayerSessions.filter(playerSession => {
                return playerSession.player.firstName.toLowerCase().search(input.toLowerCase()) >= 0
                    || playerSession.player.lastName.toLowerCase().search(input.toLowerCase()) >= 0;
            })
            setVisiblePlayerSessions(matchingPlayerSessions.sort(comparePlayerSessions));
        }
    }

    const clearSearchInput = () => {
        setSearchInput('');
        searchInputRef.current?.focus();
        setVisiblePlayerSessions(allPlayerSessions.sort(comparePlayerSessions));
    }


    useEffect(() => {
        getAllPlayerSessions();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getAllPlayerSessionsLazy();
        }, [httpClient, navigation])
    );

    return (
        <View style={{flex: 1}}>
            <SafeAreaView style={{flex: 1}}>
                <View style={{paddingHorizontal: 15}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10, backgroundColor: '#F7F7F7', borderRadius: 30}}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size={15} style={{marginHorizontal: 10, color: '#878787'}}/>
                        <TextInput
                            ref={searchInputRef}
                            style={{flex: 1, fontSize: 14, paddingVertical: 10}}
                            onChangeText={onSearchInputChange}
                            value={searchInput}
                            placeholder="Search your players"
                            placeholderTextColor="#878787"
                        />
                        <TouchableOpacity style={{paddingHorizontal: 10, paddingVertical: 10}} onPress={clearSearchInput}>
                            <FontAwesomeIcon icon={faXmarkCircle} size={18} style={{color: '#878787'}}/>
                        </TouchableOpacity>
                    </View>
                </View>

                {isLoading && <Loader/>}
                {!isLoading && (
                    <>
                        {hasError && <Reload onReload={getAllPlayerSessions}/>}
                        {!hasError && (
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {allPlayerSessions.length === 0 && (
                                    <EmptyPlaceholder text={'No players'}/>
                                )}
                                {visiblePlayerSessions.map(playerSession => (
                                    <TouchableHighlight underlayColor="#EFF3F4" onPress={() => navigation.navigate(CoachScreenNames.Player, {
                                        player: playerSession.player
                                    })} key={playerSession.player.playerId}>
                                        <View style={{flexDirection: 'row', paddingVertical: 12, alignItems: 'center', paddingHorizontal: 15}}>
                                            <View style={(doesAnySessionRequireFeedback(playerSession.sessions) || doesPlayerNeedMoreTrainings(playerSession.player, playerSession.sessions)) ? {backgroundColor: Colors.Primary, width: 6, height: 6, borderRadius: 6, marginRight: 8} : {width: 6, height: 6, borderRadius: 6, marginRight: 8}}/>
                                            <HeadshotChip firstName={playerSession.player.firstName} lastName={playerSession.player.lastName} image={playerSession.player.headshot}/>
                                            <View style={{flex: 1, paddingHorizontal: 10}}>
                                                <Text style={{fontWeight: '500', fontSize: 14}}>{playerSession.player.firstName} {playerSession.player.lastName}</Text>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                ))}
                            </ScrollView>
                        )}
                    </>
                )}
            </SafeAreaView>

            <StatusBar style="dark" />
        </View>
    )
}

const styles = StyleSheet.create({
    subHeader: {
        marginVertical: 10,
        fontWeight: '600'
    },
    sessionStat: {
        width: '33%',
        padding: 5,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    sessionStatValue: {
        fontSize: 25,
        fontWeight: '300'
    },
    sessionStatText: {
        textAlign: 'center',
        fontSize: 12,
        color: Colors.TextSecondary
    }
});

export default PlayersScreen;