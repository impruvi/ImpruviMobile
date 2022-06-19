import {Dimensions, StyleSheet, View} from "react-native";
import {Colors} from "../../constants/colors";

const width = Dimensions.get('window').width;

const Container = ({children}) => {

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: 130,
        paddingHorizontal: 15,
        marginBottom: 10
    },
    innerContainer: {
        width: '100%',
        height: 130,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.Primary,
        paddingHorizontal: 15,
        borderRadius: 20
    },
});

export default Container;