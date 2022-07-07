import {Switch, Text, View} from "react-native";
import {Colors} from "../../../../constants/colors";
import {HomeTab} from "../tab";

const Toggle = ({selectedTab, setSelectedTab}) => {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>week</Text>
            <Switch
                trackColor={{ true: 'black', false: Colors.Primary }}
                ios_backgroundColor={Colors.Primary}
                thumbColor={'white'}
                onValueChange={() => {
                    if (selectedTab === HomeTab.Month) {
                        setSelectedTab(HomeTab.Week);
                    } else {
                        setSelectedTab(HomeTab.Month);
                    }
                }}
                value={selectedTab === HomeTab.Month}
                style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
            />
            <Text>month</Text>
        </View>
    );
}

export default Toggle;