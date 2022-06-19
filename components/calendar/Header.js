import {View} from "react-native";
import Cell from "./Cell";
import {DayOfWeek} from "../../constants/dayOfWeek";

const Header = ({isCurrentMonth, currentDayOfWeek}) => {
    return (
        <View style={{flexDirection: 'row'}}>
            <Cell text={'SUN'} isHeader={true} isCurrent={isCurrentMonth && currentDayOfWeek === DayOfWeek.Sunday}/>
            <Cell text={'MON'} isHeader={true} isCurrent={isCurrentMonth && currentDayOfWeek === DayOfWeek.Monday}/>
            <Cell text={'TUE'} isHeader={true} isCurrent={isCurrentMonth && currentDayOfWeek === DayOfWeek.Tuesday}/>
            <Cell text={'WED'} isHeader={true} isCurrent={isCurrentMonth && currentDayOfWeek === DayOfWeek.Wednesday}/>
            <Cell text={'THU'} isHeader={true} isCurrent={isCurrentMonth && currentDayOfWeek === DayOfWeek.Thursday}/>
            <Cell text={'FRI'} isHeader={true} isCurrent={isCurrentMonth && currentDayOfWeek === DayOfWeek.Friday}/>
            <Cell text={'SAT'} isHeader={true} isCurrent={isCurrentMonth && currentDayOfWeek === DayOfWeek.Saturday}/>
        </View>
    )
}

export default Header;