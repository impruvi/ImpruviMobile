import {useWindowDimensions, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {doesDrillHaveSubmission} from "../util/drillUtil";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheck, faCheckCircle} from "@fortawesome/pro-solid-svg-icons";

const DrillIndicator = ({drill, currentDrillId}) => {
    if (!doesDrillHaveSubmission(drill)) {
        if (drill.drill.drillId === currentDrillId) {
            return (
                <View style={{width: 11, height: 11, borderRadius: 11, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white'}}>
                    <View style={{width:5, height: 5, backgroundColor: 'white', borderRadius: 7}} />
                </View>
            );
        } else {
            return (
                <View style={{width: 5, height: 5, backgroundColor: 'rgba(255, 255, 255, .8)', borderRadius: 7}} />
            );
        }
    } else {
        if (drill.drill.drillId === currentDrillId) {
            return (
                <FontAwesomeIcon icon={faCheckCircle} size={15} style={{color: 'white'}}/>
            );
        } else {
            return (
                <FontAwesomeIcon icon={faCheck} size={12} style={{color: 'rgba(255, 255, 255, .8)'}}/>
            );
        }
    }
}

const SessionProgress = ({session, currentDrillId}) => {
    const {height} = useWindowDimensions();

    return (
        <View style={{position: 'absolute', height: height, width: 60, top: 0, left: 0}}>
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,.4)']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={{flex: 1}}>
                <View style={{justifyContent: 'center', flex: 1, boxSizing: 'border-box', width: 40, alignItems: 'center'}}>
                    {session.drills.map(drill => (
                        <View key={drill.drill.drillId}  style={{justifyContent: 'center', boxSizing: 'border-box', alignItems: 'center'}}>
                            <DrillIndicator drill={drill} currentDrillId={currentDrillId}/>
                            {drill.drill.drillId !== session.drills[session.drills.length - 1].drill.drillId && (
                                <View style={{paddingVertical: 8}}>
                                    <View style={{height: 100, width: 1, backgroundColor: 'rgba(255, 255, 255, .5)'}}/>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </LinearGradient>
        </View>
    );
}

export default SessionProgress;
