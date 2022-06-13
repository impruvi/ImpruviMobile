import {StyleSheet, View} from "react-native";

const SpaceBetweenComponent = ({children, style}) => {
    return (
        <View style={{...styles.container, ...style}}>
            {children}
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'stretch'
    },
});

export default SpaceBetweenComponent;