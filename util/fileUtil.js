

export const isRemoteMedia = (media) => {
    return isRemoteMediaUri(media.uri);
}

export const isRemoteMediaUri = (uri) => {
    // TODO: not sure that this works in all cases
    return uri.startsWith('https://');
}


