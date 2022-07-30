import {ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {CoachScreenNames} from "../ScreenNames";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft} from "@fortawesome/pro-light-svg-icons";
import {Colors} from "../../constants/colors";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import HeaderCenter from "../../components/HeaderCenter";
import {useCallback, useEffect, useState} from "react";
import useHttpClient from "../../hooks/useHttpClient";
import useError from "../../hooks/useError";
import useAuth from "../../hooks/useAuth";
import HeadshotChip from "../../components/HeadshotChip";
import PlayerTrainingListItem from "../../components/PlayerTrainingListItem";
import {doesPlayerNeedMoreSessions, getNumberOfSessionsCreatedForSubscription} from "../../util/playerUtil";
import {DayInMillis, getTimeRemainingDisplayText} from "../../util/timeUtil";
import EmptyPlaceholder from "../../components/EmptyPlaceholder";

const PlayerScreen = ({route}) => {

    const [player] = useState(route.params.player);
    const [subscription] = useState(route.params.subscription);
    const [sessions, setSessions] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {setError} = useError();
    const {coachId} = useAuth();

    const getPlayerSessionsLazy = async () => {
        try {
            const allPlayerSessions = await httpClient.getPlayerSessionsForCoach(coachId);
            const sessions = allPlayerSessions.find(ps => ps.player.playerId === route.params.player.playerId).sessions;
            setSessions(sessions);
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
        }
    }

    useFocusEffect(
        useCallback(() => {
            getPlayerSessionsLazy();
        }, [httpClient, navigation])
    );

    return (
        <View style={{flex: 1}}>
            <SafeAreaView style={{flex: 1}}>
                <HeaderCenter left={<FontAwesomeIcon icon={faAngleLeft} size={25}/>}
                              onLeftPress={navigation.goBack}
                              right={
                                  <View style={{flexDirection: 'row'}}>
                                      <Text style={{color: Colors.Primary, marginLeft: 5, fontWeight: '600'}}>Add training</Text>
                                  </View>
                              }
                              onRightPress={() => navigation.navigate(CoachScreenNames.CreateOrEditSession, {
                                  playerId: player.playerId
                              })}/>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{alignItems: 'center', marginBottom: 10}}>
                        <HeadshotChip firstName={player.firstName} lastName={player.lastName} image={player.headshot} size={80}/>
                        <Text style={{fontWeight: '600', marginTop: 3}}>{player.firstName} {player.lastName}</Text>
                    </View>

                    {doesPlayerNeedMoreSessions(subscription, sessions) && (
                        <View style={{paddingHorizontal: 15}}>
                            <View style={{padding: 20, borderWidth: 1, borderColor: Colors.Border, borderRadius: 15, marginBottom: 15}}>
                                <Text style={{fontWeight: '500'}}>
                                    {player.firstName} subscribed for {subscription.plan.numberOfTrainings} new training sessions.
                                    Add {subscription.plan.numberOfTrainings - getNumberOfSessionsCreatedForSubscription(subscription, sessions)} more trainings
                                </Text>
                                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 15, alignItems: 'center'}}>
                                    <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: Colors.Primary}} onPress={() => navigation.navigate(CoachScreenNames.CreateOrEditSession, {
                                        playerId: player.playerId
                                    })}>
                                        <Text style={{color: 'white', fontWeight: '500'}}>Add a training</Text>
                                    </TouchableOpacity>
                                    <Text style={{color: '#BEBEBE', fontSize: 12, fontWeight: '500'}}>{getTimeRemainingDisplayText(subscription.currentPeriodStartDateEpochMillis + DayInMillis)}</Text>
                                </View>
                            </View>
                        </View>
                    )}

                    {sessions.map(session => (
                        <PlayerTrainingListItem key={session.sessionNumber}
                                                session={session}
                                                onDelete={getPlayerSessionsLazy}
                                                setIsDeleting={setIsDeleting}
                                                player={player}/>
                    ))}
                    {sessions.length === 0 && (
                        <EmptyPlaceholder text={'No trainings'} />
                    )}
                </ScrollView>
            </SafeAreaView>

            {(isDeleting) && (
                <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, .6)'}}>
                    <ActivityIndicator size="small" color="black"/>
                    <Text style={{fontSize: 15, fontWeight: '500', marginTop: 10}}>Deleting training...</Text>
                </View>
            )}
        </View>
    )
}

export default PlayerScreen;