import {FlatList, View} from "react-native";
import {Colors} from "../../constants/colors";
import {useRef, useState} from "react";
import {HomeSlideNames} from "./homeSlideNames";
import HomeSlide from "./HomeSlide";

const HomeSlides = ({sessions}) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    return (
        <>
            <FlatList data={HomeSlideNames}
                      horizontal
                      pagingEnabled
                      showsHorizontalScrollIndicator={false}
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
                      keyExtractor={(item) => item.id}
                      renderItem={({item}) => <HomeSlide slide={item.id} sessions={sessions}/>} />

            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', marginBottom: 10}}>
                <View style={{width: 7, height: 7, borderRadius: 10, backgroundColor: currentIndex === 0 ? Colors.Primary :Colors.Border, marginHorizontal: 3}}/>
                <View style={{width: 7, height: 7, borderRadius: 10, backgroundColor: currentIndex === 1 ? Colors.Primary : Colors.Border, marginHorizontal: 3}}/>
                <View style={{width: 7, height: 7, borderRadius: 10, backgroundColor: currentIndex === 2 ? Colors.Primary : Colors.Border, marginHorizontal: 3}}/>
            </View>
        </>
    )
};

export default HomeSlides;