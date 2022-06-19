import {ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Box from "../../components/Box";
import {CoachScreenNames} from "../ScreenNames";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft} from "@fortawesome/pro-light-svg-icons";
import {Colors} from "../../constants/colors";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import HeaderCenter from "../../components/HeaderCenter";
import {useCallback, useState} from "react";
import useHttpClient from "../../hooks/useHttpClient";
import useError from "../../hooks/useError";
import useAuth from "../../hooks/useAuth";
import DrillSubmissionStatus from "../../components/status/DrillSubmissionStatus";
import DrillFeedbackStatus from "../../components/status/DrillFeedbackStatus";
import Confirmation from "../../components/Confirmation";

const PlayerScreen = ({route}) => {

    const [playerSessions, setPlayerSessions] = useState(route.params.playerSessions);
    const [sessionToDelete, setSessionToDelete] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {setError} = useError();
    const {coach} = useAuth();

    const onDelete = async () => {
        setIsDeleting(true);
        try {
            await httpClient.deleteSession({
                playerId: playerSessions.player.playerId,
                sessionNumber: sessionToDelete.sessionNumber
            });
            await getPlayerSessionsLazy();
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
        }
        setSessionToDelete(undefined);
        setIsDeleting(false);
    }

    const getPlayerSessionsLazy = async () => {
        try {
            if (!playerSessions) {
                return;
            }
            const allPlayerSessions = await httpClient.getCoachSessions(coach.coachId);
            const playerSessions = allPlayerSessions.find(ps => ps.player.playerId === playerSessions.player.playerId);
            setPlayerSessions(playerSessions);
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
                <HeaderCenter title={`${playerSessions.player.firstName} ${playerSessions.player.lastName}`}
                              left={<FontAwesomeIcon icon={faAngleLeft} size={25}/>}
                              onLeftPress={navigation.goBack}
                              right={
                                  <View style={{flexDirection: 'row'}}>
                                      <Text style={{color: Colors.Primary, marginLeft: 5, fontWeight: '600'}}>Add session</Text>
                                  </View>
                              }
                              onRightPress={() => navigation.navigate(CoachScreenNames.CreateOrEditSession, {
                                  playerId: playerSessions.player.playerId
                              })}/>

                <ScrollView style={{paddingHorizontal: 15}} showsVerticalScrollIndicator={false}>
                    {playerSessions.sessions.length === 0 && (
                        <Text>No sessions</Text>
                    )}
                    {playerSessions.sessions.map(session => (
                        <Box key={session.sessionNumber}>
                            <View style={{padding: 15}}>
                                <View style={{width: '100%', justifyContent: 'space-between', flexDirection: 'row'}}>
                                    <Text style={{fontSize: 16, fontWeight: '500', marginBottom: 10}}>Session {session.sessionNumber}</Text>
                                    <TouchableOpacity onPress={() => setSessionToDelete(session)}>
                                        <Text>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                                {session.drills.map(drill => (
                                    <View style={{marginVertical: 10}} key={drill.drillId}>
                                        <Text style={{marginBottom: 5}}>
                                            {drill.name}
                                        </Text>
                                        <DrillSubmissionStatus drill={drill}/>
                                        <DrillFeedbackStatus drill={drill}/>
                                    </View>
                                ))}
                            </View>
                            <View style={{flexDirection: 'row', borderTopWidth: 1, borderColor: Colors.Border}}>
                                <TouchableOpacity style={{width: '50%', justifyContent: 'center', alignItems: 'center', paddingVertical: 20, borderRightWidth: 1, borderColor: Colors.Border}}
                                                  onPress={() => navigation.navigate(CoachScreenNames.CreateOrEditSession, {
                                                      playerId: playerSessions.player.playerId,
                                                      session: session
                                                  })}>
                                    <Text style={{fontWeight: '600'}}>Edit Session</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{width: '50%', justifyContent: 'center', alignItems: 'center', paddingVertical: 20}}
                                                  onPress={() => navigation.navigate(CoachScreenNames.Session, {
                                                      session: session
                                                  })}>
                                    <Text style={{fontWeight: '600'}}>View Session</Text>
                                </TouchableOpacity>
                            </View>
                        </Box>
                    ))}
                </ScrollView>
            </SafeAreaView>

            {(isDeleting) && (
                <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, .6)'}}>
                    <ActivityIndicator size="small" color="black"/>
                    <Text style={{fontSize: 15, fontWeight: '500', marginTop: 10}}>Deleting session...</Text>
                </View>
            )}

            <Confirmation isOpen={!!sessionToDelete}
                          close={() => setSessionToDelete(undefined)}
                          prompt={'Are you sure you want to delete?'}
                          confirm={onDelete}/>
        </View>
    )
}

export default PlayerScreen;