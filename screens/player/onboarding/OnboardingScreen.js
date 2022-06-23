import useOnboarding from "../../../hooks/useOnboarding";
import {useRef, useState} from "react";
import {FlatList, StyleSheet, View} from "react-native";
import {OnboardingSlideNames} from "./onboardingSlideNames";
import OnboardingSlide from "./OnboardingSlide";

const OnboardingScreen = () => {
    const {markOnboardingComplete} = useOnboarding();
    const [currentIndex, setCurrentIndex] = useState(0);
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    const onPressHandler = () => {
        if (currentIndex < OnboardingSlideNames.length - 1) {
            slidesRef.current.scrollToIndex({index: currentIndex + 1});
        } else {
            markOnboardingComplete();
        }
    }

    return (
        <View style={styles.container}>
            <View style={{flex: 3}}>
                <FlatList
                    initialScrollIndex={currentIndex}
                    onScrollToIndexFailed={info => {
                        const wait = new Promise(resolve => setTimeout(resolve, 500));
                        wait.then(() => {
                            slidesRef.current?.scrollToIndex({ index: info.index, animated: true });
                        });
                    }}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    scrollEventThrottle={32}
                    ref={slidesRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    data={OnboardingSlideNames}
                    renderItem={({item}) => <OnboardingSlide slide={item.id} onPress={onPressHandler}/>}
                    keyExtractor={(item) => item.id}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default OnboardingScreen;