import React from 'react';
import {HomeSlideName} from "./homeSlideNames";
import Coach from "./Coach";
import Stats from "./Stats";
import Help from "./Help";


const HomeSlide = ({slide, sessions}) => {

    return (
        <>
            {slide === HomeSlideName.Coach && <Coach />}
            {slide === HomeSlideName.Stats && <Stats sessions={sessions} />}
            {slide === HomeSlideName.Help && <Help />}
        </>
    )
}

export default HomeSlide;