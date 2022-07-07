import {Image, Text, TouchableOpacity, View} from "react-native";
import Settings from "../../../../assets/icons/Settings.png";
import {PlayerScreenNames} from "../../../ScreenNames";
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import useHttpClient from "../../../../hooks/useHttpClient";
import useAuth from "../../../../hooks/useAuth";

const Header = () => {

    const [coach, setCoach] = useState();

    const {player} = useAuth();
    const {httpClient} = useHttpClient();
    const navigation = useNavigation();

    const navigateToCoach = () => {
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

    useEffect(() => {
        httpClient.getCoach(player.coachId).then(setCoach);
    }, []);

    return (
        <View style={{paddingHorizontal: 15, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 130}}>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={navigateToCoach}>
                    {!!coach && <Image source={{uri: coach?.headshot.fileLocation}} style={{width: 55, height: 55, borderRadius: 55, resizeMode: 'contain'}} />}
                </TouchableOpacity>
                <View style={{marginLeft: 10}}>
                    <Text style={{fontSize: 16, fontWeight: '600'}}>Hey {player.firstName}👋</Text>
                    <Text style={{fontSize: 27, fontWeight: '700'}}>Welcome back</Text>
                </View>
            </View>
            <TouchableOpacity onPress={navigateToSettings}>
                <Image source={Settings} style={{height: 23, width: 23, resizeMode: 'contain'}}/>
            </TouchableOpacity>
        </View>
    );
}

export default Header;
