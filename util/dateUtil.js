// 0 = Sunday, 1 = Monday ...
import {DayOfWeek} from "../constants/dayOfWeek";

export const getCurrentDate = () => {
    return {
        year: getCurrentYear(),
        month: getCurrentMonth(),
        day: getCurrentDayOfMonth()
    }
}

export const getCurrentDayOfWeek = () => {
    const d = new Date();
    const dayOfWeekNumber = d.getDay();
    return convertToDayOfWeek(dayOfWeekNumber);
}

export const incrementDate = (date, incr) => {
    const d = new Date(date.year, date.month - 1, date.day);
    d.setDate(d.getDate() + incr);

    return {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate()
    }
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

export const getHumanReadableDate = (date) => {
    const dayOfWeek = getDayOfWeek(date.year, date.month, date.day);
    return `${getDayOfWeekDisplayName(dayOfWeek)}, ${getMonthDisplayName(date.month)} ${date.day}`
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

export const convertDayOfWeekToNumber = (dayOfWeek) => {
    switch (dayOfWeek) {
        case DayOfWeek.Sunday:
            return 0;
        case DayOfWeek.Monday:
            return 1;
        case DayOfWeek.Tuesday:
            return 2;
        case DayOfWeek.Wednesday:
            return 3;
        case DayOfWeek.Thursday:
            return 4;
        case DayOfWeek.Friday:
            return 5;
        case DayOfWeek.Saturday:
            return 6;
    }
}

const getDayOfWeekDisplayName = (dayOfWeek) => {
    switch (dayOfWeek) {
        case DayOfWeek.Sunday:
            return 'Sunday';
        case DayOfWeek.Monday:
            return 'Monday';
        case DayOfWeek.Tuesday:
            return 'Tuesday';
        case DayOfWeek.Wednesday:
            return 'Wednesday';
        case DayOfWeek.Thursday:
            return 'Thursday';
        case DayOfWeek.Friday:
            return 'Friday';
        case DayOfWeek.Saturday:
            return 'Saturday';
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

export const compareDates = (a, b) => {
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