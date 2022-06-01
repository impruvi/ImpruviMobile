import {StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {DrillVideoAngles} from "../constants/drillVideoAngles";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faVideo} from "@fortawesome/pro-light-svg-icons";
import {Colors} from "../constants/colors";

const Angles = ({selectedAngle, setSelectedAngle}) => {
    const {height} = useWindowDimensions();

    return (
        <View style={{position: 'absolute', height: height, width: 120, top: 0, right: 0}}>
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,.4)']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={{flex: 1}}>
                <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', paddingBottom: 60, paddingRight: 15}}>
                    <TouchableOpacity style={styles.angleButton} onPress={() => setSelectedAngle(DrillVideoAngles.Front)}>
                        <View style={selectedAngle === DrillVideoAngles.Front
                            ? {...styles.angleButtonIconContainer, ...styles.angleButtonIconContainerActive}
                            : styles.angleButtonIconContainer}>
                            <FontAwesomeIcon icon={faVideo} style={styles.angleButtonIcon}/>
                        </View>
                        <Text style={styles.angleButtonText}>
                            Front
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.angleButton} onPress={() => setSelectedAngle(DrillVideoAngles.Side)}>
                        <View style={selectedAngle === DrillVideoAngles.Side
                            ? {...styles.angleButtonIconContainer, ...styles.angleButtonIconContainerActive}
                            : styles.angleButtonIconContainer}>
                            <FontAwesomeIcon icon={faVideo} style={styles.angleButtonIcon}/>
                        </View>
                        <Text style={styles.angleButtonText}>
                            Side
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.angleButton} onPress={() => setSelectedAngle(DrillVideoAngles.CloseUp)}>
                        <View style={selectedAngle === DrillVideoAngles.CloseUp
                            ? {...styles.angleButtonIconContainer, ...styles.angleButtonIconContainerActive}
                            : styles.angleButtonIconContainer}>
                            <FontAwesomeIcon icon={faVideo} style={styles.angleButtonIcon}/>
                        </View>
                        <Text style={styles.angleButtonText}>
                            Close up
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
}


const styles = StyleSheet.create({
    angleButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    angleButtonIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 50,
        borderColor: 'white',
        padding: 15,
        marginBottom: 3
    },
    angleButtonIconContainerActive: {
        backgroundColor: Colors.Primary,
        borderColor: Colors.Primary,
    },
    angleButtonIcon: {
        color: 'white'
    },
    angleButtonText: {
        color: 'white',
        fontSize: 12
    },
    angleButtonTextActive: {
        color: Colors.Primary,
    },
});

export default Angles;
