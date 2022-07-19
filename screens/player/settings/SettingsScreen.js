import {Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import useAuth from "../../../hooks/useAuth";
import HeaderCenter from "../../../components/HeaderCenter";
import FormOption from "../../../components/FormOption";
import {PlayerScreenNames} from "../../ScreenNames";
import {Colors} from "../../../constants/colors";
import {useNavigation} from "@react-navigation/native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft} from "@fortawesome/pro-light-svg-icons";
import HeadshotChip from "../../../components/HeadshotChip";


const SettingsScreen = () => {

    const {player} = useAuth();
    const navigation = useNavigation();
    const {signOut} = useAuth();

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <HeaderCenter title={'Settings'}
                          left={<FontAwesomeIcon icon={faAngleLeft} size={25}/>}
                          onLeftPress={navigation.goBack}/>

            <ScrollView style={{flex: 1}}>
                <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30, marginBottom: 20}}>
                    <HeadshotChip image={player.headshot} size={80} firstName={player.firstName} lastName={player.lastName}/>
                    <TouchableOpacity style={{padding: 10}} onPress={() => navigation.navigate(PlayerScreenNames.EditHeadshot, {
                        headshot: player.headshot,
                        player: player
                    })}>
                        <Text>Change photo</Text>
                    </TouchableOpacity>
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
                {/*<FormOption title={'Availability'}*/}
                {/*            onPress={() => navigation.navigate(PlayerScreenNames.EditAvailability, {*/}
                {/*                availability: player.availability,*/}
                {/*                player: player*/}
                {/*            })}*/}
                {/*            textValue={player.availability ? player.availability.map(convertDayOfWeekToAbbreviatedDisplayValue).join('/') : ''}*/}
                {/*            placeholder={'What days can you train'}*/}
                {/*            errorMessage={null}/>*/}
                <FormOption title={'Sign out'}
                            titleColor={Colors.Primary}
                            onPress={() => {
                                Alert.alert('Are you sure you want to sign out?', '', [
                                    {
                                        text: 'Confirm',
                                        onPress: signOut,
                                    },
                                    {
                                        text: 'Cancel',
                                        style: 'cancel',
                                    },
                                ]);
                            }}
                            textValue={''}
                            placeholder={''}
                            errorMessage={null}
                            shouldHideArrow={true}/>

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

export default SettingsScreen;
