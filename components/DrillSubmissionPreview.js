import {ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {Video} from "expo-av";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowUpFromLine, faRotateRight} from "@fortawesome/pro-light-svg-icons";
import {Colors} from "../constants/colors";

const DrillSubmissionPreview = ({video, cancel, isSubmitting, onSubmit}) => {

    return (
        <View style={{flex: 1, position: 'relative'}}>
            <Video
                style={{flex: 1}}
                source={video}
                resizeMode="cover"
                shouldPlay={true}
                isLooping/>
            {!isSubmitting && (
                <View style={{position: 'absolute', width: '100%', height: '100%'}}>
                    <SafeAreaView style={{flex: 1}}>
                        <View style={{flex: 1, position: 'relative'}}>
                            <TouchableOpacity onPress={cancel} style={{padding: 20, flexDirection: 'row', alignItems: 'center'}}>
                                <FontAwesomeIcon icon={faRotateRight} style={{color: 'white'}} size={25}/>
                                <Text style={{marginLeft: 10, color: 'white', fontSize: 17}}>Retake</Text>
                            </TouchableOpacity>

                            <View style={{position: 'absolute', bottom: 0, left: 0, width: '100%', alignItems: 'center'}}>
                                <TouchableOpacity
                                    style={{backgroundColor: Colors.Primary, paddingVertical: 15, paddingHorizontal: 30, borderRadius: 40, flexDirection: 'row', alignItems: 'center'}}
                                    onPress={onSubmit}>
                                    <Text style={{color: 'white', fontSize: 17, fontWeight: '600'}}>Submit</Text>
                                    <FontAwesomeIcon icon={faArrowUpFromLine} style={{color: 'white', marginLeft: 6}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </SafeAreaView>
                </View>
            )}
            {isSubmitting && (
                <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, .4)', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="small" color="white"/>
                    <Text style={{color: 'white', fontSize: 15, fontWeight: '500', marginTop: 10}}>Submitting...</Text>
                </View>
            )}
        </View>
    )
}

export default DrillSubmissionPreview;