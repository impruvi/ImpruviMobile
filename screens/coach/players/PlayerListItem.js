import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {CoachScreenNames} from "../../ScreenNames";
import {Colors} from "../../../constants/colors";
import HeadshotChip from "../../../components/HeadshotChip";
import {useNavigation} from "@react-navigation/native";
import {useCallback} from "react";

const PlayerListItem = ({playerSession, subscription, actionRequired}) => {

    const navigation = useNavigation();

    const navigateToPlayer = useCallback(() => {
        navigation.navigate(CoachScreenNames.Player, {
            player: playerSession.player,
            subscription: subscription
        });
    }, [playerSession, subscription]);

    return (
        <TouchableHighlight underlayColor="#EFF3F4" onPress={navigateToPlayer} key={playerSession.player.playerId}>
            <View style={styles.container}>
                <View style={actionRequired ? styles.actionRequiredIndicator : styles.noActionRequiredPlaceholder}/>
                <HeadshotChip firstName={playerSession.player.firstName} lastName={playerSession.player.lastName} image={playerSession.player.headshot}/>
                <View style={styles.content}>
                    <Text style={styles.text}>
                        {playerSession.player.firstName} {playerSession.player.lastName}
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 12,
        alignItems: 'center',
        paddingHorizontal: 15
    },
    actionRequiredIndicator: {
        backgroundColor: Colors.Primary,
        width: 6,
        height: 6,
        borderRadius: 6,
        marginRight: 8
    },
    noActionRequiredPlaceholder: {
        width: 6,
        height: 6,
        borderRadius: 6,
        marginRight: 8
    },
    content: {
        flex: 1,
        paddingHorizontal: 10
    },
    text: {
        fontWeight: '500',
        fontSize: 14
    }
})

export default PlayerListItem;