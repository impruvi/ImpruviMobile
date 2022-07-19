import React, {useEffect, useRef, useState} from "react";
import shorthash from "shorthash";
import * as FileSystem from "expo-file-system";
import {Video} from "expo-av";

const CachedVideo = ({source, style, resizeMode, shouldPlay, isLooping, playbackRate, isMuted, onPlaybackStatusUpdate}) => {

    const url = source.uri;
    const [uri, setUri] = useState();
    const ref = useRef();

    useEffect(() => {
        Cached();
    }, []);

    const Cached = async () => {
        const name = shorthash.unique(url) + '.mov';
        const path = `${FileSystem.cacheDirectory}${name}`;
        const video = await FileSystem.getInfoAsync(path);

        if (video.exists) {
            setUri(video.uri);
            return;
        }

        const newImage = await FileSystem.downloadAsync(url, path);
        setUri(newImage.uri);
    }

    return (
        <Video
            ref={ref}
            style={style}
            source={{uri: uri}}
            resizeMode={resizeMode}
            rate={playbackRate}
            shouldPlay={shouldPlay}
            isLooping={isLooping}
            isMuted={isMuted}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        />
    )
};

export default CachedVideo;