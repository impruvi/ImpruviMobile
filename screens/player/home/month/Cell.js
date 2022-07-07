import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "../../../../constants/colors";
import {useNavigation} from "@react-navigation/native";
import {PlayerScreenNames} from "../../../ScreenNames";
import {doesEveryDrillHaveSubmission} from "../../../../util/sessionUtil";

const Cell = ({text, isHeader, isCurrent, session}) => {

    const navigation = useNavigation();

    const navigateToSession = () => {
        if (!session) {
            return;
        }
        navigation.navigate(PlayerScreenNames.Session, {
            session: session,
        });
    }

    const hasSession = !!session;
    const isCompleted = !!session && doesEveryDrillHaveSubmission(session);

    if (isHeader) {
        return (
            <View style={{...styles.container, height: 20}}>
                <View style={{...styles.circle, height: 15}}>
                    <Text style={isCurrent ? {color: Colors.Primary} : {color: Colors.TextSecondary}}>{text}</Text>
                </View>
            </View>
        );
    }

    return (
        <TouchableOpacity style={styles.container} onPress={navigateToSession}>
            <View style={isCurrent ? {...styles.circle, ...styles.current,} : styles.circle}>
                <Text style={isCurrent ? {color: 'white', fontWeight: '500'} : {color: 'black', fontWeight: '500'}}>{text}</Text>
            </View>
            {hasSession && isCompleted && (
                <View style={{width: 5, height: 5, backgroundColor: 'black', borderRadius: 5, marginTop: 3}}/>
            )}
            {hasSession && !isCompleted && (
                <View style={{width: 5, height: 5, backgroundColor: Colors.Primary, borderRadius: 5, marginTop: 3}}/>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 45,
    },
    circle: {
        borderRadius: 25,
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    current: {
        backgroundColor: Colors.Primary,
    }
});

export default Cell;