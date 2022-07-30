import {Animated, Image, ScrollView, useWindowDimensions} from "react-native";
import HeaderBackground from "../../../../assets/images/StadiumHeaderBackground.png";
import {useState} from 'react';
import CachedImage from "../../../../components/CachedImage";

const HeaderScrollView = ({children, imageFileLocation}) => {

    const [offset, setOffset] = useState(0);
    const {width} = useWindowDimensions();

    const top = offset < 0
        ? offset
        : 0;
    const height = offset < 0
        ? 253 - offset
        : 253;

    return (
        <ScrollView style={{flex: 1, position: 'relative'}}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={e => {
                        setOffset(e.nativeEvent.contentOffset.y);
                    }}>
            <Animated.View style={[{
                position: 'absolute',
                top: top,
                left: 0,
                right: 0,
                overflow: 'hidden',
                height: height
            }]}>
                <CachedImage sourceUri={!!imageFileLocation ? imageFileLocation : HeaderBackground.uri} style={{height: height, width: width}}/>
            </Animated.View>

            {children}
        </ScrollView>
    );
}

export default HeaderScrollView;