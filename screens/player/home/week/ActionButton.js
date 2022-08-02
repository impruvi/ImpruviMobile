import {useNavigation} from "@react-navigation/native";
import {DrillVideoTab} from "../../../../constants/drillVideoTab";
import {
    doesAnyDrillHaveFeedback,
    doesAnyDrillHaveSubmission,
    doesEveryDrillHaveSubmission
} from "../../../../util/sessionUtil";
import {Colors} from "../../../../constants/colors";
import {PlayerScreenNames} from "../../../ScreenNames";
import {Text, TouchableOpacity, StyleSheet} from "react-native";

const ActionButton = ({session, canSubmit}) => {

    const navigation = useNavigation();

    let backgroundColor;
    let color;
    let text;
    let defaultSessionSelectedTab = DrillVideoTab.Demo;
    if (doesEveryDrillHaveSubmission(session) && doesAnyDrillHaveFeedback(session)) {
        backgroundColor = 'black';
        color = 'white';
        text = 'View feedback';
        defaultSessionSelectedTab = DrillVideoTab.Feedback;
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
            selectedTab: defaultSessionSelectedTab
        });
    }

    return (
        <TouchableOpacity style={{...styles.actionButton, backgroundColor}}
                          onPress={startSession}>
            <Text style={{...styles.text, color: color}}>{text}</Text>
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