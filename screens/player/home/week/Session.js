import {getSessionEquipment} from "../../../../util/equipmentAggregator";
import Box from "../../../../components/Box";
import {StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import {doesDrillHaveSubmission} from "../../../../util/drillUtil";
import {
    canSubmitForSession,
    doesAnyDrillHaveFeedback,
    doesAnyDrillHaveSubmission,
    doesEveryDrillHaveSubmission
} from "../../../../util/sessionUtil";
import {Colors} from "../../../../constants/colors";
import Equipment from "../../../../components/Equipment";
import {useNavigation} from "@react-navigation/native";
import {PlayerScreenNames} from "../../../ScreenNames";
import {compareDates, getCurrentDate, getHumanReadableDate} from "../../../../util/dateUtil";

const ActionButton = ({session, canSubmit}) => {

    const navigation = useNavigation();

    let backgroundColor;
    let color;
    let text;
    if (doesEveryDrillHaveSubmission(session) && doesAnyDrillHaveFeedback(session)) {
        backgroundColor = 'black';
        color = 'white';
        text = 'View feedback'
    } else if (doesEveryDrillHaveSubmission(session)) {
        backgroundColor = '#EEECEC';
        color = 'black';
        text = 'Awaiting feedback'
    } else {
        if (doesAnyDrillHaveSubmission(session)) {
            text = 'Continue';
            backgroundColor = Colors.Primary;
            color = 'white';
        } else if (canSubmit) {
            text = 'Start';
            backgroundColor = Colors.Primary;
            color = 'white';
        } else {
            text = 'Preview';
            backgroundColor = '#EEECEC';
            color = 'black';
        }
    }

    const startSession = () => {
        navigation.navigate(PlayerScreenNames.Session, {
            session: session,
        });
    }

    return (
        <TouchableOpacity style={{...styles.actionButton, backgroundColor}}
                          onPress={startSession}>
            <Text style={{fontWeight: '600', color: color}}>{text}</Text>
        </TouchableOpacity>
    );
}

const Session = ({session, sessions}) => {

    const canSubmit = canSubmitForSession(sessions, session);

    const {width} = useWindowDimensions();
    const sessionEquipment  = getSessionEquipment(session);

    return (
        <View style={{width: width, paddingHorizontal: 15, marginBottom: 10}}>
            <Box>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: 'flex-start'}}>
                    <Text style={{fontWeight: '600', fontSize: 18, marginBottom: 10}}>
                        {canSubmit && doesAnyDrillHaveSubmission(session) && 'Current training'}
                        {canSubmit && !doesAnyDrillHaveSubmission(session) && 'Next training'}
                        {!canSubmit && `Training ${session.sessionNumber} `}
                    </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
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
                            titleStyle={{fontWeight: 'bold', fontSize: 12}}
                        />
                    </View>
                    <View style={{paddingLeft: 20, flex: 1}}>
                        <Text style={{fontWeight: '600', marginBottom: 5}}>Suggested equipment</Text>
                        {sessionEquipment.map(equipment => (
                            <Equipment equipment={equipment} key={equipment.equipmentType}/>
                        ))}
                        <ActionButton session={session}
                                      canSubmit={canSubmit}/>
                    </View>
                </View>
                <View style={{alignItems: 'flex-end', marginTop: 4}}>
                    <Text style={{color: '#AAA', fontSize: 12, fontWeight: '500'}}>
                        {!doesEveryDrillHaveSubmission(session) && !canSubmit ? 'Complete previous training' : ''}
                    </Text>
                </View>
            </Box>
        </View>
    )
}

const styles = StyleSheet.create({
    actionButton: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        padding: 15,
        marginTop: 15
    }
});

export default Session;