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
import {useState} from "react";
import HeaderCenter from "../../../components/HeaderCenter";
import CachedImage from "../../../components/CachedImage";


const EditDrillSelectionDetailsScreen = ({route}) => {

    const {drill, onSelectDrill} = route.params;

    const [notes, setNotes] = useState(drill.notes);

    const navigation = useNavigation();

    const onAdd = () => {
        onSelectDrill({
            ...drill,
            notes: notes,
        });
        navigation.goBack();
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <KeyboardAvoidingView style={{flex: 1}} behavior={'padding'}>
                <HeaderCenter title={drill.name}
                              right={<FontAwesomeIcon  icon={faXmarkLarge} size={20} />}
                              onRightPress={navigation.goBack}/>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderColor: Colors.Border}}>
                            <View style={{flex: 1}}>
                                <TextInput multiline={true}
                                           placeholder={'Enter notes (ex. include number of repetitions, duration, tips etc.)'}
                                           style={{height: 150, paddingRight: 10}}
                                           value={notes}
                                           onChangeText={setNotes}/>
                            </View>
                            <View style={{width: 100}}>
                                <CachedImage source={{uri: drill.demos.frontThumbnail.fileLocation}} style={{height: 150, width: 100}} />
                            </View>
                        </View>
                    </View>

                </TouchableWithoutFeedback>

                <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', padding: 15}}>
                    <TouchableOpacity onPress={onAdd} style={styles.button}>
                        <Text style={{color: 'white', fontWeight: '600'}}>Add</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
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