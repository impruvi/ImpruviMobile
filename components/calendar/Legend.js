import {StyleSheet, Text, View} from "react-native";
import {Colors} from "../../constants/colors";

const Legend = () => {
    return (
        <View style={styles.legendContainer}>
            {/*<View style={styles.legendKeyContainer}>*/}
            {/*    <View style={{...styles.legendKeyColorIndicator, borderColor: 'black', borderWidth: 1}} />*/}
            {/*    <Text style={styles.legendKeyText}>Today</Text>*/}
            {/*</View>*/}
            <View style={styles.legendKeyContainer}>
                <View style={{...styles.legendKeyColorIndicator, backgroundColor: 'rgba(0, 0, 0, .1)'}} />
                <Text style={styles.legendKeyText}>Incomplete</Text>
            </View>
            <View style={styles.legendKeyContainer}>
                <View style={{...styles.legendKeyColorIndicator, backgroundColor: 'rgba(24, 180, 102, .2)'}} />
                <Text style={styles.legendKeyText}>Completed</Text>
            </View>
            <View style={styles.legendKeyContainer}>
                <View style={{...styles.legendKeyColorIndicator, backgroundColor: Colors.Primary, width: 6, height: 6}} />
                <Text style={styles.legendKeyText}>Feedback available</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    legendContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        paddingHorizontal: 10
    },
    legendKeyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 3,
        marginVertical: 5
    },
    legendKeyColorIndicator: {
        borderRadius: 10,
        width: 10,
        height: 10
    },
    legendKeyText: {
        marginHorizontal: 3,
        fontSize: 12
    }
});

export default Legend;