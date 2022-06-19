import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Cell from './Cell';
import {Colors} from '../../constants/colors';
import SpaceBetweenComponent from "../SpaceBetweenComponent";
import {useNavigation} from "@react-navigation/native";
import {PlayerScreenNames} from "../../screens/ScreenNames";
import {
    getCurrentDayOfMonth,
    getCurrentDayOfWeek,
    getCurrentMonth,
    getCurrentYear,
    getDayOfWeekNumber,
    getMonthDisplayName,
    getNumberOfDaysInMonth
} from "../../util/dateUtil";
import {useRef, useState} from "react";
import Legend from "./Legend";
import Header from './Header';
import {doesEveryDrillHaveSubmission} from "../../util/sessionUtil";

const Calendar = ({sessions}) => {

    const [widthOfCalendar, setWidthOfCalendar] = useState(330);

    const slidesRef = useRef();
    const navigation = useNavigation();

    const navigateToSessionForToday = () => {
        const session = getSessionForDay(getCurrentYear(), getCurrentMonth(), getCurrentDayOfMonth());
        navigation.navigate(PlayerScreenNames.SessionDetails, {
            session: session
        });
    }

    const getNumberOfRows = (year, month) => {
        const totalDaysInMonth = getNumberOfDaysInMonth(getCurrentYear(), getCurrentDayOfMonth());
        const lastDayOfMonthWeekNumber = getDayOfWeekNumber(year, month, getNumberOfDaysInMonth(year, month));

        let numberOfRows = 1;
        let daysLeft = totalDaysInMonth - (1 + lastDayOfMonthWeekNumber);
        while (daysLeft > 0) {
            daysLeft -= 7;
            numberOfRows++;
        }

        return numberOfRows;
    }

    const getDayOfMonth = (year, month, rowNumber, dayOfWeekNumber) => {
        const totalDaysInMonth = getNumberOfDaysInMonth(year, month);
        const firstDayOfMonthDayOfWeekNumber = getDayOfWeekNumber(year, month, 1);

        let dayOfMonth;
        if (rowNumber === 0) {
            dayOfMonth =  dayOfWeekNumber - firstDayOfMonthDayOfWeekNumber + 1;
        } else {
            dayOfMonth = rowNumber * 7 - firstDayOfMonthDayOfWeekNumber + dayOfWeekNumber + 1;
        }

        if (dayOfMonth < 1 || dayOfMonth > totalDaysInMonth) {
            return null
        } else {
            return dayOfMonth;
        }
    }

    const isCurrentDay = (year, month, day) => {
        return year === getCurrentYear() &&  month === getCurrentMonth() && day === getCurrentDayOfMonth();
    }

    const getSessionForDay = (year, month, day) => {
        const sessionList = sessions.filter(session =>
            session.date.year === year &&
            session.date.month === month &&
            session.date.day === day
        );
        return sessionList.length > 0
            ? sessionList[0]
            : null
    }

    const compareDates = (a, b) => {
        if ( a.year < b.year ) {
            return -1;
        } else if (a.year > b.year) {
            return 1;
        } else if ( a.month < b.month ) {
            return -1;
        } else if (a.month > b.month) {
            return 1;
        } else if ( a.day < b.day ) {
            return -1;
        } else if (a.day > b.day) {
            return 1;
        }
        return 0;
    }

    const getNextMonth = (month) => {
        return {
            month: month.month === 12 ? 1 : month.month + 1,
            year: month.month === 12 ? month.year + 1 : month.year
        }
    }

    const getCurrentMonthIndex = (months) => {
        const currentMonth = getCurrentMonth();
        const currentYear = getCurrentYear();
        return months.indexOf(months.find(month => month.month === currentMonth && month.year === currentYear));
    }

    const getMonths = () => {
        const sessionsSorted = sessions.sort((a, b) => a.sessionNumber - b.sessionNumber);
        if (sessionsSorted.length === 0) {
            const currentMonth = {
                month: getCurrentMonth(),
                year: getCurrentYear()
            }
            return [currentMonth, getNextMonth(currentMonth)];
        } else {
            const months = [];
            const firstSession = sessionsSorted[0];
            const lastSession = sessionsSorted[sessionsSorted.length - 1];
            const firstMonth = {month: firstSession.date.month, year: firstSession.date.year}
            const lastMonth = {month: lastSession.date.month, year: lastSession.date.year}
            let currentMonth = firstMonth;
            while (compareDates(currentMonth, lastMonth) < 1) {
                months.push(currentMonth);
                currentMonth = getNextMonth(currentMonth);
            }
            months.push(currentMonth); // add one more month of buffer
            return months;
        }
    }

    const hasIncompleteSessionToday = () => {
        const session = getSessionForDay(getCurrentYear(), getCurrentMonth(), getCurrentDayOfMonth());
        return !!session && !doesEveryDrillHaveSubmission(session);
    }

    const months = getMonths();
    return (
        <View style={styles.container}>
            <View onLayout={(event) => setWidthOfCalendar(event.nativeEvent.layout.width)}>
                <FlatList ref={slidesRef}
                          showsHorizontalScrollIndicator={false}
                          horizontal
                          pagingEnabled
                          initialScrollIndex={getCurrentMonthIndex(months)}
                          onScrollToIndexFailed={info => {
                              const wait = new Promise(resolve => setTimeout(resolve, 0));
                              wait.then(() => {
                                  slidesRef.current?.scrollToIndex({ index: info.index, animated: false });
                              });
                          }}
                          data={months}
                          keyExtractor={(item) => `${item.month}-${item.year}`}
                          renderItem={({item}) => (
                              <View style={{width: widthOfCalendar}}>
                                  <Text style={{paddingHorizontal: 10, fontWeight: '600', fontSize: 16}}>
                                      {getMonthDisplayName(item.month)} {item.year}
                                  </Text>
                                  <Header currentDayOfWeek={getCurrentDayOfWeek()}
                                          isCurrentMonth={getCurrentYear() === item.year && getCurrentMonth() === item.month}/>

                                  {[...Array(getNumberOfRows(item.year, item.month)).keys()].map(rowNumber => (
                                      <View style={{flexDirection: 'row'}} key={rowNumber}>
                                          {[...Array(7).keys()].map(dayOfWeekNumber => {
                                              const day = getDayOfMonth(item.year, item.month, rowNumber, dayOfWeekNumber);
                                              if (!day) {
                                                  return <Cell key={dayOfWeekNumber}/>
                                              } else {
                                                  return (
                                                      <Cell key={dayOfWeekNumber}
                                                            text={day}
                                                            isCurrent={isCurrentDay(item.year, item.month, day)}
                                                            session={getSessionForDay(item.year, item.month, day)} />
                                                  )
                                              }
                                          })}
                                      </View>
                                  ))}
                              </View>
                          )}/>
            </View>

            <Legend />
            {hasIncompleteSessionToday() && (
                <SpaceBetweenComponent style={styles.startTrainingContainer}>
                    <Text style={styles.startTrainingText}>You have a training session today!</Text>
                    <TouchableOpacity style={styles.startTrainingButton}
                                      onPress={navigateToSessionForToday}>
                        <Text style={styles.startTrainingButtonText}>Start</Text>
                    </TouchableOpacity>
                </SpaceBetweenComponent>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 20,
        shadowColor: 'rgba(0,0,0,.8)', shadowOffset: { width: 0, height: 1 }, shadowOpacity: .15, shadowRadius: 3
    },
    startTrainingContainer: {
        borderTopWidth: 1,
        flexWrap: 'wrap',
        borderColor: Colors.Border,
        marginHorizontal: 5,
        marginTop: 15,
        paddingTop: 15,
        paddingHorizontal: 15,
        paddingBottom: 5,
        borderRadius: 20,
        alignItems: 'center'
    },
    startTrainingText: {
        flex: 1,
        marginRight: 10,
        fontWeight: '600',
    },
    startTrainingButton: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        backgroundColor: Colors.Primary,
        borderRadius: 20
    },
    startTrainingButtonText: {
        color:'white',
        fontWeight: '600'
    }
});

export default Calendar;