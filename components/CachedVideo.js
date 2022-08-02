import React, {useCallback, useEffect, useRef, useState} from "react";
import shorthash from "shorthash";
import * as FileSystem from "expo-file-system";
import {Video, Audio} from "expo-av";
import {addFileCacheMapping, getFileCacheMapping} from "../file-cache/fileCache";

const CachedVideo = ({videoSourceUri, posterSourceUri, style, resizeMode, shouldPlay, isLooping, playbackRate, isMuted}) => {

    const [videoUri, setVideoUri] = useState();
    const [posterUri, setPosterUri] = useState();
    const ref = useRef();

    const onStatusUpdate = (status) => {
        if (status.shouldPlay && !status.isPlaying && !status.isBuffering) {
            console.log('bad status');
            ref.current?.playAsync();
        }
        if (!!status.error) {
            console.log('had error');
        }
    }

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

        // We don't wait until video is downloaded to cache to set uri - we want to allow the video player
        // to start playing the video before it is fully downloaded.
        // We also don't download to cache asynchronously to not choke up network bandwidth
        setVideoUri(videoSourceUri);
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
    }, [videoSourceUri]);

    useEffect(() => {
        getPosterUri();
    }, [posterSourceUri]);

    useEffect(() => {
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false,
        });
    }, []);

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
            onPlaybackStatusUpdate={onStatusUpdate}/>
    )
};

export default CachedVideo;