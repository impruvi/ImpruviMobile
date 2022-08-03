import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import HeaderCenter from "../../../components/HeaderCenter";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft} from "@fortawesome/pro-light-svg-icons";
import ReviewTrainingListItem from "../../../components/ReviewTrainingListItem";
import {useCallback, useRef, useState} from "react";
import {findSubscription, getPlayerSessionsRequiringFeedback} from "../../../util/playerUtil";
import useHttpClient from "../../../hooks/useHttpClient";
import useAuth from "../../../hooks/useAuth";
import useError from "../../../hooks/useError";
import Reload from "../../../components/Reload";
import Loader from "../../../components/Loader";

const ReviewTrainingsScreen = ({route}) => {

    const [playerSessionsRequiringFeedback, setPlayerSessionsRequiringFeedback] = useState(route.params.playerSessionsRequiringFeedback);
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
            const [allPlayerSessions] = await Promise.all([
                httpClient.getPlayerSessionsForCoach(coachId),
            ]);

            setPlayerSessionsRequiringFeedback(getPlayerSessionsRequiringFeedback(allPlayerSessions));
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
                <HeaderCenter title={'Review trainings'}
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
                                    {playerSessionsRequiringFeedback.map(playerSession => (
                                        <ReviewTrainingListItem playerSession={playerSession}
                                                                subscription={findSubscription(playerSession.player, playerSessionsRequiringFeedback)}
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

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1
    },
    container: {
        flex: 1
    },
    backIcon: {
        fontSize: 80
    },
    scrollContainer: {
        paddingHorizontal: 15
    },
    loadingContainer: {
        height: 200
    }
})

export default ReviewTrainingsScreen;