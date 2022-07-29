/*
 * Encapsulates the execution of a method on httpClient
 * Preconditions:
 * - request must be idempotent as these will be retried until succeeding.
 * - request must not return a result that the caller cares about since result of the call will be dropped
 */
import shorthash from "shorthash";

export class LongRequest {

    requestId = null;
    operation = null; // operation to be called
    metadata = {}; // any metadata the caller wants to store with this request
    input = null; // the input to the method on the httpClient

    progress = 0;
    attemptedNumberOfRetries = 0;

    constructor(operation, metadata, input) {
        this.requestId = shorthash.unique(`${operation}${JSON.stringify(metadata)}${JSON.stringify(input)}`);
        this.operation = operation;
        this.metadata = metadata;
        this.input = input;
    }

    toJSON() {
        return {
            requestId: this.requestId,
            operation: this.operation,
            metadata: this.metadata,
            input: this.input,
            progress: this.progress
        }
    }
}

export const LongRequestType = {
    UpdateDrill: 'updateDrill',
    CreateSubmission: 'createSubmission',
    CreateFeedback: 'createFeedback'
}
