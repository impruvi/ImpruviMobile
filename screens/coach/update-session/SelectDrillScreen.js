import {SafeAreaView, Text, View} from 'react-native';
import {CoachScreenNames} from "../../ScreenNames";
import Loader from "../../../components/Loader";
import Reload from "../../../components/Reload";
import DrillList from "../../../components/DrillList";
import {StatusBar} from "expo-status-bar";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import useHttpClient from "../../../hooks/useHttpClient";
import useAuth from "../../../hooks/useAuth";
import useError from "../../../hooks/useError";
import {useCallback, useEffect, useState} from 'react';
import HeaderCenter from "../../../components/HeaderCenter";
import EmptyPlaceholder from "../../../components/EmptyPlaceholder";

const SelectDrillScreen = ({route}) => {

    const {onSelectDrill} = route.params;

    const [drills, setDrills] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {coach} = useAuth();
    const {setError} = useError();

    const getDrillsForCoach = async () => {
        setIsLoading(true);
        setHasError(false);
        await getDrillsForCoachLazy();
        setIsLoading(false);
    }

    const getDrillsForCoachLazy = async () => {
        try {
            const result = await httpClient.getDrillsForCoach(coach.coachId);
            setDrills(result.drills);
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
            setHasError(true);
        }
    }

    useEffect(() => {
        getDrillsForCoach();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getDrillsForCoachLazy();
        }, [httpClient, navigation])
    );

    return (
        <SafeAreaView style={{flex: 1}}>
            <HeaderCenter title={'Select a drill'}
                          left={<Text>Cancel</Text>}
                          onLeftPress={navigation.goBack}/>

            {isLoading && <Loader/>}
            {!isLoading && (
                <>
                    {hasError && <Reload onReload={getDrillsForCoach}/>}
                    {!hasError && (
                        <View style={{flex: 1, paddingHorizontal: 15}}>
                            {!!drills && drills.length > 0 && (
                                <DrillList drills={drills}
                                           onPressDrill={drill => navigation.navigate(CoachScreenNames.EditDrillSelectionDetails, {
                                               drill: drill,
                                               onSelectDrill: (drill) => {
                                                   onSelectDrill(drill);
                                                   navigation.goBack()
                                               }
                                           })}/>
                            )}
                            {(!drills || drills.length === 0) && (
                                <EmptyPlaceholder text={'No drills'} />
                            )}
                        </View>
                    )}
                </>
            )}

            <StatusBar style="dark" />
        </SafeAreaView>
    )
}

export default SelectDrillScreen;