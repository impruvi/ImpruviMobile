import {View, StyleSheet} from 'react-native';

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
        backgroundColor: 'white',
        marginBottom: 7,
        borderRadius: 5,
        position: 'relative'
    }
});

export default Box;