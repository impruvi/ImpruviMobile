import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faCheckCircle, faClock, faSoccerBall} from '@fortawesome/pro-light-svg-icons';
import {Colors} from "../constants/colors";
import {getSessionEquipment} from "../util/equipmentAggregator";
import Equipment from "./Equipment";
import {commonStyles} from '../styles/commonStyles';
import {doesDrillHaveSubmission} from "../util/drillUtil";


const SessionOverview = ({session, startSession}) => {
    const sessionEquipment = getSessionEquipment(session);
    const totalTime = session.drills.reduce((count, drill) => count + drill.durationMinutes, 0);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Overview</Text>
            <View style={commonStyles.row}>
                <View style={commonStyles.half}>
                    <View style={commonStyles.box}>
                        <Text style={styles.boxHeaderTextLarge}>What you need</Text>
                        <View>
                            {sessionEquipment.map(equipment => (
                                <Equipment equipment={equipment} key={equipment.equipmentType}/>
                            ))}
                        </View>
                    </View>
                </View>
                <View style={commonStyles.half}>
                    <View style={commonStyles.box}>
                        <View style={styles.boxHeader}>
                            <FontAwesomeIcon icon={faClock} style={styles.boxHeaderIcon}/>
                            <Text style={styles.boxHeaderTextSmall}>Total time</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontSize: 20}}>{totalTime}</Text><Text style={{color: Colors.TextSecondary, marginLeft: 5}}>minutes</Text>
                        </View>
                    </View>
                    <View style={commonStyles.box}>
                        <View style={styles.boxHeader}>
                            <FontAwesomeIcon icon={faSoccerBall} style={styles.boxHeaderIcon}/>
                            <Text style={styles.boxHeaderTextSmall}>Number of drills</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontSize: 20}}>{session.drills.length}</Text><Text style={{color: Colors.TextSecondary, marginLeft: 5}}>drills</Text>
                        </View>
                    </View>
                </View>
            </View>
            <Text style={styles.header}>Drills</Text>
            {session.drills.map(drill => (
                <View style={commonStyles.row} key={drill.drill.name}>
                    <View style={commonStyles.box}>
                        <Text style={{fontWeight: '500', marginBottom: 3}}>
                            {drill.drill.name}
                        </Text>
                        <Text style={{fontWeight: '500', color: Colors.TextSecondary}}>
                            {drill.drill.category}
                        </Text>
                        {doesDrillHaveSubmission(drill) && (
                            <View style={{marginTop: 10, flexDirection: 'row'}}>
                                <FontAwesomeIcon icon={faCheckCircle}  style={{marginRight: 6, color: 'green'}}/>
                                <Text style={{color: 'green'}}>Your video is submitted</Text>
                            </View>
                        )}
                        <Text style={{position: 'absolute', top: 20, right: 20, color: Colors.TextSecondary}}>
                            {drill.durationMinutes} minutes
                        </Text>
                    </View>
                </View>
            ))}
            <TouchableOpacity style={styles.startButton} onPress={startSession}>
                <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
        marginVertical: 10,
        fontWeight: '600'
    },
    boxHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    boxHeaderIcon: {
        marginRight: 7
    },
    boxHeaderTextSmall: {
        fontWeight: '500'
    },
    boxHeaderTextLarge: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 5
    },
    startButton: {
        width: '100%',
        backgroundColor: Colors.Primary,
        color: 'white',
        borderRadius: 30,
        paddingVertical: 13,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    startButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 17
    }
});

export default SessionOverview;
