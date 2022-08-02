import {SafeAreaView, ScrollView, Text, View, StyleSheet} from 'react-native';
import {Colors} from "../../../constants/colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft} from "@fortawesome/pro-light-svg-icons";
import HeaderCenter from "../../../components/HeaderCenter";
import {useNavigation} from "@react-navigation/native";
import HeadshotChip from "../../../components/HeadshotChip";

const CoachScreen = ({route}) => {

    const {coach} = route.params;

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <HeaderCenter title={'Your coach'}
                          left={<FontAwesomeIcon icon={faAngleLeft}
                                                 style={styles.backIcon}
                                                 size={30}/>}
                          onLeftPress={navigation.goBack}/>

            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.header}>
                    <HeadshotChip image={coach.headshot}
                                  firstName={coach.firstName}
                                  lastName={coach.lastName}
                                  size={120}/>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>{coach.firstName} {coach.lastName}</Text>
                        <Text style={styles.headerSubtitle}>{coach.position}</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>School</Text>
                    <Text>{coach.school}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Youth club</Text>
                    <Text>{coach.youthClub}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>About</Text>
                    <Text>
                        {coach.about}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollViewContainer: {
        flex: 1,
        paddingHorizontal: 15
    },
    header: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTextContainer: {
        marginVertical: 10,
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600'
    },
    headerSubtitle: {
        color: Colors.TextSecondary
    },
    sectionHeader: {
        fontWeight: '500',
        color: Colors.TextSecondary
    },
    section: {
        marginVertical: 3
    },
    backIcon: {
        fontSize: 80
    }
});

export default CoachScreen;