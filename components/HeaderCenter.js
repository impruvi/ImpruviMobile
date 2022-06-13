import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

const HeaderCenter = ({left, right, title, onRightPress, onLeftPress}) => {
    return (
        <View style={styles.header}>
            <View style={styles.left}>
                <TouchableOpacity onPress={onLeftPress} style={{paddingVertical: 10, paddingHorizontal: 15}}>
                    {left}
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.right}>
                <TouchableOpacity onPress={onRightPress} style={{paddingVertical: 10, paddingHorizontal: 15}}>
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
        paddingBottom: 10
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
    right: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});

export default HeaderCenter;