import {StyleSheet, Text, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheckCircle, faCircleEllipsis} from "@fortawesome/pro-light-svg-icons";
import {doesDrillHaveFeedback, doesDrillHaveSubmission} from "../../util/drillUtil";
import {Colors} from "../../constants/colors";

const SessionFeedbackStatus = ({session}) => {
    if (session.drills.filter(doesDrillHaveSubmission).length === 0) {
        return null;
    }

    if (session.drills.filter(doesDrillHaveFeedback).length > 0) {
        return (
            <View style={styles.status}>
                <FontAwesomeIcon icon={faCheckCircle} style={{color: 'rgba(24, 180, 102, 1)', marginRight: 5}} size={14}/>
                <Text style={{color: 'rgba(24, 180, 102, 1)'}}>Feedback available</Text>
            </View>
        )
    }

    return (
        <View style={styles.status}>
            <FontAwesomeIcon icon={faCircleEllipsis} style={{color: Colors.TextSecondary, marginRight: 5}} size={14}/>
            <Text style={{color: Colors.TextSecondary}}>Awaiting feedback</Text>
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

export default SessionFeedbackStatus;