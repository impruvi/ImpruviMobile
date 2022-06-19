import {Image, ScrollView, Text, View} from 'react-native';
import {Colors} from "../../constants/colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft, faUser} from "@fortawesome/pro-light-svg-icons";
import HeaderCenter from "../../components/HeaderCenter";
import {useNavigation} from "@react-navigation/native";

const CoachDetailsScreen = ({route}) => {

    const {coach} = route.params;

    const navigation = useNavigation();

    return (
        <View style={{flex: 1}}>
            <HeaderCenter title={'Your coach'}
                          left={<FontAwesomeIcon icon={faAngleLeft} style={{fontSize: 80}} size={30}/>}
                          onLeftPress={navigation.goBack}/>

            <ScrollView style={{flex: 1}}>
                <View>
                    <View>
                        {!!coach.headshot && coach.headshot.uploadDateEpochMillis > 0 && (
                            <Image source={{uri: coach.headshot.fileLocation}} />
                        )}
                        {(!coach.headshot || coach.headshot.uploadDateEpochMillis === 0) && (
                            <FontAwesomeIcon icon={faUser} size={25}/>
                        )}
                    </View>
                </View>
                <View>
                    <Text style={{fontSize: 20, fontWeight: '600'}}>{coach.firstName} {coach.lastName}</Text>
                    <Text style={{color: Colors.TextSecondary}}>{coach.position}</Text>
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
        </View>
    );
}

export default CoachDetailsScreen;