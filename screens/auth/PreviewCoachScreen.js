import {ActivityIndicator, Alert, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import HeaderCenter from "../../components/HeaderCenter";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft} from "@fortawesome/pro-light-svg-icons";
import {useNavigation} from "@react-navigation/native";
import {useCallback, useEffect, useState} from "react";
import HeaderScrollView from "../player/home/header-scroll-view/HeaderScrollView";
import ArrowRightWhite from '../../assets/icons/ArrowRightWhite.png';
import {StatusBar} from "expo-status-bar";
import {Colors} from "../../constants/colors";
import RedCircleCheck from '../../assets/icons/RedCircleCheck.png'
import useHttpClient from "../../hooks/useHttpClient";
import useAuth from "../../hooks/useAuth";
import useError from "../../hooks/useError";
import * as Linking from "expo-linking";

const height = Dimensions.get('window').height / 1.2;

const PreviewCoachScreen = ({route}) => {

    const {coach, token, playerId} = route.params;

    const [trialPlan, setTrialPlan] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {httpClient} = useHttpClient();
    const {setError} = useError();
    const navigation = useNavigation();
    const {setPlayerId} = useAuth()

    const openHelp = useCallback(() => {
        Linking.openURL('https://impruviapp.com')
    }, [navigation]);

    const submit = useCallback(async () => {
        setIsSubmitting(true);
        try {
            await httpClient.createSubscription({
                token: token,
                coachId: coach.coachId,
                stripePriceId: trialPlan.stripePriceId,
                stripeProductId: trialPlan.stripeProductId
            });
            console.log('setting playerId: ', playerId);
            setPlayerId(playerId);
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
        }
        setIsSubmitting(false);
    }, [httpClient, coach, trialPlan, token]);

    const onSelect = useCallback(() => {
        if (!trialPlan) {
            Alert.alert(`You can not select ${coach.firstName} ${coach.lastName} through the app. We know, it's not ideal`, '', [
                {
                    text: 'Ok',
                },
            ]);
            return;
        }

        submit();
    }, [trialPlan]);

    const initialize = useCallback(async () => {
        try {
            const plans = await Promise.all(
                coach.subscriptionPlanRefs.map(subscriptionPlanRef => httpClient.getSubscriptionPlan(subscriptionPlanRef))
            );

            const trialPlan = plans.find(plan => plan.isTrial && plan.unitAmount === 0);
            setTrialPlan(trialPlan);
        } catch (e) {

        }
    }, [httpClient]);

    useEffect(() => {
        initialize();
    }, []);

    return (
        <View style={styles.container}>
            <HeaderScrollView imageFileLocation={coach.cardImagePortrait?.fileLocation} imageHeight={height}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.name}>{coach.firstName} {coach.lastName}</Text>
                        <Text style={styles.focusAreas}>Specializes in {!!coach.focusAreas && coach.focusAreas.join(', ').replace(/, ([^,]*)$/, ' and $1')}</Text>
                        <TouchableOpacity style={styles.actionButton} onPress={onSelect}>
                            <Text style={styles.actionButtonText}>
                                Start training
                            </Text>
                            <Image source={ArrowRightWhite} style={styles.arrowIcon}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.checkContainer}>
                        <Image source={RedCircleCheck} style={styles.checkIcon} />
                        <Text style={styles.checkText}>Customized at-home training plan</Text>
                    </View>
                    <View style={styles.checkContainer}>
                        <Image source={RedCircleCheck} style={styles.checkIcon} />
                        <Text style={styles.checkText}>Personalized notes for each drill</Text>
                    </View>
                    <View style={styles.checkContainer}>
                        <Image source={RedCircleCheck} style={styles.checkIcon} />
                        <Text style={styles.checkText}>Expert feedback for each drill you submit</Text>
                    </View>
                    <View style={styles.checkContainer}>
                        <Image source={RedCircleCheck} style={styles.checkIcon} />
                        <Text style={styles.checkText}>Drill bank and progress tracking</Text>
                    </View>

                    <Text style={styles.title}>Biography</Text>
                    <Text style={styles.body}>
                        {coach.about}
                    </Text>
                </View>
            </HeaderScrollView>
            <View style={styles.navigation}>
                <HeaderCenter
                    left={<FontAwesomeIcon icon={faAngleLeft} size={30} color={'white'}/>}
                    onLeftPress={navigation.goBack}
                    right={<Text style={styles.helpText}>Help</Text>}
                    onRightPress={openHelp}/>
            </View>

            {isSubmitting && (
                <View style={styles.submittingContainer}>
                    <ActivityIndicator size="small" color="white"/>
                </View>
            )}

            <StatusBar style="light" />
        </View>
    );
};

const styles = StyleSheet.create({
    container:  {
        flex: 1,
        backgroundColor: 'black'
    },
    helpText: {
        fontWeight: '600',
        color: 'white'
    },
    content: {
        marginTop: height / 2,
        width: '100%',
        paddingHorizontal: 15,
        paddingBottom: 50
    },
    header: {
        width: '100%',
        alignItems: 'center',
    },
    navigation: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
    },
    actionButton: {
        backgroundColor: Colors.Primary,
        paddingVertical: 13,
        paddingHorizontal: 25,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50
    },
    actionButtonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    },
    arrowIcon: {
        marginLeft: 10,
        width: 18,
        height: 12,
    },
    name: {
        color: 'white',
        fontSize: 35,
        fontWeight: '600'
    },
    focusAreas: {
        fontSize: 20,
        marginTop: 8,
        marginBottom: 20,
        color: 'white',
        textAlign: 'center'
    },
    checkContainer: {
        flexDirection: 'row',
        marginVertical: 3,
    },
    checkIcon: {
        width: 25,
        height: 25,
        marginRight: 15
    },
    checkText: {
        fontSize: 15,
        fontWeight: '600',
        color: 'white'
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        marginTop: 30,
        marginBottom: 10
    },
    body: {
        color: 'white',
    },
    submittingContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, .4)'
    },
});

export default PreviewCoachScreen;
