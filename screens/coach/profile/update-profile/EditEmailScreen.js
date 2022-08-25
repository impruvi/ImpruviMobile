import {useNavigation} from "@react-navigation/native";
import EditContainer from "../../../../components/EditContainer";
import EditHeader from "../../../../components/EditHeader";
import {useState} from "react";
import {Alert, StyleSheet, TextInput} from "react-native";
import {Colors} from "../../../../constants/colors";
import useHttpClient from "../../../../hooks/useHttpClient";
import useError from "../../../../hooks/useError";
import {isValidEmail} from "../../../../util/authUtil";

const EditEmailScreen = ({route}) => {

    const [email, setEmail] = useState(route.params.email);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {setError} = useError();

    const onSave = async () => {
        if (!isValidEmail(email)) {
            Alert.alert('Please enter a valid email address', '', [
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
                email: email,
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
                        title={'Email'}/>
            <TextInput style={styles.input}
                       value={email}
                       autoCapitalize='none'
                       onChangeText={setEmail}/>
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


export default EditEmailScreen;
