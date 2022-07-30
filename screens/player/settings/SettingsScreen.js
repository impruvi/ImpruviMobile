import {Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
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
import {useEffect, useState} from "react";
import useHttpClient from "../../../hooks/useHttpClient";
import Loader from "../../../components/Loader";
import Reload from "../../../components/Reload";


const SettingsScreen = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [player, setPlayer] = useState();

    const {playerId} = useAuth();
    const {httpClient} = useHttpClient();
    const navigation = useNavigation();
    const {signOut} = useAuth();

    const getPlayer = async () => {
        setIsLoading(true);
        setHasError(false);
        try {
            const player = await httpClient.getPlayer(playerId);
            setPlayer(player);
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
            setHasError(true);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        getPlayer();
    }, []);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <HeaderCenter title={'Settings'}
                          left={<FontAwesomeIcon icon={faAngleLeft} size={25}/>}
                          onLeftPress={navigation.goBack}/>

            <ScrollView style={{flex: 1}}>
                {isLoading && (
                    <View style={{height: 200}}>
                        <Loader />
                    </View>
                )}
                {!isLoading && (
                    <>
                        {hasError && (
                            <View style={{height: 200}}>
                                <Reload onReload={getPlayer}/>
                            </View>
                        )}
                        {!hasError && (
                            <>
                                <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30, marginBottom: 20}}>
                                    <HeadshotChip image={player.headshot} size={80} firstName={player.firstName} lastName={player.lastName}/>
                                    <TouchableOpacity style={{padding: 10}} onPress={() => navigation.navigate(PlayerScreenNames.EditHeadshot, {
                                        headshot: player.headshot,
                                        player: player,
                                        setPlayer: setPlayer
                                    })}>
                                        <Text>Change photo</Text>
                                    </TouchableOpacity>
                                </View>
                                <FormOption title={'Name'}
                                            onPress={() => navigation.navigate(PlayerScreenNames.EditName, {
                                                firstName: player.firstName,
                                                lastName: player.lastName,
                                                player: player,
                                                setPlayer: setPlayer
                                            })}
                                            textValue={`${player.firstName} ${player.lastName}`}
                                            placeholder={'Enter your name'}
                                            errorMessage={null}/>
                                <FormOption title={'Email'}
                                            onPress={() => navigation.navigate(PlayerScreenNames.EditEmail, {
                                                email: player.email,
                                                player: player,
                                                setPlayer: setPlayer
                                            })}
                                            textValue={player.email}
                                            placeholder={'Enter your email'}
                                            errorMessage={null}/>
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
                            </>
                        )}
                    </>
                )}
            </ScrollView>

            <StatusBar style="dark" />
        </SafeAreaView>
    )
}

export default SettingsScreen;
