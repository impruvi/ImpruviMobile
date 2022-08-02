import {Image, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import SwipeIconYellow from "../../../assets/icons/SwipeYellow.png";
import React, {useCallback, useState} from "react";
import InfoSheet from "./InfoSheet";

const DrillDetails = ({name, description, notes, shouldShowSwipeUpIndicator}) => {

    const [isInfoShowing, setIsInfoShowing] = useState(false);

    const openInfoSheet = useCallback(() => {
        setIsInfoShowing(true);
    }, []);

    const closeInfoSheet = useCallback(() => {
        setIsInfoShowing(false);
    }, []);

    return (
        <>
            {shouldShowSwipeUpIndicator && (
                <View style={styles.swipeUpContainer}>
                    <Image source={SwipeIconYellow} style={styles.swipeUpIcon}/>
                    <Text style={styles.swipeUpText}>Swipe up for next drill</Text>
                </View>
            )}

            <Text style={styles.nameText}>
                {name}
            </Text>
            <Text style={styles.descriptionText}>
                {description.replace(/\n|\r/g, "")}
            </Text>
            <TouchableOpacity style={styles.seeMoreContainer} onPress={openInfoSheet}>
                <Text style={styles.seeMoreText}>See more</Text>
            </TouchableOpacity>

            <InfoSheet isOpen={isInfoShowing}
                       onClose={closeInfoSheet}
                       name={name}
                       description={description}
                       notes={notes}/>
        </>
    )
}

const styles = StyleSheet.create({
    swipeUpContainer: {
        marginBottom: 20,
        alignItems: 'center',
        width: 60
    },
    swipeUpIcon: {
        width: 35,
        height: 35,
        resizeMode: 'contain'
    },
    swipeUpText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 12
    },
    nameText: {
        color: 'white',
        fontWeight: '600',
        marginBottom: 5,
        fontSize: 16
    },
    descriptionText: {
        color: 'white'
    },
    seeMoreContainer: {
        paddingVertical: 5
    },
    seeMoreText: {
        color: 'white',
        textDecorationLine: 'underline'
    }
})

export default DrillDetails;
