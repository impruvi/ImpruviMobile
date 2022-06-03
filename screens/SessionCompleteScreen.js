import {SafeAreaView, Text, TouchableOpacity} from "react-native";

const SessionCompleteScreen = ({onClose}) => {
    return (
        <SafeAreaView>
            <Text>Session complete!</Text>
            <TouchableOpacity onPress={onClose}>
                <Text>Back to training</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default SessionCompleteScreen;