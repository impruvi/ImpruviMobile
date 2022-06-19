import {doesDrillHaveSubmission} from "../../util/drillUtil";
import {StyleSheet, Text, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheckCircle, faCircleEllipsis} from "@fortawesome/pro-light-svg-icons";
import {Colors} from "../../constants/colors";

const DrillSubmissionStatus = ({drill}) => {
    if (doesDrillHaveSubmission(drill)) {
        return (
            <View style={styles.status}>
                <FontAwesomeIcon icon={faCheckCircle} style={{color: 'rgba(24, 180, 102, 1)', marginRight: 5}} size={14}/>
                <Text style={{color: 'rgba(24, 180, 102, 1)'}}>Video submitted</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.status}>
                <FontAwesomeIcon icon={faCircleEllipsis} style={{color: Colors.TextSecondary, marginRight: 5}} size={14}/>
                <Text style={{color: Colors.TextSecondary}}>No submission</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    status: {
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default DrillSubmissionStatus;