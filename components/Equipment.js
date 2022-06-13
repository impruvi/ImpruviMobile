import {EquipmentType} from "../constants/equipmentType";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faGoalNet, faRuler, faSoccerBall, faTrafficCone} from '@fortawesome/pro-light-svg-icons';
import {StyleSheet, Text, View} from "react-native";

const Equipment = ({equipment}) => {
    switch (equipment.equipmentType) {
        case EquipmentType.Ball:
            return (
                <View style={styles.container}>
                    <FontAwesomeIcon icon={faSoccerBall} style={styles.icon}/>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{equipment.requirement.count} ball{equipment.requirement.count > 1 ? 's' : null}</Text>
                    </View>
                </View>
            )
        case EquipmentType.Cone:
            return (
                <View style={styles.container}>
                    <FontAwesomeIcon icon={faTrafficCone} style={styles.icon}/>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{equipment.requirement.count} cone{equipment.requirement.count > 1 ? 's' : null}</Text>
                    </View>
                </View>
            )
        case EquipmentType.Goal:
            return (
                <View style={styles.container}>
                    <FontAwesomeIcon icon={faGoalNet} style={styles.icon}/>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{equipment.requirement.count} goal{equipment.requirement.count > 1 ? 's' : null}</Text>
                    </View>
                </View>
            )
        case EquipmentType.Space:
            return (
                <View style={styles.container}>
                    <FontAwesomeIcon icon={faRuler} style={styles.icon}/>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{equipment.requirement.dimension.width} x {equipment.requirement.dimension.length} yards of space</Text>
                    </View>
                </View>
            )
        default:
            return null;
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 2,
    },
    textContainer: {
        flexWrap: 'wrap',
        width: '90%',
        flexDirection: 'row'
    },
    text: {
        flex: 1,
        flexWrap: 'wrap'
    },
    icon: {
        marginRight: 5,
        width: '10%'
    }
})

export default Equipment;
