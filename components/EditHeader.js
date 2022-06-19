import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from "../constants/colors";

const EditHeader = ({onCancel, onSave, title}) => {
    return (
        <View style={styles.container}>
            <View style={{position: 'absolute', left: 0}}>
                <TouchableOpacity onPress={onCancel} style={{paddingVertical: 10, paddingRight: 10}}>
                    <Text style={{color: Colors.TextSecondary}}>Cancel</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>{title}</Text>
            <View style={{position: 'absolute', right: 0}}>
                <TouchableOpacity onPress={onSave} style={{paddingVertical: 10, paddingLeft: 10}}>
                    <Text style={{color: Colors.Primary, fontWeight: '500'}}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: Colors.Border
    },
    title: {
        fontSize: 15,
        fontWeight: '600'
    }
});

export default EditHeader;