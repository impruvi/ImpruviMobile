import {SafeAreaView, StyleSheet, View} from 'react-native';
import useHttpClient from "../../../hooks/useHttpClient";
import useAuth from "../../../hooks/useAuth";
import useError from "../../../hooks/useError";
import {useNavigation} from "@react-navigation/native";
import {useCallback, useEffect, useRef, useState} from 'react';
import {StatusBar} from "expo-status-bar";
import {CoachScreenNames} from '../../ScreenNames';
import {Colors} from '../../../constants/colors';
import DrillList from "../../../components/drill-list/DrillList";
import useLongRequest from "../../../hooks/useLongRequest";
import AddDrillButton from "./AddDrillButton";

const DrillsScreen = () => {

    const [drills, setDrills] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const {outstandingLongRequests} = useLongRequest();
    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {coachId} = useAuth();
    const {setError} = useError();
    const firstLoadLongRequests = useRef(true);
    const firstLoadNavigation = useRef(true);

    const getDrillsForCoach = async () => {
        setIsLoading(true);
        setHasError(false);
        await getDrillsForCoachLazy();
        setIsLoading(false);
    }

    const getDrillsForCoachLazy = async () => {
        try {
            const result = await httpClient.getDrillsForCoach(coachId);
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

    useEffect(() => {
        if (firstLoadLongRequests.current) {
            firstLoadLongRequests.current = false;
            return;
        }
        getDrillsForCoachLazy();
    }, [outstandingLongRequests]);

    useFocusEffect(
        useCallback(() => {
            if (firstLoadNavigation.current) {
                firstLoadNavigation.current = false;
                return;
            }
            getDrillsForCoachLazy();
        }, [httpClient, navigation])
    );

    const onPressDrill = useCallback(drill => {
        navigation.navigate(CoachScreenNames.Drill, {
            drill: drill
        });
    }, []);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <DrillList drills={drills}
                           isLoading={isLoading}
                           hasError={hasError}
                           reload={getDrillsForCoach}
                           onPressDrill={onPressDrill}
                           optionRight={<AddDrillButton />}/>
            </View>
            <StatusBar style="dark" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1
    },
    container: {
        flex: 1,
        paddingHorizontal: 15
    },
    button: {
        padding: 5,
        flexDirection: 'row'
    },
    buttonText: {
        color: Colors.Primary,
        marginLeft: 5,
        fontWeight: '600'
    }
})

export default DrillsScreen;