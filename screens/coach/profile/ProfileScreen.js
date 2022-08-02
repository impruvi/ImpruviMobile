import {Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import useAuth from "../../../hooks/useAuth";
import HeaderCenter from "../../../components/HeaderCenter";
import {useNavigation} from "@react-navigation/native";
import {CoachScreenNames} from "../../ScreenNames";
import FormOption from "../../../components/FormOption";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft} from "@fortawesome/pro-light-svg-icons";
import {Colors} from "../../../constants/colors";
import {useCallback, useEffect, useState} from "react";
import useHttpClient from "../../../hooks/useHttpClient";
import HeadshotChip from "../../../components/HeadshotChip";
import useError from "../../../hooks/useError";
import ReloadableScreen from "../../../components/ReloadableScreen";


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

    const onHeadshotPress = useCallback(() => {
        navigation.navigate(CoachScreenNames.EditHeadshot, {
            headshot: coach.headshot,
            coach: coach,
            setCoach: setCoach
        });
    }, [coach]);

    const onNamePress = useCallback(() => {
        navigation.navigate(CoachScreenNames.EditName, {
            firstName: coach.firstName,
            lastName: coach.lastName,
            coach: coach,
            setCoach: setCoach
        });
    }, [coach]);

    const onEmailPress = useCallback(() => {
        navigation.navigate(CoachScreenNames.EditEmail, {
            email: coach.email,
            coach: coach,
            setCoach: setCoach
        });
    }, [coach]);

    const onAboutPress = useCallback(() => {
        navigation.navigate(CoachScreenNames.EditAbout, {
            about: coach.about,
            coach: coach,
            setCoach: setCoach
        });
    }, [coach]);

    const onPositionPress = useCallback(() => {
        navigation.navigate(CoachScreenNames.EditPosition, {
            position: coach.position,
            coach: coach,
            setCoach: setCoach
        });
    }, [coach]);

    const onSchoolPress = useCallback(() => {
        navigation.navigate(CoachScreenNames.EditSchool, {
            school: coach.school,
            coach: coach,
            setCoach: setCoach
        });
    }, [coach]);

    const onYouthClubPress = useCallback(() => {
        navigation.navigate(CoachScreenNames.EditYouthClub, {
            youthClub: coach.youthClub,
            coach: coach,
            setCoach: setCoach
        });
    }, [coach]);

    const onSignoutPress = useCallback(() => {
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
    }, []);

    useEffect(() => {
        getCoach();
    }, []);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <HeaderCenter title={'Profile'}
                          left={<FontAwesomeIcon icon={faAngleLeft} style={styles.goBackIcon} size={30}/>}
                          onLeftPress={navigation.goBack}/>

            <ScrollView style={styles.scrollView}>
                <ReloadableScreen isLoading={isLoading}
                                  hasError={hasError}
                                  onReload={getCoach}
                                  render={() => (
                                      <>
                                          <View style={styles.headshotContainer}>
                                              <HeadshotChip size={80} image={coach.headshot} firstName={coach.firstName} lastName={coach.lastName}/>
                                              <TouchableOpacity style={styles.editHeadshotButton}
                                                                onPress={onHeadshotPress}>
                                                  <Text>Change photo</Text>
                                              </TouchableOpacity>
                                          </View>


                                          <FormOption title={'Name'}
                                                      onPress={onNamePress}
                                                      textValue={`${coach.firstName} ${coach.lastName}`}
                                                      placeholder={'Enter your name'}
                                                      errorMessage={null}/>
                                          <FormOption title={'Email'}
                                                      onPress={onEmailPress}
                                                      textValue={coach.email}
                                                      placeholder={'Enter your email'}
                                                      errorMessage={null}/>
                                          <FormOption title={'About'}
                                                      onPress={onAboutPress}
                                                      textValue={coach.about}
                                                      placeholder={'Enter details about yourself'}
                                                      errorMessage={null}/>
                                          <FormOption title={'Position'}
                                                      onPress={onPositionPress}
                                                      textValue={coach.position}
                                                      placeholder={'Enter your position'}
                                                      errorMessage={null}/>
                                          <FormOption title={'School'}
                                                      onPress={onSchoolPress}
                                                      textValue={coach.school}
                                                      placeholder={'Enter your school'}
                                                      errorMessage={null}/>
                                          <FormOption title={'Youth club'}
                                                      onPress={onYouthClubPress}
                                                      textValue={coach.youthClub}
                                                      placeholder={'Enter your youth club'}
                                                      errorMessage={null}/>
                                          <FormOption title={'Sign out'}
                                                      titleColor={Colors.Primary}
                                                      onPress={onSignoutPress}
                                                      textValue={''}
                                                      placeholder={''}
                                                      errorMessage={null}
                                                      shouldHideArrow={true}/>
                                      </>
                                  )} />
            </ScrollView>

            <StatusBar style="dark" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1
    },
    scrollView: {
        flex: 1
    },
    loadingContainer: {
        height: 200
    },
    goBackIcon: {
        fontSize: 80
    },
    headshotContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20
    },
    editHeadshotButton: {
        padding: 10
    }
})

export default ProfileScreen;
