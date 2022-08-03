import {ActivityIndicator, StyleSheet, Text, View} from "react-native";

const Loader = ({color = 'black', text}) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="small" color={color}/>
            {!!text && (
                <Text style={{...styles.text, color: color}}>
                    {text}
                </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 15,
        fontWeight: '500',
        marginTop: 10
    }
});

export default Loader;