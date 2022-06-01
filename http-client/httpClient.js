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

    stall = async (stallTime = 100) => {
        await new Promise(resolve => setTimeout(resolve, stallTime));
    }
}

export default HttpClient;
