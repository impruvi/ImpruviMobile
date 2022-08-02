import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleRight, faCircleExclamation} from "@fortawesome/pro-light-svg-icons";
import {Colors} from "../constants/colors";
import CachedImage from "./CachedImage";

const underlayColor = '#EFF3F4';

const FormOption = ({onPress, title, textValue, imageValue, placeholder, errorMessage, titleColor, shouldHideArrow}) => {

    return (
        <TouchableHighlight onPress={onPress} underlayColor={underlayColor}>
            <View style={styles.option} >
                <Text style={!!titleColor ? {...styles.title, color: titleColor} : styles.title}>{title}</Text>
                <View style={styles.content}>
                    {!!errorMessage && (
                        <View style={styles.errorContainer}>
                            <FontAwesomeIcon icon={faCircleExclamation} style={styles.errorIcon}/>
                            <Text style={styles.errorText}>{errorMessage}</Text>
                        </View>
                    )}
                    {!errorMessage && (
                        <>
                            {!textValue && !imageValue && (
                                <Text style={styles.placeholderText}>{placeholder}</Text>
                            )}
                            {!!textValue && (
                                <Text>{textValue.length > 33 ? `${textValue.substring(0,33).replace(/\n/g, ' ')}...` : textValue.replace('\n', ' ')}</Text>
                            )}
                            {!!imageValue && (
                                <CachedImage sourceUri={imageValue.uri} style={styles.image}/>
                            )}
                        </>
                    )}
                    {!shouldHideArrow && (
                        <View style={styles.arrowContainer}>
                            <FontAwesomeIcon icon={faAngleRight} size={20}/>
                        </View>
                    )}
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    option: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    errorContainer: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    errorIcon: {
        color: '#E04A3A'
    },
    errorText: {
        color: '#E04A3A',
        marginLeft: 5
    },
    title: {
        marginVertical: 10
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    placeholderText: {
        color: Colors.TextSecondary
    },
    arrowContainer: {
        marginLeft: 10
    },
    image: {
        height: 60,
        width: 40
    }
});

export default FormOption;