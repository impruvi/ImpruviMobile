import useAuth from "../../../hooks/useAuth";
import {StatusBar} from "expo-status-bar";
import Description from "./Description";
import Title from "./Title";
import Button from "./Button";
import Container from "./Container";
import {Image} from 'react-native';
import PlayerImage from '../../../assets/icons/Player.png'

const Welcome = ({onNextSlide}) => {
    const {player} = useAuth();

    return (
        <Container>
            <Image source={PlayerImage} style={{height: 180, resizeMode: 'contain', marginBottom: 50}}/>
            <Title text={`Hey ${player.firstName}! Welcome to Impruvi`}/>
            <Description text={'Coach Ryan has put together a training plan designed specifically for you'}/>
            <Button onNextSlide={onNextSlide}/>

            <StatusBar style="light" />
        </Container>
    );
}

export default Welcome;