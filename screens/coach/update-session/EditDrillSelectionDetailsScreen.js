import {
    Image,
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {useNavigation} from "@react-navigation/native";
import {faXmarkLarge} from "@fortawesome/pro-light-svg-icons";
import {Colors} from "../../../constants/colors";
import {useState} from "react";
import FormOption from "../../../components/FormOption";
import {CoachScreenNames} from "../../ScreenNames";
import HeaderCenter from "../../../components/HeaderCenter";

const Fields = {
    Notes: 'NOTES',
    EstimatedDuration: 'ESTIMATED_DURATION'
}

const EditDrillSelectionDetailsScreen = ({route}) => {

    const {drill, onSelectDrill, onRemoveDrill} = route.params;

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [notes, setNotes] = useState(drill.notes);
    const [estimatedDurationMinutes, setEstimatedDurationMinutes] = useState(drill.estimatedDurationMinutes);

    const navigation = useNavigation();

    const onAdd = () => {
        const invalidFields = getFieldsWithInvalidInput();
        if (invalidFields.length > 0) {
            setHasSubmitted(true);
            return;
        }
        onSelectDrill({
            ...drill,
            notes: notes,
            estimatedDurationMinutes: estimatedDurationMinutes
        });
        navigation.goBack();
    }

    const onRemove = () => {
        onRemoveDrill(drill);
        navigation.goBack();
    }

    const getFieldsWithInvalidInput = () => {
        const fieldsWithInvalidInput = [];

        if (!estimatedDurationMinutes) {
            fieldsWithInvalidInput.push(Fields.EstimatedDuration);
        }

        return fieldsWithInvalidInput;
    }

    const shouldShowValidationErrorForField = (field) => {
        return hasSubmitted && getFieldsWithInvalidInput().includes(field);
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <HeaderCenter title={drill.name}
                          right={<FontAwesomeIcon  icon={faXmarkLarge} size={20} />}
                          onRightPress={navigation.goBack}/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderColor: Colors.Border}}>
                        <View style={{flex: 1}}>
                            <TextInput multiline={true}
                                       placeholder={'Enter notes'}
                                       style={{height: 150, paddingRight: 10}}
                                       value={notes}
                                       onChangeText={setNotes}/>
                        </View>
                        <View style={{width: 100}}>
                            <Image source={{uri: drill.demos.frontThumbnail.fileLocation}} style={{height: 150, width: 100}} />
                        </View>
                    </View>
                    <FormOption title={'Estimated duration'}
                                onPress={() => navigation.navigate(CoachScreenNames.EditEstimatedDurationScreen, {
                                    estimatedDurationMinutes: estimatedDurationMinutes,
                                    setEstimatedDurationMinutes: setEstimatedDurationMinutes
                                })}
                                textValue={!!estimatedDurationMinutes ? `${estimatedDurationMinutes} minutes` : ''}
                                errorMessage={shouldShowValidationErrorForField(Fields.EstimatedDuration)
                                    ? 'Enter estimated duration'
                                    : null}/>
                </View>

            </TouchableWithoutFeedback>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', padding: 15}}>
                {!!onRemoveDrill ? (
                    <TouchableOpacity onPress={onRemove} style={styles.buttonSecondary}>
                        <Text style={{fontWeight: '600'}}>Remove</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={{width: '49%'}}></View>
                )}
                <TouchableOpacity onPress={onAdd} style={styles.button}>
                    <Text style={{color: 'white', fontWeight: '600'}}>{!!onRemoveDrill ? 'Update' : 'Add'}</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        position: 'relative',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 15,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderColor: Colors.Border
    },
    button: {
        width: '49%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.Primary,
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 3
    },
    buttonSecondary: {
        width: '49%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.Border,
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 3
    }
});

export default EditDrillSelectionDetailsScreen;