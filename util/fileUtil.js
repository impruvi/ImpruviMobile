import * as FileSystem from "expo-file-system";


export const isRemoteMedia = (media) => {
    return isRemoteMediaUri(media.uri);
}

export const isRemoteMediaUri = (uri) => {
    // TODO: not sure that this works in all cases
    return uri.startsWith('https://');
}

export const doesLocalFileExist = async (localUri) => {
    try {
        const fileInfo = await FileSystem.getInfoAsync(localUri);
        return !!fileInfo && fileInfo.exists;
    } catch (err) {
        return false;
    }
}

