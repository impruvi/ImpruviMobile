import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {CoachScreenNames} from "../../ScreenNames";
import DrillList from "../../../components/drill-list/DrillList";
import {StatusBar} from "expo-status-bar";
import {useNavigation} from "@react-navigation/native";
import useHttpClient from "../../../hooks/useHttpClient";
import useAuth from "../../../hooks/useAuth";
import useError from "../../../hooks/useError";
import {useCallback, useEffect, useMemo, useState} from 'react';
import HeaderCenter from "../../../components/HeaderCenter";

const SelectDrillScreen = ({route}) => {

    const {onSelectDrill} = route.params;

    const [drills, setDrills] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {coachId} = useAuth();
    const {setError} = useError();

    const getDrillsForCoach = async () => {
        setIsLoading(true);
        setHasError(false);
        try {
            const result = await httpClient.getDrillsForCoach(coachId);
            setDrills(result.drills);
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
            setHasError(true);
        }
        setIsLoading(false);
    }

    const onPressDrill = useCallback((drill) => {
        navigation.navigate(CoachScreenNames.EditDrillSelectionDetails, {
            drill: drill,
            onSelectDrill: (drill) => {
                onSelectDrill(drill);
                navigation.goBack();
            }
        });
    }, []);

    useEffect(() => {
        getDrillsForCoach();
    }, []);

    const headerLeft = useMemo(() => <Text>Cancel</Text>, []);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <HeaderCenter title={'Select a drill'}
                          left={headerLeft}
                          onLeftPress={navigation.goBack}/>

            <View style={styles.content}>
                <DrillList drills={drills}
                           onPressDrill={onPressDrill}
                           reload={getDrillsForCoach}
                           hasError={hasError}
                           isLoading={isLoading}/>
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
        flex: 1,
        paddingHorizontal: 15
    }
})

export default SelectDrillScreen;