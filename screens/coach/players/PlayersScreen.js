import {SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useCallback, useEffect, useRef, useState} from "react";
import useHttpClient from "../../../hooks/useHttpClient";
import useAuth from "../../../hooks/useAuth";
import useError from "../../../hooks/useError";
import Loader from "../../../components/Loader";
import Reload from "../../../components/Reload";
import {StatusBar} from "expo-status-bar";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faMagnifyingGlass, faXmarkCircle} from "@fortawesome/pro-light-svg-icons";
import {doesAnySessionRequireFeedback, doesPlayerNeedMoreSessions, findSubscription} from "../../../util/playerUtil";
import EmptyPlaceholder from "../../../components/EmptyPlaceholder";
import PlayerListItem from "./PlayerListItem";


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
    const [playersAndSubscriptions, setPlayersAndSubscriptions] = useState([]);
    const [visiblePlayerSessions, setVisiblePlayerSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const searchInputRef = useRef();
    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {coachId} = useAuth();
    const {setError} = useError();
    const firstLoad = useRef(true);

    const getAllPlayerSessions = async () => {
        setIsLoading(true);
        setHasError(false);
        await getAllPlayerSessionsLazy();
        setIsLoading(false);
    }

    const getAllPlayerSessionsLazy = async () => {
        try {
            const [allPlayerSessions, playersAndSubscriptions] = await Promise.all([
                httpClient.getPlayerSessionsForCoach(coachId),
                httpClient.getPlayersAndSubscriptionsForCoach(coachId)
            ]);
            setPlayersAndSubscriptions(playersAndSubscriptions);
            setAllPlayerSessions(allPlayerSessions);
            updateVisiblePlayerSessions(searchInput, allPlayerSessions);
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
            if (firstLoad.current) {
                firstLoad.current = false;
                return;
            }
            getAllPlayerSessionsLazy();
        }, [httpClient, navigation])
    );

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.header}>
                    <View style={styles.searchBar}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size={15} style={styles.searchIcon}/>
                        <TextInput
                            ref={searchInputRef}
                            style={styles.searchInput}
                            onChangeText={onSearchInputChange}
                            value={searchInput}
                            placeholder="Search your players"
                            placeholderTextColor="#878787"
                        />
                        <TouchableOpacity style={styles.clearSearchInputButton} onPress={clearSearchInput}>
                            <FontAwesomeIcon icon={faXmarkCircle} size={18} style={styles.clearSearchInputIcon}/>
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
                                    <PlayerListItem key={playerSession.player.playerId}
                                                    playerSession={playerSession}
                                                    subscription={findSubscription(playerSession.player, playersAndSubscriptions)}
                                                    actionRequired={doesAnySessionRequireFeedback(playerSession.sessions) || doesPlayerNeedMoreSessions(findSubscription(playerSession.player, playersAndSubscriptions), playerSession.sessions)}/>
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
    container: {
        flex: 1
    },
    safeAreaView: {
        flex: 1
    },
    header: {
        paddingHorizontal: 15
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: '#F7F7F7',
        borderRadius: 30
    },
    searchIcon: {
        marginHorizontal: 10,
        color: '#878787'
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        paddingVertical: 10
    },
    clearSearchInputButton: {
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    clearSearchInputIcon: {
        color: '#878787'
    }
});

export default PlayersScreen;