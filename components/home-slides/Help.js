import Container from "./Container";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "../../constants/colors";
import {useNavigation} from "@react-navigation/native";
import {PlayerScreenNames} from "../../screens/ScreenNames";

const Stats = () => {

    const navigation = useNavigation();

    return (
        <Container>
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <Text style={{...styles.text, fontWeight: '500'}}>Got questions?</Text>
                <TouchableOpacity style={{backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, marginTop: 15}}
                                  onPress={() => navigation.navigate(PlayerScreenNames.FAQ)}>
                    <Text style={{color: Colors.Primary, fontWeight: '600'}}>Check out our FAQ</Text>
                </TouchableOpacity>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'white'
    }
});

export default Stats;