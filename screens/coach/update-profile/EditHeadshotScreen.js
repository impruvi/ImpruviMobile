import EditHeader from "../../../components/EditHeader";
import EditContainer from "../../../components/EditContainer";
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {Image, StyleSheet, View} from "react-native";
import {Colors} from "../../../constants/colors";
import useHttpClient from "../../../hooks/useHttpClient";
import useError from "../../../hooks/useError";
import useAuth from "../../../hooks/useAuth";
import * as ImagePicker from "expo-image-picker";

const EditHeadshotScreen = ({route}) => {

    const [headshot, setHeadshot] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {setError} = useError();
    const {setCoach} = useAuth();

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setHeadshot({uri: result.uri});
        } else {
            navigation.goBack();
        }
    };

    useEffect(() => {
        pickImage();
    }, []);

    const onSave = async () => {
        try {
            setIsSubmitting(true);
            const newCoach = {
                ...route.params.coach,
                headshot: headshot,
            };
            await httpClient.updateCoach(newCoach);
            setCoach(await httpClient.getCoach(newCoach.coachId));
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
                        title={'Headshot'}/>

            {!!headshot && (
                <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
                    <Image source={headshot} style={{width: 180, height: 180, borderRadius: 180, resizeMode: 'contain'}}/>
                </View>
            )}
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

export default EditHeadshotScreen;