import {useEffect, useState} from 'react';
import shorthash from 'shorthash';
import * as FileSystem from 'expo-file-system';
import {Image} from 'react-native';
import {isRemoteMedia} from "../util/fileUtil";

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
        const name = shorthash.unique(source.uri);
        const path = `${FileSystem.cacheDirectory}${name}`;
        const image = await FileSystem.getInfoAsync(path);

        if (image.exists) {
            setUri(image.uri);
            return;
        }

        const newImage = await FileSystem.downloadAsync(source.uri, path);

        setUri(newImage.uri);
    }

    return <Image style={style}
                  source={{uri: uri}} />
}

export default CachedImage;