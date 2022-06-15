import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView} from "react-native";
import SpaceBetweenComponent from "../../components/SpaceBetweenComponent";
import Box from "../../components/Box";
import Equipment from "../../components/Equipment";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft, faCheckCircle, faClock, faSoccerBall} from "@fortawesome/pro-light-svg-icons";
import {Colors} from "../../constants/colors";
import {getCategoryDisplayValue} from "../../constants/categoryType";
import {doesDrillHaveSubmission} from "../../util/drillUtil";
import {getSessionEquipment} from "../../util/equipmentAggregator";
import {useNavigation} from "@react-navigation/native";

const SessionDetailsScreen = ({route}) => {

    const navigation = useNavigation();
    const {nextSession} = route.params;

    const sessionEquipment = getSessionEquipment(nextSession);
    const totalTime = nextSession.drills.reduce((count, drill) => count + drill.estimatedDurationMinutes, 0);

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{
                flex: 1,
                padding: 20,
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{width: 40, height: 40, marginBottom: 0}}>
                    <FontAwesomeIcon icon={faAngleLeft} style={{fontSize: 80}} size={30}/>
                </TouchableOpacity>

                <Text style={styles.header}>Sunday, June 14</Text>
                <SpaceBetweenComponent>
                    <View style={{width: '49%'}}>
                        <Box style={{padding: 15}}>
                            <Text style={styles.boxHeaderTextLarge}>What you need</Text>
                            <View>
                                {sessionEquipment.map(equipment => (
                                    <Equipment equipment={equipment} key={equipment.equipmentType}/>
                                ))}
                            </View>
                        </Box>
                    </View>
                    <View style={{width: '49%'}}>
                        <Box style={{padding: 15}}>
                            <View style={styles.boxHeader}>
                                <FontAwesomeIcon icon={faClock} style={styles.boxHeaderIcon}/>
                                <Text style={styles.boxHeaderTextSmall}>Time to complete</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{fontSize: 20}}>~{totalTime}</Text><Text style={{color: Colors.TextSecondary, marginLeft: 5}}>minutes</Text>
                            </View>
                        </Box>
                        <Box style={{padding: 15}}>
                            <View style={styles.boxHeader}>
                                <FontAwesomeIcon icon={faSoccerBall} style={styles.boxHeaderIcon}/>
                                <Text style={styles.boxHeaderTextSmall}>Number of drills</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{fontSize: 20}}>{nextSession.drills.length}</Text><Text style={{color: Colors.TextSecondary, marginLeft: 5}}>drills</Text>
                            </View>
                        </Box>
                    </View>
                </SpaceBetweenComponent>
                <Text style={styles.header}>Drills</Text>
                {nextSession.drills.map(drill => (
                    <Box style={{padding: 15}}>
                        <Text style={{fontWeight: '500', marginBottom: 3}}>
                            {drill.name}
                        </Text>
                        <Text style={{fontWeight: '500', color: Colors.TextSecondary}}>
                            {getCategoryDisplayValue(drill.category)}
                        </Text>
                        {doesDrillHaveSubmission(drill) && (
                            <View style={{marginTop: 10, flexDirection: 'row'}}>
                                <FontAwesomeIcon icon={faCheckCircle}  style={{marginRight: 6, color: 'green'}}/>
                                <Text style={{color: 'green'}}>Your video is submitted</Text>
                            </View>
                        )}
                        <Text style={{position: 'absolute', top: 15, right: 15, color: Colors.TextSecondary}}>
                            {drill.estimatedDurationMinutes} minutes
                        </Text>
                    </Box>
                ))}

                <TouchableOpacity style={styles.startButton}>
                    <Text style={styles.startButtonText}>Start training</Text>
                </TouchableOpacity>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#EFF3F4'
    },
    container: {
        flex: 1,
        paddingHorizontal: 15
    },
    header: {
        fontSize: 20,
        marginBottom: 10
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
        marginTop: 10,
        marginBottom: 20
    },
    startButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14
    }
});


export default SessionDetailsScreen;