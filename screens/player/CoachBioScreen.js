import {View, Text, Image, useWindowDimensions, TouchableOpacity} from 'react-native';
import BottomSheet, {BottomSheetScrollView, BottomSheetView} from "@gorhom/bottom-sheet";
import {useMemo, useRef, useCallback} from "react";
import {Colors} from "../../constants/colors";
import Messi from '../../assets/Messi.jpeg';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import { faPlay} from "@fortawesome/pro-solid-svg-icons";
import { faAngleLeft} from "@fortawesome/pro-light-svg-icons";

const CoachBioScreen = () => {
    const {height, width} = useWindowDimensions();
    const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['50%'], []);

    return (
        <View style={{flex: 1, position: 'relative'}}>
            <Image source={Messi}
                   style={{height: height * .6, width: '100%', resizeMode: 'cover'}}/>
            <View style={{position: 'absolute', top: 50, left: 30, backgroundColor: 'rgba(0, 0, 0, .2)', borderRadius: 50, height: 50, width: 50, alignItems: 'center', justifyContent: 'center'}}>
                <FontAwesomeIcon  icon={faAngleLeft} size={30} style={{color: 'white'}}/>
            </View>

            <View style={{position: 'absolute', top: 250, left: 160, backgroundColor: 'rgba(0, 0, 0, .2)', borderRadius: 80, height: 80, width: 80, alignItems: 'center', justifyContent: 'center'}}>
                <FontAwesomeIcon  icon={faPlay} size={40} style={{color: 'white'}}/>
            </View>
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                handleComponent={null}
                style={{shadowColor: 'black', shadowOffset: { width: 0, height: 1 }, shadowOpacity: .15, shadowRadius: 5}}>
                <BottomSheetScrollView style={{flex: 1, paddingHorizontal: 15, paddingVertical: 20}}>
                    <Text style={{fontSize: 16, color: Colors.TextSecondary, marginBottom: 10}}>YOUR COACH</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 10}}>
                        <View>
                            <Text style={{fontSize: 20, fontWeight: '600'}}>Henry Grein</Text>
                            <Text style={{color: Colors.TextSecondary}}>Center midfielder</Text>
                        </View>
                        <TouchableOpacity style={{paddingVertical: 8, paddingHorizontal: 20, backgroundColor: Colors.Primary, borderRadius: 20, marginRight: 10}}>
                            <Text style={{color:'white', fontWeight: '600'}}>Request 1:1</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginVertical: 3}}>
                        <Text style={{fontWeight: '500', color: Colors.TextSecondary}}>Current club</Text>
                        <Text>Austin FC</Text>
                    </View>
                    <View style={{marginVertical: 3}}>
                        <Text style={{fontWeight: '500', color: Colors.TextSecondary}}>School</Text>
                        <Text>University of Washington</Text>
                    </View>
                    <View style={{marginVertical: 3}}>
                        <Text style={{fontWeight: '500', color: Colors.TextSecondary}}>Youth club</Text>
                        <Text>Eastside</Text>
                    </View>
                    <View style={{marginVertical: 3, marginBottom: 100}}>
                        <Text style={{fontWeight: '500', color: Colors.TextSecondary}}>Philosophy</Text>
                        <Text>
                            I aim to coach athletes the basics in particular skills and then
                            create more awareness how to apply it in competitive situations
                            to see how they use it in their sport. Often during training a Coach
                            can stop the game or drill and explain what they would like to see
                            more of. In a competitive game or match this luxury is not available
                            and the Coach can only have limited influence on the athletes and on
                            the game from the sidelines. Therefore, to me it is important that
                            athletes can assess, evaluate and correct themselves in competitive
                            situations to produce the best possible performance.
                        </Text>
                    </View>

                </BottomSheetScrollView>
            </BottomSheet>
        </View>
    );
}

export default CoachBioScreen;