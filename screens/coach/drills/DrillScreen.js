import VideoBackIcon from "../../../components/VideoBackIcon";
import {StatusBar} from "expo-status-bar";
import {Alert, Image, SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useIsFocused, useNavigation} from "@react-navigation/native";
import DemoVideos from "../../../components/drill-videos/demo/DemoVideos";
import {LinearGradient} from "expo-linear-gradient";
import React, {useState} from "react";
import ThreeDotsWhiteIcon from '../../../assets/icons/ThreeDotsWhite.png';
import {CoachScreenNames} from "../../ScreenNames";
import useHttpClient from "../../../hooks/useHttpClient";
import useError from "../../../hooks/useError";
import Loader from "../../../components/Loader";
import useAuth from "../../../hooks/useAuth";


const gradientColors = ['rgba(0, 0, 0, .7)', 'transparent'];
const gradientStart = { x: 0, y: 0 };
const gradientEnd = { x: 0, y: 1 };

const DrillScreen = ({route}) => {

    const {drill} = route.params;

    const [isDeleting, setIsDeleting] = useState(false);

    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const {coachId} = useAuth();
    const {httpClient} = useHttpClient();
    const {setError} = useError();

    const deleteDrill = async () => {
        setIsDeleting(true);
        try {
            const coach = await httpClient.getCoach(coachId);
            if (!!coach.introSessionDrills.find(d => d.drillId === drill.drillId)) {
                Alert.alert(`You can not delete an intro session drill`, '', [
                    {
                        text: 'Ok',
                    }
                ]);
                setIsDeleting(false);
                return;
            }
            await httpClient.deleteDrill(drill.drillId);
            navigation.goBack();
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
        }
        setIsDeleting(false);
    }


    const onOptionsPress = () => {
        Alert.alert(drill.name, '', [
            {
                text: 'Delete',
                onPress: () => {

                    Alert.alert(`Are you sure you want to delete ${drill.name}?`, '', [
                        {
                            text: 'Delete',
                            onPress: deleteDrill,
                            style: 'destructive'
                        },
                        {
                            text: 'Cancel',
                            style: 'cancel',
                        }
                    ])
                },
                style: 'destructive'
            },
            {
                text: 'Edit',
                onPress: () => navigation.navigate(CoachScreenNames.CreateOrEditDrill, {
                    drill: drill,
                }),
                style: 'default',
            },
            {
                text: 'Cancel',
                style: 'cancel',
            },
        ]);
    }

    return (
        <View style={styles.container}>
            <DemoVideos shouldRender
                        shouldPlay={isFocused}

                        drillId={drill.drillId}
                        name={drill.name}
                        description={drill.description}
                        notes={drill.notes}

                        frontVideoUri={drill.demos.front.fileLocation}
                        sideVideoUri={drill.demos.side.fileLocation}
                        closeVideoUri={drill.demos.close.fileLocation}
                        frontPosterUri={drill.demos.frontThumbnail.fileLocation}
                        sidePosterUri={drill.demos.sideThumbnail.fileLocation}
                        closePosterUri={drill.demos.closeThumbnail.fileLocation}/>
            <LinearGradient
                colors={gradientColors}
                start={gradientStart}
                end={gradientEnd}
                style={styles.gradient} />


            <VideoBackIcon onPress={navigation.goBack} />

            <View style={styles.editButtonContainer}>
                <SafeAreaView>
                    <TouchableOpacity onPress={onOptionsPress} style={styles.editButton}>
                        <Image source={ThreeDotsWhiteIcon} style={styles.editIcon}/>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>

            {isDeleting && (
                <View style={styles.submittingContainer}>
                    <Loader text={'Deleting...'} color={'white'}/>
                </View>
            )}

            <StatusBar style="light" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    gradient: {
        width: '100%',
        height: 200,
        position: 'absolute',
        top: 0,
        left: 0
    },
    editButtonContainer: {
        position: 'absolute',
        right: 0
    },
    editButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    editIcon: {
        width: 26,
        height: 26,
        resizeMode: 'contain'
    },
    submittingContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, .6)'
    }
})

export default DrillScreen;