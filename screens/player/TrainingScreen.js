import {
    FlatList,
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
import {faBolt} from "@fortawesome/pro-solid-svg-icons";

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
    const {width} = useWindowDimensions();

    const [currentIndex, setCurrentIndex] = useState(0);
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;


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

    const goToSession = () => {
        navigation.navigate(
            {
                name: PlayerScreenNames.SessionNavigator,
                merge: true,
                params: {
                    screen: PlayerScreenNames.Session,
                    params: {
                        session: nextSession
                    }
                }
        });
    }

    return (
        <View style={{flex: 1}}>
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                    <View style={{marginBottom: 15, marginTop: 5, paddingHorizontal: 15}}>
                        <Text style={{fontSize: 24}}>Hey, Beckett</Text>
                    </View>

                    <View style={{marginBottom: 5, paddingHorizontal: 15}}>
                        <Text style={{color: Colors.TextSecondary}}>YOUR COACH</Text>
                    </View>
                    <FlatList data={['1', '2', '3']}
                              horizontal
                              pagingEnabled
                              showsHorizontalScrollIndicator={false}
                              initialScrollIndex={currentIndex}
                              onScrollToIndexFailed={info => {
                                  const wait = new Promise(resolve => setTimeout(resolve, 500));
                                  wait.then(() => {
                                      slidesRef.current?.scrollToIndex({ index: info.index, animated: true });
                                  });
                              }}
                              onViewableItemsChanged={viewableItemsChanged}
                              viewabilityConfig={viewConfig}
                              scrollEventThrottle={32}
                              ref={slidesRef}
                              renderItem={({item}) => (
                                  <View style={{width: width, height: 130, paddingHorizontal: 15, marginBottom: 10}}>
                                      {item === '1' && (
                                          <View style={{width: '100%', height: 130, flexDirection:'row', justifyContent: 'space-between', backgroundColor: Colors.Primary, paddingHorizontal: 15, borderRadius: 20}}>
                                              <View style={{padding: 15}}>
                                                  <View style={{}}>
                                                      <Text style={{color: 'white', fontSize: 20}}>HENRY</Text>
                                                      <Text style={{color: 'white', fontSize: 15}}>GREIN</Text>
                                                      <Text style={{color: 'white', fontSize: 11}}>Your coach</Text>

                                                      <TouchableOpacity style={{marginTop: 20}} onPress={() => navigation.navigate(PlayerScreenNames.CoachBio)}>
                                                          <Text style={{color: 'white'}}>Learn more</Text>
                                                      </TouchableOpacity>
                                                  </View>
                                              </View>

                                              <View style={{width: '50%', alignItems: 'center'}}>
                                                  <Image source={{uri: 'https://www.nicepng.com/png/full/367-3675047_new-fc-barcelona-2017-2018-la-liga-football.png'}}
                                                         style={{height: 120, width: 120, marginTop: 10}}/>
                                              </View>
                                          </View>
                                      )}
                                      {item === '2' && (
                                          <View style={{width: '100%', height: 130, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.Primary, paddingHorizontal: 15, borderRadius: 20}}>
                                              <Text style={{color: 'white'}}>Don't know how to submit videos to your coach?</Text>
                                              <Text style={{color: 'white', marginVertical: 7}}>Don't have enough equipment?</Text>

                                              <TouchableOpacity style={{backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, marginTop: 15}}>
                                                  <Text style={{color: Colors.Primary, fontWeight: '600'}}>Learn more</Text>
                                              </TouchableOpacity>
                                          </View>
                                      )}
                                      {item === '3' && (
                                          <View style={{width: '100%', height: 130, flexDirection:'row', justifyContent: 'space-between', backgroundColor: Colors.Primary, paddingHorizontal: 15, paddingTop: 15, borderRadius: 20, marginBottom: 10}}>
                                              <View style={{width: '50%', alignItems: 'center'}}>
                                                  <FontAwesomeIcon icon={faBolt} style={{color: 'white', marginBottom: 10}}/>
                                                  <Text style={{fontSize: 40, fontWeight: '600', color: 'white'}}>17</Text>
                                                  <Text style={{color: 'white'}}>Drills completed</Text>
                                              </View>

                                              <View style={{width: '50%', alignItems: 'center'}}>
                                                  <Text style={{color: 'white', marginBottom: 10, fontSize: 17, fontWeight: '600'}}>ü</Text>
                                                  <Text style={{fontSize: 40, fontWeight: '600', color: 'white'}}>4</Text>
                                                  <Text style={{color: 'white'}}>Sessions completed</Text>
                                              </View>
                                          </View>
                                      )}
                                  </View>
                              )} />

                    <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', marginBottom: 10}}>
                        <View style={{width: 7, height: 7, borderRadius: 10, backgroundColor: currentIndex === 0 ? Colors.Primary : 'white', marginHorizontal: 3}}/>
                        <View style={{width: 7, height: 7, borderRadius: 10, backgroundColor: currentIndex === 1 ? Colors.Primary : 'white', marginHorizontal: 3}}/>
                        <View style={{width: 7, height: 7, borderRadius: 10, backgroundColor: currentIndex === 2 ? Colors.Primary : 'white', marginHorizontal: 3}}/>
                    </View>

                    {/*<View style={{backgroundColor: 'white', borderRadius: 20, padding: 15, marginBottom: 20}}>*/}
                    {/*    <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>*/}
                    {/*        <View>*/}
                    {/*            <Image source={{uri: 'https://cdn.tatlerasia.com/tatlerasia/i/2021/08/10122920-gettyimages-1176667280_cover_2000x1335.jpg'}}*/}
                    {/*                   style={{height: 60, width: 60, borderRadius: 50}}/>*/}
                    {/*            <Text style={{fontWeight: '600', marginTop: 3}}>Henry Grein</Text>*/}
                    {/*            <Text style={{color: Colors.TextSecondary}}>Center midfielder</Text>*/}
                    {/*        </View>*/}
                    {/*        <View style={{flexDirection: 'row'}}>*/}
                    {/*            <TouchableOpacity style={{paddingVertical: 8, paddingHorizontal: 20, backgroundColor: Colors.Primary, borderRadius: 20, marginRight: 10}}>*/}
                    {/*                <Text style={{color:'white', fontWeight: '600'}}>Contact</Text>*/}
                    {/*            </TouchableOpacity>*/}
                    {/*            <TouchableOpacity style={{paddingVertical: 8, paddingHorizontal: 20, borderWidth: 1, borderRadius: 20, borderColor: Colors.Primary}}*/}
                    {/*                              onPress={() => navigation.navigate(PlayerScreenNames.CoachBio)}>*/}
                    {/*                <Text style={{color: Colors.Primary, fontWeight: '600'}}>Info</Text>*/}
                    {/*            </TouchableOpacity>*/}
                    {/*        </View>*/}
                    {/*    </View>*/}
                    {/*    <View style={{marginTop: 10}}>*/}
                    {/*        <Text>*/}
                    {/*            This month I've added drills that focus mostly on first touch*/}
                    {/*            and shooting to develop that killer instinct in front*/}
                    {/*            of goal*/}
                    {/*        </Text>*/}
                    {/*    </View>*/}
                    {/*</View>*/}

                    <View style={{paddingHorizontal: 15}}>
                        <View style={{marginBottom: 5}}>
                            <Text style={{color: Colors.TextSecondary}}>YOUR TRAINING</Text>
                        </View>
                        <View style={{backgroundColor: 'white', padding: 15, borderRadius: 20, marginBottom: 12, position: 'relative'}}>
                            <Text style={{fontSize: 18, fontWeight: '500', marginBottom: 10}}>Training 1:</Text>
                            <View style={{flexDirection: 'row', marginBottom: 5}}>
                                <FontAwesomeIcon icon={faCheckCircle}  style={{marginRight: 6, color: 'green'}}/>
                                <Text style={{color: 'green'}}>Session complete</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <FontAwesomeIcon icon={faCheckCircle}  style={{marginRight: 6, color: 'green'}}/>
                                <Text style={{color: 'green'}}>Feedback available</Text>
                            </View>
                            <View style={{width: '100%', alignItems: 'flex-end'}}>
                                <TouchableOpacity style={{backgroundColor: Colors.Primary, paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20}} onPress={goToSession}>
                                    <Text style={{color: 'white'}}>View training</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{position: 'absolute', top: 12, right: 30}}>
                                <Text style={{color: Colors.Primary, fontSize: 20, fontWeight: '600'}}>ü</Text>
                            </View>
                        </View>
                        <View style={{backgroundColor: 'white', padding: 15, borderRadius: 20, marginBottom: 12, position: 'relative'}}>
                            <Text style={{fontSize: 18, fontWeight: '500', marginBottom: 10}}>Training 2:</Text>
                            <View style={{flexDirection: 'row', marginBottom: 5}}>
                                <FontAwesomeIcon icon={faCheckCircle}  style={{marginRight: 6, color: 'green'}}/>
                                <Text style={{color: 'green'}}>Session complete</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <FontAwesomeIcon icon={faCheckCircle} style={{color: '#156EBE', marginRight: 5}} size={14}/>
                                <Text style={{color: '#156EBE'}}>Awaiting feedback</Text>
                            </View>
                            <View style={{width: '100%', alignItems: 'flex-end'}}>
                                <TouchableOpacity style={{backgroundColor: Colors.Primary, paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20}} onPress={goToSession}>
                                    <Text style={{color: 'white'}}>View training</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{position: 'absolute', top: 12, right: 30}}>
                                <Text style={{color: Colors.Primary, fontSize: 20, fontWeight: '600'}}>ü</Text>
                            </View>
                        </View>
                        <View style={{backgroundColor: 'white', padding: 15, borderRadius: 20, marginBottom: 12, position: 'relative'}}>
                            <Text style={{fontSize: 18, fontWeight: '500', marginBottom: 10}}>Training 3:</Text>
                            <Text>Session incomplete</Text>
                            <View style={{width: '100%', alignItems: 'flex-end'}}>
                                <TouchableOpacity style={{backgroundColor: Colors.Primary, paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20}} onPress={goToSession}>
                                    <Text style={{color: 'white'}}>View training</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{position: 'absolute', top: 12, right: 30}}>
                                <Text style={{color: Colors.Primary, fontSize: 20, fontWeight: '600'}}>ü</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>

            <StatusBar style="dark" />
        </View>
    )
};

export default TrainingScreen;
