import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleRight, faCircleExclamation} from "@fortawesome/pro-light-svg-icons";
import {Colors} from "../constants/colors";
import CachedImage from "./CachedImage";

const FormOption = ({onPress, title, textValue, imageValue, placeholder, errorMessage, titleColor, shouldHideArrow}) => {

    return (
        <TouchableHighlight onPress={onPress} underlayColor="#EFF3F4">
            <View style={styles.option} >
                <Text style={!!titleColor ? {marginVertical: 10, color: titleColor} : {marginVertical: 10}}>{title}</Text>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                    {!!errorMessage && (
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <FontAwesomeIcon icon={faCircleExclamation} style={{color: '#E04A3A'}}/>
                            <Text style={{color: '#E04A3A', marginLeft: 5}}>{errorMessage}</Text>
                        </View>
                    )}
                    {!errorMessage && (
                        <>
                            {!textValue && !imageValue && (
                                <Text style={{color: Colors.TextSecondary}}>{placeholder}</Text>
                            )}
                            {!!textValue && (
                                <Text>{textValue.length > 33 ? `${textValue.substring(0,33).replace(/\n/g, ' ')}...` : textValue.replace('\n', ' ')}</Text>
                            )}
                            {!!imageValue && (
                                <CachedImage source={{uri: imageValue.uri}} style={{height: 60, width: 40}}/>
                            )}
                        </>
                    )}
                    {!shouldHideArrow && (
                        <View style={{marginLeft: 10}}>
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
});

export default FormOption;