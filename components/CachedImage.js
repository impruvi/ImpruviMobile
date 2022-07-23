import {useEffect, useState} from 'react';
import shorthash from 'shorthash';
import * as FileSystem from 'expo-file-system';
import {Image} from 'react-native';
import {isRemoteMedia} from "../util/fileUtil";
import {addFileCacheMapping, getFileCacheMapping} from "../file-cache/fileCache";

const CachedImage = ({source, style}) => {

    const [uri, setUri] = useState();

    useEffect(() => {
        Cached();
    }, [source]);

    const Cached = async () => {
        if (!isRemoteMedia(source)) {
            setUri(source.uri);
            return;
        }

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

    return <Image style={style}
                  source={{uri: uri}} />
}

export default CachedImage;