import {doesDrillHaveFeedback, doesDrillHaveSubmission} from "./drillUtil";
import {doesEveryDrillHaveSubmission} from "./sessionUtil";

export const doesEverySessionInPlanHaveSubmission = (subscription, sessions) => {
    if (!subscription) {
        return false;
    }
    const sessionsInCurrentPlan = getSessionsInCurrentPlan(subscription, sessions);
    return sessionsInCurrentPlan.length >= subscription.plan.numberOfTrainings
        && sessionsInCurrentPlan.filter(session => !doesEveryDrillHaveSubmission(session)).length === 0;
}

export const doesPlayerNeedMoreSessions = (subscription, sessions) => {
    if (!subscription || subscription.currentPeriodStartDateEpochMillis <= 0) {
        return false;
    }
    const numberOfSessionsInSubscription = subscription.plan.numberOfTrainings;
    const numberOfSessionsCreatedForSubscription = getNumberOfSessionsCreatedForSubscription(subscription, sessions);
    return numberOfSessionsCreatedForSubscription < numberOfSessionsInSubscription
}

export const getNumberOfSessionsCreatedForSubscription = (subscription, sessions) => {
    return getSessionsInCurrentPlan(subscription, sessions).length;
}

export const getSessionsInCurrentPlan = (subscription, sessions) => {
    if (!subscription || subscription.currentPeriodStartDateEpochMillis <= 0) {
        return [];
    }
    return sessions.filter(session =>
        !session.isIntroSession && session.creationDateEpochMillis >= subscription.currentPeriodStartDateEpochMillis
    );
}

export const doesAnySessionRequireFeedback = (sessions) => {
    return getSessionsRequiringFeedback(sessions);
}

export const getPlayerSessionsRequiringFeedback = (allPlayerSessions) => {
    return allPlayerSessions.map(playerSessions => {
        const sessionsRequiringFeedback = getSessionsRequiringFeedback(playerSessions.sessions);
        return !!sessionsRequiringFeedback
            ? {
                player: playerSessions.player,
                session: sessionsRequiringFeedback
            }
            : null;
    }).filter(playerSessions => !!playerSessions);
}

export const getPlayersAndSubscriptionsRequiringTrainings = (allPlayerSessions, playersAndSubscriptions) => {
    return allPlayerSessions.map(playerSession => {
        const subscription = playersAndSubscriptions.find(playerAndSubscription =>
            playerAndSubscription.player.playerId === playerSession.player.playerId
        ).subscription;

        if (doesPlayerNeedMoreSessions(subscription, playerSession.sessions)) {
            return {
                player: playerSession.player,
                subscription: subscription,
            };
        } else {
            return null;
        }
    }).filter(player => !!player);
}

export const findSubscription = (player, playersAndSubscriptions) => {
    return playersAndSubscriptions.find(playerAndSubscription =>
        playerAndSubscription.player.playerId === player.playerId
    ).subscription;
}


export const getSessionsRequiringFeedback = (sessions) => {
    return sessions.find(session =>
        session.drills.some(drill => doesDrillHaveSubmission(drill) && !doesDrillHaveFeedback(drill))
        && doesEveryDrillHaveSubmission(session)
    );
}