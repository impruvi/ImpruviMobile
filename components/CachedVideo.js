import React, {useCallback, useEffect, useRef, useState} from "react";
import shorthash from "shorthash";
import * as FileSystem from "expo-file-system";
import {Video} from "expo-av";
import {addFileCacheMapping, getFileCacheMapping} from "../file-cache/fileCache";

const CachedVideo = ({videoSourceUri, posterSourceUri, style, resizeMode, shouldPlay, isLooping, playbackRate, isMuted, onPlaybackStatusUpdate}) => {

    const [videoUri, setVideoUri] = useState();
    const [posterUri, setPosterUri] = useState();
    const ref = useRef();

    const getVideoUri = useCallback(async () => {
        if (!videoSourceUri) {
            return;
        }

        const localUri = await getFileCacheMapping(videoSourceUri);

        if (!!localUri) {
            const f = await FileSystem.getInfoAsync(localUri);
            if (f.exists) { // check that file was not cleared out of the cache
                setVideoUri(localUri);
                return;
            }
        }

        const path = `${FileSystem.cacheDirectory}${shorthash.unique(videoSourceUri)}.mov`;
        const file = await FileSystem.downloadAsync(videoSourceUri, path);
        await addFileCacheMapping(videoSourceUri, file.uri);
        setVideoUri(file.uri);
    }, [videoSourceUri]);

    const getPosterUri = useCallback(async () => {
        if (!posterSourceUri) {
            return;
        }

        const localUri = await getFileCacheMapping(posterSourceUri);

        if (!!localUri) {
            const f = await FileSystem.getInfoAsync(localUri);
            if (f.exists) { // check that file was not cleared out of the cache
                setPosterUri(localUri);
                return;
            }
        }

        const path = `${FileSystem.cacheDirectory}${shorthash.unique(posterSourceUri)}`;
        const file = await FileSystem.downloadAsync(posterSourceUri, path);
        await addFileCacheMapping(posterSourceUri, file.uri);
        setPosterUri(file.uri);
    }, [posterSourceUri]);


    useEffect(() => {
        getVideoUri();
    }, [getVideoUri]);

    useEffect(() => {
        getPosterUri();
    }, [getPosterUri]);

    return (
        <Video
            ref={ref}
            style={style}
            source={{uri: videoUri}}
            posterSource={{uri: posterUri}}
            usePoster={true}
            posterStyle={{...style, resizeMode: resizeMode}}
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