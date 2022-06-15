import {StyleSheet, View} from 'react-native';

const Box = ({children, style}) => {
    return (
        <View style={{...styles.container, ...style}}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: '#f6F9FA',
        marginBottom: 7,
        borderRadius: 15,
        position: 'relative'
    }
});

export default Box;