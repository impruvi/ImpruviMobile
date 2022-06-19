import {StyleSheet, View} from 'react-native';

const Footer = ({children}) => {
    return (
        <View style={styles.container}>
            <View style={styles.containerInner}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        left: 0
    },
    containerInner: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 40
    }
});

export default Footer;