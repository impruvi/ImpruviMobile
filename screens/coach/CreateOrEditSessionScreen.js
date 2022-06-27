import {Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useState} from "react";
import {Colors} from "../../constants/colors";
import {CoachScreenNames} from "../ScreenNames";
import {useNavigation} from "@react-navigation/native";
import useError from "../../hooks/useError";
import useHttpClient from "../../hooks/useHttpClient";
import Loader from "../../components/Loader";
import HeaderCenter from "../../components/HeaderCenter";
import SessionDrillItem from "../../components/SessionDrillItem";

const CreateOrEditSessionScreen = ({route}) => {

    const {playerId, session} = route.params;

    const [drills, setDrills] = useState(!!session ? session.drills : []);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigation = useNavigation();
    const {setError} = useError();
    const {httpClient} = useHttpClient();

    const onSelectDrill = (drill) => {
        if (drills.filter(d => d.drillId === drill.drillId).length > 0) {
            setDrills(drills.map(d => d.drillId === drill.drillId ? drill : d));
        } else {
            setDrills([...drills, drill]);
        }
    }

    const onRemoveDrill = (drill) => {
        setDrills(drills.filter(d => d.drillId !== drill.drillId));
    }

    const onSubmit = async () => {
        if (isSubmitting || drills.length === 0) {
            Alert.alert('You must add at least 1 drill', '', [
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

            if (!!session) {
                await httpClient.updateSession({playerId, sessionNumber: session.sessionNumber, drills});
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
    }

    return (
        <View style={{flex: 1}}>
            <SafeAreaView style={{flex: 1}}>
                <HeaderCenter title={!!session ? `Session ${session.sessionNumber}` : 'Create a session'}
                              left={<Text>Cancel</Text>}
                              onLeftPress={navigation.goBack}
                              right={<Text style={{color: Colors.Primary, marginLeft: 5, fontWeight: '600'}}>Add drill</Text>}
                              onRightPress={() => navigation.navigate(CoachScreenNames.SelectDrill, {
                                  onSelectDrill: onSelectDrill
                              })}/>

                <View style={{flex: 1, paddingHorizontal: 15}}>
                    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                        {(!drills || drills.length === 0) && (
                            <Text>No drills</Text>
                        )}
                        {!!drills && drills.map(drill => (
                            <TouchableOpacity key={drill.drillId} onPress={() => navigation.navigate(CoachScreenNames.EditDrillSelectionDetails, {
                                drill: drill,
                                onSelectDrill: onSelectDrill,
                                onRemoveDrill: onRemoveDrill
                            })}>
                                <SessionDrillItem drill={drill} />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <View style={{paddingBottom: 10}}>
                        <TouchableOpacity style={{backgroundColor: Colors.Primary, padding: 15, alignItems: 'center', borderRadius: 30, marginTop: 20}}
                                          onPress={onSubmit}>
                            <Text style={{color: 'white', fontWeight: '500'}}>{!!session ? 'Update session' : 'Create session'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

            {(isSubmitting) && (
                <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, .6)'}}>
                    <Loader text={'Creating session...'}/>
                </View>
            )}
        </View>
    )
}

export default CreateOrEditSessionScreen;