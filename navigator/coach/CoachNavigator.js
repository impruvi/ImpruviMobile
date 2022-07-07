import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useWindowDimensions} from "react-native";
import {CoachScreenNames} from "../../screens/ScreenNames";
import React from "react";
import HomeScreen from "../../screens/coach/HomeScreen";
import PlayersScreen from "../../screens/coach/PlayersScreen";
import SessionScreen from "../../screens/coach/SessionScreen";
import DrillFeedbackScreen from "../../screens/coach/DrillFeedbackScreen";
import DrillsScreen from "../../screens/coach/DrillsScreen";
import CreateOrEditDrillScreen from "../../screens/coach/CreateOrEditDrillScreen";
import EditDrillDemoScreen from "../../screens/coach/update-drill/EditDrillDemoScreen";
import EditDrillNameScreen from "../../screens/coach/update-drill/EditDrillNameScreen";
import EditDrillDescriptionScreen from "../../screens/coach/update-drill/EditDrillDescriptionScreen";
import EditDrillCategoryScreen from "../../screens/coach/update-drill/EditDrillCategoryScreen";
import EditDrillEquipmentScreen from "../../screens/coach/update-drill/EditDrillEquipmentScreen";
import PlayerScreen from "../../screens/coach/PlayerScreen";
import CreateOrEditSessionScreen from "../../screens/coach/CreateOrEditSessionScreen";
import SelectDrillScreen from "../../screens/coach/update-session/SelectDrillScreen";
import EditDrillSelectionDetailsScreen from "../../screens/coach/update-session/EditDrillSelectionDetailsScreen";
import PreviewSessionScreen from "../../screens/coach/PreviewSessionScreen";
import ProfileScreen from "../../screens/coach/ProfileScreen";
import EditAboutScreen from "../../screens/coach/update-profile/EditAboutScreen";
import EditEmailScreen from "../../screens/coach/update-profile/EditEmailScreen";
import EditNameScreen from "../../screens/coach/update-profile/EditNameScreen";
import EditPositionScreen from "../../screens/coach/update-profile/EditPositionScreen";
import EditSchoolScreen from "../../screens/coach/update-profile/EditSchoolScreen";
import EditYouthClubScreen from "../../screens/coach/update-profile/EditYouthClubScreen";
import EditHeadshotScreen from "../../screens/coach/update-profile/EditHeadshotScreen";
import TabBar from './TabBar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const PlayersNavigator = () => {
    const {width} = useWindowDimensions();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name={CoachScreenNames.Players} component={PlayersScreen}/>
            <Stack.Screen name={CoachScreenNames.Player} component={PlayerScreen} options={{gestureResponseDistance: width}}/>
        </Stack.Navigator>
    )
}

const TabNavigator = () =>  {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName={CoachScreenNames.Home} tabBar={props => <TabBar {...props}/>}>
            <Tab.Screen name={CoachScreenNames.Home} component={HomeScreen}/>
            <Tab.Screen name={CoachScreenNames.PlayersNavigator} component={PlayersNavigator}/>
            <Tab.Screen name={CoachScreenNames.Drills} component={DrillsScreen} />
            <Tab.Screen name={CoachScreenNames.Profile} component={ProfileScreen} />
        </Tab.Navigator>
    );
};

const CoachNavigator = () => {
    const {width, height} = useWindowDimensions();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={CoachScreenNames.TabNavigator} component={TabNavigator}/>
            <Stack.Screen name={CoachScreenNames.CreateOrEditDrill}
                          component={CreateOrEditDrillScreen}
                          options={{
                              gestureResponseDistance: 0,
                              gestureDirection: 'vertical',
                              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
                          }}
            />
            <Stack.Screen name={CoachScreenNames.EditDrillName} component={EditDrillNameScreen} options={{gestureResponseDistance: width}}/>
            <Stack.Screen name={CoachScreenNames.EditDrillDescription} component={EditDrillDescriptionScreen} options={{gestureResponseDistance: width}}/>
            <Stack.Screen name={CoachScreenNames.EditDrillCategory} component={EditDrillCategoryScreen} options={{gestureResponseDistance: width}}/>
            <Stack.Screen name={CoachScreenNames.EditDrillEquipment} component={EditDrillEquipmentScreen} options={{gestureResponseDistance: width}}/>
            <Stack.Screen name={CoachScreenNames.EditDrillDemo} component={EditDrillDemoScreen} options={{gestureResponseDistance: width}}/>

            <Stack.Screen name={CoachScreenNames.Player} component={PlayerScreen} options={{gestureResponseDistance: width}}/>
            <Stack.Screen name={CoachScreenNames.CreateOrEditSession}
                          component={CreateOrEditSessionScreen}
                          options={{
                              gestureResponseDistance: 0,
                              gestureDirection: 'vertical',
                              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
                          }}
            />
            <Stack.Screen name={CoachScreenNames.SelectDrill}
                          component={SelectDrillScreen}
                          options={{
                              gestureResponseDistance: height,
                              gestureDirection: 'vertical',
                              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
                          }}/>
            <Stack.Screen name={CoachScreenNames.EditDrillSelectionDetails}
                          component={EditDrillSelectionDetailsScreen}
                          options={{
                              gestureResponseDistance: 0,
                              gestureDirection: 'vertical',
                              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
                          }}/>

            <Stack.Screen name={CoachScreenNames.PreviewSession} component={PreviewSessionScreen} options={{gestureResponseDistance: width}}/>
            <Stack.Screen name={CoachScreenNames.Session} component={SessionScreen} options={{gestureResponseDistance: width}}/>
            <Stack.Screen name={CoachScreenNames.DrillFeedback}
                          component={DrillFeedbackScreen}
                          options={{
                              gestureResponseDistance: height,
                              gestureDirection: 'vertical',
                              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
                          }}/>

            <Stack.Screen name={CoachScreenNames.EditAbout} component={EditAboutScreen} options={{gestureResponseDistance: width}}/>
            <Stack.Screen name={CoachScreenNames.EditEmail} component={EditEmailScreen} options={{gestureResponseDistance: width}}/>
            <Stack.Screen name={CoachScreenNames.EditHeadshot} component={EditHeadshotScreen} options={{gestureResponseDistance: width}}/>
            <Stack.Screen name={CoachScreenNames.EditName} component={EditNameScreen} options={{gestureResponseDistance: width}}/>
            <Stack.Screen name={CoachScreenNames.EditPosition} component={EditPositionScreen} options={{gestureResponseDistance: width}}/>
            <Stack.Screen name={CoachScreenNames.EditSchool} component={EditSchoolScreen} options={{gestureResponseDistance: width}}/>
            <Stack.Screen name={CoachScreenNames.EditYouthClub} component={EditYouthClubScreen} options={{gestureResponseDistance: width}}/>

        </Stack.Navigator>
    );
};

export default CoachNavigator;
