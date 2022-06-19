export const DayOfWeek = {
    Monday: 'MONDAY',
    Tuesday: 'TUESDAY',
    Wednesday: 'WEDNESDAY',
    Thursday: 'THURSDAY',
    Friday: 'FRIDAY',
    Saturday: 'SATURDAY',
    Sunday: 'SUNDAY'
}

export const convertDayOfWeekToAbbreviatedDisplayValue = (dayOfWeek) => {
    switch (dayOfWeek) {
        case DayOfWeek.Monday:
            return 'Mon';
        case DayOfWeek.Tuesday:
            return 'Tue';
        case DayOfWeek.Wednesday:
            return 'Wed';
        case DayOfWeek.Thursday:
            return 'Thu';
        case DayOfWeek.Friday:
            return 'Fri';
        case DayOfWeek.Saturday:
            return 'Sat';
        default:
            return 'Sun'
    }
}