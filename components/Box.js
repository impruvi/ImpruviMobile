import {View} from 'react-native';

const Box = ({children}) => {
    return (
        <View style={{
            marginTop: 10,
            width: '100%',
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: .15,
            shadowRadius: 4,
            padding: 20,
            borderRadius: 15,
            backgroundColor: 'white'
        }}>
            {children}
        </View>
    )
}

export default Box;