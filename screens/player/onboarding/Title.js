import {StyleSheet, Text} from "react-native";

const Title = ({text ,style}) => {
    return (
        <Text style={{...styles.title, ...style}}>{text}</Text>
    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: '800',
        fontSize: 28,
        color: 'white',
        textAlign: 'center',
    },
});

export default Title;