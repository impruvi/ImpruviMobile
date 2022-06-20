import Container from "./Container";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "../../constants/colors";
import {useNavigation} from "@react-navigation/native";
import {PlayerScreenNames} from "../../screens/ScreenNames";
import useHttpClient from "../../hooks/useHttpClient";
import {useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faUser} from "@fortawesome/pro-light-svg-icons";

const Coach = () => {

    const [coach, setCoach] = useState();

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {player} = useAuth();

    useEffect(() => {
        httpClient.getCoach(player.coachId).then(setCoach)
    }, []);

    return (
        <Container>
            <View style={{padding: 15, width: '50%'}}>
                <View>
                    <Text style={{ ...styles.text, fontSize: 20, fontWeight: '500'}}>{coach?.firstName} {coach?.lastName} </Text>
                    <Text style={{ ...styles.text, fontSize: 12}}>Your coach</Text>

                    <TouchableOpacity style={{marginTop: 15, backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, alignItems: 'center'}}
                                      onPress={() => navigation.navigate(PlayerScreenNames.CoachDetails, {
                                          coach: coach
                                      })}>
                        <Text style={{color: Colors.Primary, fontWeight: '500'}}>Learn more</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{width: '50%', alignItems: 'flex-end', justifyContent: 'center', paddingRight: 10}}>
                <View style={{width: 90, height: 90, borderRadius: 90, backgroundColor: 'white', overflow: 'hidden', alignItems: 'center', justifyContent: 'center'}}>
                    {!!coach?.headshot && coach.headshot.uploadDateEpochMillis > 0 && (
                        <Image source={{uri: coach?.headshot.fileLocation}} style={{height: 90, width: 90, resizeMode: 'cover'}}/>
                    )}
                    {(!coach?.headshot || coach.headshot.uploadDateEpochMillis === 0) && (
                        <FontAwesomeIcon icon={faUser} size={35}/>
                    )}
                </View>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'white'
    }
});

export default Coach;