import {FlatList, Image, Text, TouchableOpacity, useWindowDimensions, View, Dimensions, StyleSheet} from "react-native";
import {Colors} from "../../constants/colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faBolt} from "@fortawesome/pro-solid-svg-icons";
import {useRef, useState} from "react";

const width = Dimensions.get('window').width;

const HomeSlides = ({navigateToCoach}) => {

    const {width} = useWindowDimensions();

    const [currentIndex, setCurrentIndex] = useState(0);
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    return (
        <>
            <FlatList data={['1', '2', '3']}
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
                      renderItem={({item}) => (
                          <View style={styles.container}>
                              {item === '1' && (
                                  <View style={styles.innerContainer}>
                                      <View style={{padding: 15}}>
                                          <View style={{}}>
                                              <Text style={{color: 'white', fontSize: 20}}>HENRY</Text>
                                              <Text style={{color: 'white', fontSize: 15}}>GREIN</Text>
                                              <Text style={{color: 'white', fontSize: 11}}>Your coach</Text>

                                              <TouchableOpacity style={{marginTop: 20}} onPress={navigateToCoach}>
                                                  <Text style={{color: 'white'}}>Learn more</Text>
                                              </TouchableOpacity>
                                          </View>
                                      </View>

                                      <View style={{width: '50%', alignItems: 'center'}}>
                                          <Image source={{uri: 'https://www.nicepng.com/png/full/367-3675047_new-fc-barcelona-2017-2018-la-liga-football.png'}}
                                                 style={{height: 120, width: 120, marginTop: 10}}/>
                                      </View>
                                  </View>
                              )}
                              {item === '2' && (
                                  <View style={styles.innerContainer}>
                                      <View style={{alignItems: 'center'}}>
                                          <Text style={{color: 'white'}}>Don't know how to submit videos to your coach?</Text>
                                          <Text style={{color: 'white', marginVertical: 7}}>Don't have enough equipment?</Text>

                                          <TouchableOpacity style={{backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, marginTop: 15}}>
                                              <Text style={{color: Colors.Primary, fontWeight: '600'}}>Learn more</Text>
                                          </TouchableOpacity>
                                      </View>
                                  </View>
                              )}
                              {item === '3' && (
                                  <View style={styles.innerContainer}>
                                      <View style={{width: '50%', alignItems: 'center'}}>
                                          <FontAwesomeIcon icon={faBolt} style={{color: 'white', marginBottom: 10}}/>
                                          <Text style={{fontSize: 40, fontWeight: '600', color: 'white'}}>17</Text>
                                          <Text style={{color: 'white'}}>Drills completed</Text>
                                      </View>

                                      <View style={{width: '50%', alignItems: 'center'}}>
                                          <Text style={{color: 'white', marginBottom: 10, fontSize: 17, fontWeight: '600'}}>ü</Text>
                                          <Text style={{fontSize: 40, fontWeight: '600', color: 'white'}}>4</Text>
                                          <Text style={{color: 'white'}}>Sessions completed</Text>
                                      </View>
                                  </View>
                              )}
                          </View>
                      )} />

            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', marginBottom: 10}}>
                <View style={{width: 7, height: 7, borderRadius: 10, backgroundColor: currentIndex === 0 ? Colors.Primary : 'white', marginHorizontal: 3}}/>
                <View style={{width: 7, height: 7, borderRadius: 10, backgroundColor: currentIndex === 1 ? Colors.Primary : 'white', marginHorizontal: 3}}/>
                <View style={{width: 7, height: 7, borderRadius: 10, backgroundColor: currentIndex === 2 ? Colors.Primary : 'white', marginHorizontal: 3}}/>
            </View>

        </>
    )
};

const styles = StyleSheet.create({
    container: {
        width: width,
        height: 130,
        paddingHorizontal: 15,
        marginBottom: 10
    },
    innerContainer: {
        width: '100%',
        height: 130,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.Primary,
        paddingHorizontal: 15,
        borderRadius: 20
    }
})

export default HomeSlides;