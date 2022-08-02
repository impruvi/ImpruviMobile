import {ActivityIndicator, Image, View, StyleSheet} from "react-native";

const OutstandingUpload = ({imageUri}) => {

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image source={{uri: imageUri}} style={styles.image}/>
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator size="small" color="white"/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 110,
        left: 10
    },
    content: {
        height: 100,
        width: 60,
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative'
    },
    image: {
        width: 60,
        height: 100
    },
    activityIndicatorContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, .3)',
        width: 60,
        height: 100
    }
});

export default OutstandingUpload;