import {useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {StyleSheet, TextInput} from "react-native";
import EditHeader from "../../../../components/EditHeader";
import {Colors} from "../../../../constants/colors";
import EditContainer from "../../../../components/EditContainer";

const EditDrillNameScreen = ({route}) => {

    const [name, setName] = useState(route.params.name);

    const navigation = useNavigation();

    const onSave = () => {
        route.params.setName(name);
        navigation.goBack();
    }

    return (
        <EditContainer>
            <EditHeader onCancel={() => navigation.goBack()}
                        onSave={onSave}
                        title={'Name'}/>
            <TextInput style={styles.input} value={name} onChangeText={setName}/>
        </EditContainer>
    )
}

const styles = StyleSheet.create({
    input: {
        marginTop: 10,
        fontSize: 16,
        paddingVertical: 15,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: Colors.Border
    }
});

export default EditDrillNameScreen;

