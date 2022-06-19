import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleRight} from "@fortawesome/pro-light-svg-icons";
import {useNavigation} from "@react-navigation/native";
import {PlayerScreenNames} from "../../screens/ScreenNames";
import SessionSubmissionStatus from "../status/SessionSubmissionStatus";
import SessionFeedbackStatus from "../status/SessionFeedbackStatus";

const SessionCard = ({session}) => {

    const navigation = useNavigation();

    const navigateToSession = () => {
        navigation.navigate(PlayerScreenNames.SessionDetails, {
            session: session
        });
    }

    return (
        <TouchableOpacity style={styles.container} onPress={navigateToSession}>
            <View>
                <Text style={{fontSize: 18, fontWeight: '500', marginBottom: 10}}>Training {session.sessionNumber}:</Text>
                <View style={{flexDirection: 'row', marginBottom: 5}}>
                    <SessionSubmissionStatus session={session} />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <SessionFeedbackStatus session={session} />
                </View>
            </View>
            <View>
                <FontAwesomeIcon icon={faAngleRight} size={20}/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 20,
        marginBottom: 12,
        position: 'relative',
        shadowColor: 'rgba(0,0,0,.8)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: .15,
        shadowRadius: 3
    }
})

export default SessionCard;