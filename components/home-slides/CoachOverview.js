import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../constants/colors';

const CoachOverview = ({navigateToCoach}) => {
    return (
        <View style={{backgroundColor: 'white', borderRadius: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                    <Image source={{uri: 'https://cdn.tatlerasia.com/tatlerasia/i/2021/08/10122920-gettyimages-1176667280_cover_2000x1335.jpg'}}
                           style={{height: 60, width: 60, borderRadius: 50}}/>
                    <View style={{marginLeft: 10}}>
                        <Text style={{color: Colors.TextSecondary}}>YOUR COACH</Text>
                        <Text style={{fontWeight: '600', marginTop: 3}}>Henry Grein</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{paddingVertical: 8, paddingHorizontal: 15, borderWidth: 1, borderRadius: 20, borderColor: Colors.Primary}}
                                      onPress={navigateToCoach}>
                        <Text style={{color: Colors.Primary, fontWeight: '600', fontSize: 13}}>Learn more</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{marginTop: 10}}>
                <Text>
                    This month I've added drills that focus mostly on first touch
                    and shooting to develop that killer instinct in front
                    of goal
                </Text>
            </View>
        </View>
    )
}

export default CoachOverview;