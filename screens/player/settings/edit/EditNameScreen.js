import EditHeader from "../../../../components/EditHeader";
import EditContainer from "../../../../components/EditContainer";
import {useNavigation} from "@react-navigation/native";
import {useState} from "react";
import {Alert, StyleSheet, Text, TextInput, View} from "react-native";
import {Colors} from "../../../../constants/colors";
import useHttpClient from "../../../../hooks/useHttpClient";
import useError from "../../../../hooks/useError";

const EditNameScreen = ({route}) => {

    const [firstName, setFirstName] = useState(route.params.firstName);
    const [lastName, setLastName] = useState(route.params.lastName);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {setError} = useError();

    const onSave = async () => {
        if (!firstName || !lastName) {
            Alert.alert('Please enter your first and last name', '', [
                {
                    text: 'Ok',
                }
            ]);
            return;
        }
        try {
            setIsSubmitting(true);
            const newPlayer = {
                ...route.params.player,
                firstName: firstName.trim(),
                lastName: lastName.trim()
            };
            const updatedPlayer = await httpClient.updatePlayer(newPlayer);
            route.params.setPlayer(updatedPlayer)
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
                        title={'Name'}/>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>First name: </Text>
                <TextInput style={styles.input} value={firstName} onChangeText={setFirstName}/>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Last name: </Text>
                <TextInput style={styles.input} value={lastName} onChangeText={setLastName}/>
            </View>
        </EditContainer>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: Colors.Border,
        marginTop: 10,
    },
    inputText: {
        paddingVertical: 15,
        color: Colors.TextSecondary,
        fontSize: 14,
        marginRight: 10
    },
    input: {
        fontSize: 16,
        paddingVertical: 15,
        flex: 1
    }
});

export default EditNameScreen;