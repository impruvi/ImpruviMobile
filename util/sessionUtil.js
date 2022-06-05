import {doesDrillHaveFeedback, doesDrillHaveSubmission} from "./drillUtil";

export const doesEveryDrillHaveSubmission = (session) => {
    return session.drills.every(doesDrillHaveSubmission);
}

export const doesEveryDrillHaveFeedback = (session) => {
    return session.drills.every(doesDrillHaveFeedback);
}