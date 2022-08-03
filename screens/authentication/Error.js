import {StyleSheet, Text} from "react-native";
import {Colors} from "../../constants/colors";

const Error = ({errorText}) => {
    return (
        <Text style={styles.error}>{errorText}</Text>
    )
}

const styles = StyleSheet.create({
    error: {
        color: Colors.Primary,
        textAlign: 'center',
        marginTop: 10,
        fontWeight: '500'
    }
});

export default Error;