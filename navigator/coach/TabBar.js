import {SafeAreaView, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faHouse, faListUl, faUser, faUsers} from "@fortawesome/pro-light-svg-icons";
import React from "react";
import {CoachScreenNames} from "../../screens/ScreenNames";
import {Colors} from "../../constants/colors";

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
                        <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={{ width: 50, height: 50, marginHorizontal: 20, justifyContent: 'center', alignItems: 'center' }} key={label}>
                            {label === CoachScreenNames.Home &&
                                <FontAwesomeIcon icon={ faHouse } color={isFocused ? Colors.Primary : 'black'} size={25}/>
                            }

                            {label === CoachScreenNames.PlayersNavigator &&
                                <FontAwesomeIcon icon={faUsers} color={isFocused ? Colors.Primary : 'black'} size={25}/>
                            }

                            {label === CoachScreenNames.Drills &&
                                <FontAwesomeIcon icon={faListUl} color={isFocused ? Colors.Primary : 'black'} size={25}/>
                            }

                            {label === CoachScreenNames.Profile &&
                                <FontAwesomeIcon icon={faUser} color={isFocused ? Colors.Primary : 'black'} size={25}/>
                            }
                        </TouchableOpacity>
                    );
                })}
            </SafeAreaView>
        </View>
    );
};

export default TabBar;