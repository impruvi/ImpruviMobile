import {StyleSheet, Text, View} from "react-native";
import {Colors} from "../../../../constants/colors";

const Legend = () => {
    return (
        <View style={styles.legendContainer}>
            <View style={styles.legendKeyContainer}>
                <View style={{...styles.legendKeyColorIndicator, backgroundColor: 'black'}} />
                <Text style={styles.legendKeyText}>Completed session</Text>
            </View>
            <View style={styles.legendKeyContainer}>
                <View style={{...styles.legendKeyColorIndicator, backgroundColor: Colors.Primary, width: 6, height: 6}} />
                <Text style={styles.legendKeyText}>Incomplete session</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    legendContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
    },
    legendKeyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 3,
    },
    legendKeyColorIndicator: {
        borderRadius: 5,
        width: 5,
        height: 5
    },
    legendKeyText: {
        marginHorizontal: 3,
        fontSize: 12
    }
});

export default Legend;