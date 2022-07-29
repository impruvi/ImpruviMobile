import {EquipmentType} from "../constants/equipmentType";
import {StyleSheet, Text} from "react-native";

const Equipment = ({equipment}) => {
    switch (equipment.equipmentType) {
        case EquipmentType.Ball:
            return equipment.requirement.count > 0
                ? (
                    <Text style={styles.text}>{equipment.requirement.count} ball{equipment.requirement.count > 1 ? 's' : null}</Text>
                )
                : null;
        case EquipmentType.Cone:
            return equipment.requirement.count > 0
                ? (
                    <Text style={styles.text}>{equipment.requirement.count} cone{equipment.requirement.count > 1 ? 's' : null}</Text>
                )
                : null;
        case EquipmentType.Goal:
            return equipment.requirement.count > 0
                ? (
                    <Text style={styles.text}>{equipment.requirement.count} goal{equipment.requirement.count > 1 ? 's' : null}</Text>
                )
                : null;
        case EquipmentType.Space:
            return (
                <Text style={styles.text}>{equipment.requirement.dimension.width} x {equipment.requirement.dimension.length} yards</Text>
            )
        default:
            return null;
    }
}

const styles = StyleSheet.create({
    text: {
        color: '#7A7A7A',
        fontWeight: '500'
    }
})

export default Equipment;
