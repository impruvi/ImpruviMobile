import {useNavigation} from "@react-navigation/native";
import EditContainer from "../../../../components/EditContainer";
import EditHeader from "../../../../components/EditHeader";
import {useState} from "react";
import {Alert, StyleSheet, TextInput} from "react-native";
import {Colors} from "../../../../constants/colors";
import useHttpClient from "../../../../hooks/useHttpClient";
import useError from "../../../../hooks/useError";

const EditPositionScreen = ({route}) => {

    const [position, setPosition] = useState(route.params.position);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {setError} = useError();

    const onSave = async () => {
        if (!position) {
            Alert.alert('Please enter your position', '', [
                {
                    text: 'Ok',
                }
            ]);
            return;
        }

        try {
            setIsSubmitting(true);
            const newCoach = {
                ...route.params.coach,
                position: position,
            };
            const updatedCoach = await httpClient.updateCoach(newCoach);
            route.params.setCoach(updatedCoach);
            setIsSubmitting(false);
            navigation.goBack();
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
            setIsSubmitting(false);
        }
    }

    return (
        <EditContainer isSubmitting={isSubmitting}>
            <EditHeader onCancel={navigation.goBack}
                        onSave={onSave}
                        title={'Position'}/>
            <TextInput style={styles.input} value={position} onChangeText={setPosition}/>
        </EditContainer>
    )
};

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


export default EditPositionScreen;