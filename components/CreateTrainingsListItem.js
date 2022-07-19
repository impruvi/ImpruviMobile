import {Text, TouchableOpacity, View} from "react-native";
import HeadshotChip from "./HeadshotChip";
import {CoachScreenNames} from "../screens/ScreenNames";
import {Colors} from "../constants/colors";
import {useNavigation} from "@react-navigation/native";
import {DayInMillis, getTimeRemainingDisplayText} from "../util/timeUtil";

const CreateTrainingsListItem = ({playerRequiringTrainings}) => {

    const navigation = useNavigation();

    const getTimeToCreateTrainings = (subscriptionStartDateEpochMillis) => {
        return getTimeRemainingDisplayText(subscriptionStartDateEpochMillis + DayInMillis);
    }

    return (
        <View style={{flexDirection: 'row', paddingVertical: 15}}>
            <TouchableOpacity onPress={() => navigation.navigate(CoachScreenNames.Player, {
                player: playerRequiringTrainings.player
            })}>
                <HeadshotChip firstName={playerRequiringTrainings.player.firstName}
                              lastName={playerRequiringTrainings.player.lastName}
                              image={playerRequiringTrainings.player.headshot}/>
            </TouchableOpacity>
            <View style={{flex: 1, paddingHorizontal: 10}}>
                <Text style={{fontWeight: '500', fontSize: 14}}>{playerRequiringTrainings.player.firstName} {playerRequiringTrainings.player.lastName}</Text>
                <Text style={{color: '#5E5E5E', marginTop: 3}}>Purchased {playerRequiringTrainings.numberOfSessionsInSubscription} trainings</Text>
            </View>
            <View style={{alignItems: 'center'}}>
                <TouchableOpacity style={{backgroundColor: '#f1f1f1', paddingVertical: 7, paddingHorizontal: 12, borderRadius: 20}} onPress={() => navigation.navigate(CoachScreenNames.Player, {
                    player: playerRequiringTrainings.player
                })}>
                    <Text style={{color: Colors.Primary, fontWeight: '500'}}>Create trainings</Text>
                </TouchableOpacity>
                <Text style={{color: '#BEBEBE', fontSize: 12, marginTop: 2}}>{getTimeToCreateTrainings(playerRequiringTrainings.subscriptionStartDateEpochMillis)}</Text>
            </View>
        </View>
    )
}

export default CreateTrainingsListItem;