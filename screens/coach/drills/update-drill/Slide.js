import {StyleSheet, View} from "react-native";
import Title from "./Title";
import Slider from '@react-native-community/slider';

import {Colors} from "../../../../constants/colors";

const maximumTrackTintColor = '#EFF3F4';
const minimumTrackTintColor = Colors.Primary;

const Slide = ({title, maxValue, value, onValueChange}) => {
    return (
        <View style={styles.equipmentItem}>
            <Title text={title} value={value}/>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={maxValue}
                value={value}
                step={1}
                onValueChange={onValueChange}
                thumbTintColor={minimumTrackTintColor}
                maximumTrackTintColor={maximumTrackTintColor}
                minimumTrackTintColor={minimumTrackTintColor}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    equipmentItem: {
        marginTop: 20
    },
    slider: {
        width: '100%',
        height: 40
    }
});

export default Slide;

