import {Image, Text, View} from "react-native";
import Lightning from "../../../../assets/icons/LightningDark.png";
import {doesDrillHaveSubmission} from "../../../../util/drillUtil";
import {doesEveryDrillHaveSubmission} from "../../../../util/sessionUtil";

const Progress = ({sessions}) => {

    const numberOfDrillsCompleted = sessions.flatMap(session => session.drills.filter(doesDrillHaveSubmission)).length;
    const numberOfSessionsCompleted = sessions.filter(doesEveryDrillHaveSubmission).length;

    return (
        <View style={{width: '100%', paddingHorizontal: 15, marginTop: 15}}>
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
                <Text style={{fontWeight: '600', fontSize: 18, marginBottom: 15}}>Progress</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{alignItems: 'center', width: '40%'}}>
                        <Text style={{fontSize: 12, fontWeight: '600'}}>Drills completed</Text>
                        <Text style={{fontSize: 35, marginTop: 5, fontWeight: '600'}}>{numberOfDrillsCompleted}</Text>
                    </View>
                    <Image source={Lightning}  style={{width: 20, height: 30, resizeMode: 'contain'}}/>
                    <View style={{alignItems: 'center', width: '40%'}}>
                        <Text style={{fontSize: 12, fontWeight: '600'}}>Trainings completed</Text>
                        <Text style={{fontSize: 35, marginTop: 5}}>{numberOfSessionsCompleted}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default Progress;