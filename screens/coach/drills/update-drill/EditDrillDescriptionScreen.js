import {useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {StyleSheet, TextInput} from "react-native";
import EditHeader from "../../../../components/EditHeader";
import {Colors} from "../../../../constants/colors";
import EditContainer from "../../../../components/EditContainer";

const EditDrillDescriptionScreen = ({route}) => {

    const [description, setDescription] = useState(route.params.description);

    const navigation = useNavigation();

    const onSave = () => {
        route.params.setDescription(description);
        navigation.goBack();
    }

    return (
        <EditContainer>
            <EditHeader onCancel={() => navigation.goBack()}
                        onSave={onSave}
                        title={'Description'}/>
            <TextInput style={styles.input}
                       value={description}
                       onChangeText={setDescription}
                       multiline/>
        </EditContainer>
    )
}

const styles = StyleSheet.create({
    input: {
        marginTop: 10,
        fontSize: 16,
        paddingTop: 15,
        paddingBottom: 15,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: Colors.Border,
        minHeight: 150
    }
});

export default EditDrillDescriptionScreen;