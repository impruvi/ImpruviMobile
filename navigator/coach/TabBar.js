import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import React from "react";
import {CoachScreenNames} from "../../screens/ScreenNames";
import DrillsGrid from '../../assets/icons/navigation/DrillsGridDark.png';
import DrillsGridActive from '../../assets/icons/navigation/DrillsGridActiveDark.png';
import Players from '../../assets/icons/navigation/PlayersDark.png';
import PlayersActive from '../../assets/icons/navigation/PlayersActiveDark.png';
import HomeDark from '../../assets/icons/navigation/HomeDark.png';
import HomeActiveDark from '../../assets/icons/navigation/HomeActiveDark.png';
import {SafeAreaView} from 'react-native-safe-area-context';

const TabBar = ({ state, descriptors, navigation }) => {
    return (
        <SafeAreaView edges={['bottom', 'left', 'right']}>
            <View style={{paddingTop: 7, flexDirection: 'row', justifyContent: 'center'}}>
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
                        <TouchableWithoutFeedback onPress={onPress} onLongPress={onLongPress} key={label}>
                            <View style={{justifyContent: 'center', alignItems: 'center', width: 80, height: 50, marginHorizontal: 20}}>
                                {label === CoachScreenNames.Home && isFocused &&
                                    <>
                                        <Image source={HomeActiveDark} style={styles.icon}/>
                                        <Text style={styles.iconText} >Home</Text>
                                    </>
                                }
                                {label === CoachScreenNames.Home && !isFocused &&
                                    <>
                                        <Image source={HomeDark} style={styles.icon}/>
                                        <Text style={styles.iconText}>Home</Text>
                                    </>
                                }

                                {label === CoachScreenNames.PlayersNavigator && isFocused &&
                                    <>
                                        <Image source={PlayersActive} style={styles.icon}/>
                                        <Text style={styles.iconText}>Players</Text>
                                    </>
                                }
                                {label === CoachScreenNames.PlayersNavigator && !isFocused &&
                                    <>
                                        <Image source={Players} style={styles.icon}/>
                                        <Text style={styles.iconText}>Players</Text>
                                    </>
                                }

                                {label === CoachScreenNames.Drills && isFocused &&
                                    <>
                                        <Image source={DrillsGridActive} style={styles.icon}/>
                                        <Text style={styles.iconText}>Drills</Text>
                                    </>
                                }
                                {label === CoachScreenNames.Drills && !isFocused &&
                                    <>
                                        <Image source={DrillsGrid} style={styles.icon}/>
                                        <Text style={styles.iconText}>Drills</Text>
                                    </>
                                }
                            </View>
                        </TouchableWithoutFeedback>
                    );
                })}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    icon: {
        height: 20,
        width: 25,
        resizeMode: 'contain'
    },
    iconText: {
        marginTop: 5,
        fontWeight: '500',
        fontSize: 11
    }
});

export default TabBar;