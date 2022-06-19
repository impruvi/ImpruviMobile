import {StatusBar} from "expo-status-bar";
import Description from "./Description";
import Title from "./Title";
import Button from "./Button";
import Container from "./Container";
import {Image} from "react-native";
import LightningImage from "../../../assets/icons/Lightning.png";

const Train = ({onNextSlide}) => {

    return (
        <Container>
            <Image source={LightningImage} style={{height: 180, resizeMode: 'contain', marginBottom: 50}}/>
            <Title text={'Train like a pro'}/>
            <Description text={'Watch videos of your coach perform each drill in your plan. ' +
                'Practice the drill, then submit a short video to your coach for feedback.'}/>
            <Button onNextSlide={onNextSlide}/>

            <StatusBar style="light" />
        </Container>
    );
}

export default Train;