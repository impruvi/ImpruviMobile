import {SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import useAuth from "../hooks/useAuth";
import {useState} from "react";
import useHttpClient from "../hooks/useHttpClient";
import {Colors} from "../constants/colors";

const AuthenticationScreen = () => {
    const [invitationCode, setInvitationCode] = useState('');
    const [error, setError] = useState('');
    const {setUserId} = useAuth();
    const {httpClient} = useHttpClient();

    const submit = async () => {
        const result = await httpClient.validateInviteCode(invitationCode);
        if (result.success) {
            setUserId(result.user.userId);
        } else {
            setError('Invalid code');
        }
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <Text style={styles.title}>impruvi</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Enter your invitation code</Text>
                    <TextInput style={styles.input} value={invitationCode} onChangeText={setInvitationCode}/>
                </View>
                <TouchableOpacity style={styles.button} onPress={submit}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
                {!!error && (
                    <Text style={styles.error}>{error}</Text>
                )}
            </View>
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
        marginBottom: 10
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
        borderRadius: 5,
        textAlign: 'center'
    },
    button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        backgroundColor: Colors.Primary,
        borderRadius: 5,
        marginTop: 10
    },
    buttonText: {
        fontSize: 17,
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
