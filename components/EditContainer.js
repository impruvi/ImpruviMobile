import {ActivityIndicator, SafeAreaView, useWindowDimensions, View} from 'react-native';

const EditContainer = ({children, isSubmitting}) => {
    const {height} = useWindowDimensions();

    return (
        <View style={{flex: 1, position: 'relative', backgroundColor: 'white'}}>
            <SafeAreaView style={{flex: 1}}>
                <View style={{paddingHorizontal: 20}}>
                    {children}
                </View>
            </SafeAreaView>

            {isSubmitting && (
                <View style={{position: 'absolute', width: '100%', height: height, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, .6)'}}>
                    <ActivityIndicator size="small" color="black"/>
                </View>
            )}
        </View>
    )
}

export default EditContainer;