import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import useHttpClient from "../../../hooks/useHttpClient";
import useAuth from "../../../hooks/useAuth";
import useError from "../../../hooks/useError";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useCallback, useEffect, useState} from 'react';
import Loader from "../../../components/Loader";
import Reload from "../../../components/Reload";
import {StatusBar} from "expo-status-bar";
import {CoachScreenNames} from '../../ScreenNames';
import {Colors} from '../../../constants/colors';
import DrillList from "../../../components/DrillList";

const DrillsScreen = () => {

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
            <View style={{flex: 1, paddingHorizontal: 15}}>
                <DrillList drills={drills}
                           isLoading={isLoading}
                           hasError={hasError}
                           reload={getDrillsForCoach}
                           onPressDrill={drill => navigation.navigate(CoachScreenNames.Drill, {
                               drill: drill
                           })}
                           optionRight={(
                               <TouchableOpacity onPress={() => navigation.navigate(CoachScreenNames.CreateOrEditDrill)}
                                                 style={{padding: 5, flexDirection: 'row'}}>
                                   <Text style={{color: Colors.Primary, marginLeft: 5, fontWeight: '600'}}>Add a drill</Text>
                               </TouchableOpacity>
                           )}/>
            </View>
            <StatusBar style="dark" />
        </SafeAreaView>
    )
}

export default DrillsScreen;