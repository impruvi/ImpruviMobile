import {doesDrillHaveFeedback, doesDrillHaveSubmission} from "./drillUtil";

export const doesAnyDrillHaveSubmission = (session) => {
    return session.drills.filter(doesDrillHaveSubmission).length > 0;
}

export const doesAnyDrillHaveFeedback = (session) => {
    return session.drills.filter(doesDrillHaveFeedback).length > 0;
}

export const doesEveryDrillHaveSubmission = (session) => {
    return session.drills.every(doesDrillHaveSubmission);
}

export const doesEveryDrillHaveFeedback = (session) => {
    return session.drills.every(doesDrillHaveFeedback);
}

export const getFirstDrillIdWithoutSubmission = (session) => {
    const drillIds = session.drills
        .filter(drill => !doesDrillHaveSubmission(drill))
        .map(drill => drill.drillId);
    if (drillIds.length === 0) {
        return null;
    } else {
        return drillIds [0];
    }
}

export const getFirstDrillIdWithoutFeedback = (session) => {
    const drillIds = session.drills
        .filter(drill => !doesDrillHaveFeedback(drill))
        .map(drill => drill.drillId);
    if (drillIds.length === 0) {
        return null;
    } else {
        return drillIds [0];
    }
}

export const getNextSession = (sessions) => {
    const incompleteSessions = sessions.filter(session => !doesEveryDrillHaveSubmission(session));
    return incompleteSessions.length > 0
        ? incompleteSessions[0]
        : null;
}

export const getLastSession = (sessions) => {
    const nextSession = getNextSession(sessions);
    const lastSessionNumber = nextSession.sessionNumber - 1;
    if (lastSessionNumber < 1) {
        return null;
    }
    return sessions.find(sess => sess.sessionNumber === lastSessionNumber);
}

export const canSubmitForSession = (sessions, session) => {
    if (!session || !sessions || sessions.length === 0) {
        return false;
    }
    const nextSession = getNextSession(sessions);
    if (!nextSession || nextSession.sessionNumber !== session.sessionNumber) {
        return false;
    }

    const lastSession = getLastSession(sessions);
    return !lastSession || doesAnyDrillHaveFeedback(lastSession);
}

export const getNumberOfCompletedFeedbacks = (session) => {
    if (!session || !session.drills) {
        return 0;
    }

    return session.drills.filter(doesDrillHaveFeedback).length;
}

export const getCompletedDateEpochMillis = (session) => {
    if (!doesEveryDrillHaveSubmission(session)) {
        return -1;
    }

    return Math.max(...session.drills.map(drill =>
        !!drill.submission ? drill.submission.uploadDateEpochMillis : -1
    ));
}