import {convertDayOfWeekToAbbreviatedDisplayValue, DayOfWeek} from "../constants/dayOfWeek";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "../constants/colors";

const AvailabilitySelector = ({availability, setAvailability}) => {

    const onDayPress = (dayOfWeek) => {
        if (isSelected(dayOfWeek)) {
            setAvailability(availability.filter(dow => dow !== dayOfWeek));
        } else {
            setAvailability([...availability, dayOfWeek]);
        }
    }

    const isSelected = (dayOfWeek) => {
        return availability.includes(dayOfWeek);
    }

    return (
        <View style={{flexDirection: 'row', marginTop: 50, justifyContent: 'space-between', width: '100%'}}>
            {Object.entries(DayOfWeek).map(dayOfWeek => {
                return (
                    <TouchableOpacity style={isSelected(dayOfWeek[1]) ? {...styles.option, backgroundColor: Colors.Primary} : styles.option}
                                      onPress={() => onDayPress(dayOfWeek[1])}
                                      key={dayOfWeek[1]}>
                        <Text style={isSelected(dayOfWeek[1]) ? {...styles.optionText, color: 'white'} : styles.optionText}>{convertDayOfWeekToAbbreviatedDisplayValue(dayOfWeek[1])}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    option: {
        height: 40,
        width: 40,
        borderRadius: 40,
        backgroundColor: Colors.Border,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionText: {
        fontSize: 12,
        fontWeight: '500'
    }
});

export default AvailabilitySelector;