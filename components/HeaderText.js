import {StyleSheet, Text} from "react-native";


const HeaderText = ({text}) => {
    return (
        <Text style={styles.header}>
            {text}
        </Text>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 25,
        fontWeight: '600'
    },
});

export default HeaderText;