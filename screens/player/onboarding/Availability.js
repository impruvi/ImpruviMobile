import Container from "./Container";
import Title from "./Title";
import Description from "./Description";
import Button from "./Button";
import {StatusBar} from "expo-status-bar";
import {useState} from "react";
import useHttpClient from "../../../hooks/useHttpClient";
import useError from "../../../hooks/useError";
import useAuth from "../../../hooks/useAuth";
import {ActivityIndicator, useWindowDimensions, View} from "react-native";
import AvailabilitySelector from "../../../components/AvailbilitySelector";
import {Colors} from "../../../constants/colors";

const Availability = ({onNextSlide}) => {

    const [availability, setAvailability] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {height} = useWindowDimensions();
    const {httpClient} = useHttpClient();
    const {setError} = useError();
    const {setPlayer, player} = useAuth();

    const onSave = async () => {
        try {
            setIsSubmitting(true);
            const newPlayer = {
                ...player,
                availability: availability,
            };
            await httpClient.updatePlayer(newPlayer);
            setPlayer(newPlayer)
            setIsSubmitting(false);
            onNextSlide();
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
            setIsSubmitting(false);
        }
    }

    return (
        <Container style={{backgroundColor: 'white'}}>
            <Title text={'What days are you available to train?'} style={{color: 'black'}}/>
            <Description text={'Updating your availability will add the training sessions to these days in your calendar. This can be changed at any point in the future.'}
                         style={{color: Colors.TextSecondary}}/>

            <AvailabilitySelector availability={availability} setAvailability={setAvailability}/>

            <Button onNextSlide={onSave} style={{borderColor: Colors.Primary}} textStyle={{color: Colors.Primary}}/>

            {isSubmitting && (
                <View style={{position: 'absolute', width: '100%', height: height, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, .6)'}}>
                    <ActivityIndicator size="small" color="black"/>
                </View>
            )}

            <StatusBar style="light" />
        </Container>
    );
}

export default Availability;