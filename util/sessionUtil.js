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

export const isLastDrillInSession = (drill, session) => {
    if (!session || !session.drills || session.drills.length === 0) {
        return false;
    }
    return drill.drillId === session.drills[session.drills.length - 1].drillId
}

export const isFirstDrillInSession = (drill, session) => {
    if (!session || !session.drills || session.drills.length === 0) {
        return false;
    }
    return drill.drillId === session.drills[0].drillId
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

export const isNextSession = (sessions, session) => {
    if (!session) {
        return false;
    }
    const nextSession = getNextSession(sessions);
    return !!nextSession && nextSession.sessionNumber === session.sessionNumber;
}

export const isLastSession = (sessions, session) => {
    if (!session) {
        return false;
    }
    const lastSession = getLastSession(sessions);
    return !!lastSession && lastSession.sessionNumber === session.sessionNumber;
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