import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useWindowDimensions} from "react-native";
import {PlayerScreenNames} from "../../screens/ScreenNames";
import HomeScreen from "../../screens/player/home/HomeScreen";
import SettingsScreen from "../../screens/player/settings/SettingsScreen";
import DrillsScreen from "../../screens/player/drills/DrillsScreen";
import DrillSubmissionScreen from "../../screens/player/DrillSubmissionScreen";
import SessionCompleteScreen from "../../screens/player/SessionCompleteScreen";
import SessionScreen from "../../screens/player/SessionScreen";
import React from "react";
import CoachScreen from "../../screens/player/coach/CoachScreen";
import EditEmailScreen from "../../screens/player/settings/edit/EditEmailScreen";
import EditNameScreen from "../../screens/player/settings/edit/EditNameScreen";
import TabBar from './TabBar';
import InboxScreen from "../../screens/player/inbox/InboxScreen";
import DrillScreen from "../../screens/player/drills/DrillScreen";
import EditHeadshotScreen from "../../screens/player/settings/edit/EditHeadshotScreen";
import TrainingPlanCompleteScreen from "../../screens/player/TrainingPlanCompleteScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const TabNavigator = () =>  {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName={PlayerScreenNames.Home} tabBar={props => <TabBar {...props}/>}>
            <Tab.Screen name={PlayerScreenNames.Home} component={HomeScreen}/>
            <Tab.Screen name={PlayerScreenNames.Drills} component={DrillsScreen}/>
            <Tab.Screen name={PlayerScreenNames.Inbox} component={InboxScreen} />
        </Tab.Navigator>
    );
};

const SettingsNavigator = () => {
    const {width} = useWindowDimensions();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={PlayerScreenNames.Settings} >
            <Stack.Screen name={PlayerScreenNames.Settings} component={SettingsScreen} options={{gestureResponseDistance: width}}/>
            <Stack.Screen name={PlayerScreenNames.EditName} component={EditNameScreen} options={{gestureResponseDistance: width}}/>
            <Stack.Screen name={PlayerScreenNames.EditEmail} component={EditEmailScreen} options={{gestureResponseDistance: width}}/>
            <Stack.Screen name={PlayerScreenNames.EditHeadshot} component={EditHeadshotScreen} options={{gestureResponseDistance: width}}/>
        </Stack.Navigator>
    )
}

const PlayerNavigator = () => {
    const {width, height} = useWindowDimensions();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={PlayerScreenNames.TabNavigator} component={TabNavigator}/>
            <Stack.Screen name={PlayerScreenNames.DrillSubmission}
                          component={DrillSubmissionScreen}
                          options={{
                              gestureResponseDistance: height,
                              gestureDirection: 'vertical',
                              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
                          }}/>
            <Stack.Screen name={PlayerScreenNames.SessionComplete}
                          component={SessionCompleteScreen}
                          options={{
                              gestureDirection: 'vertical',
                              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
                          }}/>
            <Stack.Screen name={PlayerScreenNames.TrainingPlanComplete}
                          component={TrainingPlanCompleteScreen}
                          options={{
                              gestureDirection: 'vertical',
                              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
                          }}/>

            <Stack.Screen name={PlayerScreenNames.Session} component={SessionScreen} options={{gestureResponseDistance: width}}/>
            <Stack.Screen name={PlayerScreenNames.Drill} component={DrillScreen} options={{gestureResponseDistance: width}}/>
            <Stack.Screen name={PlayerScreenNames.SettingsNavigator} component={SettingsNavigator} options={{gestureResponseDistance: width}} />
            <Stack.Screen name={PlayerScreenNames.Coach} component={CoachScreen} options={{gestureResponseDistance: width}}/>
        </Stack.Navigator>
    );
};

export default PlayerNavigator;
