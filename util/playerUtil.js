import {doesDrillHaveFeedback, doesDrillHaveSubmission} from "./drillUtil";
import {doesEveryDrillHaveSubmission} from "./sessionUtil";

export const doesPlayerNeedMoreTrainings = (player, sessions) => {
    if (!player.subscription || player.subscription.currentPeriodStartDateEpochMillis <= 0) {
        return false;
    }
    const numberOfSessionsInSubscription = player.subscription.numberOfSessions;
    const numberOfSessionsCreatedForSubscription = getNumberOfSessionsCreatedForSubscription(player, sessions);
    return numberOfSessionsCreatedForSubscription < numberOfSessionsInSubscription
}

export const getNumberOfSessionsCreatedForSubscription = (player, sessions) => {
    if (!player.subscription || player.subscription.currentPeriodStartDateEpochMillis <= 0) {
        return 0;
    }
    const subscriptionStartDateEpochMillis = player.subscription.currentPeriodStartDateEpochMillis;
    return sessions.filter(session => session.creationDateEpochMillis > subscriptionStartDateEpochMillis).length;
}

export const doesAnySessionRequireFeedback = (sessions) => {
    return getSessionsRequiringFeedback(sessions);
}

export const getSessionsRequiringFeedback = (sessions) => {
    return sessions.find(session =>
        session.drills.some(drill => doesDrillHaveSubmission(drill) && !doesDrillHaveFeedback(drill))
        && doesEveryDrillHaveSubmission(session)
    );
}