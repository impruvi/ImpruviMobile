import {Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useCallback, useState} from "react";
import {Colors} from "../../constants/colors";
import {CoachScreenNames} from "../ScreenNames";
import {useNavigation} from "@react-navigation/native";
import useError from "../../hooks/useError";
import useHttpClient from "../../hooks/useHttpClient";
import Loader from "../../components/Loader";
import HeaderCenter from "../../components/HeaderCenter";
import EmptyPlaceholder from "../../components/EmptyPlaceholder";
import DrillListItem from "./DrillListItem";
import useAuth from "../../hooks/useAuth";

const CreateOrEditSessionScreen = ({route}) => {

    const {playerId, session, isDefaultSession, coach} = route.params;


    const [drills, setDrills] = useState(!!session ? session.drills : []);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigation = useNavigation();
    const {setError} = useError();
    const {coachId} = useAuth();
    const {httpClient} = useHttpClient();

    const onSelectDrill = (drill) => {
        if (drills.filter(d => d.drillId === drill.drillId).length > 0) {
            setDrills(drills.map(d => d.drillId === drill.drillId ? drill : d));
        } else {
            setDrills([...drills, drill]);
        }
    };

    const onRemoveDrill = useCallback((drill) => {
        setDrills(drills.filter(d => d.drillId !== drill.drillId));
    }, [drills]);

    const onSubmit = useCallback(async () => {
        if (isSubmitting) {
            return;
        }

        if (drills.length < 4) {
            Alert.alert('You must add at least 4 drills', '', [
                {
                    text: 'Ok',
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ]);
            return;
        }

        try {
            setIsSubmitting(true);

            if (!!session && !isDefaultSession) {
                await httpClient.updateSession({playerId, sessionNumber: session.sessionNumber, drills});
            } else if (isDefaultSession) {
                var introSessionDrills = [];
                drills.forEach(drill => introSessionDrills.push({drillId: drill.drillId, notes: drill.notes}));
                const newCoach = {
                    ...route.params.coach,
                    introSessionDrills: introSessionDrills
                };
                console.log('cleaned: ' + JSON.stringify(newCoach))
                await httpClient.updateCoach(newCoach);
            } else {
                await httpClient.createSession({playerId, drills});
            }
            setIsSubmitting(false);
            navigation.goBack();
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
            setIsSubmitting(false);
        }
    }, [isSubmitting, playerId, session, drills]);

    const onOptionClick = useCallback((drill) => {
        Alert.alert(`${drill.name}`, '', [
            {
                text: 'Delete',
                onPress: () => onRemoveDrill(drill),
                style: 'destructive'
            },
            {
                text: 'Edit',
                onPress: () => navigation.navigate(CoachScreenNames.EditDrillSelectionDetails, {
                    drill: drill,
                    onSelectDrill: onSelectDrill,
                }),
                style: 'default',
            },
            {
                text: 'Cancel',
                style: 'cancel',
            },
        ]);
    }, [onRemoveDrill, onSelectDrill]);

    const onAddDrillPress = useCallback(() => {
        navigation.navigate(CoachScreenNames.SelectDrill, {
            onSelectDrill: onSelectDrill
        });
    }, [onSelectDrill]);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaView}>
                <HeaderCenter title={!!session ? `Training ${session.sessionNumber}` : (isDefaultSession ? 'Add Default Training': 'Add a Training')}
                              left={<Text>Cancel</Text>}
                              onLeftPress={navigation.goBack}
                              right={<Text style={styles.addDrillButton}>Add drill</Text>}
                              onRightPress={onAddDrillPress}/>

                <View style={styles.content}>
                    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                        {(!drills || drills.length === 0) && (
                            <EmptyPlaceholder text={'No drills'}/>
                        )}
                        {!!drills && drills.map((drill, idx) => (
                            <DrillListItem drill={drill}
                                           idx={idx}
                                           onOptionClick={onOptionClick}
                                           key={drill.drillId}/>
                        ))}
                    </ScrollView>
                    <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
                        <Text style={styles.submitButtonText}>{!!session ? 'Update training' : 'Create training'}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {isSubmitting && (
                <View style={styles.submittingOverlayContainer}>
                    <Loader text={'Creating training...'}/>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    safeAreaView: {
        flex: 1
    },
    addDrillButton: {
        color: Colors.Primary,
        marginLeft: 5,
        fontWeight: '600'
    },
    content: {
        flex: 1,
        paddingHorizontal: 15
    },
    scrollView: {
        flex: 1
    },
    submitButton: {
        backgroundColor: Colors.Primary,
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 10
    },
    submitButtonText: {
        color: 'white',
        fontWeight: '500'
    },
    submittingOverlayContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, .6)'
    }
});

export default CreateOrEditSessionScreen;