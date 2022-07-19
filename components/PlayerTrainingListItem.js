import {Alert, Image, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import {Colors} from "../constants/colors";
import {
    doesEveryDrillHaveFeedback,
    doesEveryDrillHaveSubmission,
    getCompletedDateEpochMillis,
    getNumberOfCompletedFeedbacks
} from "../util/sessionUtil";
import moment from "moment";
import ThreeDotsBlack from "../assets/icons/ThreeDotsBlack.png";
import {CoachScreenNames} from "../screens/ScreenNames";
import {useNavigation} from "@react-navigation/native";
import useHttpClient from "../hooks/useHttpClient";
import useError from "../hooks/useError";
import {DayInMillis, getTimeRemainingDisplayText} from "../util/timeUtil";
import {DrillVideoTab} from "../constants/drillVideoTab";

const PlayerTrainingListItem = ({player, session, setIsDeleting, onDelete}) => {

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {setError} = useError();

    const deleteTraining = async (session) => {
        setIsDeleting(true);
        try {
            await httpClient.deleteSession({
                playerId: player.playerId,
                sessionNumber: session.sessionNumber
            });
            await onDelete();
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
        }
        setIsDeleting(false);
    }

    const onOptionsClick = (session) => {
        Alert.alert(`Training ${session.sessionNumber}`, '', [
            {
                text: 'Delete',
                onPress: () => {
                    Alert.alert(`Are you sure you want to delete training ${session.sessionNumber}`, '', [
                        {
                            text: 'Delete',
                            onPress: () => deleteTraining(session),
                            style: 'destructive'
                        },
                        {
                            text: 'Cancel',
                            style: 'cancel',
                        }
                    ]);
                },
                style: 'destructive'
            },
            {
                text: 'Edit',
                onPress: () => navigation.navigate(CoachScreenNames.CreateOrEditSession, {
                    playerId: player.playerId,
                    session: session
                }),
                style: 'default',
            },
            {
                text: 'Cancel',
                style: 'cancel',
            },
        ]);
    }

    const isCompleted = () => {
        return doesEveryDrillHaveFeedback(session);
    }

    const needsFeedback = () => {
        return doesEveryDrillHaveSubmission(session) && !doesEveryDrillHaveFeedback(session);
    }

    const isIncomplete = () => {
        return !doesEveryDrillHaveSubmission(session);
    }

    const getTimeToProvideFeedback = (session) => {
        return getTimeRemainingDisplayText(getCompletedDateEpochMillis(session) + DayInMillis);
    }

    return (
        <TouchableHighlight onPress={() => navigation.navigate(CoachScreenNames.Session, {
            session: session
        })} underlayColor="#EFF3F4" key={session.sessionNumber} style={{paddingHorizontal: 15}}>
            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderColor: Colors.Border}}>
                <View style={needsFeedback() ? {backgroundColor: Colors.Primary, width: 6, height: 6, borderRadius: 6, marginRight: 8} : {width: 6, height: 6, borderRadius: 6, marginRight: 8}}/>
                <View style={{flex: 1}}>
                    <Text style={isCompleted() ? {color: '#BEBEBE', fontSize: 14, fontWeight: '500'} : {fontSize: 14, fontWeight: '500'}}>Training {session.sessionNumber}</Text>
                    <Text style={isCompleted() ? {color: '#BEBEBE', marginTop: 3} : {color: '#505050', marginTop: 3}}>
                        {!doesEveryDrillHaveSubmission(session)
                            ? `${session.drills.length} drills`
                            : `${getNumberOfCompletedFeedbacks(session)}/${session.drills.length} feedbacks provided`}
                    </Text>
                </View>
                {isCompleted() && (
                    <Text style={{color: '#BEBEBE', fontSize: 12, fontWeight: '500'}}>
                        Completed on {moment.unix(getCompletedDateEpochMillis(session) / 1000).format("MM/DD/YYYY")}
                    </Text>
                )}
                {needsFeedback() && (
                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity style={{backgroundColor: '#F1F1F1', paddingVertical: 7, paddingHorizontal: 12, borderRadius: 20}} onPress={() => navigation.navigate(CoachScreenNames.Session, {
                            session: session,
                            tab: DrillVideoTab.Submission
                        })}>
                            <Text style={{color: Colors.Primary, fontWeight: '500'}}>Provide feedback</Text>
                        </TouchableOpacity>
                        <Text style={{marginTop: 3, color: '#BEBEBE', fontSize: 12}}>{getTimeToProvideFeedback(session)}</Text>
                    </View>
                )}
                {isIncomplete() && (
                    <TouchableOpacity style={{padding: 10}} onPress={() => onOptionsClick(session)}>
                        <Image source={ThreeDotsBlack} style={{width: 20, height: 20, resizeMode: 'contain'}} />
                    </TouchableOpacity>
                )}
            </View>
        </TouchableHighlight>
    );
}

export default PlayerTrainingListItem;