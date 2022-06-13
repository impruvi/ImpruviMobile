import {useNavigation} from "@react-navigation/native";
import EditContainer from "../../../components/EditContainer";
import EditHeader from "../../../components/EditHeader";
import {StyleSheet, TextInput, Text, View} from "react-native";
import {Colors} from "../../../constants/colors";
import {useState} from "react";

const EditEstimatedDurationScreen = ({route}) => {

    const [estimatedDurationMinutes, setEstimatedDurationMinutes] = useState(route.params.estimatedDuration);

    const navigation = useNavigation();

    const onSave = () => {
        route.params.setEstimatedDurationMinutes(estimatedDurationMinutes);
        navigation.goBack();
    }

    return (
        <EditContainer>
            <EditHeader onCancel={() => navigation.goBack()}
                        onSave={onSave}
                        title={'Estimated duration'}/>
            <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center'}}>
                <TextInput style={styles.input}
                           value={!!estimatedDurationMinutes ? `${estimatedDurationMinutes}` : ''}
                           onChangeText={text => setEstimatedDurationMinutes(!!text ? parseInt(text) : undefined)}
                           keyboardType="numeric"/>
                <Text>minutes</Text>
            </View>
        </EditContainer>
    )
}

const styles = StyleSheet.create({
    input: {
        marginTop: 10,
        fontSize: 16,
        paddingTop: 15,
        width: 50,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderColor: Colors.Border,
        marginRight: 10
    }
});

export default EditEstimatedDurationScreen;