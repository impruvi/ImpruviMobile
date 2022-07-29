import {Image, SafeAreaView, Text} from 'react-native';
import CoachMosaic from '../../assets/images/CoachesMosaic.png';
import {StatusBar} from "expo-status-bar";

const NoCoachScreen = () => {
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <Image source={CoachMosaic} style={{width: '100%', height: 240, resizeMode: 'cover', marginTop: -50}}/>
            <Text style={{width: '100%', textAlign: 'center', fontSize: 35, fontWeight: '700', marginTop: 20, marginBottom: 10}}>You do not have a coach</Text>
            <Text style={{width: '100%', textAlign: 'center', color: '#666'}}>You do not currently have a coach</Text>
            <Text style={{width: '100%', textAlign: 'center', color: '#666'}}>You cannot select a coach through the app.</Text>
            <Text style={{width: '100%', textAlign: 'center', color: '#666'}}> We know, it’s not ideal.</Text>

            <StatusBar style="light" />
        </SafeAreaView>
    )
}

export default NoCoachScreen;