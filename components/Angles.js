import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {DrillVideoAngles} from "../constants/drillVideoAngles";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faVideo} from "@fortawesome/pro-solid-svg-icons";
import {Colors} from "../constants/colors";

const Angles = ({selectedAngle, setSelectedAngle}) => {
    return (
        <>
            <TouchableOpacity style={styles.angleButton} onPress={() => setSelectedAngle(DrillVideoAngles.Front)}>
                <FontAwesomeIcon icon={faVideo} style={selectedAngle === DrillVideoAngles.Front ? {color: 'rgba(243, 81, 86, .9)'} : {color: 'rgba(255, 255, 255, .9)'}} size={30}/>
                <Text style={styles.angleButtonText}>
                    Front
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.angleButton} onPress={() => setSelectedAngle(DrillVideoAngles.Side)}>
                <FontAwesomeIcon icon={faVideo} style={selectedAngle === DrillVideoAngles.Side ? {color: 'rgba(243, 81, 86, .9)'} : {color: 'rgba(255, 255, 255, .9)'}} size={30}/>
                <Text style={styles.angleButtonText}>
                    Side
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.angleButton} onPress={() => setSelectedAngle(DrillVideoAngles.CloseUp)}>
                <FontAwesomeIcon icon={faVideo} style={selectedAngle === DrillVideoAngles.CloseUp ? {color: 'rgba(243, 81, 86, .9)',} : {color: 'rgba(255, 255, 255, .9)'}} size={30}/>
                <Text style={styles.angleButtonText}>
                    Close up
                </Text>
            </TouchableOpacity>
        </>
    );
}


const styles = StyleSheet.create({
    angleButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
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
    angleButtonText: {
        color: 'white',
        fontSize: 13,
        fontWeight: '500',
        textShadowColor: 'rgba(0, 0, 0, .4)',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 2
    },
    angleButtonTextActive: {
        color: Colors.Primary,
    },
});

export default Angles;
