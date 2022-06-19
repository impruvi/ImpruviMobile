import {StyleSheet, Text} from "react-native";

const Description = ({text, style}) => {
    return (
        <Text style={{...styles.description, ...style}}>{text}</Text>
    );
}

const styles = StyleSheet.create({
    description: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20
    }
});

export default Description;