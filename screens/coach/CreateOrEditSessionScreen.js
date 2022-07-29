import {Alert, Image, SafeAreaView, ScrollView, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import {useState} from "react";
import {Colors} from "../../constants/colors";
import {CoachScreenNames} from "../ScreenNames";
import {useNavigation} from "@react-navigation/native";
import useError from "../../hooks/useError";
import useHttpClient from "../../hooks/useHttpClient";
import Loader from "../../components/Loader";
import HeaderCenter from "../../components/HeaderCenter";
import ThreeDotsBlack from '../../assets/icons/ThreeDotsBlack.png';
import EmptyPlaceholder from "../../components/EmptyPlaceholder";

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
        if (isSubmitting || drills.length < 4) {
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

    const onOptionClick = (drill) => {
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
    }

    const navigateToDrill = (drill) => {
        navigation.navigate(CoachScreenNames.Drill, {
            drill: drill
        });
    }

    return (
        <View style={{flex: 1}}>
            <SafeAreaView style={{flex: 1}}>
                <HeaderCenter title={!!session ? `Training ${session.sessionNumber}` : 'Add a training'}
                              left={<Text>Cancel</Text>}
                              onLeftPress={navigation.goBack}
                              right={<Text style={{color: Colors.Primary, marginLeft: 5, fontWeight: '600'}}>Add drill</Text>}
                              onRightPress={() => navigation.navigate(CoachScreenNames.SelectDrill, {
                                  onSelectDrill: onSelectDrill
                              })}/>

                <View style={{flex: 1, paddingHorizontal: 15}}>
                    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                        {(!drills || drills.length === 0) && (
                            <EmptyPlaceholder text={'No drills'}/>
                        )}
                        {!!drills && drills.map((drill, idx) => (
                            <TouchableHighlight onPress={() => navigateToDrill(drill)} underlayColor="#EFF3F4" key={drill.drillId}>
                                <View style={{flexDirection: 'row', paddingVertical: 15, alignItems: 'center', borderBottomWidth: 1, borderColor: Colors.Border}}>
                                    <View style={{flex: 1}}>
                                        <Text style={{fontWeight: '500', fontSize: 14}}>{drill.name} (Drill {idx + 1})</Text>
                                        <Text style={{color: '#505050', marginTop: 3}}>{drill.notes}</Text>
                                    </View>
                                    <TouchableOpacity style={{padding: 10}} onPress={() => onOptionClick(drill)}>
                                        <Image source={ThreeDotsBlack} style={{width: 20, height: 20, resizeMode: 'contain'}}/>
                                    </TouchableOpacity>
                                </View>
                            </TouchableHighlight>
                        ))}
                    </ScrollView>
                    <View style={{paddingBottom: 10}}>
                        <TouchableOpacity style={{backgroundColor: Colors.Primary, padding: 15, alignItems: 'center', borderRadius: 30, marginTop: 20}}
                                          onPress={onSubmit}>
                            <Text style={{color: 'white', fontWeight: '500'}}>{!!session ? 'Update training' : 'Create training'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

            {(isSubmitting) && (
                <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, .6)'}}>
                    <Loader text={'Creating training...'}/>
                </View>
            )}
        </View>
    )
}

export default CreateOrEditSessionScreen;