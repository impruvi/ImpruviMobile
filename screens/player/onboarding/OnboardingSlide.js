import React from 'react';
import {OnboardingSlideName} from "./onboardingSlideNames";
import Welcome from "./Welcome";
import Train from "./Train";
import Improve from "./Improve";
import Availability from "./Availability";


const OnboardingSlide = ({slide, onPress}) => {

    return (
        <>
            {slide === OnboardingSlideName.Welcome && <Welcome onNextSlide={onPress}/>}
            {slide === OnboardingSlideName.Train && <Train onNextSlide={onPress}/>}
            {slide === OnboardingSlideName.Improve && <Improve onNextSlide={onPress}/>}
            {slide === OnboardingSlideName.Availability && <Availability onNextSlide={onPress}/>}
        </>
    )
}

export default OnboardingSlide;
