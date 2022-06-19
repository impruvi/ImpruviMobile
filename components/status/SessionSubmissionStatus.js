import {doesDrillHaveSubmission} from "../../util/drillUtil";
import {StyleSheet, Text, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheckCircle, faCircleEllipsis} from "@fortawesome/pro-light-svg-icons";
import {Colors} from "../../constants/colors";
import {doesEveryDrillHaveSubmission} from "../../util/sessionUtil";

const SessionSubmissionStatus = ({session}) => {
    if (doesEveryDrillHaveSubmission(session)) {
        return (
            <View style={styles.status}>
                <FontAwesomeIcon icon={faCheckCircle} style={{color: 'rgba(24, 180, 102, 1)', marginRight: 5}} size={14}/>
                <Text style={{color: 'rgba(24, 180, 102, 1)'}}>Training complete</Text>
            </View>
        )
    }

    if (session.drills.filter(doesDrillHaveSubmission).length > 0) {
        return (
            <View style={styles.status}>
                <FontAwesomeIcon icon={faCheckCircle} style={{color: '#156EBE', marginRight: 5}} size={14}/>
                <Text style={{color: '#156EBE'}}>Training in progress</Text>
            </View>
        )
    }

    return (
        <View style={styles.status}>
            <FontAwesomeIcon icon={faCircleEllipsis} style={{color: Colors.TextSecondary, marginRight: 5}} size={14}/>
            <Text style={{color: Colors.TextSecondary}}>Training not started</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    status: {
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default SessionSubmissionStatus;