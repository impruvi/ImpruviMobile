import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "../constants/colors";

const HeaderCenter = ({left, right, title, onRightPress, onLeftPress, hasBorder}) => {
    return (
        <View style={hasBorder ? styles.headerWithBorder : styles.header}>
            <View style={styles.left}>
                <TouchableOpacity onPress={onLeftPress} style={styles.button}>
                    {left}
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.right}>
                <TouchableOpacity onPress={onRightPress} style={styles.button}>
                    {right}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    headerWithBorder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderColor: Colors.Border
    },
    title: {
        fontSize: 18,
        fontWeight: '600'
    },
    left: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});

export default HeaderCenter;