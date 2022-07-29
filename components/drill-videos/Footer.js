import {StyleSheet, View} from 'react-native';

const Footer = ({children}) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 20,
        bottom: 0,
        left: 0,
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        paddingTop: 15,
        paddingBottom: 35,
        paddingHorizontal: 10
    },
});

export default Footer;