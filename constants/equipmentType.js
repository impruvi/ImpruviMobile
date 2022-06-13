export const EquipmentType = {
    Ball: 'BALL',
    Cone: 'CONE',
    Goal: 'GOAL',
    Space: 'SPACE'
}

export const getEquipmentTypeDisplayValue = (equipment) => {
    if (!equipment) {
        return null;
    }
    return Object.entries(EquipmentType).find(equipmentType => equipmentType[1] === equipment)[0];
}