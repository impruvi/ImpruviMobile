import {SafeAreaView, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import useHttpClient from "../../../hooks/useHttpClient";
import {useCallback, useEffect, useState} from 'react';
import useAuth from "../../../hooks/useAuth";
import DrillList from "../../../components/DrillList";
import {PlayerScreenNames} from "../../ScreenNames";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import useError from "../../../hooks/useError";

const DrillsScreen = () => {

    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [drills, setDrills] = useState([]);

    const navigation = useNavigation();
    const {setError} = useError();
    const {httpClient} = useHttpClient();
    const {player} = useAuth();


    const getDrills = async () => {
        setIsLoading(true);
        setHasError(false);
        await getDrillsLazy();
        setIsLoading(false);
    }

    const getDrillsLazy = async () => {
        try {
            const drills = await httpClient.getDrillsForPlayer(player.playerId);
            setDrills(drills);
        } catch (e) {
            console.log(e);
            setError('An unexpected error occurred.');
            setHasError(true);
        }
    }


    useFocusEffect(
        useCallback(() => {
            getDrillsLazy();
        }, [httpClient, navigation])
    );

    useEffect(() => {
        getDrills();
    }, []);


    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{paddingHorizontal: 15, flex: 1}}>
                <DrillList drills={drills}
                           onPressDrill={drill => navigation.navigate(PlayerScreenNames.Drill, {drill: drill})}
                           isLoading={isLoading}
                           hasError={hasError}
                           reload={getDrills}/>
            </View>

            <StatusBar style="dark" />
        </SafeAreaView>
    )
}

export default DrillsScreen;
