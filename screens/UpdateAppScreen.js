import {Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from "../constants/colors";
import * as Linking from "expo-linking";


const UpdateAppScreen = ({route}) => {

    const {previewImageFileLocation} = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.content}>
                    <Image source={{uri: previewImageFileLocation}} style={styles.image}/>
                    <Text style={styles.title}>Update required</Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            The installed version of imprüvi is no longer supported.
                            Please install the latest version.
                            We apologize for the inconvenience
                        </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            For more information please visit our website
                        </Text>
                        <TouchableOpacity onPress={() => Linking.openURL('https://impruviapp.com')}>
                            <Text style={styles.link}>impruviapp.com</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('https://apps.apple.com/us/app/impruvi/id1627911060')}>
                        <Text style={styles.buttonText}>Go to the App Store</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollViewContainer: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 15
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 3,
        resizeMode: 'contain',
        marginTop: 50,
        marginBottom: 20
    },
    title: {
        fontSize: 35,
        fontWeight: '700',
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 5
    },
    text: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
        textAlign: 'center'
    },
    link: {
        fontSize: 16,
        textDecorationLine: 'underline',
        color: Colors.Primary,
        fontWeight: '500'
    },
    button: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: Colors.Primary,
        paddingVertical: 15,
        alignItems: 'center',
        marginVertical: 20
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,

    }
})

export default UpdateAppScreen;
