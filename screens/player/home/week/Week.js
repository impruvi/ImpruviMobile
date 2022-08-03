import {FlatList, StyleSheet, View} from "react-native";
import {canSubmitForSession, doesEveryDrillHaveSubmission} from "../../../../util/sessionUtil";
import Session from "./Session";
import {useCallback, useEffect, useRef, useState} from "react";
import EmptyPlaceholder from "../../../../components/EmptyPlaceholder";
import Box from "../../../../components/Box";


const Week = ({sessions}) => {

    const [currentSessionIndex, setCurrentSessionIndex] = useState();
    const [currentSession, setCurrentSession] = useState();

    const listRef = useRef();
    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentSessionIndex(viewableItems[0].index);
    }).current;
    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    useEffect(() => {
        if (!currentSession || !sessions) {
            return;
        }
        const matchingSession = sessions.find(session => session.sessionNumber === currentSession.sessionNumber);
        setCurrentSession(matchingSession);
    }, [sessions]);

    useEffect(() => {
        setCurrentSession(sessions[currentSessionIndex]);
    }, [currentSessionIndex, sessions]);

    useEffect(() => {
        const incompleteSessions = sessions.filter(session => !doesEveryDrillHaveSubmission(session) || !session.hasViewedFeedback);
        const initialSessionIndex = incompleteSessions.length > 0
            ? sessions.indexOf(incompleteSessions[0])
            : sessions.length - 1;
        setCurrentSessionIndex(initialSessionIndex);
        setCurrentSession(sessions[initialSessionIndex]);
    }, []);

    const onScrollToIndexFailed = useCallback(info => {
        const wait = new Promise(resolve => setTimeout(resolve, 0));
        wait.then(() => {
            listRef.current?.scrollToIndex({ index: info.index, animated: false });
        });
    }, [listRef]);

    const extractKey = useCallback(item => item.sessionNumber, []);

    const renderItem = useCallback(({item}) => {
        return (
            <Session session={item}
                     canSubmit={canSubmitForSession(sessions, item)}/>
        );
    }, [sessions]);

    return (
        <View style={styles.container}>
            {sessions.length === 0 && (
                <View style={styles.emptyPlaceholderContainer}>
                    <Box>
                        <EmptyPlaceholder text={'You have no sessions'} />
                    </Box>
                </View>
            )}
            <FlatList ref={listRef}
                      initialScrollIndex={currentSessionIndex}
                      onScrollToIndexFailed={onScrollToIndexFailed}
                      onViewableItemsChanged={viewableItemsChanged}
                      viewabilityConfig={viewConfig}
                      data={sessions}
                      horizontal
                      pagingEnabled
                      contentContainerStyle={styles.listContainer}
                      keyExtractor={extractKey}
                      showsHorizontalScrollIndicator={false}
                      renderItem={renderItem} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column-reverse'
    },
    emptyPlaceholderContainer: {
        width: '100%',
        paddingHorizontal: 15,
        marginBottom: 10
    },
    listContainer: {
        marginTop: 20
    }
});

export default Week;