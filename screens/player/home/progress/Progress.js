import {Image, Text, View} from "react-native";
import Lightning from "../../../../assets/icons/LightningDark.png";
import {doesDrillHaveSubmission} from "../../../../util/drillUtil";
import {doesEveryDrillHaveSubmission} from "../../../../util/sessionUtil";

const Progress = ({sessions}) => {


    const numberOfDrillsCompleted = sessions.flatMap(session => session.drills.filter(doesDrillHaveSubmission)).length;
    const numberOfSessionsCompleted = sessions.filter(doesEveryDrillHaveSubmission).length;
    const totalNumberOfDrills = sessions.flatMap(session => session.drills).length
    const totalNumberOfSessions = sessions.length;


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
                <Text style={{fontWeight: '600', fontSize: 18, marginBottom: 20}}>Progress this month</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                    <View style={{alignItems: 'center', justifyContent: 'flex-end', width: '45%'}}>
                        <Text style={{fontSize: 14, fontWeight: '600', textAlign: 'center'}}>Completed trainings</Text>
                        <Text style={{fontSize: 35, marginTop: 8, fontWeight: '600'}}>{numberOfSessionsCompleted}
                            <Text style={{color: '#888', fontSize: 18}}>/ {totalNumberOfSessions}</Text>
                        </Text>
                    </View>
                    <Image source={Lightning}  style={{width: 20, height: 20, resizeMode: 'contain', marginBottom: 5}}/>
                    <View style={{alignItems: 'center', justifyContent: 'flex-end', width: '45%'}}>
                        <Text style={{fontSize: 14, fontWeight: '600', textAlign: 'center'}}>Completed drills</Text>
                        <Text style={{fontSize: 35, marginTop: 8, fontWeight: '600'}}>{numberOfDrillsCompleted}
                            <Text style={{color: '#888', fontSize: 18}}>/ {totalNumberOfDrills}</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default Progress;