import React from 'react';
import {OnboardingSlideName} from "./onboardingSlideNames";
import Welcome from "./Welcome";
import Train from "./Train";
import Improve from "./Improve";


const OnboardingSlide = ({slide, onPress}) => {

    return (
        <>
            {slide === OnboardingSlideName.Welcome && <Welcome onNextSlide={onPress}/>}
            {slide === OnboardingSlideName.Train && <Train onNextSlide={onPress}/>}
            {slide === OnboardingSlideName.Improve && <Improve onNextSlide={onPress}/>}
        </>
    )
}

export default OnboardingSlide;
