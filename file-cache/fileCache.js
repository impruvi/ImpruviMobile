import AsyncStorage from "@react-native-async-storage/async-storage";


export const getFileCacheMapping = async (remoteUri) => {
    const mappings = await getMappings();
    return mappings[remoteUri];
}

export const addFileCacheMapping = async (remoteUri, localUri) => {
    const mappings = await getMappings();
    const newMappings = {
        ...mappings,
    }
    newMappings[remoteUri] = localUri;
    const newMappingsJSON = JSON.stringify(newMappings);
    await AsyncStorage.setItem('fileCacheMapping', newMappingsJSON);
}

const getMappings = async () => {
    const mappingsJSON = await AsyncStorage.getItem('fileCacheMapping');
    if (!mappingsJSON) {
        return {};
    }
    return JSON.parse(mappingsJSON);
}
