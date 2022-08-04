import {getSessionEquipment} from "../../../../util/equipmentAggregator";
import Box from "../../../../components/Box";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import {doesDrillHaveSubmission} from "../../../../util/drillUtil";
import {doesAnyDrillHaveSubmission, doesEveryDrillHaveSubmission} from "../../../../util/sessionUtil";
import {Colors} from "../../../../constants/colors";
import Equipment from "../../../../components/Equipment";
import ActionButton from "./ActionButton";

const Session = ({session, canSubmit, subscriptionCurrentPeriodStartDateEpochMillis}) => {

    const sessionEquipment  = getSessionEquipment(session);

    return (
        <View style={styles.container}>
            <Box>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        {canSubmit && doesAnyDrillHaveSubmission(session) && 'Current training'}
                        {canSubmit && !doesAnyDrillHaveSubmission(session) && 'Next training'}
                        {!canSubmit && `Training ${session.sessionNumber}`}
                    </Text>
                    {session.isIntroSession && (
                        <Text style={styles.headerSubtext}> (Intro session)</Text>
                    )}
                </View>
                <View style={styles.content}>
                    <View>
                        <CircularProgress
                            value={session.drills.filter(doesDrillHaveSubmission).length}
                            maxValue={session.drills.length}
                            radius={70}
                            activeStrokeColor={doesEveryDrillHaveSubmission(session) ? 'black': Colors.Primary}
                            inActiveStrokeColor={'#DEDEDE'}
                            progressValueColor={'black'}
                            valueSuffix={`/${session.drills.length}`}
                            title={'drills completed'}
                            titleColor={'#707070'}
                            titleStyle={styles.circularProgressTitle}
                        />
                    </View>
                    <View style={styles.equipmentContainer}>
                        <View style={styles.equipmentContent}>
                            <Text style={styles.equipmentTitle}>Suggested equipment</Text>
                            {sessionEquipment.map(equipment => (
                                <Equipment equipment={equipment} key={equipment.equipmentType}/>
                            ))}
                        </View>
                        <ActionButton session={session}
                                      subscriptionCurrentPeriodStartDateEpochMillis={subscriptionCurrentPeriodStartDateEpochMillis}
                                      canSubmit={canSubmit}/>
                    </View>
                </View>
            </Box>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        paddingHorizontal: 15,
        marginBottom: 10
    },
    header: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center'
    },
    headerText: {
        fontWeight: '600',
        fontSize: 18
    },
    headerSubtext: {
        color: '#aaa',
        fontSize: 14,
        fontWeight: '500'
    },
    content: {
        flexDirection: 'row'
    },
    circularProgressTitle: {
        fontWeight: 'bold',
        fontSize: 12
    },
    equipmentContainer: {
        paddingLeft: 20,
        flex: 1
    },
    equipmentContent: {
        flex: 1
    },
    equipmentTitle: {
        fontWeight: '600',
        marginBottom: 5
    }
});

export default Session;