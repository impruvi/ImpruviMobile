import {Image, ScrollView, StyleSheet, useWindowDimensions, View} from "react-native";
import HeaderBackground from "../../../../assets/images/StadiumHeaderBackground.png";
import {useState} from 'react';
import CachedImage from "../../../../components/CachedImage";

const HeaderScrollView = ({children, imageFileLocation, imageHeight=253}) => {

    const [offset, setOffset] = useState(0);
    const {width} = useWindowDimensions();

    const top = offset < 0
        ? offset
        : 0;
    const height = offset < 0
        ? imageHeight - offset
        : imageHeight;

    return (
        <ScrollView style={styles.container}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={e => {
                        setOffset(e.nativeEvent.contentOffset.y);
                    }}>

            <View style={[{...styles.imageContainer, top: top, height: height}]}>
                <CachedImage sourceUri={!!imageFileLocation ? imageFileLocation : Image.resolveAssetSource(HeaderBackground).uri} style={{height: height, width: width}}/>
            </View>

            {children}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    imageContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        overflow: 'hidden',
    }
})

export default HeaderScrollView;
