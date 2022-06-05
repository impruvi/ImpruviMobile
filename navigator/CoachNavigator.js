import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {SafeAreaView, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {ScreenNames} from "../screens/ScreenNames";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faHouse, faListUl, faUser} from "@fortawesome/pro-light-svg-icons";
import {Colors} from "../constants/colors";
import React from "react";
import CoachHomeScreen from "../screens/CoachHomeScreen";
import CoachSessionsScreen from "../screens/CoachSessionsScreen";
import CoachPlayersScreen from "../screens/CoachPlayersScreen";
import CoachSessionFeedbackScreen from "../screens/CoachSessionFeedbackScreen";
import PlayerSessionScreen from "../screens/PlayerSessionScreen";
import PlayerDrillSubmissionScreen from "../screens/PlayerDrillSubmissionScreen";
import PlayerSessionCompleteScreen from "../screens/PlayerSessionCompleteScreen";
import CoachDrillFeedbackScreen from "../screens/CoachDrillFeedbackScreen";

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
                            {label === ScreenNames.CoachHome &&
                                <FontAwesomeIcon icon={ faHouse } color={isFocused ? Colors.Primary : 'black'}/>
                            }

                            {label === ScreenNames.CoachSessions &&
                                <FontAwesomeIcon icon={faListUl} color={isFocused ? Colors.Primary : 'black'}/>
                            }

                            {label === ScreenNames.CoachPlayers &&
                                <FontAwesomeIcon icon={faUser} color={isFocused ? Colors.Primary : 'black'}/>
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
        <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName={ScreenNames.CoachHome} tabBar={props => <TabBar {...props}/>}>
            <Tab.Screen name={ScreenNames.CoachHome} component={CoachHomeScreen}/>
            <Tab.Screen name={ScreenNames.CoachSessions} component={CoachSessionsScreen} />
            <Tab.Screen name={ScreenNames.CoachPlayers} component={CoachPlayersScreen}/>
        </Tab.Navigator>
    );
};

const FeedbackNavigator = () => {
    const {width, height} = useWindowDimensions();

    return (
        <Stack.Navigator screenOptions={{headerShown: false, presentation: 'modal'}}>
            <Stack.Screen name={ScreenNames.CoachSessionFeedback} component={CoachSessionFeedbackScreen} options={{gestureResponseDistance: width}}/>
            <Stack.Screen name={ScreenNames.CoachDrillFeedback} component={CoachDrillFeedbackScreen} options={{gestureResponseDistance: height}}/>
        </Stack.Navigator>
    );
};

const CoachNavigator = () => {
    const {width} = useWindowDimensions();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={ScreenNames.CoachTabNavigator} component={TabNavigator}/>
            <Stack.Screen name={ScreenNames.CoachFeedbackNavigator} component={FeedbackNavigator} options={{gestureResponseDistance: width}}/>
        </Stack.Navigator>
    );
};

export default CoachNavigator;
