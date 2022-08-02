import {
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import useAuth from "../../hooks/useAuth";
import {useCallback, useState} from "react";
import usePush from '../../hooks/usePush';
import useHttpClient from "../../hooks/useHttpClient";
import {StatusBar} from "expo-status-bar";
import {useNavigation} from "@react-navigation/native";
import {RootScreenNames} from "../ScreenNames";
import useError from "../../hooks/useError";
import LogoText from './LogoText';
import * as Linking from "expo-linking";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft} from "@fortawesome/pro-light-svg-icons";
import HeaderCenter from "../../components/HeaderCenter";
import Input from "./Input";
import Error from "./Error";
import Button from "./Button";
import Subtitle from "./Subtitle";


const InvitationCodeScreen = () => {
    const [invitationCode, setInvitationCode] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [invalidCodeError, setInvalidCodeError] = useState('');

    const {setError} = useError();
    const {setCoachId} = useAuth();
    const {httpClient} = useHttpClient();
    const {expoPushToken} = usePush();
    const navigation = useNavigation();

    const submit = async () => {
        if (isSubmitting) {
            return;
        }
        setIsSubmitting(true);
        try {
            const result = await httpClient.validateInviteCode(invitationCode, expoPushToken);
            if (result.success) {
                setCoachId(result.coach.coachId);
            } else {
                setInvalidCodeError('Invalid code');
            }
        } catch (e) {
            console.log(e);
            setError('Unable to validate code. Please check your internet connection');
        }
        setIsSubmitting(false);
    }


    const navigateToBecomeACoach = useCallback(() => {
        Linking.openURL('https://impruviapp.com/become-a-coach');
    }, []);

    const navigateToTermsAndConditions = useCallback(() => {
        navigation.navigate(RootScreenNames.TermsAndConditions);
    }, []);


    return (
        <SafeAreaView style={styles.safeAreaView}>
            <HeaderCenter
                left={(
                    <View style={styles.backToSignInButton}>
                        <FontAwesomeIcon icon={faAngleLeft} style={styles.backToSignInButtonIcon} size={30}/>
                        <Text style={styles.backToSignInButtonText}>Sign in</Text>
                    </View>
                )}
                onLeftPress={navigation.goBack}/>

            <TouchableWithoutFeedback style={styles.touchableWithoutFeedback} onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
                    <View style={styles.contentContainer}>
                        <LogoText />
                        <Subtitle text={'Don\'t have an invitation code?'}
                                  linkText={'Contact us'}
                                  onPress={navigateToBecomeACoach}/>

                        <Input value={invitationCode}
                               onChangeText={setInvitationCode}
                               autoCapitalize='characters'
                               placeholder="Enter your invitation code"/>

                        <Button isSubmitting={isSubmitting}
                                submit={submit}
                                text={isSubmitting ? 'Validating...' : 'Continue'}/>

                        {!!invalidCodeError && !isSubmitting && (
                            <Error errorText={invalidCodeError}/>
                        )}

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>
                                By continuing you agree to our
                            </Text>
                            <TouchableOpacity onPress={navigateToTermsAndConditions} style={styles.termsAndConditionsButton}>
                                <Text style={styles.termsAndConditionsButtonText}>terms and conditions</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>

            <StatusBar style="dark" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView:  {
        flex: 1,
    },
    touchableWithoutFeedback: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25,
    },
    contentContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: -80
    },
    footer: {
        marginTop: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    footerText: {
        color: '#999',
        justifyContent: 'center',
        marginRight: 2,
        fontSize: 13
    },
    termsAndConditionsButton: {
        padding: 3
    },
    termsAndConditionsButtonText: {
        fontSize: 13,
        textDecorationLine: 'underline',
        color: '#999'
    },
    backToSignInButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    backToSignInButtonIcon: {
        fontSize: 80
    },
    backToSignInButtonText: {
        fontWeight: '600',
        marginLeft: 3
    }
})

export default InvitationCodeScreen;
