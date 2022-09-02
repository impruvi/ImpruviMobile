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
import {Colors} from "../../constants/colors";
import HeaderCenter from "../HeaderCenter";
import LogoText from "./LogoText";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft} from "@fortawesome/pro-light-svg-icons";
import {useNavigation} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import {useCallback} from "react";
import * as Linking from "expo-linking";
import useGoogleAnalyticsClient from "../../hooks/useGoogleAnalyticsClient";

const Form = ({children, footerText, footerLink, onFooterLinkPress}) => {

    const navigation = useNavigation();
    const {gaClient} = useGoogleAnalyticsClient();

    const openHelp = useCallback(() => {
        gaClient.sendGeneralEvent("link_to_help");
        Linking.openURL('https://impruviapp.com')
    }, [navigation]);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <HeaderCenter
                titleComponent={(
                    <LogoText size={25}/>
                )}
                left={(
                    <View>
                        <FontAwesomeIcon icon={faAngleLeft} size={30}/>
                    </View>
                )}
                onLeftPress={navigation.goBack}
                right={(
                    <Text style={styles.helpText}>Help</Text>
                )}
                onRightPress={openHelp}/>

            <TouchableWithoutFeedback style={styles.touchableWithoutFeedback} onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={'padding'}>
                        <View style={styles.content}>
                            {children}
                        </View>
                    </KeyboardAvoidingView>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            {footerText}
                        </Text>
                        <TouchableOpacity onPress={onFooterLinkPress} style={styles.footerLink}>
                            <Text style={styles.footerLinkText}>{footerLink}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>

            <StatusBar style="dark" />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    safeAreaView:  {
        flex: 1,
    },
    helpText: {
        fontWeight: '600'
    },
    touchableWithoutFeedback: {
        flex: 1,
    },
    keyboardAvoidingView: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    container: {
        flex: 1,
    },
    content: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20
    },
    footer: {
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    footerText: {
        textAlign: 'center',
    },
    footerLink: {
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    footerLinkText: {
        color: Colors.Primary,
        fontWeight: '500',
    }
});

export default Form;
