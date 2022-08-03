import {memo} from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "../../../../constants/colors";
import {HelpPopupSlides} from "./slides";

const HelpPopupListItem = ({item, index, next}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                How it works
            </Text>
            <Text style={styles.text}>{item.text}</Text>
            <Image source={item.image} style={styles.image}/>
            <TouchableOpacity onPress={next} style={styles.nextButton}>
                <Text style={styles.nextButtonText}>
                    {index !== HelpPopupSlides.length - 1
                        ? 'Next'
                        : 'Start training'}
                </Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width * .85,
        padding: 20,
        paddingTop: 0,
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10
    },
    text: {
        textAlign: 'center'
    },
    image: {
        width: 70,
        height: 150,
        resizeMode: 'contain',
        marginVertical: 15
    },
    nextButton: {
        padding: 5
    },
    nextButtonText: {
        color: Colors.Primary,
        fontWeight: '600',
        fontSize: 14
    }
});

export default memo(HelpPopupListItem);
