import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {SafeAreaView, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {PlayerScreenNames} from "../screens/ScreenNames";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChartLine, faHouse, faUser} from "@fortawesome/pro-light-svg-icons";
import {Colors} from "../constants/colors";
import TrainingScreen from "../screens/player/TrainingScreen";
import ProfileScreen from "../screens/player/ProfileScreen";
import ProgressScreen from "../screens/player/ProgressScreen";
import DrillSubmissionScreen from "../screens/player/DrillSubmissionScreen";
import SessionCompleteScreen from "../screens/player/SessionCompleteScreen";
import SessionScreen from "../screens/player/SessionScreen";
import React from "react";
import CoachDetailsScreen from "../screens/player/CoachDetailsScreen";
import SessionDetailsScreen from "../screens/player/SessionDetailsScreen";
import EditAvailabilityScreen from "../screens/player/update-profile/EditAvailabilityScreen";
import EditEmailScreen from "../screens/player/update-profile/EditEmailScreen";
import EditNameScreen from "../screens/player/update-profile/EditNameScreen";
import OnboardingScreen from "../screens/player/onboarding/OnboardingScreen";
import useOnboarding from "../hooks/useOnboarding";
import FAQScreen from "../screens/player/FAQScreen";

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
                            {label === PlayerScreenNames.TrainingNavigator &&
                                <FontAwesomeIcon icon={ faHouse } color={isFocused ? Colors.Primary : 'black'} size={25}/>
                            }

                            {label === PlayerScreenNames.Profile &&
                                <FontAwesomeIcon icon={faUser} color={isFocused ? Colors.Primary : 'black'} size={25}/>
                            }

                            {label === PlayerScreenNames.Progress &&
                                <FontAwesomeIcon icon={faChartLine} color={isFocused ? Colors.Primary : 'black'} size={25}/>
                            }
                        </TouchableOpacity>
                    );
                })}
            </SafeAreaView>
        </View>
    );
};

const TabNavigator = () =>  {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName={PlayerScreenNames.Training} tabBar={props => <TabBar {...props}/>}>
            <Tab.Screen name={PlayerScreenNames.TrainingNavigator} component={TrainingNavigator}/>
            <Tab.Screen name={PlayerScreenNames.Progress} component={ProgressScreen}/>
            <Tab.Screen name={PlayerScreenNames.Profile} component={ProfileScreen} />
        </Tab.Navigator>
    );
};

const TrainingNavigator = () => {
    const {width, height} = useWindowDimensions();

    return (
        <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: '#EFF3F4'}}} initialRouteName={PlayerScreenNames.Training} >
            <Stack.Screen name={PlayerScreenNames.Training} component={TrainingScreen} options={{gestureResponseDistance: width}}/>
            <Stack.Screen name={PlayerScreenNames.SessionDetails} component={SessionDetailsScreen} options={{gestureResponseDistance: height}}/>
        </Stack.Navigator>
    );
}

const SessionNavigator = () => {
    const {width, height} = useWindowDimensions();

    return (
        <Stack.Navigator screenOptions={{headerShown: false, presentation: 'modal', cardStyle: {backgroundColor: '#EFF3F4'}}}>
            <Stack.Screen name={PlayerScreenNames.Session} component={SessionScreen} options={{gestureResponseDistance: width}}/>
            <Stack.Screen name={PlayerScreenNames.DrillSubmission} component={DrillSubmissionScreen} options={{gestureResponseDistance: height}}/>
            <Stack.Screen name={PlayerScreenNames.SessionComplete} component={SessionCompleteScreen} options={{gestureResponseDistance: 0}} />
        </Stack.Navigator>
    );
};

const PlayerNavigator = () => {
    const {width} = useWindowDimensions();
    const {isOnboardingComplete} = useOnboarding();

    return (
        <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: 'white'}}}>
            {isOnboardingComplete ?
                <>
                    <Stack.Group>
                        <Stack.Screen name={PlayerScreenNames.TabNavigator} component={TabNavigator}/>
                        <Stack.Screen name={PlayerScreenNames.SessionNavigator} component={SessionNavigator} options={{gestureResponseDistance: width}}/>
                        <Stack.Screen name={PlayerScreenNames.CoachDetails} component={CoachDetailsScreen} options={{gestureResponseDistance: width}}/>
                        <Stack.Screen name={PlayerScreenNames.EditAvailability} component={EditAvailabilityScreen} options={{gestureResponseDistance: width}}/>
                        <Stack.Screen name={PlayerScreenNames.EditEmail} component={EditEmailScreen} options={{gestureResponseDistance: width}}/>
                        <Stack.Screen name={PlayerScreenNames.EditName} component={EditNameScreen} options={{gestureResponseDistance: width}}/>
                        <Stack.Screen name={PlayerScreenNames.FAQ} component={FAQScreen} options={{gestureResponseDistance: width}}/>
                    </Stack.Group>
                </>
                :
                <Stack.Screen name={PlayerScreenNames.Onboarding} component={OnboardingScreen} />
            }
        </Stack.Navigator>
    );
};

export default PlayerNavigator;
