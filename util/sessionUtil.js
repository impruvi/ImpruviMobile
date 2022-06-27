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