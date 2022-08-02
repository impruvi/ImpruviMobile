import {
    Keyboard,
    KeyboardAvoidingView,
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
import {useCallback, useState} from "react";
import HeaderCenter from "../../../components/HeaderCenter";
import CachedImage from "../../../components/CachedImage";


const EditDrillSelectionDetailsScreen = ({route}) => {

    const {drill, onSelectDrill} = route.params;

    const [notes, setNotes] = useState(drill.notes);

    const navigation = useNavigation();

    const onAdd = useCallback(() => {
        onSelectDrill({
            ...drill,
            notes: notes,
        });
        navigation.goBack();
    }, [drill, notes]);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={'padding'}>
                <HeaderCenter title={drill.name}
                              right={<FontAwesomeIcon  icon={faXmarkLarge} size={20} />}
                              onRightPress={navigation.goBack}/>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.notes}>
                            <TextInput multiline={true}
                                       placeholder={'Enter notes (ex. include number of repetitions, duration, tips etc.)'}
                                       style={styles.notesTextInput}
                                       value={notes}
                                       onChangeText={setNotes}/>
                        </View>
                        <CachedImage sourceUri={drill.demos.frontThumbnail.fileLocation} style={styles.image} />
                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={onAdd} style={styles.button}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: 'white'
    },
    keyboardAvoidingView: {
        flex: 1
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: Colors.Border
    },
    notes: {
        flex: 1
    },
    notesTextInput: {
        height: 150,
        paddingRight: 10
    },
    image: {
        height: 150,
        width: 100
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 15
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
    buttonText: {
        color: 'white',
        fontWeight: '600'
    }
});

export default EditDrillSelectionDetailsScreen;