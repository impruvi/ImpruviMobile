import VideoBackIcon from "../../../components/VideoBackIcon";
import {StatusBar} from "expo-status-bar";
import {Alert, Image, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import DemoVideos from "../../../components/drill-videos/demo/DemoVideos";
import {LinearGradient} from "expo-linear-gradient";
import React, {useState} from "react";
import ThreeDotsWhiteIcon from '../../../assets/icons/ThreeDotsWhite.png';
import {CoachScreenNames} from "../../ScreenNames";
import useHttpClient from "../../../hooks/useHttpClient";
import useError from "../../../hooks/useError";
import Loader from "../../../components/Loader";


const DrillScreen = ({route}) => {

    const {drill} = route.params;

    const [isDeleting, setIsDeleting] = useState(false);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {setError} = useError();

    const deleteDrill = async () => {
        setIsDeleting(true);
        try {
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
        <View style={{flex: 1, backgroundColor: 'black'}}>
            <DemoVideos drill={drill}
                        isVisible={true}
                        isLast={true}/>
            <LinearGradient
                colors={['rgba(0, 0, 0, .6)', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{width: '100%', height: 200, position: 'absolute', top: 0, left: 0}} />


            <VideoBackIcon onPress={() => navigation.goBack()} />

            <View style={{position: 'absolute', right: 0}}>
                <SafeAreaView>
                    <TouchableOpacity onPress={onOptionsPress} style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginRight: 15}}>
                        <Image source={ThreeDotsWhiteIcon} style={{width: 26, height: 26, resizeMode: 'contain'}}/>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>

            {isDeleting && (
                <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, .6)'}}>
                    <Loader text={'Deleting...'} color={'white'}/>
                </View>
            )}

            <StatusBar style="light" />
        </View>
    )
}

export default DrillScreen;