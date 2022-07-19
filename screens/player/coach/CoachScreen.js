import {SafeAreaView, ScrollView, Text, View} from 'react-native';
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
        <SafeAreaView style={{flex: 1}}>
            <HeaderCenter title={'Your coach'}
                          left={<FontAwesomeIcon icon={faAngleLeft} style={{fontSize: 80}} size={30}/>}
                          onLeftPress={navigation.goBack}/>

            <ScrollView style={{flex: 1, paddingHorizontal: 15}}>
                <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                    <HeadshotChip image={coach.headshot} firstName={coach.firstName} lastName={coach.lastName} size={120}/>
                    <View style={{marginVertical: 10, alignItems: 'center'}}>
                        <Text style={{fontSize: 20, fontWeight: '600'}}>{coach.firstName} {coach.lastName}</Text>
                        <Text style={{color: Colors.TextSecondary}}>{coach.position}</Text>
                    </View>
                </View>
                <View style={{marginVertical: 3}}>
                    <Text style={{fontWeight: '500', color: Colors.TextSecondary}}>School</Text>
                    <Text>{coach.school}</Text>
                </View>
                <View style={{marginVertical: 3}}>
                    <Text style={{fontWeight: '500', color: Colors.TextSecondary}}>Youth club</Text>
                    <Text>{coach.youthClub}</Text>
                </View>
                <View style={{marginVertical: 3, marginBottom: 100}}>
                    <Text style={{fontWeight: '500', color: Colors.TextSecondary}}>About</Text>
                    <Text>
                        {coach.about}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default CoachScreen;