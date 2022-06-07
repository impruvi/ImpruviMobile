import {ActivityIndicator, View} from "react-native";

const Loader = ({color = 'black'}) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="small" color={color}/>
        </View>
    )
}

export default Loader;