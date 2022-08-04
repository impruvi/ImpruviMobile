import {FlatList, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import HeaderCenter from "../../../components/HeaderCenter";
import useHttpClient from "../../../hooks/useHttpClient";
import {useCallback, useEffect, useRef, useState} from 'react';
import useAuth from "../../../hooks/useAuth";
import useError from "../../../hooks/useError";
import moment from 'moment';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {PlayerScreenNames} from "../../ScreenNames";
import useInboxViewDate from "../../../hooks/useInboxViewDate";
import EmptyPlaceholder from "../../../components/EmptyPlaceholder";
import InboxEntryListItem from "./InboxEntryListItem";
import ReloadableScreen from "../../../components/ReloadableScreen";

const InboxEntryType = {
    NewSessionAdded: 'NEW_SESSION_ADDED',
    FeedbackProvided: 'FEEDBACK_PROVIDED',
    Message: 'MESSAGE'
}

const convertInboxEntryForDisplay = (entry) => {
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
}

const InboxScreen = () => {

    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [entries, setEntries] = useState([]);
    const [subscriptionCurrentPeriodStartDateEpochMillis, setSubscriptionCurrentPeriodStartDateEpochMillis] = useState();
    const [sessions, setSessions] = useState([]);

    const navigation = useNavigation();
    const {viewInbox} = useInboxViewDate();
    const {setError} = useError();
    const {playerId} = useAuth();
    const {httpClient} = useHttpClient();
    const firstLoad = useRef(true);

    const navigateToSession = useCallback((sessionNumber) => {
        sessionNumber = parseInt(sessionNumber);
        if (!sessionNumber || sessionNumber <= 0) {
            return;
        }

        const session = !!sessions ? sessions.find(sess => sess.sessionNumber === sessionNumber) : null;
        if (!session) {
            return;
        }

        navigation.navigate(PlayerScreenNames.Session, {
            session: session,
            subscriptionCurrentPeriodStartDateEpochMillis: subscriptionCurrentPeriodStartDateEpochMillis
        })
    }, [sessions]);

    const getSubscriptionCurrentPeriodStartDateEpochMillis = async () => {
        try {
            const subscription = await httpClient.getSubscription(playerId);
            setSubscriptionCurrentPeriodStartDateEpochMillis(subscription.currentPeriodStartDateEpochMillis);
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
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
            setEntries(inboxEntries.map(convertInboxEntryForDisplay));
        } catch (e) {
            console.log(e);
            setError('An unexpected error occurred');
            setHasError(true);
        }
    }

    useFocusEffect(
        useCallback(() => {
            if (firstLoad.current) {
                firstLoad.current = false;
                return;
            }
            getSessions();
            getInboxEntriesLazy();
            viewInbox();
        }, [navigation,])
    );

    useEffect(() => {
        getSessions();
        getInboxEntries();
        getSubscriptionCurrentPeriodStartDateEpochMillis();
        viewInbox();
    }, []);

    const extractKey = useCallback((item, index) => `${index}`, []);
    const renderItem = useCallback(({item}) => {
        return (
            <InboxEntryListItem item={item}
                                navigateToSession={navigateToSession}/>
        )
    }, [navigateToSession]);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <HeaderCenter title={'Inbox'}/>

                <ReloadableScreen isLoading={isLoading}
                                  hasError={hasError}
                                  onReload={getInboxEntries}
                                  render={() => (
                                      <>
                                          {entries.length === 0 && (
                                              <ScrollView style={styles.emptyScrollView}>
                                                  <EmptyPlaceholder text={'You inbox is empty'} />
                                              </ScrollView>
                                          )}
                                          {entries.length > 0 && (
                                              <FlatList data={entries}
                                                        contentContainerStyle={styles.listContainer}
                                                        showsVerticalScrollIndicator={false}
                                                        keyExtractor={extractKey}
                                                        renderItem={renderItem}/>
                                          )}
                                      </>
                                  )} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1
    },
    container: {
        flex: 1,
        paddingHorizontal: 15
    },
    emptyScrollView: {
        flex: 1
    },
    listContainer: {
        marginTop: 10
    }
})

export default InboxScreen;