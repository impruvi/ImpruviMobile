import {useNavigation} from "@react-navigation/native";
import {DrillVideoTab} from "../../../../constants/drillVideoTab";
import {
    doesAnyDrillHaveFeedback,
    doesAnyDrillHaveSubmission,
    doesEveryDrillHaveSubmission,
    getFirstDrillIdWithoutSubmission
} from "../../../../util/sessionUtil";
import {Colors} from "../../../../constants/colors";
import {PlayerScreenNames} from "../../../ScreenNames";
import {StyleSheet, Text, TouchableOpacity} from "react-native";

const getButtonInfo = (session, canSubmit, subscriptionCurrentPeriodStartDateEpochMillis) => {
    if (session.creationDateEpochMillis < subscriptionCurrentPeriodStartDateEpochMillis) {
        return {
            backgroundColor: 'black',
            color: 'white',
            text: 'View',
        }
    }
    if (doesEveryDrillHaveSubmission(session) && doesAnyDrillHaveFeedback(session)) {
        return {
            backgroundColor: 'black',
            color: 'white',
            text: 'View feedback',
            defaultSessionSelectedTab: DrillVideoTab.Feedback
        }
    } else if (doesEveryDrillHaveSubmission(session)) {
        return {
            backgroundColor: '#EEECEC',
            color: 'black',
            text: 'Awaiting feedback',
        }
    } else {
        if (doesAnyDrillHaveSubmission(session)) {
            return {
                backgroundColor: Colors.Primary,
                color: 'white',
                text: 'Continue',
                drillId: getFirstDrillIdWithoutSubmission(session)
            }
        } else if (canSubmit) {
            return {
                backgroundColor: Colors.Primary,
                color: 'white',
                text: 'Start',
            }
        } else {
            return {
                backgroundColor: '#EEECEC',
                color: 'black',
                text: 'Preview',
            }
        }
    }
}

const ActionButton = ({session, canSubmit, subscriptionCurrentPeriodStartDateEpochMillis}) => {

    const navigation = useNavigation();

    const info = getButtonInfo(session, canSubmit, subscriptionCurrentPeriodStartDateEpochMillis);

    const startSession = () => {
        navigation.navigate(PlayerScreenNames.Session, {
            session: session,
            selectedTab: info.defaultSessionSelectedTab,
            drillId: info.drillId,
            subscriptionCurrentPeriodStartDateEpochMillis: subscriptionCurrentPeriodStartDateEpochMillis
        });
    }

    return (
        <TouchableOpacity style={{...styles.actionButton, backgroundColor: info.backgroundColor}}
                          onPress={startSession}>
            <Text style={{...styles.text, color: info.color}}>{info.text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    actionButton: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        padding: 15,
        marginTop: 15
    },
    text: {
        fontWeight: '600'
    }
})

export default ActionButton;