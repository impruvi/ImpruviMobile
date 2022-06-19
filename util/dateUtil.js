// 0 = Sunday, 1 = Monday ...
import {DayOfWeek} from "../constants/dayOfWeek";

export const getCurrentDayOfWeek = () => {
    const d = new Date();
    const dayOfWeekNumber = d.getDay();
    return convertToDayOfWeek(dayOfWeekNumber);
}

export const getDayOfWeekNumber = (year, month, day) => {
    return new Date(year, month - 1, day).getDay();
}

export const getDayOfWeek = (year, month, day) => {
    const dayOfWeekNumber = new Date(year, month - 1, day).getDay();
    return convertToDayOfWeek(dayOfWeekNumber);
}

// ex. 2022
export const getCurrentYear = () => {
    const dateObj = new Date();
    return dateObj.getFullYear();
}

// ex. 9 (September)
export const getCurrentMonth = () => {
    const dateObj = new Date();
    return dateObj.getMonth() + 1;
}

// ex. 30
export const getCurrentDayOfMonth = () => {
    const dateObj = new Date();
    return dateObj.getDate();
}

// ex. (2022, 9) returns the number of days in the month of September in 2022
export const getNumberOfDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
}

export const getMonthDisplayName = (monthNumber) => {
    if (monthNumber === 1) {
        return 'January';
    } else if (monthNumber === 2) {
        return 'February';
    } else if (monthNumber === 3) {
        return 'March';
    } else if (monthNumber === 4) {
        return 'April';
    } else if (monthNumber === 5) {
        return 'May';
    } else if (monthNumber === 6) {
        return 'June';
    } else if (monthNumber === 7) {
        return 'July';
    } else if (monthNumber === 8) {
        return 'August';
    } else if (monthNumber === 9) {
        return 'September';
    } else if (monthNumber === 10) {
        return 'October';
    } else if (monthNumber === 11) {
        return 'November';
    } else if (monthNumber === 12) {
        return 'December';
    }
}

const convertToDayOfWeek = (dayOfWeekNumber) => {
    if (dayOfWeekNumber === 0) {
        return DayOfWeek.Sunday
    } else if (dayOfWeekNumber === 1) {
        return DayOfWeek.Monday
    } else if (dayOfWeekNumber === 2) {
        return DayOfWeek.Tuesday
    } else if (dayOfWeekNumber === 3) {
        return DayOfWeek.Wednesday
    } else if (dayOfWeekNumber === 4) {
        return DayOfWeek.Thursday
    } else if (dayOfWeekNumber === 5) {
        return DayOfWeek.Friday
    } else {
        return DayOfWeek.Saturday
    }
}