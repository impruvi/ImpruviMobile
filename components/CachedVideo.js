import React, {useEffect, useRef, useState} from "react";
import shorthash from "shorthash";
import * as FileSystem from "expo-file-system";
import {Video} from "expo-av";
import {addFileCacheMapping, getFileCacheMapping} from "../file-cache/fileCache";

const CachedVideo = ({source, style, resizeMode, shouldPlay, isLooping, playbackRate, isMuted, onPlaybackStatusUpdate}) => {

    const [uri, setUri] = useState();
    const ref = useRef();

    useEffect(() => {
        Cached();
    }, []);

    const Cached = async () => {
        const localUri = await getFileCacheMapping(source.uri);

        if (!!localUri) {
            const f = await FileSystem.getInfoAsync(localUri);
            if (f.exists) { // check that file was not cleared out of the cache
                setUri(localUri);
                return;
            }
        }

        const path = `${FileSystem.cacheDirectory}${shorthash.unique(source.uri)}.mov`;
        const file = await FileSystem.downloadAsync(source.uri, path);
        await addFileCacheMapping(source.uri, file.uri);
        setUri(file.uri);
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