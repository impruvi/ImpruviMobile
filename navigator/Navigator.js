import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, SafeAreaView, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import AuthenticationScreen from "../screens/AuthenticationScreen";
import Training from "../screens/Training";
import TrainingScreen from "../screens/TrainingScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faHouse, faPlay, faChartLine} from '@fortawesome/pro-light-svg-icons';

import { ScreenNames } from '../screens/ScreenNames';
import useAuth from "../hooks/useAuth";
import TrackProgressScreen from "../screens/TrackProgressScreen";
import {Colors} from "../constants/colors";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const MyTabBar = ({ state, descriptors, navigation }) => {
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
                            {label === ScreenNames.Training &&
                            <FontAwesomeIcon icon={ faHouse } color={isFocused ? Colors.Primary : 'black'}/>
                            }

                            {label === ScreenNames.Feedback &&
                            <FontAwesomeIcon icon={faPlay} color={isFocused ? Colors.Primary : 'black'}/>
                            }

                            {label === ScreenNames.Progress &&
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
        <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName={ScreenNames.Training} tabBar={props => <MyTabBar {...props}/>}>
            <Tab.Screen name={ScreenNames.Training} component={Training}/>
            <Tab.Screen name={ScreenNames.Feedback} component={FeedbackScreen} />
            <Tab.Screen name={ScreenNames.Progress} component={TrackProgressScreen}/>
        </Tab.Navigator>
    );
}

const StackNavigator = () => {
    const {width} = useWindowDimensions();
    const {userId} = useAuth();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={'Test'}>
            {!!userId ?
                <>
                    <Stack.Group>
                        <Stack.Screen name={ScreenNames.TabNavigator} component={TabNavigator}/>
                        <Stack.Screen name={ScreenNames.Training} component={TrainingScreen} options={{gestureResponseDistance: width}}/>
                    </Stack.Group>
                </>
                :
                <Stack.Screen name={ScreenNames.Authentication} component={AuthenticationScreen}/>
            }
        </Stack.Navigator>
    );
}

export default StackNavigator;
