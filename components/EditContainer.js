import {ActivityIndicator, Dimensions, SafeAreaView, View, StyleSheet} from 'react-native';

const EditContainer = ({children, isSubmitting}) => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.content}>
                    {children}
                </View>
            </SafeAreaView>

            {isSubmitting && (
                <View style={styles.submittingContainer}>
                    <ActivityIndicator size="small" color="black"/>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    safeAreaView: {
        flex: 1
    },
    content: {
        paddingHorizontal: 20
    },
    submittingContainer: {
        position: 'absolute',
        width: '100%',
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, .6)'
    }
})

export default EditContainer;