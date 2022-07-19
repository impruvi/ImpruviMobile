
export const HourInMillis = 60 * 60 * 1000;
export const MinuteInMillis = 60 * 1000;
export const DayInMillis = 24 * 60 * 60 * 1000

export const getTimeRemainingDisplayText = (deadlineEpochMillis) => {
    const currentTimeEpochMillis = Date.now();
    const timeRemainingMillis = deadlineEpochMillis - currentTimeEpochMillis;
    if (timeRemainingMillis < 0) {
        if (-timeRemainingMillis > HourInMillis) {
            return `${Math.floor((-timeRemainingMillis) / HourInMillis)} hrs overdue`
        } else {
            return `${Math.floor((-timeRemainingMillis) / MinuteInMillis)} minutes overdue`
        }
    } else if (timeRemainingMillis > HourInMillis) {
        return `${Math.floor(timeRemainingMillis / HourInMillis)} hrs remaining`
    } else {
        return `${Math.floor(timeRemainingMillis / MinuteInMillis)} minutes remaining`
    }
}