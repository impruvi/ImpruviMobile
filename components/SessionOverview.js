import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faClock, faSoccerBall} from '@fortawesome/pro-light-svg-icons';
import {Colors} from "../constants/colors";

const SessionOverview = ({session}) => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Overview</Text>
            <View style={styles.row}>
                <View style={styles.half}>
                    <View style={styles.box}>
                        <Text style={styles.boxHeaderTextLarge}>What you need</Text>
                        <View>
                            {session.equipment.map(equipment => (
                                <Text key={equipment.type} style={{color: Colors.TextSecondary, fontSize: 15}}>
                                    • {equipment.value} {equipment.type}
                                </Text>
                            ))}
                        </View>
                    </View>
                </View>
                <View style={styles.half}>
                    <View style={styles.box}>
                        <View style={styles.boxHeader}>
                            <FontAwesomeIcon icon={faClock} style={styles.boxHeaderIcon}/>
                            <Text style={styles.boxHeaderTextSmall}>Total time</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontSize: 20}}>52</Text><Text style={{color: Colors.TextSecondary, marginLeft: 5}}>minutes</Text>
                        </View>
                    </View>
                    <View style={styles.box}>
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
                <View style={styles.row} key={drill.drill.name}>
                    <View style={styles.box}>
                        <Text style={{fontWeight: '500', marginBottom: 3}}>
                            {drill.drill.name}
                        </Text>
                        <Text style={{fontWeight: '500', color: Colors.TextSecondary}}>
                            {drill.drill.category}
                        </Text>
                    </View>
                </View>
            ))}
            <TouchableOpacity style={styles.startButton}>
                <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = {
    container: {
      flex: 1,
    },
    header: {
        marginVertical: 10,
        fontWeight: '600'
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'stretch'
    },
    half: {
        width: '49%',
        height: '100%'
    },
    box: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        marginBottom: 5,
        borderRadius: 15,
        padding: 20,
        shadowColor: '#E2E5E6',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2
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
        borderRadius: 20,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    startButtonText: {
        color: 'white',
        fontWeight: '600'
    }
}

export default SessionOverview;
