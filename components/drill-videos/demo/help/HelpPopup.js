import ModalWithBackdrop from "../../../ModalWithBackdrop";
import {FlatList, Image, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import {useRef, useState} from "react";
import {HelpPopupSlides} from "./slides";
import {Colors} from "../../../../constants/colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faXmarkLarge} from "@fortawesome/pro-light-svg-icons";

const WelcomeSlide = {
    name: 'WELCOME'
};

const HelpPopup = ({visible, close, shouldIncludeWelcome}) => {

    const {width} = useWindowDimensions();

    const [currentIndex, setCurrentIndex] = useState(0);
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    const next = () => {
        if (currentIndex === HelpPopupSlides.length - 1) {
            close();
            slidesRef.current?.scrollToIndex({ index: 0, animated: false });
        } else {
            slidesRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
        }
    }

    return (
        <ModalWithBackdrop visible={visible}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{backgroundColor: 'white', borderRadius: 10, width: width * .85}}>
                    <View style={{width: '100%', alignItems: 'flex-end'}}>
                        <TouchableOpacity style={{paddingTop: 15, paddingRight: 15, paddingBottom: 5}} onPress={() => {
                            close();
                            slidesRef.current?.scrollToIndex({ index: 0, animated: false });
                        }}>
                            <FontAwesomeIcon icon={faXmarkLarge} size={20}/>
                        </TouchableOpacity>
                    </View>

                    <FlatList data={shouldIncludeWelcome ? [WelcomeSlide, ...HelpPopupSlides] : HelpPopupSlides}
                              horizontal
                              pagingEnabled
                              showsHorizontalScrollIndicator={false}
                              initialScrollIndex={0}
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
                              keyExtractor={(item) => item.name}
                              renderItem={({item, index}) => (
                                  <>
                                      {item === WelcomeSlide && (
                                          <View style={{flex: 1, width: width * .85, padding: 30, paddingTop: 0, alignItems: 'center', justifyContent: 'center'}}>
                                              <Text style={{textAlign: 'center', fontSize: 16, fontWeight: '600', marginBottom: 15}}>
                                                  Welcome to your first training session!
                                              </Text>
                                              <Text style={{textAlign: 'center', marginBottom: 20}}>This first free session has been put together by your coach to assess your skill level in order to help them create a custom plan for you.</Text>
                                              <TouchableOpacity onPress={next} style={{padding: 5}}>
                                                  <Text style={{color: Colors.Primary, fontWeight: '600', fontSize: 14}}>Got it!</Text>
                                              </TouchableOpacity>
                                          </View>
                                      )}
                                      {item !== WelcomeSlide && (
                                          <View style={{width: width * .85, padding: 20, paddingTop: 0, alignItems: 'center'}}>
                                              <Text style={{textAlign: 'center', fontSize: 16, fontWeight: '600', marginBottom: 10}}>
                                                  How it works
                                              </Text>
                                              <Text style={{textAlign: 'center'}}>{item.text}</Text>
                                              <Image source={item.image} style={{width: 70, height: 150, resizeMode: 'contain', marginVertical: 15}}/>
                                              <TouchableOpacity onPress={next} style={{padding: 5}}>
                                                  <Text style={{color: Colors.Primary, fontWeight: '600', fontSize: 14}}>{index !== HelpPopupSlides.length - 1 ? 'Next' : 'Start training'}</Text>
                                              </TouchableOpacity>
                                          </View>
                                      )}
                                  </>
                                  )
                              } />
                </View>
            </View>
        </ModalWithBackdrop>
    );
}

export default HelpPopup;