import {SafeAreaView, View, StyleSheet} from "react-native";
import {StatusBar} from "expo-status-bar";
import useHttpClient from "../../../hooks/useHttpClient";
import {useCallback, useEffect, useRef, useState} from 'react';
import useAuth from "../../../hooks/useAuth";
import DrillList from "../../../components/drill-list/DrillList";
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
    const {playerId} = useAuth();
    const firstLoad = useRef(true);


    const getDrills = async () => {
        setIsLoading(true);
        setHasError(false);
        await getDrillsLazy();
        setIsLoading(false);
    }

    const getDrillsLazy = async () => {
        try {
            const drills = await httpClient.getDrillsForPlayer(playerId);
            setDrills(drills);
        } catch (e) {
            console.log(e);
            setError('An unexpected error occurred.');
            setHasError(true);
        }
    }

    const navigateToDrill = useCallback((drill) => {
        navigation.navigate(PlayerScreenNames.Drill, {
            drill: drill
        });
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (firstLoad.current) {
                firstLoad.current = false;
                return;
            }
            getDrillsLazy();
        }, [httpClient, navigation])
    );

    useEffect(() => {
        getDrills();
    }, []);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.content}>
                <DrillList drills={drills}
                           onPressDrill={navigateToDrill}
                           isLoading={isLoading}
                           hasError={hasError}
                           reload={getDrills}/>
            </View>

            <StatusBar style="dark" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1
    },
    content: {
        paddingHorizontal: 15,
        flex: 1
    }
})

export default DrillsScreen;
