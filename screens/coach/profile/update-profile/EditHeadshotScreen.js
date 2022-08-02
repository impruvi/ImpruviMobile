import EditHeader from "../../../../components/EditHeader";
import EditContainer from "../../../../components/EditContainer";
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {Image, View, StyleSheet} from "react-native";
import useHttpClient from "../../../../hooks/useHttpClient";
import useError from "../../../../hooks/useError";
import * as ImagePicker from "expo-image-picker";

const EditHeadshotScreen = ({route}) => {

    const [headshot, setHeadshot] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {setError} = useError();

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: .1,
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
                        title={'Headshot'}/>

            {!!headshot && (
                <View style={styles.imageContainer}>
                    <Image source={headshot} style={styles.image}/>
                </View>
            )}
        </EditContainer>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    image: {
        width: 180,
        height: 180,
        borderRadius: 180,
        resizeMode: 'contain'
    }
})

export default EditHeadshotScreen;