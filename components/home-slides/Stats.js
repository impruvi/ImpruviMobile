import Container from "./Container";
import {StyleSheet, Text, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faBolt} from "@fortawesome/pro-solid-svg-icons";
import {doesDrillHaveSubmission} from "../../util/drillUtil";
import {doesEveryDrillHaveSubmission} from "../../util/sessionUtil";

const Stats = ({sessions}) => {

    const numberOfDrillsCompleted = sessions.flatMap(session => session.drills.filter(doesDrillHaveSubmission)).length;
    const numberOfSessionsCompleted = sessions.filter(doesEveryDrillHaveSubmission).length;

    return (
        <Container>
            <View style={{width: '50%', alignItems: 'center'}}>
                <FontAwesomeIcon icon={faBolt} style={{...styles.text, marginBottom: 10}}/>
                <Text style={{...styles.text, fontSize: 40, fontWeight: '600'}}>{numberOfDrillsCompleted}</Text>
                <Text style={{...styles.text, }}>Drills completed</Text>
            </View>

            <View style={{width: '50%', alignItems: 'center'}}>
                <Text style={{...styles.text, marginBottom: 10, fontSize: 17, fontWeight: '600'}}>ü</Text>
                <Text style={{...styles.text, fontSize: 40, fontWeight: '600'}}>{numberOfSessionsCompleted}</Text>
                <Text style={{...styles.text}}>Sessions completed</Text>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'white'
    }
});

export default Stats;