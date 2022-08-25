import {StyleSheet, Text, View} from 'react-native';
import CachedImage from './CachedImage';

const HeadshotChip = ({size= 40, firstName, lastName, image}) => {
    return (
        <View style={{...styles.container, width: size, height: size, borderRadius: size}}>
            {!!image && !!image.fileLocation && (
                <CachedImage
                    sourceUri={image.fileLocation}
                    style={{...styles.image, width: size, height: size}}
                />
            )}
            {(!image || !image.fileLocation) && (
                <View>
                    <Text style={{fontSize: size / 2.3}}>{`${firstName?.substring(0, 1)?.toUpperCase()}${lastName?.substring(0, 1)?.toUpperCase()}`}</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd',
        overflow: 'hidden'
    },
    image: {
        resizeMode: 'cover'
    }
});

export default HeadshotChip;
