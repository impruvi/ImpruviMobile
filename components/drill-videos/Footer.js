import {StyleSheet, View} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";

const gradientColors = ['rgba(0, 0, 0, .7)', 'transparent'];
const gradientStart = { x: 0, y: 1 };
const gradientEnd = { x: 0, y: 0 };

const Footer = ({children}) => {
    return (
        <>
            <LinearGradient
                colors={gradientColors}
                start={gradientStart}
                end={gradientEnd}
                style={styles.gradient} />
            <View style={styles.container}>
                {children}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 1000,
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
    gradient: {
        width: '100%',
        height: 600,
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 10
    }
});

export default Footer;