export const doesDrillHaveSubmission = (drill) => {
    return !!drill && !!drill.submission && !!drill.submission.fileLocation;
}

export const doesDrillHaveFeedback = (drill) => {
    return !!drill && !!drill.feedback && !!drill.feedback.fileLocation;
}
