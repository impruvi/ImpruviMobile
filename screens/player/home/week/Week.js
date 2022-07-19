import {FlatList, View} from "react-native";
import {doesEveryDrillHaveSubmission} from "../../../../util/sessionUtil";
import Session from "./Session";
import {useEffect, useRef, useState} from "react";
import EmptyPlaceholder from "../../../../components/EmptyPlaceholder";
import Box from "../../../../components/Box";


const Week = ({sessions, visible}) => {

    const [currentSessionIndex, setCurrentSessionIndex] = useState();
    const [currentSession, setCurrentSession] = useState();

    const listRef = useRef();
    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentSessionIndex(viewableItems[0].index);
    }).current;
    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    const onSetCurrentSession = (session) => {
        const index = sessions.indexOf(session);
        setCurrentSession(session);
        listRef.current?.scrollToIndex({ index: index, animated: false })
    }

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

    if (sessions.length === 0) {
        return (
            <View style={{width: '100%', paddingHorizontal: 15, marginBottom: 10}}>
                <Box>
                    <EmptyPlaceholder text={'You have no sessions'} />
                </Box>
            </View>
        )
    }

    if (!currentSession) {
        return <View />;
    }

    return (
        <View style={visible ? {flexDirection: 'column-reverse'} : {display: 'none'}}>
            {sessions.length === 0 && (
                <View style={{width: '100%', paddingHorizontal: 15, marginBottom: 10}}>
                    <Box>
                        <EmptyPlaceholder text={'You have no sessions'} />
                    </Box>
                </View>
            )}
            <FlatList ref={listRef}
                      initialScrollIndex={currentSessionIndex}
                      onScrollToIndexFailed={info => {
                          const wait = new Promise(resolve => setTimeout(resolve, 0));
                          wait.then(() => {
                              listRef.current?.scrollToIndex({ index: info.index, animated: false });
                          });
                      }}
                      onViewableItemsChanged={viewableItemsChanged}
                      viewabilityConfig={viewConfig}
                      data={sessions}
                      horizontal
                      pagingEnabled
                      contentContainerStyle={{marginTop: 20}}
                      keyExtractor={(item) => item.sessionNumber}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => (
                          <Session session={item}
                                   sessions={sessions}/>
                      )} />
            {/*<Header currentSession={currentSession}*/}
            {/*        sessions={sessions}*/}
            {/*        setCurrentSession={onSetCurrentSession}/>*/}

        </View>
    );
}

export default Week;