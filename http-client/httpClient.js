import apiClientFactory from 'aws-api-gateway-client';
import {Equipment} from "../constants/equipment";
import {Categories} from "../constants/categories";
export const Endpoint = 'https://r5gmmfe8rd.execute-api.us-west-2.amazonaws.com/prod';


const equipment = [
    {
        type: Equipment.Ball,
        value: 1
    },
    {
        type: Equipment.Cone,
        value: 5
    },
    {
        type: Equipment.Goal,
        value: 1
    },
    {
        type: Equipment.Space,
        value: 10
    }
]

const drill1 = {
    drill: {
        drillId: 'abc123',
        category: Categories.Dribbling,
        name: 'Ptachik warmup',
        equipment: equipment,
        fileLocations: {
            front: '',
            side: '',
            closeUp: ''
        }
    },
    submission: {
        fileLocation: ''
    },
    feedback: {
        fileLocation: ''
    },
    description: 'This is the second drill',
    tips: [
        'Focus on keeping your head up'
    ],
    repetitions: 3
};

const drill2 = {
    drill: {
        drillId: 'abc123',
        category: Categories.Shooting,
        name: 'Rapid fire',
        equipment: equipment,
        fileLocations: {
            front: '',
            side: '',
            closeUp: ''
        },
        description: 'This is the second drill',
        tips: [
            'Focus on keeping your head up'
        ],
        repetitions: 3
    },
    submission: {
        fileLocation: ''
    },
    feedback: {
        fileLocation: ''
    }
};

class HttpClient {

    #client = apiClientFactory.newClient({
        invokeUrl: Endpoint,
        region: 'us-west-2',
        accessKey: 'AKIA2UFO5ZGGFOG7GMZI',
        secretKey: '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',
    });

    validateInviteCode = async (code) => {
        await this.stall();

        return code === 'Hello' ? {
            success: true,
            user: {
                userId: 'abc123'
            }
        } : {
            success: false,
            user: null
        };
    }

    getSessions = async (userId) => {
        await this.stall();

        return [
            {
                sessionId: 'abc123',
                sessionNumber: 1,
                equipment: equipment,
                drills: [
                    drill1,
                    drill2,
                ]
            }
        ]
    }

    stall = async (stallTime = 100) => {
        await new Promise(resolve => setTimeout(resolve, stallTime));
    }
}

export default HttpClient;
