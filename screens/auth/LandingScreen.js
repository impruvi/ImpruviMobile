import {View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet, Dimensions} from 'react-native';
import LogoText from "../../components/auth/LogoText";
import Button from "../../components/auth/Button";
import {Colors} from "../../constants/colors";
import {useNavigation} from "@react-navigation/native";
import {Video} from "expo-av";
import video from '../../assets/images/LandingVideo.mp4';
import {StatusBar} from "expo-status-bar";
import {LinearGradient} from "expo-linear-gradient";
import {AuthScreenNames} from "../ScreenNames";
import {useCallback} from "react";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const LandingScreen = () => {

    const navigation = useNavigation();

    const navigateToSignUp = useCallback(() => {
        navigation.navigate(AuthScreenNames.SignUp);
    }, [navigation]);

    const navigateToSignIn = useCallback(() => {
        navigation.navigate(AuthScreenNames.SignIn);
    }, [navigation]);

    const navigateToCoachLogin = useCallback(() => {
        navigation.navigate(AuthScreenNames.InvitationCode);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Video
                source={video}
                style={styles.video}
                resizeMode={'cover'}
                shouldPlay={true}
                isMuted={true}
                isLooping={true}/>
            <LinearGradient
                colors={['rgba(0, 0, 0, .7)', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{width: '100%', height: 200, position: 'absolute', top: 0, left: 0}} />
            <LinearGradient
                colors={['rgba(0, 0, 0, .7)', 'transparent']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={{width: '100%', height: 600, position: 'absolute', bottom: 0, left: 0}} />

            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.navigation}>
                    <LogoText size={25} theme="light" />
                    <TouchableOpacity style={styles.coachLogin} onPress={navigateToCoachLogin}>
                        <Text style={styles.coachLoginText}>Coach login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>Expert coaching in the palm of your hand</Text>
                    <Text style={styles.subTitle}>At-home training plans custom designed for you</Text>
                </View>
                <View style={styles.footer}>
                    <Button text={'Get started'} submit={navigateToSignUp}/>
                    <View style={styles.footerTextContainer}>
                        <Text style={styles.footerText}>Already have an account?</Text>
                        <TouchableOpacity style={styles.signInButton} onPress={navigateToSignIn}>
                            <Text style={styles.signInButtonText}>Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

            <StatusBar style="light" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    video: {
        height: height,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
    },
    safeAreaContainer: {
      flex: 1
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center'
    },
    coachLogin: {
        padding: 10,
        paddingRight: 0,
    },
    coachLoginText: {
        fontWeight: '600',
        color: 'white'
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 60
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        textAlign: 'center',
        marginVertical: 15,
        paddingHorizontal: 20,
        color: 'white'
    },
    subTitle: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        paddingHorizontal: 30,
        color: 'white'

    },
    footer: {
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    footerTextContainer: {
        marginVertical: 15,
    },
    footerText: {
        textAlign: 'center',
        color: 'white'
    },
    signInButton: {
        alignItems: 'center',
        padding: 10
    },
    signInButtonText: {
        color: Colors.Primary,
        fontWeight: '500',
    }
});

export default LandingScreen;
