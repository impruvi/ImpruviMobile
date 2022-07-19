import {Animated, Image, ScrollView, useWindowDimensions} from "react-native";
import HeaderBackground from "../../../../assets/images/StadiumHeaderBackground.png";
import {useState} from 'react';

const HeaderScrollView = ({children}) => {

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
                <Image source={HeaderBackground} style={{height: height, width: width}}/>
            </Animated.View>

            {children}
        </ScrollView>
    );
}

export default HeaderScrollView;