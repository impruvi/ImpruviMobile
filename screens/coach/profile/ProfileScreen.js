import {Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import useAuth from "../../../hooks/useAuth";
import HeaderCenter from "../../../components/HeaderCenter";
import {useNavigation} from "@react-navigation/native";
import {CoachScreenNames} from "../../ScreenNames";
import FormOption from "../../../components/FormOption";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft} from "@fortawesome/pro-light-svg-icons";
import {Colors} from "../../../constants/colors";
import {useEffect, useState} from "react";
import useHttpClient from "../../../hooks/useHttpClient";
import HeadshotChip from "../../../components/HeadshotChip";
import useError from "../../../hooks/useError";
import Loader from "../../../components/Loader";
import Reload from "../../../components/Reload";


const ProfileScreen = () => {

    const [coach, setCoach] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const {coachId} = useAuth();
    const {signOut} = useAuth();
    const {setError} = useError();
    const {httpClient} = useHttpClient();
    const navigation = useNavigation();

    const getCoach = async () => {
        setIsLoading(true);
        setHasError(false);
        try {
            const coach = await httpClient.getCoach(coachId);
            setCoach(coach);
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
            setHasError(true);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getCoach();
    }, []);

    return (
        <SafeAreaView style={{flex: 1}}>
            <HeaderCenter title={'Profile'}
                          left={<FontAwesomeIcon icon={faAngleLeft} style={{fontSize: 80}} size={30}/>}
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
                                <Reload onReload={getCoach}/>
                            </View>
                        )}
                        {!hasError && (
                            <>
                                <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30, marginBottom: 20}}>
                                    <HeadshotChip size={80} image={coach.headshot} firstName={coach.firstName} lastName={coach.lastName}/>
                                    <TouchableOpacity style={{padding: 10}} onPress={() => navigation.navigate(CoachScreenNames.EditHeadshot, {
                                        headshot: coach.headshot,
                                        coach: coach,
                                        setCoach: setCoach
                                    })}>
                                        <Text>Change photo</Text>
                                    </TouchableOpacity>
                                </View>


                                <FormOption title={'Name'}
                                            onPress={() => navigation.navigate(CoachScreenNames.EditName, {
                                                firstName: coach.firstName,
                                                lastName: coach.lastName,
                                                coach: coach,
                                                setCoach: setCoach
                                            })}
                                            textValue={`${coach.firstName} ${coach.lastName}`}
                                            placeholder={'Enter your name'}
                                            errorMessage={null}/>
                                <FormOption title={'Email'}
                                            onPress={() => navigation.navigate(CoachScreenNames.EditEmail, {
                                                email: coach.email,
                                                coach: coach,
                                                setCoach: setCoach
                                            })}
                                            textValue={coach.email}
                                            placeholder={'Enter your email'}
                                            errorMessage={null}/>
                                <FormOption title={'About'}
                                            onPress={() => navigation.navigate(CoachScreenNames.EditAbout, {
                                                about: coach.about,
                                                coach: coach,
                                                setCoach: setCoach
                                            })}
                                            textValue={coach.about}
                                            placeholder={'Enter details about yourself'}
                                            errorMessage={null}/>
                                <FormOption title={'Position'}
                                            onPress={() => navigation.navigate(CoachScreenNames.EditPosition, {
                                                position: coach.position,
                                                coach: coach,
                                                setCoach: setCoach
                                            })}
                                            textValue={coach.position}
                                            placeholder={'Enter your position'}
                                            errorMessage={null}/>
                                <FormOption title={'School'}
                                            onPress={() => navigation.navigate(CoachScreenNames.EditSchool, {
                                                school: coach.school,
                                                coach: coach,
                                                setCoach: setCoach
                                            })}
                                            textValue={coach.school}
                                            placeholder={'Enter your school'}
                                            errorMessage={null}/>
                                <FormOption title={'Youth club'}
                                            onPress={() => navigation.navigate(CoachScreenNames.EditYouthClub, {
                                                youthClub: coach.youthClub,
                                                coach: coach,
                                                setCoach: setCoach
                                            })}
                                            textValue={coach.youthClub}
                                            placeholder={'Enter your youth club'}
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

export default ProfileScreen;
