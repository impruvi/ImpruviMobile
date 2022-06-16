import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {Colors} from "../../constants/colors";

const Cell = ({text, isHeader, isCurrent, hasSession, isCompleted, onPress}) => {

    if (isHeader) {
        return (
            <View style={styles.container}>
                <Text style={isCurrent ? {color: Colors.Primary} : {color: Colors.TextSecondary}}>{text}</Text>
            </View>
        );
    }

    if (isCurrent) {
        return (
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <View style={{...styles.circle, backgroundColor: Colors.Primary}}>
                    <Text style={{color: 'white'}}>{text}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    if (hasSession) {
        return (
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <View style={{...styles.circle, backgroundColor: 'rgba(30, 102, 240, .2)'}}>
                    <Text style={{color: 'rgba(30, 102, 240, 1)'}}>{text}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    if (isCompleted) {
        return (
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <View style={{...styles.circle, backgroundColor: 'rgba(24, 180, 102, .2)'}}>
                    <Text style={{color: 'rgba(24, 180, 102, 1)'}}>{text}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.circle}>
                <Text>{text}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '14%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    },
    circle: {
        borderRadius: 30,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Cell;