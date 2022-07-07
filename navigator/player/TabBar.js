import {Image, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {PlayerScreenNames} from "../../screens/ScreenNames";
import HomeActiveDark from "../../assets/icons/navigation/HomeActiveDark.png";
import HomeDark from "../../assets/icons/navigation/HomeDark.png";
import DrillsActiveDark from "../../assets/icons/navigation/DrillsActiveDark.png";
import DrillsDark from "../../assets/icons/navigation/DrillsDark.png";
import InboxActiveDark from "../../assets/icons/navigation/InboxActiveDark.png";
import InboxDark from "../../assets/icons/navigation/InboxDark.png";
import {useEffect, useState} from 'react';
import useHttpClient from "../../hooks/useHttpClient";
import useAuth from "../../hooks/useAuth";
import useInboxViewDate from "../../hooks/useInboxViewDate";
import {Colors} from "../../constants/colors";

const TabBar = ({ state, descriptors, navigation }) => {

    const [numberOfUnreadInboxEntries, setNumberOfUnreadInboxEntries] = useState(0);
    const {httpClient} = useHttpClient();
    const {player} = useAuth();
    const {lastViewedDateEpochMillis} = useInboxViewDate();

    const getNumberOfUnreadInboxEntries = async () => {
        const inboxEntries = await httpClient.getInboxForPlayer(player.playerId);
        const unreadInboxEntries = inboxEntries.filter(inboxEntry => inboxEntry.creationDateEpochMillis > lastViewedDateEpochMillis);
        setNumberOfUnreadInboxEntries(unreadInboxEntries.length);
    }

    useEffect(() => {
        getNumberOfUnreadInboxEntries();
    }, [state, descriptors, navigation]);

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
                        <TouchableWithoutFeedback onPress={onPress} onLongPress={onLongPress} key={label}>
                            <View style={{justifyContent: 'center', alignItems: 'center', width: 80, height: 50, marginHorizontal: 20}}>
                                {label === PlayerScreenNames.Home && isFocused &&
                                    <>
                                        <Image source={HomeActiveDark} style={styles.icon}/>
                                        <Text style={styles.iconText} >Home</Text>
                                    </>
                                }
                                {label === PlayerScreenNames.Home && !isFocused &&
                                    <>
                                        <Image source={HomeDark} style={styles.icon}/>
                                        <Text style={styles.iconText}>Home</Text>
                                    </>
                                }

                                {label === PlayerScreenNames.Drills && isFocused &&
                                    <>
                                        <Image source={DrillsActiveDark} style={styles.icon}/>
                                        <Text style={styles.iconText}>Drills</Text>
                                    </>
                                }
                                {label === PlayerScreenNames.Drills && !isFocused &&
                                    <>
                                        <Image source={DrillsDark} style={styles.icon}/>
                                        <Text style={styles.iconText}>Drills</Text>
                                    </>
                                }

                                {label === PlayerScreenNames.Inbox && isFocused &&
                                    <>
                                        <Image source={InboxActiveDark} style={styles.icon}/>
                                        <Text style={styles.iconText}>Inbox</Text>
                                        {numberOfUnreadInboxEntries > 0 && (
                                            <View style={{backgroundColor: Colors.Primary, height: 20, paddingHorizontal: 6, borderRadius: 30, position: 'absolute', top: -5, left: 40, alignItems: 'center', justifyContent: 'center'}}>
                                                <Text style={{color: 'white', fontWeight: '500', fontSize: 11}}>{numberOfUnreadInboxEntries}</Text>
                                            </View>
                                        )}
                                    </>
                                }
                                {label === PlayerScreenNames.Inbox && !isFocused &&
                                    <>
                                        <Image source={InboxDark} style={styles.icon}/>
                                        <Text style={styles.iconText}>Inbox</Text>
                                        {numberOfUnreadInboxEntries > 0 && (
                                            <View style={{backgroundColor: Colors.Primary, height: 20, paddingHorizontal: 6, borderRadius: 30, position: 'absolute', top: -5, left: 40, alignItems: 'center', justifyContent: 'center'}}>
                                                <Text style={{color: 'white', fontWeight: '500', fontSize: 11}}>{numberOfUnreadInboxEntries}</Text>
                                            </View>
                                        )}
                                    </>
                                }
                            </View>
                        </TouchableWithoutFeedback>
                    );
                })}
            </SafeAreaView>
        </View>
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