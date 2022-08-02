import {useCallback, useEffect, useState} from 'react';
import shorthash from 'shorthash';
import * as FileSystem from 'expo-file-system';
import {Image} from 'react-native';
import {isRemoteMediaUri} from "../util/fileUtil";
import {addFileCacheMapping, getFileCacheMapping} from "../file-cache/fileCache";

const CachedImage = ({sourceUri, style}) => {

    const [uri, setUri] = useState();

    const getUri = useCallback(async () => {
        if (!sourceUri || !isRemoteMediaUri(sourceUri)) {
            setUri(sourceUri);
            return;
        }

        const localUri = await getFileCacheMapping(sourceUri);

        if (!!localUri) {
            const f = await FileSystem.getInfoAsync(localUri);
            if (f.exists) { // check that file was not cleared out of the cache
                setUri(localUri);
                return;
            }
        }

        const path = `${FileSystem.cacheDirectory}${shorthash.unique(sourceUri)}`;
        const file = await FileSystem.downloadAsync(sourceUri, path);
        await addFileCacheMapping(sourceUri, file.uri);
        setUri(file.uri);
    }, [sourceUri]);

    useEffect(() => {
        getUri();
    }, [sourceUri]);

    return <Image style={style}
                  source={{uri: uri}} />
}

export default CachedImage;