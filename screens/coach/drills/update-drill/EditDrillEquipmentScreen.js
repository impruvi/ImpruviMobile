import {useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {Alert, StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import EditHeader from "../../../../components/EditHeader";
import Slider from "react-native-slider";
import {Colors} from "../../../../constants/colors";
import {EquipmentType} from "../../../../constants/equipmentType";
import {RequirementType} from "../../../../constants/requirementType";
import EditContainer from "../../../../components/EditContainer";


const maximumTrackTintColor = '#EFF3F4';
const minimumTrackTintColor = Colors.Primary;
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

const Title = ({text, value, style}) => {
    return (
        <View style={{...style, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{marginLeft: 5, fontWeight: '500'}}>{text}</Text>
            </View>
            <Text>{value}</Text>
        </View>
    )
}

const Slide = ({title, maxValue, value, onValueChange}) => {
    return (
        <View style={styles.equipmentItem}>
            <Title text={title} value={value}/>
            <Slider
                style={{width: '100%', height: 40}}
                minimumValue={0}
                maximumValue={maxValue}
                value={value}
                step={1}
                onValueChange={onValueChange}
                thumbTintColor={minimumTrackTintColor}
                maximumTrackTintColor={maximumTrackTintColor}
                minimumTrackTintColor={minimumTrackTintColor}
            />
        </View>
    )
}

const EditDrillEquipmentScreen = ({route}) => {

    const [equipment, setEquipment] = useState(!!route.params.equipment && route.params.equipment.length > 0
        ? route.params.equipment
        : initialEquipment);

    const navigation = useNavigation();

    const onSave = () => {
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
    }

    const getCount = (equipmentType) => {
        return equipment.find(equipment =>
            equipment.equipmentType === equipmentType
        )?.requirement.count || 0;
    }

    const getDimension = (equipmentType) => {
        return equipment.find(equipment =>
            equipment.equipmentType === equipmentType
        )?.requirement.dimension || {length: 0, width: 0};
    }

    const updateCountEquipmentItem = (equipmentType, requirementType, value) => {
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
    }

    return (
        <EditContainer>
            <EditHeader onCancel={() => navigation.goBack()}
                        onSave={onSave}
                        title={'Equipment'}/>

            <Slide title={'Ball(s)'}
                   maxValue={10}
                   value={getCount(EquipmentType.Ball)}
                   onValueChange={value => updateCountEquipmentItem(EquipmentType.Ball, RequirementType.Count, value)}/>
            <Slide title={'Cone(s)'}
                   maxValue={20}
                   value={getCount(EquipmentType.Cone)}
                   onValueChange={value => updateCountEquipmentItem(EquipmentType.Cone, RequirementType.Count, value)}/>

            <Title text={'Does this drill require a goal?'} style={{marginTop: 20}}/>
            <Switch
                trackColor={{ true: Colors.Primary, false: '#ddd' }}
                ios_backgroundColor={'#ddd'}
                thumbColor={'white'}
                onValueChange={() => {
                    if (getCount(EquipmentType.Goal) === 1) {
                        updateCountEquipmentItem(EquipmentType.Goal, RequirementType.Count, 0)
                    } else {
                        updateCountEquipmentItem(EquipmentType.Goal, RequirementType.Count, 1)
                    }
                }}
                value={getCount(EquipmentType.Goal) === 1}
                style={{marginTop: 10}}
            />

            <Title text={'How much space does this drill require?'} style={{marginTop: 20}}/>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10}}>
                <TouchableOpacity
                    style={getDimension(EquipmentType.Space).length === 10
                        ? {...styles.selectOptionContainer, ...styles.selectOptionContainerActive}
                        : styles.selectOptionContainer}
                    onPress={() => {
                        updateCountEquipmentItem(
                            EquipmentType.Space,
                            RequirementType.Dimension,
                            {
                                length: 10,
                                width: 10,
                            })}}>
                    <Text
                        style={getDimension(EquipmentType.Space).length === 10
                            ? {...styles.selectOptionTitle, ...styles.selectOptionTitleActive}
                            : styles.selectOptionTitle}>Small</Text>
                    <Text
                        style={getDimension(EquipmentType.Space).length === 10
                            ? {...styles.selectOptionText, ...styles.selectOptionTextActive}
                            : styles.selectOptionText}>0-10 yards</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={getDimension(EquipmentType.Space).length === 20
                        ? {...styles.selectOptionContainer, ...styles.selectOptionContainerActive}
                        : styles.selectOptionContainer}
                    onPress={() => {
                        updateCountEquipmentItem(
                            EquipmentType.Space,
                            RequirementType.Dimension,
                            {
                                length: 20,
                                width: 20,
                            })}}>
                    <Text
                        style={getDimension(EquipmentType.Space).length === 20
                            ? {...styles.selectOptionTitle, ...styles.selectOptionTitleActive}
                            : styles.selectOptionTitle}>Medium</Text>
                    <Text
                        style={getDimension(EquipmentType.Space).length === 20
                            ? {...styles.selectOptionText, ...styles.selectOptionTextActive}
                            : styles.selectOptionText}>10-20 yards</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={getDimension(EquipmentType.Space).length === 30
                        ? {...styles.selectOptionContainer, ...styles.selectOptionContainerActive}
                        : styles.selectOptionContainer}
                    onPress={() => {
                        updateCountEquipmentItem(
                            EquipmentType.Space,
                            RequirementType.Dimension,
                            {
                                length: 30,
                                width: 30,
                            })}}>
                    <Text
                        style={getDimension(EquipmentType.Space).length === 30
                            ? {...styles.selectOptionTitle, ...styles.selectOptionTitleActive}
                            : styles.selectOptionTitle}>Large</Text>
                    <Text
                        style={getDimension(EquipmentType.Space).length === 30
                            ? {...styles.selectOptionText, ...styles.selectOptionTextActive}
                            : styles.selectOptionText}>20+ yards</Text>
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
    selectOptionTitle: {
        fontWeight: '500',
        marginBottom: 3,
        textAlign: 'center'
    },
    selectOptionText: {
        textAlign: 'center'
    },
    selectOptionContainerActive: {
        borderWidth: 0,
        backgroundColor: Colors.Primary
    },
    selectOptionTitleActive: {
        color: 'white'
    },
    selectOptionTextActive: {
        color: 'white'
    }
});

export default EditDrillEquipmentScreen;