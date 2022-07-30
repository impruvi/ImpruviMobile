import {Image, Text, TouchableOpacity, View} from "react-native";
import Settings from "../../../../assets/icons/Settings.png";
import {PlayerScreenNames} from "../../../ScreenNames";
import {useNavigation} from "@react-navigation/native";
import HeadshotChip from "../../../../components/HeadshotChip";

const Header = ({player, coach}) => {

    const navigation = useNavigation();

    const navigateToCoach = () => {
        if (!coach) {
            return;
        }
        navigation.navigate(PlayerScreenNames.Coach, {
            coach: coach
        });
    }

    const navigateToSettings = () => {
        navigation.navigate(PlayerScreenNames.SettingsNavigator, {
            params: {
                screen: PlayerScreenNames.Settings,
            }
        });
    }

    return (
        <View style={{paddingHorizontal: 15, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 140}}>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={navigateToCoach}>
                    {!!coach && <HeadshotChip image={coach?.headshot} firstName={coach?.firstName} lastName={coach?.lastName} size={55}/>}
                </TouchableOpacity>
                <View style={{marginLeft: 10}}>
                    <Text style={{fontSize: 16, fontWeight: '600'}}>Hey {player?.firstName}👋</Text>
                    <Text style={{fontSize: 27, fontWeight: '700'}}>Welcome back</Text>
                </View>
            </View>
            <TouchableOpacity onPress={navigateToSettings} style={{paddingVertical: 10, paddingLeft: 10}}>
                <Image source={Settings} style={{height: 23, width: 23, resizeMode: 'contain'}}/>
            </TouchableOpacity>
        </View>
    );
}

export default Header;
