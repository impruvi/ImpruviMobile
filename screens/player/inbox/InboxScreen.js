import {FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import HeaderCenter from "../../../components/HeaderCenter";
import useHttpClient from "../../../hooks/useHttpClient";
import {useCallback, useEffect, useState} from 'react';
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../components/Loader";
import useError from "../../../hooks/useError";
import moment from 'moment';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {PlayerScreenNames} from "../../ScreenNames";
import useInboxViewDate from "../../../hooks/useInboxViewDate";
import Reload from "../../../components/Reload";
import HeadshotChip from "../../../components/HeadshotChip";
import EmptyPlaceholder from "../../../components/EmptyPlaceholder";

const InboxEntryType = {
    NewSessionAdded: 'NEW_SESSION_ADDED',
    FeedbackProvided: 'FEEDBACK_PROVIDED',
    Message: 'MESSAGE'
}

const InboxScreen = () => {

    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [entries, setEntries] = useState([]);
    const [sessions, setSessions] = useState([]);

    const navigation = useNavigation();


    const {viewInbox} = useInboxViewDate();
    const {setError} = useError();
    const {playerId} = useAuth();
    const {httpClient} = useHttpClient();

    const navigateToSession = (sessionNumber) => {
        try {
            sessionNumber = parseInt(sessionNumber);
            if (!sessionNumber || sessionNumber <= 0) {
                return;
            }

            const session = !!sessions
                ? sessions.find(sess => sess.sessionNumber === sessionNumber)
                : null;

            if (!session) {
                return;
            }

            navigation.navigate(PlayerScreenNames.Session, {
                session: session
            })
        } catch (e) {
            console.log(e);
        }
    }

    const getSessions = async () => {
        try {
            const allSessions = await httpClient.getPlayerSessions(playerId);
            setSessions(allSessions);
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
        }
    }

    const getInboxEntries = async () => {
        setIsLoading(true);
        await getInboxEntriesLazy();
        setIsLoading(false);
    }

    const getInboxEntriesLazy = async () => {
        try {
            const inboxEntries = await httpClient.getInboxForPlayer(playerId);
            setEntries(inboxEntries.map(entry => {
                let displayText;
                if (entry.type === InboxEntryType.NewSessionAdded) {
                    displayText = `${entry.actor.firstName} added a new session to your training plan`;
                } else if (entry.type === InboxEntryType.FeedbackProvided) {
                    displayText = `${entry.actor.firstName} left feedback on your session`;
                } else if (entry.type === InboxEntryType.Message) {
                    displayText = entry.metadata.messageContent;
                }
                return {
                    ...entry,
                    displayText: displayText,
                    displayDate: moment.unix(entry.creationDateEpochMillis / 1000).fromNow(),
                }
            }));
        } catch (e) {
            console.log(e);
            setError('An unexpected error occurred');
            setHasError(true);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getSessions();
            getInboxEntriesLazy();
            viewInbox();
        }, [navigation,])
    );

    useEffect(() => {
        getSessions();
        getInboxEntries();
        viewInbox();
    }, []);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, paddingHorizontal: 15}}>
                <HeaderCenter title={'Inbox'}/>

                {isLoading && (
                    <View style={{paddingTop: 50}}>
                        <Loader />
                    </View>
                )}
                {!isLoading && (
                    <>
                        {hasError && (
                            <View style={{height: 200}}>
                                <Reload onReload={getInboxEntries}/>
                            </View>
                        )}
                        {!hasError && (
                            <>
                                {entries.length === 0 && (
                                    <ScrollView style={{flex: 1}}>
                                        <EmptyPlaceholder text={'You inbox is empty'} />
                                    </ScrollView>
                                )}
                                {entries.length > 0 && (
                                    <FlatList keyExtractor={(item, index) => `${index}`}
                                              data={entries}
                                              contentContainerStyle={{marginTop: 10}}
                                              showsVerticalScrollIndicator={false}
                                              renderItem={({item}) => (
                                                  <TouchableOpacity style={{flexDirection: 'row', marginBottom: 20, alignItems: 'center'}} onPress={() => navigateToSession(item.metadata.sessionNumber)}>
                                                      <HeadshotChip image={{fileLocation: item.actor.image}} firstName={item.actor.firstName} lastName={item.actor.lastName} size={45}/>
                                                      <View style={{flex: 1, justifyContent: 'flex-start', marginLeft: 10}}>
                                                          <Text style={{flex: 1, flexWrap: 'wrap', fontWeight: '500'}}>{item.displayText}</Text>
                                                          <Text style={{marginTop: 5, color: '#878787', fontWeight: '500', fontSize: 12}}>{item.displayDate}</Text>
                                                      </View>
                                                  </TouchableOpacity>
                                              )}/>
                                )}
                            </>
                        )}
                    </>
                )}
            </View>
        </SafeAreaView>
    );
};

export default InboxScreen;