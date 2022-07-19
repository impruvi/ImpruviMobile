import * as VideoThumbnails from "expo-video-thumbnails";

export const generateThumbnail = async (video) => {
    return await VideoThumbnails.getThumbnailAsync(video.uri, {time: 0,quality: .3})
}
