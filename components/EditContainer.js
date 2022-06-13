import {SafeAreaView, View} from 'react-native';

const EditContainer = ({children}) => {
    return (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
            <View style={{paddingHorizontal: 20}}>
                {children}
            </View>
        </SafeAreaView>
    )
}

export default EditContainer;