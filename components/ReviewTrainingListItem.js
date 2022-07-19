import {Text, TouchableOpacity, View} from "react-native";
import HeadshotChip from "./HeadshotChip";
import {doesDrillHaveFeedback} from "../util/drillUtil";
import {CoachScreenNames} from "../screens/ScreenNames";
import {DrillVideoTab} from "../constants/drillVideoTab";
import {Colors} from "../constants/colors";
import {useNavigation} from "@react-navigation/native";
import {DayInMillis, getTimeRemainingDisplayText} from "../util/timeUtil";
import {getCompletedDateEpochMillis} from "../util/sessionUtil";

const ReviewTrainingListItem = ({playerSession}) => {

    const navigation = useNavigation();

    const getTimeToProvideFeedback = (session) => {
        return getTimeRemainingDisplayText(getCompletedDateEpochMillis(session) + DayInMillis);
    }

    return (
        <View style={{flexDirection: 'row', paddingVertical: 15}}>
            <TouchableOpacity onPress={() => navigation.navigate(CoachScreenNames.Player, {
                player: playerSession.player
            })}>
                <HeadshotChip firstName={playerSession.player.firstName}
                              lastName={playerSession.player.lastName}
                              image={playerSession.player.headshot}/>
            </TouchableOpacity>
            <View style={{flex: 1, paddingHorizontal: 10}}>
                <Text style={{fontWeight: '500', fontSize: 14}}>{playerSession.player.firstName} {playerSession.player.lastName}</Text>
                <Text style={{color: '#5E5E5E', marginTop: 3}}>{playerSession.session.drills.filter(drill => !doesDrillHaveFeedback(drill)).length} drills to review</Text>
            </View>
            <View style={{alignItems: 'center'}}>
                <TouchableOpacity style={{backgroundColor: '#f1f1f1', paddingVertical: 7, paddingHorizontal: 12, borderRadius: 20}} onPress={() => navigation.navigate(CoachScreenNames.Session, {
                    session: playerSession.session,
                    tab: DrillVideoTab.Submission
                })}>
                    <Text style={{color: Colors.Primary, fontWeight: '500'}}>Provide feedback</Text>
                </TouchableOpacity>
                <Text style={{color: '#BEBEBE', fontSize: 12, marginTop: 2}}>{getTimeToProvideFeedback(playerSession.session)}</Text>
            </View>
        </View>
    )
}

export default ReviewTrainingListItem;