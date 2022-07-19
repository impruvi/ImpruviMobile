import {ActivityIndicator, Text, TouchableOpacity, View} from "react-native";
import {Video} from "expo-av";
import {Colors} from "../../constants/colors";
import {SafeAreaView} from 'react-native-safe-area-context';

const VideoPreview = ({video, onCancel, onSubmit, isSubmitting}) => {

    return (
        <View style={{flex: 1, backgroundColor: 'black'}}>
            <SafeAreaView edges={['bottom', 'left', 'right', 'top']} style={{flex: 1}}>
                <View style={{flex: 1, position: 'relative'}}>
                    <View style={{flex: 1}}>
                        <Video
                            style={{flex: 1}}
                            source={video}
                            resizeMode="cover"
                            shouldPlay={true}
                            isLooping/>
                    </View>

                    <View style={{width: '100%', alignItems: 'flex-end', padding: 15, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TouchableOpacity
                            style={{width: '49%', backgroundColor: 'white', paddingVertical: 12, borderRadius: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
                            onPress={onCancel}>
                            <Text style={{ fontWeight: '600'}}>Retake</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{width: '49%', backgroundColor: Colors.Primary, paddingVertical: 12, borderRadius: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
                            onPress={onSubmit}>
                            <Text style={{color: 'white', fontWeight: '600'}}>Select</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

            {isSubmitting && (
                <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, .4)', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="small" color="white"/>
                    <Text style={{color: 'white', fontSize: 15, fontWeight: '500', marginTop: 10}}>Submitting...</Text>
                </View>
            )}
        </View>
    )
}

export default VideoPreview;