import VideoBackIcon from "../../../components/VideoBackIcon";
import {StatusBar} from "expo-status-bar";
import {View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import DemoVideos from "../../../components/drill-videos/demo/DemoVideos";
import {LinearGradient} from "expo-linear-gradient";
import React from "react";

const DrillScreen = ({route}) => {

    const {drill} = route.params;

    const navigation = useNavigation();

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

            <StatusBar style="light" />
        </View>
    )
}

export default DrillScreen;