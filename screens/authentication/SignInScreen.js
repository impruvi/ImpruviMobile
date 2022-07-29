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
import useError from "../../hooks/useError";
import LogoText from '../../assets/impruvi-logo-text.png';
import * as Linking from 'expo-linking';
import {RootScreenNames} from "../ScreenNames";
import {useNavigation} from "@react-navigation/native";


const SignInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [invalidCredentialsError, setInvalidCredentialsError] = useState('');

    const {setError} = useError();
    const {setPlayer} = useAuth();
    const {httpClient} = useHttpClient();
    const {expoPushToken} = usePush();
    const navigation = useNavigation();

    const submit = async () => {
        if (isSubmitting) {
            return;
        }
        setIsSubmitting(true);
        try {
            const result = await httpClient.signIn(email, password, expoPushToken);
            if (result.success) {
                setPlayer(result.player);
            } else {
                setInvalidCredentialsError('Invalid email/password combination');
            }
        } catch (e) {
            console.log(e);
            setError('Unable to sign in. Please check your internet connection');
        }
        setIsSubmitting(false);
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
                    <View style={styles.contentContainer}>
                        <Image source={LogoText} style={{width: 160, height: 50, resizeMode: 'contain'}}/>
                        <Text style={{fontWeight: '600', marginTop: 10, fontSize: 13}}>Are you a coach?</Text>
                        <TouchableOpacity style={{marginBottom: 30}} onPress={() => navigation.navigate(RootScreenNames.InvitationCode)}>
                            <Text style={{fontSize: 13, fontWeight: '600', color: Colors.Primary, textDecorationLine: 'underline'}}>Enter your invitation code</Text>
                        </TouchableOpacity>

                        <TextInput style={styles.input}
                                   value={email}
                                   onChangeText={setEmail}
                                   autoCapitalize='none'
                                   autoCorrect={false}
                                   placeholder="Enter your email"/>
                        <TextInput style={styles.input}
                                   value={password}
                                   onChangeText={setPassword}
                                   autoCapitalize='none'
                                   autoCorrect={false}
                                   secureTextEntry={true}
                                   placeholder="Enter your password"/>

                        <TouchableOpacity style={isSubmitting ? {...styles.button, backgroundColor: 'rgba(243, 81, 86, .6)'} : styles.button} onPress={submit}>
                            {isSubmitting && (
                                <Text style={styles.buttonText}>Signing in...</Text>
                            )}
                            {!isSubmitting && (
                                <Text style={styles.buttonText}>Sign in</Text>
                            )}
                        </TouchableOpacity>
                        {!!invalidCredentialsError && !isSubmitting && (
                            <Text style={styles.error}>{invalidCredentialsError}</Text>
                        )}

                        <View style={{marginTop: 15, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15}}>
                            <Text style={{color: '#999', justifyContent: 'center', marginRight: 2, fontSize: 13}}>
                                Don't know what Imprüvi is?
                            </Text>
                            <Text style={{color: '#999', justifyContent: 'center', marginRight: 2, fontSize: 13}}>
                                Don't have a custom coaching plan yet?
                            </Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{color: '#999', fontSize: 13}}>
                                    Check us out at &nbsp;
                                </Text>
                                <TouchableOpacity onPress={() => Linking.openURL('https://impruviapp.com')}>
                                    <Text style={{fontSize: 13, textDecorationLine: 'underline', color: Colors.Primary, fontWeight: '600'}}>impruviapp.com</Text>
                                </TouchableOpacity>
                            </View>
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
        alignItems: 'center'
    },
    inputText: {
        width: '100%',
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
});

export default SignInScreen;