import Constants from 'expo-constants';


const ENV = {
    beta: {
        apiUrl: 'https://pmpq5sqn7f.execute-api.us-west-2.amazonaws.com/prod',
    },
    prod: {
        apiUrl: 'https://a70qx1uv76.execute-api.us-west-2.amazonaws.com/prod',
    },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
    // What is __DEV__ ?
    // This variable is set to true when react-native is running in Dev mode.
    // __DEV__ is true when run locally, but false when published.
    if (__DEV__) {
        return ENV.beta;
    } else if (env === 'prod') {
        return ENV.prod;
    }
};

export default getEnvVars;
