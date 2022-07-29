import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import useAuth from "../../hooks/useAuth";
import {useState} from "react";
import usePush from '../../hooks/usePush';
import useHttpClient from "../../hooks/useHttpClient";
import {Colors} from "../../constants/colors";
import {StatusBar} from "expo-status-bar";
import {useNavigation} from "@react-navigation/native";
import {RootScreenNames} from "../ScreenNames";
import useError from "../../hooks/useError";
import LogoText from '../../assets/impruvi-logo-text.png';
import * as Linking from "expo-linking";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft} from "@fortawesome/pro-light-svg-icons";
import HeaderCenter from "../../components/HeaderCenter";


const InvitationCodeScreen = () => {
    const [invitationCode, setInvitationCode] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [invalidCodeError, setInvalidCodeError] = useState('');

    const {setError} = useError();
    const {setCoach} = useAuth();
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
                setCoach(result.coach);
            } else {
                setInvalidCodeError('Invalid code');
            }
        } catch (e) {
            console.log(e);
            setError('Unable to validate code. Please check your internet connection');
        }
        setIsSubmitting(false);
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <HeaderCenter
                left={(
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <FontAwesomeIcon icon={faAngleLeft} style={{fontSize: 80}} size={30}/>
                        <Text style={{fontWeight: '600', marginLeft: 3}}>Sign in</Text>
                    </View>
                )}
                onLeftPress={navigation.goBack}/>

            <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
                    <View style={styles.contentContainer}>
                        <Image source={LogoText} style={{width: 160, height: 50, resizeMode: 'contain'}}/>
                        <Text style={{fontWeight: '600', marginTop: 10, fontSize: 13}}>Don't have an invitation code?</Text>
                        <TouchableOpacity style={{marginBottom: 30}} onPress={() => Linking.openURL('https://impruviapp.com/become-a-coach')}>
                            <Text style={{fontSize: 13, fontWeight: '600', color: Colors.Primary, textDecorationLine: 'underline'}}>Contact us</Text>
                        </TouchableOpacity>

                        <TextInput style={styles.input}
                                   value={invitationCode}
                                   onChangeText={setInvitationCode}
                                   autoCapitalize='characters'
                                   autoCorrect={false}
                                   placeholder="Enter your invitation code"/>

                        <TouchableOpacity style={isSubmitting ? {...styles.button, backgroundColor: 'rgba(243, 81, 86, .6)'} : styles.button} onPress={submit}>
                            {isSubmitting && (
                                <Text style={styles.buttonText}>Validating...</Text>
                            )}
                            {!isSubmitting && (
                                <Text style={styles.buttonText}>Continue</Text>
                            )}
                        </TouchableOpacity>
                        {!!invalidCodeError && !isSubmitting && (
                            <Text style={styles.error}>{invalidCodeError}</Text>
                        )}

                        <View style={{marginTop: 15, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15}}>
                            <Text style={{color: '#999', justifyContent: 'center', marginRight: 2, fontSize: 13}}>
                                By continuing you agree to our
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate(RootScreenNames.TermsAndConditions)} style={{padding: 3}}>
                                <Text style={{fontSize: 13, textDecorationLine: 'underline', color: '#999'}}>terms and conditions</Text>
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
    inputText: {
        fontWeight: '600',
        marginBottom: 5
    },
    input: {
        width: '100%',
        fontSize: 14,
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fAfAfA',
        borderWidth: 1,
        borderColor: '#efefef',
        borderRadius: 10,
        marginBottom: 12,
    },
    button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        backgroundColor: Colors.Primary,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'white'
    },
    error: {
        color: Colors.Primary,
        textAlign: 'center',
        marginTop: 10,
        fontWeight: '500'
    }
})

export default InvitationCodeScreen;
