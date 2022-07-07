export const DayOfWeek = {
    Sunday: 'SUNDAY',
    Monday: 'MONDAY',
    Tuesday: 'TUESDAY',
    Wednesday: 'WEDNESDAY',
    Thursday: 'THURSDAY',
    Friday: 'FRIDAY',
    Saturday: 'SATURDAY',
}

export const convertDayOfWeekToAbbreviatedDisplayValue = (dayOfWeek) => {
    switch (dayOfWeek) {
        case DayOfWeek.Monday:
            return 'Mo';
        case DayOfWeek.Tuesday:
            return 'Tu';
        case DayOfWeek.Wednesday:
            return 'We';
        case DayOfWeek.Thursday:
            return 'Th';
        case DayOfWeek.Friday:
            return 'Fr';
        case DayOfWeek.Saturday:
            return 'Sa';
        default:
            return 'Su'
    }
}