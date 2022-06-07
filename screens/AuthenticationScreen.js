import {SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard} from "react-native";
import useAuth from "../hooks/useAuth";
import {useState} from "react";
import useHttpClient from "../hooks/useHttpClient";
import {Colors} from "../constants/colors";
import {StatusBar} from "expo-status-bar";

const AuthenticationScreen = () => {
    const [invitationCode, setInvitationCode] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const {setUserId, setUserType} = useAuth();
    const {httpClient} = useHttpClient();

    const submit = async () => {
        if (isSubmitting) {
            return;
        }
        setIsSubmitting(true);
        try {
            const result = await httpClient.validateInviteCode(invitationCode);
            setUserType(result.user.userType);
            setUserId(result.user.userId);
        } catch (e) {
            setError('Invalid code');
        }
        setIsSubmitting(false);
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>

            <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text style={styles.title}>impruvi</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputText}>Enter your invitation code</Text>
                        <TextInput style={styles.input} value={invitationCode} onChangeText={setInvitationCode}/>
                    </View>
                    <TouchableOpacity style={isSubmitting ? {...styles.button, backgroundColor: 'rgba(243, 81, 86, .8)'} : styles.button} onPress={submit}>
                        {isSubmitting && (
                            <Text style={{...styles.buttonText, color: 'rgba(255, 255, 255, .8)'}}>Validating...</Text>
                        )}
                        {!isSubmitting && (
                            <Text style={styles.buttonText}>Continue</Text>
                        )}
                    </TouchableOpacity>
                    {!!error && (
                        <Text style={styles.error}>{error}</Text>
                    )}
                </View>
            </TouchableWithoutFeedback>

            <StatusBar style="dark" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView:  {
        flex: 1,
        backgroundColor: 'white'
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
    inputContainer: {
        width: '100%',
        marginBottom: 10,
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
