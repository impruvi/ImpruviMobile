import {StyleSheet, Text, TouchableOpacity, View, SafeAreaView} from "react-native";
import {Colors} from "../constants/colors";


const getContainerStyle = (hasBorder) => {
    return hasBorder ? {...styles.headerWithBorder, ...styles.header} : styles.header;
}

const HeaderCenter = (
    {
        left,
        right,
        title,
        titleComponent,
        onRightPress,
        onLeftPress,
        hasBorder,
        containerStyle= {marginBottom: 10}
    }) => {

    return (
        <SafeAreaView style={{...getContainerStyle(hasBorder), ...containerStyle}}>
            <View style={styles.left}>
                <TouchableOpacity onPress={onLeftPress} style={styles.button}>
                    {left}
                </TouchableOpacity>
            </View>
            {!!titleComponent && titleComponent}
            {!titleComponent && <Text style={styles.title}>{title}</Text>}
            <View style={styles.right}>
                <TouchableOpacity onPress={onRightPress} style={styles.button}>
                    {right}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerWithBorder: {
        borderBottomWidth: 1,
        borderColor: Colors.Border
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
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
