import {useNavigation} from "@react-navigation/native";
import EditContainer from "../../../components/EditContainer";
import EditHeader from "../../../components/EditHeader";
import {Text, View} from 'react-native';
import {Colors} from "../../../constants/colors";
import {useState} from "react";
import useHttpClient from "../../../hooks/useHttpClient";
import useError from "../../../hooks/useError";
import useAuth from "../../../hooks/useAuth";
import AvailabilitySelector from "../../../components/AvailbilitySelector";

const EditAvailabilityScreen = ({route}) => {

    const [availability, setAvailability] = useState(route.params.availability || []);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {setError} = useError();
    const {setPlayer} = useAuth();

    const onSave = async () => {
        try {
            setIsSubmitting(true);
            const newPlayer = {
                ...route.params.player,
                availability: availability,
            };
            await httpClient.updatePlayer(newPlayer);
            setPlayer(newPlayer)
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
                        title={'Availability'}/>

            <View style={{marginTop: 20}}>
                <Text style={{fontWeight: '600', fontSize: 16}}>What days are you available to train?</Text>
                <Text style={{marginTop: 10, color: Colors.TextSecondary}}>Updating your availability will add the training sessions to these days in your calendar.</Text>
            </View>
            <AvailabilitySelector availability={availability} setAvailability={setAvailability}/>
        </EditContainer>
    )
}

export default EditAvailabilityScreen;
