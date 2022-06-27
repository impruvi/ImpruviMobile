import {ActivityIndicator, Text, View} from "react-native";

const Loader = ({color = 'black', text}) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="small" color={color}/>
            {!!text && (
                <Text style={{fontSize: 15, fontWeight: '500', marginTop: 10}}>
                    {text}
                </Text>
            )}
        </View>
    )
}

export default Loader;