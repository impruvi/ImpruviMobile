import {Text} from "react-native";
import {useEffect, useState} from "react";

const pad = (number) => {
    return number.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
}

const convertDurationToDisplay = (duration) => {
    const seconds = duration % 60;
    const minutes = Math.floor((duration / 60)) % 60;
    const hours = Math.floor(duration / 60 / 60);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

const VideoCounter = ({style}) => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCounter(counter + 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [counter]);

    const text = convertDurationToDisplay(counter);

    return (
        <Text style={style}>{text}</Text>
    )
}

export default VideoCounter;