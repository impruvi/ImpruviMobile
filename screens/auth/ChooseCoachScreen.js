import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import useHttpClient from "../../hooks/useHttpClient";
import {useCallback, useEffect, useState} from "react";
import HeaderCenter from "../../components/HeaderCenter";
import LogoText from "../../components/auth/LogoText";
import {useNavigation} from "@react-navigation/native";
import CoachCard from "../../components/CoachCard";
import ReloadableScreen from "../../components/ReloadableScreen";
import useError from "../../hooks/useError";
import * as Linking from "expo-linking";
import useGoogleAnalyticsClient from "../../hooks/useGoogleAnalyticsClient";

const ChooseCoachScreen = ({route}) => {

    const {token, playerId} = route.params;

    const [coaches, setCoaches] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {gaClient} = useGoogleAnalyticsClient();
    const {setError} = useError();

    const initialize = useCallback(async () => {
        setIsLoading(true);
        try {
            const coaches = await httpClient.listCoaches();
            setCoaches(coaches);
        } catch (e) {
            console.log(e);
            setHasError(true);
            setError('An error occurred. Please try again.');
        }
        setIsLoading(false);
    }, [httpClient]);

    const openHelp = useCallback(() => {
        gaClient.sendGeneralEvent("link_to_help");
        Linking.openURL('https://impruviapp.com')
    }, [navigation]);

    useEffect(() => {
        initialize();
    }, [initialize]);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <HeaderCenter
                titleComponent={(
                    <LogoText size={25}/>
                )}
                right={(
                    <Text style={styles.helpText}>Help</Text>
                )}
                onRightPress={openHelp}/>

            <ReloadableScreen isLoading={isLoading}
                              hasError={hasError}
                              onReload={initialize}
                              render={() => (
                                  <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                                      <Text style={styles.title}>Choose your coach</Text>
                                      <Text style={styles.subTitle}>Your coach will create training sessions for you. Practice, then submit a video for your coach to review.</Text>

                                      {coaches.map(coach => (
                                          <CoachCard
                                              coach={coach}
                                              key={coach.coachId}
                                              token={token}
                                              playerId={playerId}/>
                                      ))}
                                  </ScrollView>
                              )} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView:  {
        flex: 1,
    },
    helpText: {
        fontWeight: '600'
    },
    content: {
        paddingHorizontal: 15
    },
    title: {
        fontSize: 25,
        fontWeight: '600'
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#68676C',
        marginTop: 5,
        marginBottom: 15
    }
});

export default ChooseCoachScreen;
