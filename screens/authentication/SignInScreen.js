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
import {Colors} from "../../constants/colors";
import {StatusBar} from "expo-status-bar";
import useError from "../../hooks/useError";
import LogoText from './LogoText';
import * as Linking from 'expo-linking';
import {RootScreenNames} from "../ScreenNames";
import {useNavigation} from "@react-navigation/native";
import Input from "./Input";
import Error from "./Error";
import Button from "./Button";
import Subtitle from "./Subtitle";

const SignInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [invalidCredentialsError, setInvalidCredentialsError] = useState('');

    const {setError} = useError();
    const {setPlayerId} = useAuth();
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
                setPlayerId(result.player.playerId);
            } else {
                setInvalidCredentialsError('Invalid email/password combination');
            }
        } catch (e) {
            console.log(e);
            setError('Unable to sign in. Please check your internet connection');
        }
        setIsSubmitting(false);
    }

    const navigateToInvitationCode = useCallback(() => {
        navigation.navigate(RootScreenNames.InvitationCode);
    }, []);

    const navigateToWebsite = useCallback(() => {
        Linking.openURL('https://impruviapp.com')
    }, []);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <TouchableWithoutFeedback style={styles.touchableWithoutFeedback} onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
                    <View style={styles.contentContainer}>
                        <LogoText />
                        <Subtitle text={'Are you a coach?'}
                                  linkText={'Enter your invitation code'}
                                  onPress={navigateToInvitationCode}/>

                        <Input value={email}
                               onChangeText={setEmail}
                               autoCapitalize='none'
                               placeholder="Enter your email"/>
                        <Input value={password}
                               onChangeText={setPassword}
                               autoCapitalize='none'
                               secureTextEntry
                               placeholder="Enter your password"/>

                        <Button isSubmitting={isSubmitting}
                                submit={submit}
                                text={isSubmitting ? 'Signing in...' : 'Sign in'}/>

                        {!!invalidCredentialsError && !isSubmitting && (
                            <Error errorText={invalidCredentialsError}/>
                        )}

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>
                                Don't know what Imprüvi is?
                            </Text>
                            <Text style={styles.footerText}>
                                Don't have a custom coaching plan yet?
                            </Text>
                            <View style={styles.footerLinkTextContainer}>
                                <Text style={styles.footerLinkText}>Check us out at &nbsp;</Text>
                                <TouchableOpacity onPress={navigateToWebsite}>
                                    <Text style={styles.footerLink}>impruviapp.com</Text>
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
        alignItems: 'center'
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
    footerLinkTextContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    footerLinkText: {
        color: '#999',
        fontSize: 13
    },
    footerLink: {
        fontSize: 13,
        textDecorationLine: 'underline',
        color: Colors.Primary,
        fontWeight: '600'
    }
});

export default SignInScreen;