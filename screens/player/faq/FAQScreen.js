import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import HeaderCenter from "../../../components/HeaderCenter";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft} from "@fortawesome/pro-light-svg-icons";
import {useNavigation} from "@react-navigation/native";

const FAQScreen = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{flex: 1}}>
            <HeaderCenter title={'Frequently asked questions'}
                          left={<FontAwesomeIcon icon={faAngleLeft} style={{fontSize: 80}} size={30}/>}
                          onLeftPress={navigation.goBack}/>
            <ScrollView style={{paddingHorizontal: 20}}>
                <Text style={styles.question}>
                    What is Impruvi?
                </Text>
                <Text style={styles.answer}>
                    Impruvi is a platform that is designed to help you improve at soccer! While in-person club and private trainings are great, the most important part of your development happens at home, away from the organized sessions.
                </Text>
                <Text style={styles.answer}>

                    Our app maximizes the at-home training experience. Your chosen coach will build you a customized training plan designed specifically for your needs. As you complete your plan, your coach will provide valuable feedback every step of the way.
                </Text>
                <Text style={styles.answer}>
                    Personalized. Convenience. Accountability. Improvement.
                </Text>


                <Text style={styles.question}>
                    Why Impruvi?
                </Text>
                <Text style={styles.answer}>
                    Our founders are passionate about helping you improve because they have been in your exact position! They both played college soccer at the University of Washington, where they helped lead the team to national recognition.
                </Text>
                <Text style={styles.answer}>
                    They know what it takes to get to the next level, and will work directly with your coach to ensure this happens for you.
                </Text>


                <Text style={styles.question}>
                    How it works:
                </Text>
                <Text style={styles.answer}>
                    Your chosen coach has built you a personalized training plan for the month!
                </Text>
                <Text style={styles.answer}>
                    This plan contains 8 training sessions. Each session contains different drills that your coach has chosen specifically for your improvement!
                </Text>
                <Text style={styles.answer}>
                    Watch videos of your coach performing each drill from multiple angles and speeds. Practice, then submit a short video that your coach will review.
                </Text>
                <Text style={styles.answer}>
                    Within 24 hours, your coach will review your drills and send a video with expert feedback on what you did well and how you can improve.
                </Text>


                <Text style={styles.question}>
                    How to submit videos:
                </Text>
                <Text style={styles.answer}>
                    After watching and practicing each drill, send a video to your coach so they can review it for feedback!
                </Text>
                <Text style={styles.answer}>
                    If you are alone, place your phone up against a water bottle, shoe, or bench, or use a tripod.
                </Text>
                <Text style={styles.answer}>
                    If you are training with others, have them film you!
                </Text>


                <Text style={styles.question}>
                    How long should videos be?
                </Text>
                <Text style={styles.answer}>
                    Each video you send to your coach should be between 20 and 30 seconds long. Don’t worry, you can take the video as many times as you want!
                </Text>


                <Text style={styles.question}>
                    How long until I receive feedback?
                </Text>
                <Text style={styles.answer}>
                    Your coach will provide feedback within 24 hours! Apply this feedback to your next session, club training, or game!
                </Text>


                <Text style={styles.question}>
                    How to contact your coach:
                </Text>
                <Text style={styles.answer}>
                    Under the “learn more” button on the homepage.
                </Text>


                <Text style={styles.question}>
                    How to change the training dates:
                </Text>
                <Text style={styles.answer}>
                    Go to “My profile” and click on “Availability” to change your training dates.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: '500',
        marginBottom: 20,
        marginTop: 10
    },
    question: {
        fontWeight: '600',
        fontSize: 16,
        marginVertical: 10,
    },
    answer: {
        color: '#888',
        marginBottom: 10
    }
})

export default FAQScreen;