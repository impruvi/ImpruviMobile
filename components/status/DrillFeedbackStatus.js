import {doesDrillHaveFeedback, doesDrillHaveSubmission} from "../../util/drillUtil";
import {StyleSheet, Text, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheckCircle} from "@fortawesome/pro-light-svg-icons";

const DrillFeedbackStatus = ({drill}) => {
    if (!doesDrillHaveSubmission(drill)) {
        return null;
    }

    if (doesDrillHaveFeedback(drill)) {
        return (
            <View style={styles.status}>
                <FontAwesomeIcon icon={faCheckCircle} style={{color: 'rgba(24, 180, 102, 1)', marginRight: 5}} size={14}/>
                <Text style={{color: 'rgba(24, 180, 102, 1)'}}>Feedback provided</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.status}>
                <FontAwesomeIcon icon={faCheckCircle} style={{color: '#156EBE', marginRight: 5}} size={14}/>
                <Text style={{color: '#156EBE'}}>Awaiting feedback</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    status: {
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default DrillFeedbackStatus;