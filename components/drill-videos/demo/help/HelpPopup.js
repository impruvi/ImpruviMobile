import ModalWithBackdrop from "../../../ModalWithBackdrop";
import {Dimensions, FlatList, TouchableOpacity, View, StyleSheet} from 'react-native';
import {useCallback, useRef, useState} from "react";
import {HelpPopupSlides} from "./slides";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faXmarkLarge} from "@fortawesome/pro-light-svg-icons";
import HelpPopupListItem from "./HelpPopupListItem";

const HelpPopup = ({visible, close}) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    const onScrollToIndexFailed = useCallback(info => {
        const wait = new Promise(resolve => setTimeout(resolve, 500));
        wait.then(() => {
            slidesRef.current?.scrollToIndex({ index: info.index, animated: true });
        });
    }, [slidesRef]);

    const next = useCallback(() => {
        if (currentIndex === HelpPopupSlides.length - 1) {
            close();
            slidesRef.current?.scrollToIndex({ index: 0, animated: false });
        } else {
            slidesRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
        }
    }, [currentIndex, close, slidesRef]);

    const onClose = useCallback(() => {
        close();
        slidesRef.current?.scrollToIndex({ index: 0, animated: false });
    }, [slidesRef, close]);

    const extractKey = useCallback(item => item.name, []);

    const renderItem = useCallback(({item, index}) => {
        return (
            <HelpPopupListItem item={item} index={index} next={next}/>
        )
    }, [next]);

    return (
        <ModalWithBackdrop visible={visible}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.closeIconContainer}>
                        <TouchableOpacity style={styles.closeIconButton} onPress={onClose}>
                            <FontAwesomeIcon icon={faXmarkLarge} size={20}/>
                        </TouchableOpacity>
                    </View>

                    <FlatList data={HelpPopupSlides}
                              horizontal
                              pagingEnabled
                              showsHorizontalScrollIndicator={false}
                              initialScrollIndex={0}
                              onScrollToIndexFailed={onScrollToIndexFailed}
                              onViewableItemsChanged={viewableItemsChanged}
                              viewabilityConfig={viewConfig}
                              scrollEventThrottle={32}
                              ref={slidesRef}
                              keyExtractor={extractKey}
                              renderItem={renderItem} />
                </View>
            </View>
        </ModalWithBackdrop>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: Dimensions.get('window').width * .85
    },
    closeIconContainer: {
        width: '100%',
        alignItems: 'flex-end'
    },
    closeIconButton: {
        paddingTop: 15,
        paddingRight: 15,
        paddingBottom: 5
    }
});

export default HelpPopup;