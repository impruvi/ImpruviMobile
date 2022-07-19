import {Text, View} from 'react-native';
import CachedImage from './CachedImage';

const HeadshotChip = ({size= 40, firstName, lastName, image}) => {
    return (
        <View style={{width: size, height: size, borderRadius: size, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', overflow: 'hidden'}}>
            {!!image && !!image.fileLocation && (
                <CachedImage
                    source={{uri: image.fileLocation}}
                    style={{width: size, height: size, resizeMode: 'cover'}}
                />
            )}
            {(!image || !image.fileLocation) && (
                <View>
                    <Text style={{fontSize: size / 2.3}}>{`${firstName.substring(0, 1).toUpperCase()}${lastName.substring(0, 1).toUpperCase()}`}</Text>
                </View>
            )}
        </View>
    )
}

export default HeadshotChip;