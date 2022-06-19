import {StyleSheet, useWindowDimensions, View} from "react-native";
import {Colors} from "../../../constants/colors";

const Container = ({children, style}) => {
    const {width, height} = useWindowDimensions();

    return (
        <View style={[styles.container, {height: height, width: width}, style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        backgroundColor: Colors.Primary
    }
});

export default Container;