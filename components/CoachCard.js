import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useCallback} from "react";
import {useNavigation} from "@react-navigation/native";
import {AuthScreenNames} from "../screens/ScreenNames";


const CoachCard = ({coach, token, playerId}) => {

    const navigation = useNavigation();

    const navigateToPreview = useCallback(() => {
        navigation.navigate(AuthScreenNames.PreviewCoach, {
            coach: coach,
            playerId: playerId,
            token: token
        });
    }, [navigation]);

    return (
        <TouchableOpacity style={styles.container} onPress={navigateToPreview}>
            <Image source={{uri: coach.cardImageLandscape?.fileLocation}} style={styles.image} resizeMode={'cover'}/>
            <View style={styles.content}>
                <Text style={styles.textPrimary}>{coach.firstName}</Text>
                <Text style={styles.textPrimary}>{coach.lastName}</Text>
                <View style={styles.divider} />
                <Text style={styles.textSecondary}>{coach.location}</Text>
                <Text style={styles.textSecondary}>{coach.team}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 170,
        position: 'relative',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
    },
    image: {
        height: 170,
        position: "absolute",
        width: '100%',
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
    },
    content: {
        padding: 15,
    },
    textPrimary: {
        fontSize: 25,
        color: 'white',
        fontWeight: '600'
    },
    textSecondary: {
        color: 'white',
        fontSize: 16,
        fontStyle: 'italic'
    },
    divider: {
        height: 2,
        width: 100,
        backgroundColor: 'white',
        marginVertical: 10
    }
});

export default CoachCard;
