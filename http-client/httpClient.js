import apiClientFactory from 'aws-api-gateway-client';

class HttpClient {

    #client = apiClientFactory.newClient({
        invokeUrl: 'https://sdla1ah8n1.execute-api.us-west-2.amazonaws.com/prod',
        region: 'us-west-2',
        accessKey: 'AKIAXTDBP63P4IWBNXM6',
        secretKey: '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',
    });

    validateInviteCode = async (invitationCode) => {
        const response = await this.#client.invokeApi({}, '/validate-invitation-code', 'POST', {}, {
            invitationCode: invitationCode
        });

        return response.data;
    }

    getSessions = async (userId) => {
        const response = await this.#client.invokeApi({}, '/get-sessions', 'POST', {}, {
            userId: userId
        });

        return response.data.sessions;
    }

    submitDrillVideo = async (userId, sessionNumber, drillId, video) => {
        // get s3 presigned url
        const getVideoUploadUrlResponse = await this.#client.invokeApi({}, '/get-video-upload-url', 'POST', {}, {
            videoType: 'Submission',
            userId: userId,
            sessionNumber: sessionNumber,
            drillId: drillId
        });

        // upload file to s3
        const file = await fetch(video.uri);
        const blob = await file.blob();
        await fetch(getVideoUploadUrlResponse.data.uploadUrl, { method: 'PUT', body: blob });

        // update submission for drill
        await this.#client.invokeApi({}, '/create-submission', 'POST', {}, {
            userId: userId,
            sessionNumber: sessionNumber,
            drillId: drillId,
            fileLocation: getVideoUploadUrlResponse.data.fileLocation
        });
    }

    stall = async (stallTime = 100) => {
        await new Promise(resolve => setTimeout(resolve, stallTime));
    }
}

export default HttpClient;
