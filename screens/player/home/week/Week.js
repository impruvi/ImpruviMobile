import {FlatList, View} from "react-native";
import {doesEveryDrillHaveSubmission, isLastSession, isNextSession} from "../../../../util/sessionUtil";
import Session from "./Session";
import {useEffect, useRef, useState} from "react";
import Header from "./Header";


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

    if (!currentSession) {
        return <View />;
    }

    return (
        <View style={visible ? {} : {display: 'none'}}>
            <Header currentSession={currentSession}
                    sessions={sessions}
                    setCurrentSession={onSetCurrentSession}/>
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
                      keyExtractor={(item) => item.sessionNumber}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => (
                          <Session session={item}
                                   isNextSession={isNextSession(sessions, item)}
                                   isLastSession={isLastSession(sessions, item)}/>
                      )} />
        </View>
    );
}

export default Week;