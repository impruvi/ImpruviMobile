import {View} from "react-native";
import Cell from "./Cell";
import {DayOfWeek} from "../../../../constants/dayOfWeek";

const Header = ({isCurrentMonth, currentDayOfWeek}) => {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Cell text={'Su'} isHeader={true} isCurrent={isCurrentMonth && currentDayOfWeek === DayOfWeek.Sunday}/>
            <Cell text={'Mo'} isHeader={true} isCurrent={isCurrentMonth && currentDayOfWeek === DayOfWeek.Monday}/>
            <Cell text={'Tu'} isHeader={true} isCurrent={isCurrentMonth && currentDayOfWeek === DayOfWeek.Tuesday}/>
            <Cell text={'We'} isHeader={true} isCurrent={isCurrentMonth && currentDayOfWeek === DayOfWeek.Wednesday}/>
            <Cell text={'Th'} isHeader={true} isCurrent={isCurrentMonth && currentDayOfWeek === DayOfWeek.Thursday}/>
            <Cell text={'Fr'} isHeader={true} isCurrent={isCurrentMonth && currentDayOfWeek === DayOfWeek.Friday}/>
            <Cell text={'Sa'} isHeader={true} isCurrent={isCurrentMonth && currentDayOfWeek === DayOfWeek.Saturday}/>
        </View>
    )
}

export default Header;