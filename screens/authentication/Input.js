import {StyleSheet, TextInput} from "react-native";

const Input = ({value, onChangeText, autoCapitalize, secureTextEntry, placeholder}) => {
    return (
        <TextInput style={styles.input}
                   value={value}
                   onChangeText={onChangeText}
                   autoCapitalize={autoCapitalize}
                   autoCorrect={false}
                   secureTextEntry={secureTextEntry}
                   placeholder={placeholder}/>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        fontSize: 14,
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fAfAfA',
        borderWidth: 1,
        borderColor: '#efefef',
        borderRadius: 10,
        marginBottom: 12,
    },
});

export default Input;