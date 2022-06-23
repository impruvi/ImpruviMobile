import {useEffect, useState} from "react";
import {Text} from 'react-native';

const Countdown = ({start, onCompletion, style}) => {
    const [counter, setCounter] = useState(start);

    useEffect(() => {
        if (counter === 0) {
            onCompletion();
        } else {
            const timer = setTimeout(() => {
                setCounter(counter - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [counter]);

    return (
        <Text style={style}>{counter}</Text>
    )
}

export default Countdown;