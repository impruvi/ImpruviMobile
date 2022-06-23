import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import SpaceBetweenComponent from "../../components/SpaceBetweenComponent";
import Equipment from "../../components/Equipment";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft, faAngleRight, faCheck} from "@fortawesome/pro-light-svg-icons";
import {faCircleSmall} from "@fortawesome/pro-solid-svg-icons";
import {Colors} from "../../constants/colors";
import {getCategoryDisplayValue} from "../../constants/categoryType";
import {getSessionEquipment} from "../../util/equipmentAggregator";
import {useNavigation} from "@react-navigation/native";
import {PlayerScreenNames} from "../ScreenNames";
import HeaderCenter from "../../components/HeaderCenter";
import {doesDrillHaveFeedback, doesDrillHaveSubmission} from "../../util/drillUtil";

const SessionDetailsScreen = ({route}) => {

    const navigation = useNavigation();
    const {session} = route.params;

    const sessionEquipment = getSessionEquipment(session);

    const startSession = (drillId) => {
        navigation.navigate(
            {
                name: PlayerScreenNames.SessionNavigator,
                merge: true,
                params: {
                    screen: PlayerScreenNames.Session,
                    params: {
                        session: session,
                        drillId: drillId
                    }
                }
            });
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <ScrollView style={{flex: 1}}>
                <HeaderCenter title={''}
                              left={<FontAwesomeIcon icon={faAngleLeft} style={{fontSize: 80}} size={30}/>}
                              onLeftPress={navigation.goBack}/>

                <View style={{paddingHorizontal: 20}}>
                    <SpaceBetweenComponent style={{marginBottom: 30}}>
                        <View style={{width: '50%', justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderColor: 'black'}}>
                            <Text style={{fontSize: 25}}>Training</Text>
                            <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                                <Text style={{fontSize: 30, marginTop: 10, marginRight: 3}}>#</Text>
                                <Text style={{fontSize: 60}}>{session.sessionNumber}</Text>
                            </View>
                        </View>
                        <View style={{width: '50%', alignItems: 'center', justifyContent: 'center'}}>
                            <View>
                                <Text style={{marginBottom: 5, fontWeight: '600'}}>What you need:</Text>
                                {sessionEquipment.map(equipment => (
                                    <Equipment equipment={equipment} key={equipment.equipmentType}/>
                                ))}
                            </View>
                        </View>
                    </SpaceBetweenComponent>
                    <View style={{flexDirection: 'row'}}>
                        <View>
                            {session.drills.map((drill, idx) => (
                                <View style={{width: 30, height: 105, justifyContent: 'center', position: 'relative'}} key={drill.drillId}>
                                    <View style={{width: 23, height: 23, marginBottom: 10, borderRadius: 23, backgroundColor: doesDrillHaveSubmission(drill) ? 'black' : Colors.TextLightSecondary, alignItems: 'center', justifyContent: 'center'}}>
                                        <FontAwesomeIcon icon={doesDrillHaveSubmission(drill) ? faCheck : faCircleSmall} style={{color: 'white'}} size={doesDrillHaveSubmission(drill) ? 13 : 6}/>
                                    </View>
                                    {idx < session.drills.length - 1 && (
                                        <View style={{position: 'absolute', width: 1, height: 70, backgroundColor: '#e1e8ea', top: 65, left: 11}}>
                                        </View>
                                    )}
                                </View>
                            ))}
                        </View>
                        <View style={{flex: 1}}>
                            {session.drills.map(drill => (
                                <View key={drill.drillId}>
                                    <TouchableOpacity style={{backgroundColor: doesDrillHaveSubmission(drill) ? '#66CF70' : Colors.Primary, height: 80, justifyContent: 'center', paddingHorizontal: 20, borderRadius: 20, position: 'relative'}}
                                                      onPress={() => startSession(drill.drillId)}>
                                        <SpaceBetweenComponent style={{alignItems: 'center'}}>
                                            <View>
                                                <View style={{flexDirection: 'row'}}>
                                                    <Text style={{fontWeight: '500', marginBottom: 3, color: 'white', fontSize: 16}}>
                                                        {drill.name}
                                                    </Text>
                                                </View>
                                                <Text style={{fontWeight: '300', color: 'white'}}>
                                                    {getCategoryDisplayValue(drill.category)}
                                                </Text>
                                            </View>
                                            <FontAwesomeIcon icon={faAngleRight} style={{fontSize: 80, color: 'white'}} size={30}/>
                                        </SpaceBetweenComponent>
                                    </TouchableOpacity>
                                    <View style={{height: 25, width: '100%', alignItems: 'flex-end', paddingRight: 10}}>
                                        {doesDrillHaveFeedback(drill) && (
                                            <Text style={{color: Colors.Primary, fontSize: 12}}>Feedback available</Text>
                                        )}
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


export default SessionDetailsScreen;