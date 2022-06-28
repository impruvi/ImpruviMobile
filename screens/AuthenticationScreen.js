import {
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
import useAuth from "../hooks/useAuth";
import {useState} from "react";
import usePush from '../hooks/usePush';
import useHttpClient from "../hooks/useHttpClient";
import {Colors} from "../constants/colors";
import {StatusBar} from "expo-status-bar";
import {UserType} from "../constants/userType";
import {useNavigation} from "@react-navigation/native";
import {RootScreenNames} from "./ScreenNames";
import useError from "../hooks/useError";

const AuthenticationScreen = () => {
    const [invitationCode, setInvitationCode] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [invalidCodeError, setInvalidCodeInvalidCodeError] = useState('');

    const {setError} = useError();
    const {setPlayer, setCoach} = useAuth();
    const {httpClient} = useHttpClient();
    const navigation = useNavigation();
    const {expoPushToken} = usePush();

    const submit = async () => {
        if (isSubmitting) {
            return;
        }
        setIsSubmitting(true);
        try {
            const result = await httpClient.validateInviteCode(invitationCode, expoPushToken);
            if (result.success) {
                if (result.userType === UserType.Player) {
                    setPlayer(result.player);
                } else {
                    setCoach(result.coach);
                }
            } else {
                setInvalidCodeInvalidCodeError('Invalid code');
            }
        } catch (e) {
            console.log(e);
            setError('Unable to validate code. Please check your internet connection');
        }
        setIsSubmitting(false);
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>impr<Text style={{color: Colors.Primary}}>ü</Text>vi</Text>

                        <Text style={styles.inputText}>Enter your invitation code</Text>
                        <TextInput style={styles.input} value={invitationCode} onChangeText={setInvitationCode}/>

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
    title: {
        fontSize: 40,
        fontWeight: '700',
        marginBottom: 40
    },
    contentContainer: {
        width: '100%',
        alignItems: 'center'
    },
    inputText: {
        fontWeight: '600',
        marginBottom: 5
    },
    input: {
        width: '100%',
        fontSize: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#efefef',
        borderRadius: 30,
        textAlign: 'center'
    },
    button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        backgroundColor: Colors.Primary,
        borderRadius: 30,
        marginTop: 10
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

export default AuthenticationScreen;
