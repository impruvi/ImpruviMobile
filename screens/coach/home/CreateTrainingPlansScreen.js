import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import HeaderCenter from "../../../components/HeaderCenter";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft} from "@fortawesome/pro-light-svg-icons";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import CreateTrainingsListItem from "../../../components/CreateTrainingsListItem";
import {useCallback, useRef, useState} from "react";
import useAuth from "../../../hooks/useAuth";
import useError from "../../../hooks/useError";
import useHttpClient from "../../../hooks/useHttpClient";
import {findSubscription, getPlayersAndSubscriptionsRequiringTrainings} from "../../../util/playerUtil";
import Loader from "../../../components/Loader";
import Reload from "../../../components/Reload";


const CreateTrainingPlansScreen = ({route}) => {

    const [playersAndSubscriptionsRequiringTrainings, setPlayersAndSubscriptionsRequiringTrainings] = useState(route.params.playersAndSubscriptionsRequiringTrainings);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const {coachId} = useAuth();
    const {setError} = useError();
    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const firstLoad = useRef(true);

    const getIncompletePlayerSessions = async () => {
        setIsLoading(true);
        await getIncompletePlayerSessionsLazy();
        setIsLoading(false);
    }

    const getIncompletePlayerSessionsLazy = async () => {
        try {
            const [allPlayerSessions, playersAndSubscriptions] = await Promise.all([
                httpClient.getPlayerSessionsForCoach(coachId),
                httpClient.getPlayersAndSubscriptionsForCoach(coachId)
            ]);

            setPlayersAndSubscriptionsRequiringTrainings(getPlayersAndSubscriptionsRequiringTrainings(allPlayerSessions, playersAndSubscriptions));
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
            setHasError(true);
        }
    }

    useFocusEffect(
        useCallback(() => {
            if (firstLoad.current) {
                firstLoad.current = false;
                return;
            }
            getIncompletePlayerSessionsLazy();
        }, [httpClient, navigation])
    );

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <HeaderCenter title={'Create training plans'}
                              left={<FontAwesomeIcon icon={faAngleLeft} style={styles.backIcon} size={30}/>}
                              onLeftPress={navigation.goBack}/>

                <ScrollView style={styles.scrollContainer}>
                    {isLoading && <Loader/>}
                    {!isLoading && (
                        <>
                            {hasError && (
                                <View style={styles.loadingContainer}>
                                    <Reload onReload={getIncompletePlayerSessions}/>
                                </View>
                            )}
                            {!hasError && (
                                <>
                                    {playersAndSubscriptionsRequiringTrainings.map(playerRequiringTrainings => (
                                        <CreateTrainingsListItem playerRequiringTrainings={playerRequiringTrainings}
                                                                 subscription={findSubscription(playerRequiringTrainings.player, playersAndSubscriptionsRequiringTrainings)}
                                                                 key={playerRequiringTrainings.player.playerId}/>
                                    ))}
                                </>
                            )}
                        </>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1
    },
    container: {
        flex: 1
    },
    scrollContainer: {
        paddingHorizontal: 15
    },
    loadingContainer: {
        height: 200
    },
    backIcon: {
        fontSize: 80
    }
});

export default CreateTrainingPlansScreen;