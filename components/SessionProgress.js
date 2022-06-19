import {Text, useWindowDimensions, View} from "react-native";

const DrillProgressIndicator = ({drill, currentDrillId, idx}) => {
    if (drill.drillId === currentDrillId) {
        return (
            <View style={{width: 16, height: 16, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
                <Text style={{fontWeight: '600'}}>{idx + 1}</Text>
            </View>
        );
    } else {
        return (
            <View>
                <Text style={{color: 'white', fontWeight: '600',
                    textShadowColor: 'rgba(0, 0, 0, .4)',
                    textShadowOffset: {width: 0, height: 0},
                    textShadowRadius: 2
                }}>{idx + 1}</Text>
            </View>
        );
    }
}

const SessionProgress = ({session, currentDrillId}) => {
    const {height} = useWindowDimensions();

    return (
        <View style={{position: 'absolute', height: height, width: 30, top: 0, left: 0}}>
            <View style={{justifyContent: 'center', flex: 1, boxSizing: 'border-box', width: 40, alignItems: 'center'}}>
                {session.drills.map((drill, idx) => (
                    <View key={drill.drillId}  style={{justifyContent: 'center', boxSizing: 'border-box', alignItems: 'center'}}>
                        <DrillProgressIndicator drill={drill} currentDrillId={currentDrillId} idx={idx}/>
                        {drill.drillId !== session.drills[session.drills.length - 1].drillId && (
                            <View style={{paddingVertical: 8}}>
                                <View style={{height: 100, width: 1, backgroundColor: 'rgba(255, 255, 255, .5)'}}/>
                            </View>
                        )}
                    </View>
                ))}
            </View>
        </View>
    );
}

export default SessionProgress;
