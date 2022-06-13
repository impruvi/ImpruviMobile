import {SafeAreaView, StyleSheet, View} from "react-native";

const PaddedScreen = ({children, style}) => {
    return (
        <SafeAreaView style={{...styles.safeAreaView, ...style}}>
            <View style={styles.container}>
                {children}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#EFF3F4'
    },
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 5
    }
});

export default PaddedScreen;