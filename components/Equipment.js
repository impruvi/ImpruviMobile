import {EquipmentTypes} from "../constants/equipment";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faGoalNet, faRuler, faSoccerBall, faTrafficCone} from '@fortawesome/pro-light-svg-icons';
import {StyleSheet, Text, View} from "react-native";

const Equipment = ({equipment}) => {
    switch (equipment.equipmentType) {
        case EquipmentTypes.Ball:
            return (
                <View style={styles.container}>
                    <FontAwesomeIcon icon={faSoccerBall} style={styles.icon}/>
                    <Text>{equipment.requirement.count} ball{equipment.requirement.count > 1 ? 's' : null}</Text>
                </View>
            )
        case EquipmentTypes.Cone:
            return (
                <View style={styles.container}>
                    <FontAwesomeIcon icon={faTrafficCone} style={styles.icon}/>
                    <Text>{equipment.requirement.count} cone{equipment.requirement.count > 1 ? 's' : null}</Text>
                </View>
            )
        case EquipmentTypes.Goal:
            return (
                <View style={styles.container}>
                    <FontAwesomeIcon icon={faGoalNet} style={styles.icon}/>
                    <Text>{equipment.requirement.count} goal{equipment.requirement.count > 1 ? 's' : null}</Text>
                </View>
            )
        case EquipmentTypes.Space:
            return (
                <View style={styles.container}>
                    <FontAwesomeIcon icon={faRuler} style={styles.icon}/>
                    <Text>{equipment.requirement.dimension.width} x {equipment.requirement.dimension.height} yards of space</Text>
                </View>
            )
        default:
            return null;
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2
    },
    icon: {
        marginRight: 5
    }
})

export default Equipment;
