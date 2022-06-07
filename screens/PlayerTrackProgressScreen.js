import {SafeAreaView, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";

const PlayerTrackProgressScreen = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>👀 Coming soon</Text>
            </View>

            <StatusBar style="dark" />
        </SafeAreaView>
    )
}

export default PlayerTrackProgressScreen;
