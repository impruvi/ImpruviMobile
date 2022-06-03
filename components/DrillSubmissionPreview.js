import {Text, View, TouchableOpacity, SafeAreaView} from "react-native";
import {Video} from "expo-av";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faRotateRight, faArrowUpFromLine} from "@fortawesome/pro-light-svg-icons";
import {Colors} from "../constants/colors";
import useHttpClient from "../hooks/useHttpClient";
import useAuth from "../hooks/useAuth";
import {useState} from "react";

const DrillSubmissionPreview = ({video, cancel, sessionNumber, drillId}) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const {httpClient} = useHttpClient();
    const {userId} = useAuth();

    const onSubmit = async () => {
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsSubmitting(false);

        await httpClient.submitDrillVideo(userId, sessionNumber, drillId, video);
    }

    return (
        <View style={{flex: 1, position: 'relative'}}>
            <Video
                style={{flex: 1}}
                source={video}
                resizeMode="cover"
                shouldPlay={true}
                isLooping/>
            {isSubmitting && (
                <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, .4)', justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Submitting...</Text>
                </View>
            )}
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
        </View>
    )
}

export default DrillSubmissionPreview;