import {SafeAreaView, ScrollView, View} from 'react-native';
import HeaderCenter from "../../../components/HeaderCenter";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft} from "@fortawesome/pro-light-svg-icons";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import CreateTrainingsListItem from "../../../components/CreateTrainingsListItem";
import {useCallback, useState} from "react";
import useAuth from "../../../hooks/useAuth";
import useError from "../../../hooks/useError";
import useHttpClient from "../../../hooks/useHttpClient";
import {doesPlayerNeedMoreTrainings} from "../../../util/playerUtil";
import Loader from "../../../components/Loader";
import Reload from "../../../components/Reload";


const CreateTrainingPlansScreen = ({route}) => {

    const [playersRequiringTrainings, setPlayersRequiringTrainings] = useState(route.params.playersRequiringTrainings);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const {coach} = useAuth();
    const {setError} = useError();
    const navigation = useNavigation();
    const {httpClient} = useHttpClient();

    const getIncompletePlayerSessions = async () => {
        setIsLoading(true);
        await getIncompletePlayerSessionsLazy();
        setIsLoading(false);
    }

    const getIncompletePlayerSessionsLazy = async () => {
        try {
            const allPlayerSessions = await httpClient.getCoachSessions(coach.coachId);
            const requiringTrainings = allPlayerSessions.map(playerSession => {
                if (!playerSession.player.subscription || playerSession.player.subscription.currentPeriodStartDateEpochMillis <= 0) {
                    return null;
                }
                const subscriptionStartDateEpochMillis = playerSession.player.subscription.currentPeriodStartDateEpochMillis;
                const numberOfSessionsInSubscription = playerSession.player.subscription.numberOfSessions;
                if (doesPlayerNeedMoreTrainings(playerSession.player, playerSession.sessions)) {
                    return {
                        numberOfSessionsInSubscription: numberOfSessionsInSubscription,
                        player: playerSession.player,
                        subscriptionStartDateEpochMillis: subscriptionStartDateEpochMillis
                    };
                } else {
                    return null;
                }
            }).filter(player => !!player);
            setPlayersRequiringTrainings(requiringTrainings);
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
            setHasError(true);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getIncompletePlayerSessionsLazy();
        }, [httpClient, navigation])
    );


    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <HeaderCenter title={'Create training plans'}
                              left={<FontAwesomeIcon icon={faAngleLeft} style={{fontSize: 80}} size={30}/>}
                              onLeftPress={navigation.goBack}/>

                <ScrollView style={{paddingHorizontal: 15}}>
                    {isLoading && <Loader/>}
                    {!isLoading && (
                        <>
                            {hasError && (
                                <View style={{height: 200}}>
                                    <Reload onReload={getIncompletePlayerSessions}/>
                                </View>
                            )}
                            {!hasError && (
                                <>
                                    {playersRequiringTrainings.map(playerRequiringTrainings => (
                                        <CreateTrainingsListItem playerRequiringTrainings={playerRequiringTrainings} key={playerRequiringTrainings.player.playerId}/>
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

export default CreateTrainingPlansScreen;