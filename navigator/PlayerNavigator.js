import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {SafeAreaView, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {ScreenNames} from "../screens/ScreenNames";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChartLine, faHouse, faPlay} from "@fortawesome/pro-light-svg-icons";
import {Colors} from "../constants/colors";
import PlayerTrainingScreen from "../screens/PlayerTrainingScreen";
import PlayerFeedbackScreen from "../screens/PlayerFeedbackScreen";
import PlayerTrackProgressScreen from "../screens/PlayerTrackProgressScreen";
import PlayerSessionScreen from "../screens/PlayerSessionScreen";
import PlayerDrillSubmissionScreen from "../screens/PlayerDrillSubmissionScreen";
import PlayerSessionCompleteScreen from "../screens/PlayerSessionCompleteScreen";
import PlayerSessionFeedbackScreen from "../screens/PlayerSessionFeedbackScreen";
import React from "react";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const TabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={{paddingTop: 7}}>
            <SafeAreaView style={{flexDirection: 'row', justifyContent: 'center'}}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            // The `merge: true` option makes sure that the params inside the tab screen are preserved
                            navigation.navigate({ name: route.name, merge: true, params: {} });
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={{ width: 80, height: 50, marginHorizontal: 20, justifyContent: 'center', alignItems: 'center' }} key={label}>
                            {label === ScreenNames.PlayerTraining &&
                                <FontAwesomeIcon icon={ faHouse } color={isFocused ? Colors.Primary : 'black'}/>
                            }

                            {label === ScreenNames.PlayerFeedback &&
                                <FontAwesomeIcon icon={faPlay} color={isFocused ? Colors.Primary : 'black'}/>
                            }

                            {label === ScreenNames.PlayerProgress &&
                                <FontAwesomeIcon icon={faChartLine} color={isFocused ? Colors.Primary : 'black'}/>
                            }

                            <Text style={{ color: isFocused ? Colors.Primary : 'black', marginTop: 7, fontSize: 12, fontWeight: '600', }}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </SafeAreaView>
        </View>
    );
};

const TabNavigator = () =>  {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName={ScreenNames.PlayerTraining} tabBar={props => <TabBar {...props}/>}>
            <Tab.Screen name={ScreenNames.PlayerTraining} component={PlayerTrainingScreen}/>
            <Tab.Screen name={ScreenNames.PlayerFeedback} component={PlayerFeedbackScreen} />
            <Tab.Screen name={ScreenNames.PlayerProgress} component={PlayerTrackProgressScreen}/>
        </Tab.Navigator>
    );
};

const SessionNavigator = () => {
    const {width, height} = useWindowDimensions();

    return (
        <Stack.Navigator screenOptions={{headerShown: false, presentation: 'modal'}}>
            <Stack.Screen name={ScreenNames.PlayerSession} component={PlayerSessionScreen} options={{gestureResponseDistance: width}}/>
            <Stack.Screen name={ScreenNames.PlayerDrillSubmission} component={PlayerDrillSubmissionScreen} options={{gestureResponseDistance: height}}/>
            <Stack.Screen name={ScreenNames.PlayerSessionComplete} component={PlayerSessionCompleteScreen} options={{gestureResponseDistance: 0}} />
        </Stack.Navigator>
    );
};

const PlayerNavigator = () => {
    const {width} = useWindowDimensions();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={ScreenNames.PlayerTabNavigator} component={TabNavigator}/>
            <Stack.Screen name={ScreenNames.PlayerSessionNavigator} component={SessionNavigator} options={{gestureResponseDistance: width}}/>
            <Stack.Screen name={ScreenNames.PlayerSessionFeedback} component={PlayerSessionFeedbackScreen} options={{gestureResponseDistance: width}}/>
        </Stack.Navigator>
    );
};

export default PlayerNavigator;
