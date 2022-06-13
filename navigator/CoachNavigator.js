import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {CoachScreenNames} from "../screens/ScreenNames";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faHouse, faListUl, faUser} from "@fortawesome/pro-light-svg-icons";
import {Colors} from "../constants/colors";
import React from "react";
import HomeScreen from "../screens/coach/HomeScreen";
import PlayersScreen from "../screens/coach/PlayersScreen";
import SessionScreen from "../screens/coach/SessionScreen";
import DrillFeedbackScreen from "../screens/coach/DrillFeedbackScreen";
import DrillsScreen from "../screens/coach/DrillsScreen";
import CreateOrEditDrillScreen from "../screens/coach/CreateOrEditDrillScreen";
import EditDrillDemoScreen from "../screens/coach/update-drill/EditDrillDemoScreen";
import EditDrillNameScreen from "../screens/coach/update-drill/EditDrillNameScreen";
import EditDrillDescriptionScreen from "../screens/coach/update-drill/EditDrillDescriptionScreen";
import EditDrillCategoryScreen from "../screens/coach/update-drill/EditDrillCategoryScreen";
import EditDrillEquipmentScreen from "../screens/coach/update-drill/EditDrillEquipmentScreen";
import PlayerScreen from "../screens/coach/PlayerScreen";
import CreateOrEditSessionScreen from "../screens/coach/CreateOrEditSessionScreen";
import SelectDrillScreen from "../screens/coach/update-session/SelectDrillScreen";
import EditDrillSelectionDetailsScreen from "../screens/coach/update-session/EditDrillSelectionDetailsScreen";
import EditEstimatedDurationScreen from "../screens/coach/update-session/EditEstimatedDurationScreen";
import PreviewSessionScreen from "../screens/coach/PreviewSessionScreen";

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
                            {label === CoachScreenNames.Home &&
                                <>
                                    <FontAwesomeIcon icon={ faHouse } color={isFocused ? Colors.Primary : 'black'}/>
                                    <Text style={isFocused ? styles.tabTextFocused : styles.tabText}>Home</Text>
                                </>
                            }

                            {label === CoachScreenNames.PlayersNavigator &&
                                <>
                                    <FontAwesomeIcon icon={faUser} color={isFocused ? Colors.Primary : 'black'}/>
                                    <Text style={isFocused ? styles.tabTextFocused : styles.tabText}>Players</Text>
                                </>
                            }

                            {label === CoachScreenNames.Drills &&
                                <>
                                    <FontAwesomeIcon icon={faListUl} color={isFocused ? Colors.Primary : 'black'}/>
                                    <Text style={isFocused ? styles.tabTextFocused : styles.tabText}>Drills</Text>
                                </>
                            }
                        </TouchableOpacity>
                    );
                })}
            </SafeAreaView>
        </View>
    );
};

const PlayersNavigator = () => {
    const {width} = useWindowDimensions();

    return (
        <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: '#EFF3F4'}}}>
            <Tab.Screen name={CoachScreenNames.Players} component={PlayersScreen}/>
            <Stack.Screen name={CoachScreenNames.Player} component={PlayerScreen} options={{gestureResponseDistance: width}}/>
        </Stack.Navigator>
    )
}

const TabNavigator = () =>  {
    return (
        <Tab.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: 'white'}}} initialRouteName={CoachScreenNames.Home} tabBar={props => <TabBar {...props}/>}>
            <Tab.Screen name={CoachScreenNames.Home} component={HomeScreen}/>
            <Tab.Screen name={CoachScreenNames.PlayersNavigator} component={PlayersNavigator}/>
            <Tab.Screen name={CoachScreenNames.Drills} component={DrillsScreen} />
        </Tab.Navigator>
    );
};

const CoachNavigator = () => {
    const {width, height} = useWindowDimensions();

    return (
        <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: '#EFF3F4'}}}>
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
            <Stack.Screen name={CoachScreenNames.EditEstimatedDurationScreen} component={EditEstimatedDurationScreen} options={{gestureResponseDistance: width}}/>

            <Stack.Screen name={CoachScreenNames.PreviewSession} component={PreviewSessionScreen} options={{gestureResponseDistance: width}}/>
            <Stack.Screen name={CoachScreenNames.Session} component={SessionScreen} options={{gestureResponseDistance: width}}/>
            <Stack.Screen name={CoachScreenNames.DrillFeedback}
                          component={DrillFeedbackScreen}
                          options={{
                              gestureResponseDistance: height,
                              gestureDirection: 'vertical',
                              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
                          }}/>
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    tabText: {
        marginTop: 7,
        fontSize: 12,
        fontWeight: '600',
        color: 'black'
    },
    tabTextFocused: {
        marginTop: 7,
        fontSize: 12,
        fontWeight: '600',
        color: Colors.Primary
    }
})

export default CoachNavigator;
