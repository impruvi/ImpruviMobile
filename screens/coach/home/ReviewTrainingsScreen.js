import {SafeAreaView, ScrollView, View} from 'react-native';
import HeaderCenter from "../../../components/HeaderCenter";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft} from "@fortawesome/pro-light-svg-icons";
import ReviewTrainingListItem from "../../../components/ReviewTrainingListItem";
import {useCallback, useState} from "react";
import {
    findSubscription,
    getPlayersAndSubscriptionsRequiringTrainings,
    getPlayerSessionsRequiringFeedback
} from "../../../util/playerUtil";
import useHttpClient from "../../../hooks/useHttpClient";
import useAuth from "../../../hooks/useAuth";
import useError from "../../../hooks/useError";
import Reload from "../../../components/Reload";
import Loader from "../../../components/Loader";

const ReviewTrainingsScreen = ({route}) => {

    const [playersAndSubscriptionsRequiringTrainings, setPlayersAndSubscriptionsRequiringTrainings] = useState(route.params.playersAndSubscriptionsRequiringTrainings);
    const [playerSessionsRequiringFeedback, setPlayerSessionsRequiringFeedback] = useState(route.params.playerSessionsRequiringFeedback);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const {coachId} = useAuth();
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
            const [allPlayerSessions, playersAndSubscriptions] = await Promise.all([
                httpClient.getPlayerSessionsForCoach(coachId),
                httpClient.getPlayersAndSubscriptionsForCoach(coachId)
            ]);

            setPlayersAndSubscriptionsRequiringTrainings(getPlayersAndSubscriptionsRequiringTrainings(allPlayerSessions, playersAndSubscriptions));
            setPlayerSessionsRequiringFeedback(getPlayerSessionsRequiringFeedback(allPlayerSessions));
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
                <HeaderCenter title={'Review trainings'}
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
                                    {playerSessionsRequiringFeedback.map(playerSession => (
                                        <ReviewTrainingListItem playerSession={playerSession}
                                                                subscription={findSubscription(playerSession.player, playersAndSubscriptionsRequiringTrainings)}
                                                                key={playerSession.player.playerId} />
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

export default ReviewTrainingsScreen;