

export const isRemoteMedia = (media) => {
    // TODO: not sure that this works in all cases
    return media.uri.startsWith('https://');
}
