import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Settings from "../../../../assets/icons/Settings.png";
import {PlayerScreenNames} from "../../../ScreenNames";
import {useNavigation} from "@react-navigation/native";
import HeadshotChip from "../../../../components/HeadshotChip";
import {useCallback} from "react";

const Header = ({player, coach}) => {

    const navigation = useNavigation();

    const navigateToCoach = useCallback(() => {
        if (!coach) {
            return;
        }
        navigation.navigate(PlayerScreenNames.Coach, {
            coach: coach
        });
    }, [coach]);

    const navigateToSettings = useCallback(() => {
        navigation.navigate(PlayerScreenNames.SettingsNavigator, {
            params: {
                screen: PlayerScreenNames.Settings,
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity onPress={navigateToCoach}>
                    {!!coach && <HeadshotChip image={coach?.headshot} firstName={coach?.firstName} lastName={coach?.lastName} size={55}/>}
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Hey {player?.firstName}👋</Text>
                    <Text style={styles.subtitle}>Welcome back</Text>
                </View>
            </View>
            <TouchableOpacity onPress={navigateToSettings} style={styles.settingsButton}>
                <Image source={Settings} style={styles.settingsButtonImage}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 140
    },
    content: {
        flexDirection: 'row'
    },
    settingsButton: {
        paddingVertical: 10,
        paddingLeft: 10
    },
    settingsButtonImage: {
        height: 23,
        width: 23,
        resizeMode: 'contain'
    },
    textContainer: {
        marginLeft: 10
    },
    title: {
        fontSize: 16,
        fontWeight: '600'
    },
    subtitle: {
        fontSize: 27,
        fontWeight: '700'
    }
})

export default Header;
