import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import useAuth from "../../hooks/useAuth";
import HeaderCenter from "../../components/HeaderCenter";
import FormOption from "../../components/FormOption";
import {PlayerScreenNames} from "../ScreenNames";
import {Colors} from "../../constants/colors";
import {useNavigation} from "@react-navigation/native";
import {convertDayOfWeekToAbbreviatedDisplayValue} from "../../constants/dayOfWeek";


const ProfileScreen = () => {


    const {player} = useAuth();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <HeaderCenter title={'Profile'}/>

            <ScrollView style={{flex: 1}}>
                <View style={{paddingHorizontal: 15}}>
                    <Text style={styles.sectionHeader}>Overview</Text>
                </View>
                <FormOption title={'Name'}
                            onPress={() => navigation.navigate(PlayerScreenNames.EditName, {
                                firstName: player.firstName,
                                lastName: player.lastName,
                                player: player
                            })}
                            textValue={`${player.firstName} ${player.lastName}`}
                            placeholder={'Enter your name'}
                            errorMessage={null}/>
                <FormOption title={'Email'}
                            onPress={() => navigation.navigate(PlayerScreenNames.EditEmail, {
                                email: player.email,
                                player: player
                            })}
                            textValue={player.email}
                            placeholder={'Enter your email'}
                            errorMessage={null}/>
                <FormOption title={'Availability'}
                            onPress={() => navigation.navigate(PlayerScreenNames.EditAvailability, {
                                availability: player.availability,
                                player: player
                            })}
                            textValue={player.availability ? player.availability.map(convertDayOfWeekToAbbreviatedDisplayValue).join('/') : ''}
                            placeholder={'What days can you train'}
                            errorMessage={null}/>

            </ScrollView>

            <StatusBar style="dark" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    sectionHeader: {
        marginTop: 20,
        marginBottom: 5,
        fontWeight: '600',
        fontSize: 13,
        color: Colors.TextSecondary
    },
});

export default ProfileScreen;
