import {useCallback, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {Alert, StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import EditHeader from "../../../../components/EditHeader";
import {Colors} from "../../../../constants/colors";
import {EquipmentType} from "../../../../constants/equipmentType";
import {RequirementType} from "../../../../constants/requirementType";
import EditContainer from "../../../../components/EditContainer";
import Title from "./Title";
import Slide from "./Slide";


const initialEquipment = [
    {
        equipmentType: EquipmentType.Ball,
        requirement: {
            count: 0,
            requirementType: RequirementType.Count
        }
    },
    {
        equipmentType: EquipmentType.Cone,
        requirement: {
            count: 0,
            requirementType: RequirementType.Count
        }
    },
    {
        equipmentType: EquipmentType.Goal,
        requirement: {
            count: 0,
            requirementType: RequirementType.Count
        }
    }
];

const getDimension = (equipment, equipmentType) => {
    return equipment.find(equipment =>
        equipment.equipmentType === equipmentType
    )?.requirement.dimension || {length: 0, width: 0};
}

const getCount = (equipment, equipmentType) => {
    return equipment.find(equipment =>
        equipment.equipmentType === equipmentType
    )?.requirement.count || 0;
};

const EditDrillEquipmentScreen = ({route}) => {

    const [equipment, setEquipment] = useState(!!route.params.equipment && route.params.equipment.length > 0
        ? route.params.equipment
        : initialEquipment);

    const navigation = useNavigation();

    const goalCount = getCount(equipment, EquipmentType.Goal);
    const spaceLength = getDimension(equipment, EquipmentType.Space).length;

    const onSave = useCallback(() => {
        if (equipment.length < 4) {
            Alert.alert('Please fill in all of the fields', '', [
                {
                    text: 'Ok',
                },
            ]);
        } else {
            route.params.setEquipment(equipment);
            navigation.goBack();
        }
    }, [equipment]);

    const updateCountEquipmentItem = useCallback((equipmentType, requirementType, value) => {
        const currentEquipmentItem = equipment.find(equipment =>
            equipment.equipmentType === equipmentType
        );
        const newEquipmentItem = {
            equipmentType: equipmentType,
            requirement: {
                count: requirementType === RequirementType.Count ? value : undefined,
                dimension: requirementType === RequirementType.Dimension ? value : undefined,
                requirementType: requirementType
            }
        }
        const newEquipment = !!currentEquipmentItem
            ? equipment.map(equipmentItem => equipmentItem.equipmentType === equipmentType
                ? newEquipmentItem
                : equipmentItem)
            : [...equipment, newEquipmentItem];
        setEquipment(newEquipment);
    }, [equipment]);

    const onGoalSwitchToggle = useCallback(() => {
        if (goalCount === 1) {
            updateCountEquipmentItem(EquipmentType.Goal, RequirementType.Count, 0)
        } else {
            updateCountEquipmentItem(EquipmentType.Goal, RequirementType.Count, 1)
        }
    }, [goalCount, updateCountEquipmentItem]);

    const updateDimensions = useCallback((dimension) => {
        updateCountEquipmentItem(
            EquipmentType.Space,
            RequirementType.Dimension,
            {
                length: dimension,
                width: dimension,
            })
    }, [updateCountEquipmentItem]);

    const chooseSmallDimensions = useCallback(() => {
        updateDimensions(10);
    }, [updateDimensions])

    const chooseMediumDimensions = useCallback(() => {
        updateDimensions(20);
    }, [updateDimensions])

    const chooseLargeDimensions = useCallback(() => {
        updateDimensions(30);
    }, [updateDimensions])


    return (
        <EditContainer>
            <EditHeader onCancel={navigation.goBack}
                        onSave={onSave}
                        title={'Equipment'}/>

            <Slide title={'Ball(s)'}
                   maxValue={10}
                   value={getCount(equipment, EquipmentType.Ball)}
                   onValueChange={value => updateCountEquipmentItem(EquipmentType.Ball, RequirementType.Count, value)}/>
            <Slide title={'Cone(s)'}
                   maxValue={20}
                   value={getCount(equipment, EquipmentType.Cone)}
                   onValueChange={value => updateCountEquipmentItem(EquipmentType.Cone, RequirementType.Count, value)}/>

            <Title text={'Does this drill require a goal?'} includeMargin/>
            <Switch trackColor={{ true: Colors.Primary, false: '#ddd' }}
                    ios_backgroundColor={'#ddd'}
                    thumbColor={'white'}
                    onValueChange={onGoalSwitchToggle}
                    value={goalCount === 1}
                    style={styles.switch}/>

            <Title text={'How much space does this drill require?'} includeMargin/>
            <View style={styles.spaceOptions}>
                <TouchableOpacity
                    style={spaceLength === 10 ? styles.selectOptionContainerActive : styles.selectOptionContainer}
                    onPress={chooseSmallDimensions}>
                    <Text style={spaceLength === 10 ? styles.selectOptionTitleActive : styles.selectOptionTitle}>
                        Small
                    </Text>
                    <Text style={spaceLength === 10 ? styles.selectOptionTextActive : styles.selectOptionText}>
                        0-10 yards
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={spaceLength === 20 ? styles.selectOptionContainerActive : styles.selectOptionContainer}
                    onPress={chooseMediumDimensions}>
                    <Text style={spaceLength === 20 ? styles.selectOptionTitleActive : styles.selectOptionTitle}>
                        Medium
                    </Text>
                    <Text
                        style={spaceLength === 20 ? styles.selectOptionTextActive : styles.selectOptionText}>
                        10-20 yards
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={spaceLength === 30 ? styles.selectOptionContainerActive : styles.selectOptionContainer}
                    onPress={chooseLargeDimensions}>
                    <Text style={spaceLength === 30 ? styles.selectOptionTitleActive : styles.selectOptionTitle}>
                        Large
                    </Text>
                    <Text style={spaceLength === 30 ? styles.selectOptionTextActive : styles.selectOptionText}>
                        20+ yards
                    </Text>
                </TouchableOpacity>
            </View>
        </EditContainer>
    )
}

const styles = StyleSheet.create({
    equipmentItem: {
        marginTop: 20
    },
    selectOptionContainer: {
        width: '31%',
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5
    },
    selectOptionContainerActive: {
        width: '31%',
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: Colors.Primary,
        borderRadius: 5,
        backgroundColor: Colors.Primary
    },
    selectOptionTitle: {
        fontWeight: '500',
        marginBottom: 3,
        textAlign: 'center'
    },
    selectOptionTitleActive: {
        fontWeight: '500',
        marginBottom: 3,
        textAlign: 'center',
        color: 'white'
    },
    selectOptionText: {
        textAlign: 'center'
    },
    selectOptionTextActive: {
        textAlign: 'center',
        color: 'white'
    },
    spaceOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10
    },
    switch: {
        marginTop: 10
    }
});

export default EditDrillEquipmentScreen;