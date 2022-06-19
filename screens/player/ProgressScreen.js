import {SafeAreaView, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import HeaderCenter from "../../components/HeaderCenter";

const ProgressScreen = () => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <HeaderCenter title={'Progress'}/>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>👀 Coming soon</Text>
            </View>

            <StatusBar style="dark" />
        </SafeAreaView>
    )
}

export default ProgressScreen;
