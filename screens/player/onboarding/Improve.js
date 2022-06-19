import {StatusBar} from "expo-status-bar";
import Description from "./Description";
import Title from "./Title";
import Button from "./Button";
import Container from "./Container";
import {Image} from "react-native";
import RocketImage from "../../../assets/icons/Rocket.png";

const Improve = ({onNextSlide}) => {

    return (
        <Container>
            <Image source={RocketImage} style={{height: 180, resizeMode: 'contain', marginBottom: 50}}/>
            <Title text={'Improve your game'}/>
            <Description text={'Your coach will review each drill and provide video feedback' +
                'on what you did will and how you can improve. Have the option to schedule in-person trainings' +
                'with Coach Ryan!'}/>
            <Button onNextSlide={onNextSlide}/>

            <StatusBar style="light" />
        </Container>
    );
}

export default Improve;