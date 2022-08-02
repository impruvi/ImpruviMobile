import {Image, StyleSheet} from "react-native";
import LogoTextImage from '../../assets/impruvi-logo-text.png';

const LogoText = () => {
    return (
        <Image source={LogoTextImage} style={styles.image}/>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 160,
        height: 50,
        resizeMode: 'contain'
    }
});

export default LogoText;
