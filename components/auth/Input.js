import {StyleSheet, TextInput, Text, View} from "react-native";
import {Colors} from "../../constants/colors";

const Input = ({value, onChangeText, autoCapitalize, secureTextEntry, placeholder, error, keyboardType='default'}) => {
    const style = !!error ? [styles.input, styles.inputError] : styles.input;

    return (
        <View style={styles.container}>
            <TextInput style={style}
                       value={value}
                       onChangeText={onChangeText}
                       autoCapitalize={autoCapitalize}
                       autoCorrect={false}
                       keyboardType={keyboardType}
                       secureTextEntry={secureTextEntry}
                       placeholder={placeholder}/>
            {!!error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
        width: '100%'
    },
    input: {
        width: '100%',
        fontSize: 14,
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#f6f6f6',
        borderRadius: 10,
    },
    inputError: {
        borderWidth: 1,
        borderColor: Colors.Primary,
    },
    errorContainer: {
        width: '100%'
    },
    errorText: {
        color: Colors.Primary,
        fontSize: 12,
        marginTop: 2
    }
});

export default Input;
