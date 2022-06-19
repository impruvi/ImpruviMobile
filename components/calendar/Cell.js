import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "../../constants/colors";
import {useNavigation} from "@react-navigation/native";
import {PlayerScreenNames} from "../../screens/ScreenNames";
import {doesEveryDrillHaveSubmission} from "../../util/sessionUtil";
import {doesDrillHaveFeedback} from "../../util/drillUtil";

const Cell = ({text, isHeader, isCurrent, session}) => {

    const navigation = useNavigation();

    const navigateToSession = () => {
        navigation.navigate(PlayerScreenNames.SessionDetails, {
            session: session
        });
    }

    const hasSession = !!session;
    const isCompleted = !!session && doesEveryDrillHaveSubmission(session);
    const hasFeedback = !!session && session.drills.filter(doesDrillHaveFeedback).length > 0;

    if (isHeader) {
        return (
            <View style={styles.container}>
                <Text style={isCurrent ? {color: Colors.Primary} : {color: Colors.TextSecondary}}>{text}</Text>
            </View>
        );
    }

    if (!hasSession) {
        return (
            <View style={styles.container}>
                <View style={isCurrent ? {...styles.circle, ...styles.current} : {...styles.circle}}>
                    <Text>{text}</Text>
                </View>
            </View>
        )
    }

    if (isCompleted) {
        return (
            <TouchableOpacity style={styles.container} onPress={navigateToSession}>
                <View style={isCurrent ? {...styles.circle, backgroundColor: 'rgba(24, 180, 102, .2)', ...styles.current,} : {...styles.circle, backgroundColor: 'rgba(24, 180, 102, .2)'}}>
                    <Text style={{color: 'rgba(24, 180, 102, 1)'}}>{text}</Text>
                    {hasFeedback && <View style={{position: 'absolute', top: 0, right: 0, backgroundColor: Colors.Primary, width: 8, height: 8, borderRadius: 8,}}/>}
                </View>
            </TouchableOpacity>
        );
    } else {
        return (
            <TouchableOpacity style={styles.container} onPress={navigateToSession}>
                <View style={isCurrent ? {...styles.circle, backgroundColor: 'rgba(0, 0, 0, .2)', ...styles.current,} : {...styles.circle, backgroundColor: 'rgba(0,0,0,.1)'}}>
                    <Text style={{color: 'black'}}>{text}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '14%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    },
    circle: {
        borderRadius: 30,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    current: {
        borderWidth: 2,
        borderColor: Colors.Primary
    }
});

export default Cell;