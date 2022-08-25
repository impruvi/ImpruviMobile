import {Image, StyleSheet} from "react-native";
import LogoTextImage from '../../assets/impruvi-logo-text.png';
import LogoTextImageLight from '../../assets/impruvi-logo-text-light.png';

const LogoText = ({size = 50, theme="dark"}) => {
    const style = {
        width: size * (657 / 190),
        height: size,
        resizeMode: 'contain',
    }

    const source = theme === 'dark'
        ? LogoTextImage
        : LogoTextImageLight;

    return (
        <Image source={source} style={style}/>
    )
}
export default LogoText;
