import {Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import useAuth from "../../hooks/useAuth";
import HeaderCenter from "../../components/HeaderCenter";
import {useNavigation} from "@react-navigation/native";
import {CoachScreenNames} from "../ScreenNames";
import FormOption from "../../components/FormOption";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faUser} from "@fortawesome/pro-light-svg-icons";


const ProfileScreen = () => {

    const {coach} = useAuth();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{flex: 1}}>
            <HeaderCenter title={'Profile'}/>

            <ScrollView style={{flex: 1}}>
                <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30, marginBottom: 20}}>
                    <View style={{width: 80, height: 80, borderRadius: 80, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', overflow: 'hidden'}}>
                        {!!coach.headshot && coach.headshot.uploadDateEpochMillis > 0 && (
                            <Image source={{uri: coach.headshot.fileLocation}} style={{width: 80, height: 80}}/>
                        )}
                        {(!coach.headshot || coach.headshot.uploadDateEpochMillis === 0) && (
                            <FontAwesomeIcon icon={faUser} size={25}/>
                        )}
                    </View>
                    <TouchableOpacity style={{padding: 10}} onPress={() => navigation.navigate(CoachScreenNames.EditHeadshot, {
                        headshot: coach.headshot,
                        coach: coach
                    })}>
                        <Text>Change photo</Text>
                    </TouchableOpacity>
                </View>


                <FormOption title={'Name'}
                            onPress={() => navigation.navigate(CoachScreenNames.EditName, {
                                firstName: coach.firstName,
                                lastName: coach.lastName,
                                coach: coach
                            })}
                            textValue={`${coach.firstName} ${coach.lastName}`}
                            placeholder={'Enter your name'}
                            errorMessage={null}/>
                <FormOption title={'Email'}
                            onPress={() => navigation.navigate(CoachScreenNames.EditEmail, {
                                email: coach.email,
                                coach: coach
                            })}
                            textValue={coach.email}
                            placeholder={'Enter your email'}
                            errorMessage={null}/>
                <FormOption title={'About'}
                            onPress={() => navigation.navigate(CoachScreenNames.EditAbout, {
                                about: coach.about,
                                coach: coach
                            })}
                            textValue={coach.about}
                            placeholder={'Enter details about yourself'}
                            errorMessage={null}/>
                <FormOption title={'Position'}
                            onPress={() => navigation.navigate(CoachScreenNames.EditPosition, {
                                position: coach.position,
                                coach: coach
                            })}
                            textValue={coach.position}
                            placeholder={'Enter your position'}
                            errorMessage={null}/>
                <FormOption title={'School'}
                            onPress={() => navigation.navigate(CoachScreenNames.EditSchool, {
                                school: coach.school,
                                coach: coach
                            })}
                            textValue={coach.school}
                            placeholder={'Enter your school'}
                            errorMessage={null}/>
                <FormOption title={'Youth club'}
                            onPress={() => navigation.navigate(CoachScreenNames.EditYouthClub, {
                                youthClub: coach.youthClub,
                                coach: coach
                            })}
                            textValue={coach.youthClub}
                            placeholder={'Enter your youth club'}
                            errorMessage={null}/>
            </ScrollView>

            <StatusBar style="dark" />
        </SafeAreaView>
    )
}

export default ProfileScreen;
