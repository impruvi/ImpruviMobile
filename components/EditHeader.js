import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from "../constants/colors";

const EditHeader = ({onCancel, onSave, title}) => {
    return (
        <View style={styles.container}>
            <View style={styles.cancelButtonContainer}>
                <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.saveButtonContainer}>
                <TouchableOpacity onPress={onSave} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save</Text>
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
    },
    cancelButtonContainer: {
        position: 'absolute',
        left: 0
    },
    cancelButton: {
        paddingVertical: 10,
        paddingRight: 10
    },
    cancelButtonText: {
        color: Colors.TextSecondary
    },
    saveButtonContainer: {
        position: 'absolute',
        right: 0
    },
    saveButton: {
        paddingVertical: 10,
        paddingLeft: 10
    },
    saveButtonText: {
        color: Colors.Primary,
        fontWeight: '500'
    }
});

export default EditHeader;