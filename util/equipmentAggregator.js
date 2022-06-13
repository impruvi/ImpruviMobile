import {RequirementType} from "../constants/requirementType";


export const getSessionEquipment = (session) => {
    const maxEquipmentMap = {};
    session.drills.forEach(drill => {
        drill.equipment.forEach(equipment => {
            if (!!maxEquipmentMap[equipment.equipmentType]) {
                maxEquipmentMap[equipment.equipmentType] = {
                    ...equipment,
                    requirement: getMaxRequirements(equipment.requirement, maxEquipmentMap[equipment.equipmentType].requirement)
                }
            } else {
                maxEquipmentMap[equipment.equipmentType] = equipment;
            }
        });
    });


    const maxEquipment = [];
    for (const [_, value] of Object.entries(maxEquipmentMap)) {
        maxEquipment.push(value);
    }
    return maxEquipment;
}

const getMaxRequirements = (requirement1, requirement2) => {
    if (requirement1.requirementType !== requirement2.requirementType) {
        throw new Error('Requirements do not match');
    }
    if (requirement1.requirementType === RequirementType.Dimension) {
        return {
            'dimension': {
                length: Math.max(requirement1.dimension.length, requirement2.dimension.length),
                width: Math.max(requirement1.dimension.width, requirement2.dimension.width),
            },
            'requirementType': RequirementType.Dimension
        }
    } else if (requirement1.requirementType === RequirementType.Count) {
        return {
            'count': Math.max(requirement1.count, requirement2.count),
            'requirementType': RequirementType.Count
        }
    } else {
        throw new Error(`Unexpected requirement type: ${requirement1.requirementType}`);
    }
}
