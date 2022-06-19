import {useNavigation} from "@react-navigation/native";
import EditContainer from "../../../components/EditContainer";
import EditHeader from "../../../components/EditHeader";
import {useState} from "react";
import {StyleSheet, TextInput} from "react-native";
import {Colors} from "../../../constants/colors";
import useHttpClient from "../../../hooks/useHttpClient";
import useError from "../../../hooks/useError";
import useAuth from "../../../hooks/useAuth";

const EditAboutScreen = ({route}) => {

    const [about, setAbout] = useState(route.params.about);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {setError} = useError();
    const {setCoach} = useAuth();

    const onSave = async () => {
        try {
            setIsSubmitting(true);
            const newCoach = {
                ...route.params.coach,
                about: about,
            };
            await httpClient.updateCoach(newCoach);
            setCoach(newCoach)
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
            <EditHeader onCancel={() => navigation.goBack()}
                        onSave={onSave}
                        title={'About'}/>
            <TextInput style={styles.input} value={about} onChangeText={setAbout} multiline/>
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
        borderColor: Colors.Border,
        minHeight: 150
    }
});


export default EditAboutScreen;