import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View
} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Colors} from "../../constants/colors";
import {PlayerScreenNames} from '../ScreenNames';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import useAuth from "../../hooks/useAuth";
import useError from "../../hooks/useError";
import useHttpClient from "../../hooks/useHttpClient";
import {doesEveryDrillHaveSubmission} from "../../util/sessionUtil";
import {BottomSheetModal, BottomSheetScrollView, useBottomSheetTimingConfigs} from "@gorhom/bottom-sheet";
import SpaceBetweenComponent from "../../components/SpaceBetweenComponent";
import Box from "../../components/Box";
import Equipment from "../../components/Equipment";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheckCircle, faClock, faSoccerBall} from "@fortawesome/pro-light-svg-icons";
import {getCategoryDisplayValue} from "../../constants/categoryType";
import {doesDrillHaveSubmission} from "../../util/drillUtil";
import {getSessionEquipment} from "../../util/equipmentAggregator";
import Animated, {Extrapolate, interpolate, useAnimatedStyle} from "react-native-reanimated";
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';

const Cell = ({text, isHeader, isCurrent, hasSession, isCompleted, hasFeedback, onPress}) => {
    const outerStyle = {width: '14%', alignItems: 'center', justifyContent: 'center', height: 40}

    if (isHeader) {
        return (
            <View style={outerStyle}>
                <Text style={isCurrent ? {color: Colors.Primary} : {color: Colors.TextSecondary}}>{text}</Text>
            </View>
        );
    }

    if (isCurrent) {
        return (
            <TouchableOpacity style={outerStyle} onPress={onPress}>
                <View style={{backgroundColor: Colors.Primary, borderRadius: '100%', width: 30, height: 30, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: 'white'}}>{text}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    if (hasSession) {
        return (
            <TouchableOpacity style={outerStyle} onPress={onPress}>
                <View style={{backgroundColor: 'rgba(30, 102, 240, .2)', borderRadius: '100%', width: 30, height: 30, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: 'rgba(30, 102, 240, 1)'}}>{text}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    if (isCompleted) {
        return (
            <TouchableOpacity style={outerStyle} onPress={onPress}>
                <View style={{backgroundColor: 'rgba(24, 180, 102, .2)', borderRadius: '100%', width: 30, height: 30, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: 'rgba(24, 180, 102, 1)'}}>{text}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    if (hasFeedback) {
        return (
            <TouchableOpacity style={outerStyle} onPress={onPress}>
                <View style={{backgroundColor: 'rgba(244, 194, 27, .2)', borderRadius: '100%', width: 30, height: 30, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: 'rgba(244, 194, 27, 1)'}}>{text}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={outerStyle}>
            <View>
                <Text>{text}</Text>
            </View>
        </View>
    )
}

const TrainingScreen = () => {

    const [nextSession, setNextSession] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {player} = useAuth();
    const {setError} = useError();

    const sheetRef = useRef();
    const scrollRef = useRef();
    // const snapPoints = ['65%'];
    const snapPoints = useMemo(() => ['75%'], []);

    const animationConfigs = useBottomSheetTimingConfigs({
        duration: 250,
    });
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        // setIsOpen(true);
        // sheetRef.current?.present();
        navigation.navigate(PlayerScreenNames.SessionDetails, {
            nextSession: nextSession
        });
    }

    const getNextSession = async () => {
        setIsLoading(true);
        setHasError(false);
        await getNextSessionLazy();
        setIsLoading(false);
    }

    const getNextSessionLazy = async () => {
        try {
            const allSessions = await httpClient.getPlayerSessions(player.playerId);
            const incompleteSessions = allSessions.filter(session => !doesEveryDrillHaveSubmission(session));
            if (incompleteSessions.length > 0) {
                setNextSession(incompleteSessions[0]);
            } else {
                setNextSession(null);
            }
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
            setHasError(true);
        }
    }

    useEffect(() => {
        getNextSession();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getNextSessionLazy();
        }, [httpClient, navigation])
    );

    if (!nextSession) {
        return <View></View>
    }

    const sessionEquipment = getSessionEquipment(nextSession);
    const totalTime = nextSession.drills.reduce((count, drill) => count + drill.estimatedDurationMinutes, 0);

    return (
        <View style={{flex: 1}}>
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={{flex: 1, paddingHorizontal: 12}} showsVerticalScrollIndicator={false}>
                    <View style={{marginBottom: 15, marginTop: 5}}>
                        <Text style={{fontSize: 24}}>Hey, Beckett</Text>
                    </View>

                    <View style={{marginBottom: 5}}>
                        <Text style={{color: Colors.TextSecondary}}>YOUR COACH</Text>
                    </View>
                    <View style={{backgroundColor: 'white', borderRadius: 20, padding: 15, marginBottom: 20}}>
                        <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                            <View>
                                <Image source={{uri: 'https://cdn.tatlerasia.com/tatlerasia/i/2021/08/10122920-gettyimages-1176667280_cover_2000x1335.jpg'}}
                                       style={{height: 60, width: 60, borderRadius: 50}}/>
                                <Text style={{fontWeight: '600', marginTop: 3}}>Henry Grein</Text>
                                <Text style={{color: Colors.TextSecondary}}>Center midfielder</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity style={{paddingVertical: 8, paddingHorizontal: 20, backgroundColor: Colors.Primary, borderRadius: 20, marginRight: 10}}>
                                    <Text style={{color:'white', fontWeight: '600'}}>Request 1:1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{paddingVertical: 8, paddingHorizontal: 20, borderWidth: 1, borderRadius: 20, borderColor: Colors.Primary}}
                                                  onPress={() => navigation.navigate(PlayerScreenNames.CoachBio)}>
                                    <Text style={{color: Colors.Primary, fontWeight: '600'}}>Info</Text>
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

                    <View style={{marginBottom: 5}}>
                        <Text style={{color: Colors.TextSecondary}}>YOUR TRAINING</Text>
                    </View>
                    <View style={{backgroundColor: 'white', padding: 15, borderRadius: 20, marginBottom: 40}}>
                        <View style={{backgroundColor: 'white', borderRadius: 20}}>
                            <View style={{flexDirection: 'row'}}>
                                <Cell text={'SUN'} isHeader={true} isCurrent={true}/>
                                <Cell text={'MON'} isHeader={true}/>
                                <Cell text={'TUE'} isHeader={true}/>
                                <Cell text={'WED'} isHeader={true}/>
                                <Cell text={'THU'} isHeader={true}/>
                                <Cell text={'FRI'} isHeader={true}/>
                                <Cell text={'SAT'} isHeader={true}/>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Cell text={'1'} isCompleted={true} onPress={openModal}/>
                                <Cell text={'2'} />
                                <Cell text={'3'} />
                                <Cell text={'4'} />
                                <Cell text={'5'} isCompleted={true} onPress={openModal}/>
                                <Cell text={'6'} />
                                <Cell text={'7'} />
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Cell text={'8'} isCompleted={true} onPress={openModal}/>
                                <Cell text={'9'} />
                                <Cell text={'10'} />
                                <Cell text={'11'} />
                                <Cell text={'12'} isCompleted={true} onPress={openModal}/>
                                <Cell text={'13'} />
                                <Cell text={'14'} />
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Cell text={'15'} isCurrent={true} onPress={openModal}/>
                                <Cell text={'16'} />
                                <Cell text={'17'} />
                                <Cell text={'18'} />
                                <Cell text={'19'} hasSession={true} onPress={openModal}/>
                                <Cell text={'20'} />
                                <Cell text={'21'} />
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Cell text={'22'} hasSession={true} onPress={openModal}/>
                                <Cell text={'23'} />
                                <Cell text={'24'} />
                                <Cell text={'25'} />
                                <Cell text={'26'} hasSession={true} onPress={openModal}/>
                                <Cell text={'27'} />
                                <Cell text={'28'} />
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Cell text={'29'} />
                                <Cell text={'30'} />
                                <Cell text={'31'} />
                            </View>
                        </View>
                        <View style={{flexDirection: 'row',  flexWrap: 'wrap', flex: 1, paddingHorizontal: 10}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 3, marginVertical: 5}}>
                                <View style={{backgroundColor: Colors.Primary, borderRadius: '100%', width: 10, height: 10}} />
                                <Text style={{marginHorizontal: 3, fontSize: 12}}>Today</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 3, marginVertical: 5}}>
                                <View style={{backgroundColor: 'rgba(24, 180, 102, .2)', borderRadius: '100%', width: 10, height: 10}} />
                                <Text style={{marginHorizontal: 3, fontSize: 12}}>Completed</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 3, marginVertical: 5}}>
                                <View style={{backgroundColor: 'rgba(30, 102, 240, .2)', borderRadius: '100%', width: 10, height: 10}} />
                                <Text style={{marginHorizontal: 3, fontSize: 12}}>Upcoming</Text>
                            </View>
                        </View>
                        <View style={{marginHorizontal: 5, padding: 20, marginVertical: 10, backgroundColor: Colors.Border, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text style={{marginRight: 10, fontWeight: '600'}}>You have a session today!</Text>
                            <TouchableOpacity style={{paddingVertical: 12, paddingHorizontal: 30, backgroundColor: Colors.Primary, borderRadius: 20}}
                                              onPress={() => navigation.navigate(
                                                  {
                                                      name: PlayerScreenNames.SessionNavigator,
                                                      merge: true,
                                                      params: {
                                                          screen: PlayerScreenNames.Session,
                                                          params: {
                                                              session: nextSession
                                                          }
                                                      }
                                                  })}>
                                <Text style={{color:'white', fontWeight: '600'}}>Start</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>


            {/*<BottomSheetModal*/}
            {/*    ref={sheetRef}*/}
            {/*    index={0}*/}
            {/*    snapPoints={snapPoints}*/}
            {/*    animationConfigs={animationConfigs}*/}
            {/*    onDismiss={() => setIsOpen(false)}*/}
            {/*    onChange={index => setIsOpen(index === 0)}*/}
            {/*    enablePanDownToClose={true}*/}
            {/*    enableOverDrag={false}*/}
            {/*    simultaneousHandlers={scrollRef}*/}
            {/*    style={{shadowColor: 'black', shadowOffset: { width: 0, height: 1 }, shadowOpacity: .15, shadowRadius: 5}}>*/}
            {/*    <BottomSheetScrollView*/}
            {/*        focusHook={useFocusEffect}*/}
            {/*        simultaneousHandlers={sheetRef}*/}
            {/*        bounces>*/}
            {/*        <View style={{*/}
            {/*            flex: 1,*/}
            {/*            padding: 20,*/}
            {/*        }}>*/}
            {/*            <Text style={styles.header}>Sunday, June 14</Text>*/}
            {/*            <SpaceBetweenComponent>*/}
            {/*                <View style={{width: '49%'}}>*/}
            {/*                    <Box style={{padding: 15}}>*/}
            {/*                        <Text style={styles.boxHeaderTextLarge}>What you need</Text>*/}
            {/*                        <View>*/}
            {/*                            {sessionEquipment.map(equipment => (*/}
            {/*                                <Equipment equipment={equipment} key={equipment.equipmentType}/>*/}
            {/*                            ))}*/}
            {/*                        </View>*/}
            {/*                    </Box>*/}
            {/*                </View>*/}
            {/*                <View style={{width: '49%'}}>*/}
            {/*                    <Box style={{padding: 15}}>*/}
            {/*                        <View style={styles.boxHeader}>*/}
            {/*                            <FontAwesomeIcon icon={faClock} style={styles.boxHeaderIcon}/>*/}
            {/*                            <Text style={styles.boxHeaderTextSmall}>Time to complete</Text>*/}
            {/*                        </View>*/}
            {/*                        <View style={{flexDirection: 'row', alignItems: 'center'}}>*/}
            {/*                            <Text style={{fontSize: 20}}>~{totalTime}</Text><Text style={{color: Colors.TextSecondary, marginLeft: 5}}>minutes</Text>*/}
            {/*                        </View>*/}
            {/*                    </Box>*/}
            {/*                    <Box style={{padding: 15}}>*/}
            {/*                        <View style={styles.boxHeader}>*/}
            {/*                            <FontAwesomeIcon icon={faSoccerBall} style={styles.boxHeaderIcon}/>*/}
            {/*                            <Text style={styles.boxHeaderTextSmall}>Number of drills</Text>*/}
            {/*                        </View>*/}
            {/*                        <View style={{flexDirection: 'row', alignItems: 'center'}}>*/}
            {/*                            <Text style={{fontSize: 20}}>{nextSession.drills.length}</Text><Text style={{color: Colors.TextSecondary, marginLeft: 5}}>drills</Text>*/}
            {/*                        </View>*/}
            {/*                    </Box>*/}
            {/*                </View>*/}
            {/*            </SpaceBetweenComponent>*/}
            {/*            <Text style={styles.header}>Drills</Text>*/}
            {/*            {nextSession.drills.map(drill => (*/}
            {/*                <Box style={{padding: 15}}>*/}
            {/*                    <Text style={{fontWeight: '500', marginBottom: 3}}>*/}
            {/*                        {drill.name}*/}
            {/*                    </Text>*/}
            {/*                    <Text style={{fontWeight: '500', color: Colors.TextSecondary}}>*/}
            {/*                        {getCategoryDisplayValue(drill.category)}*/}
            {/*                    </Text>*/}
            {/*                    {doesDrillHaveSubmission(drill) && (*/}
            {/*                        <View style={{marginTop: 10, flexDirection: 'row'}}>*/}
            {/*                            <FontAwesomeIcon icon={faCheckCircle}  style={{marginRight: 6, color: 'green'}}/>*/}
            {/*                            <Text style={{color: 'green'}}>Your video is submitted</Text>*/}
            {/*                        </View>*/}
            {/*                    )}*/}
            {/*                    <Text style={{position: 'absolute', top: 15, right: 15, color: Colors.TextSecondary}}>*/}
            {/*                        {drill.estimatedDurationMinutes} minutes*/}
            {/*                    </Text>*/}
            {/*                </Box>*/}
            {/*            ))}*/}
            {/*            {nextSession.drills.map(drill => (*/}
            {/*                <Box style={{padding: 15}}>*/}
            {/*                    <Text style={{fontWeight: '500', marginBottom: 3}}>*/}
            {/*                        {drill.name}*/}
            {/*                    </Text>*/}
            {/*                    <Text style={{fontWeight: '500', color: Colors.TextSecondary}}>*/}
            {/*                        {getCategoryDisplayValue(drill.category)}*/}
            {/*                    </Text>*/}
            {/*                    {doesDrillHaveSubmission(drill) && (*/}
            {/*                        <View style={{marginTop: 10, flexDirection: 'row'}}>*/}
            {/*                            <FontAwesomeIcon icon={faCheckCircle}  style={{marginRight: 6, color: 'green'}}/>*/}
            {/*                            <Text style={{color: 'green'}}>Your video is submitted</Text>*/}
            {/*                        </View>*/}
            {/*                    )}*/}
            {/*                    <Text style={{position: 'absolute', top: 15, right: 15, color: Colors.TextSecondary}}>*/}
            {/*                        {drill.estimatedDurationMinutes} minutes*/}
            {/*                    </Text>*/}
            {/*                </Box>*/}
            {/*            ))}*/}
            {/*            {nextSession.drills.map(drill => (*/}
            {/*                <Box style={{padding: 15}}>*/}
            {/*                    <Text style={{fontWeight: '500', marginBottom: 3}}>*/}
            {/*                        {drill.name}*/}
            {/*                    </Text>*/}
            {/*                    <Text style={{fontWeight: '500', color: Colors.TextSecondary}}>*/}
            {/*                        {getCategoryDisplayValue(drill.category)}*/}
            {/*                    </Text>*/}
            {/*                    {doesDrillHaveSubmission(drill) && (*/}
            {/*                        <View style={{marginTop: 10, flexDirection: 'row'}}>*/}
            {/*                            <FontAwesomeIcon icon={faCheckCircle}  style={{marginRight: 6, color: 'green'}}/>*/}
            {/*                            <Text style={{color: 'green'}}>Your video is submitted</Text>*/}
            {/*                        </View>*/}
            {/*                    )}*/}
            {/*                    <Text style={{position: 'absolute', top: 15, right: 15, color: Colors.TextSecondary}}>*/}
            {/*                        {drill.estimatedDurationMinutes} minutes*/}
            {/*                    </Text>*/}
            {/*                </Box>*/}
            {/*            ))}*/}

            {/*            <TouchableOpacity style={styles.startButton}>*/}
            {/*                <Text style={styles.startButtonText}>Start training</Text>*/}
            {/*            </TouchableOpacity>*/}
            {/*        </View>*/}
            {/*    </BottomSheetScrollView>*/}
            {/*</BottomSheetModal>*/}

            <StatusBar style="dark" />
        </View>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#EFF3F4'
    },
    container: {
        flex: 1,
        paddingHorizontal: 15
    },
    header: {
        fontSize: 20,
        marginBottom: 10
    },
    boxHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    boxHeaderIcon: {
        marginRight: 7
    },
    boxHeaderTextSmall: {
        fontWeight: '500'
    },
    boxHeaderTextLarge: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 5
    },
    startButton: {
        width: '100%',
        backgroundColor: Colors.Primary,
        color: 'white',
        borderRadius: 30,
        paddingVertical: 13,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    startButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14
    }
});

export default TrainingScreen;
