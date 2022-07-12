import {Animated, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {convertDayOfWeekToAbbreviatedDisplayValue, DayOfWeek} from "../../../../constants/dayOfWeek";
import {
    compareDates,
    convertDayOfWeekToNumber,
    getCurrentDate,
    getDayOfWeek,
    incrementDate
} from "../../../../util/dateUtil";
import {doesEveryDrillHaveSubmission} from "../../../../util/sessionUtil";
import TriangleWhiteChoppedShadow from "../../../../assets/icons/TriangleWhiteChoppedShadow.png";

import {useEffect, useRef, useState} from 'react';
import {Colors} from "../../../../constants/colors";


const Header = ({currentSession, sessions, setCurrentSession}) => {

    const [width, setWidth] = useState(0);

    const triangleAnim = useRef(new Animated.Value(0)).current

    const moveTriangle = (position) => {
        Animated.timing(triangleAnim, {toValue: position, duration: 200, useNativeDriver: false}).start();
    }

    const getSessionForDate = (date) => {
        return sessions.find(session => compareDates(date, session.scheduledDate) === 0);
    }

    const currentDate = getCurrentDate();
    const currentSessionDayOfWeek = getDayOfWeek(currentSession.scheduledDate.year, currentSession.scheduledDate.month, currentSession.scheduledDate.day);
    const currentSessionIdx = convertDayOfWeekToNumber(currentSessionDayOfWeek);

    useEffect(() => {
        const currentSessionDayOfWeek = getDayOfWeek(currentSession.scheduledDate.year, currentSession.scheduledDate.month, currentSession.scheduledDate.day);
        const currentSessionIdx = convertDayOfWeekToNumber(currentSessionDayOfWeek);

        const gap = (width - (7 * 44)) / 6;
        moveTriangle(currentSessionIdx * (width + gap) / 7 - 15 + 22);
    }, [currentSession, width]);

    return (
        <View style={{marginBottom: -17, marginTop: 10, paddingHorizontal: 15, width: '100%'}}>
            <View style={{width: '100%', position: 'relative'}}>
                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}} onLayout={(event) => {
                    const {width} = event.nativeEvent.layout;
                    setWidth(width);
                }}>
                    {Object.entries(DayOfWeek).map(([_, dayOfWeek], idx) => {

                        const date = incrementDate(currentSession.scheduledDate, (idx - currentSessionIdx));
                        const isCurrentDay = compareDates(currentDate, date) === 0;
                        const dayOfMonth = !!currentSession ? date.day : undefined;

                        const sessionForDate = getSessionForDate(date);

                        const hasCompletedTraining = !!sessionForDate && doesEveryDrillHaveSubmission(sessionForDate);
                        const hasInProgressTraining = !!sessionForDate && !doesEveryDrillHaveSubmission(sessionForDate);

                        return (
                            <View style={styles.containerOuter} key={dayOfWeek}>
                                <TouchableOpacity style={isCurrentDay ? {...styles.containerInner, backgroundColor: Colors.Primary} : styles.containerInner}
                                                  onPress={() => {
                                                      if (!!sessionForDate) {
                                                          setCurrentSession(sessionForDate);
                                                      }
                                                  }}>
                                    <Text style={isCurrentDay ? {...styles.headerText, color: 'white'} : {...styles.headerText, color: '#646464'}}>
                                        {convertDayOfWeekToAbbreviatedDisplayValue(dayOfWeek)}
                                    </Text>
                                    <Text style={isCurrentDay ? {...styles.dayText, color: 'white'} : styles.dayText}>
                                        {dayOfMonth}
                                    </Text>
                                </TouchableOpacity>
                                {(hasCompletedTraining || hasInProgressTraining) && (
                                    <View style={hasCompletedTraining ? {...styles.dot, backgroundColor: 'black'} : {...styles.dot, backgroundColor: Colors.Primary}}/>
                                )}
                            </View>
                        );
                    })}

                </View>

                <Animated.View style={{marginLeft: triangleAnim, marginTop: -8}}>
                    <Image source={TriangleWhiteChoppedShadow} style={styles.triangle}/>
                </Animated.View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerOuter: {
        alignItems: 'center',
    },
    containerInner: {
        alignItems: 'center',
        padding: 8,
        borderRadius: 30,
        width: 44
    },
    headerText: {
        fontSize: 12
    },
    dayText: {
        fontSize: 16,
        marginTop: 5,
        fontWeight: '500'
    },
    dot: {
        marginTop: 7,
        width: 5,
        height: 5,
        borderRadius: 5
    },
    triangle: {
        height: 30,
        width: 30,
        marginTop: 5,
        resizeMode: 'contain'
    }
});

export default Header;