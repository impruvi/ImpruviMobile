import {useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {StyleSheet, Text, TextInput, View} from "react-native";
import EditHeader from "../../../../components/EditHeader";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faGoalNet, faSoccerBall, faTrafficCone, faXmarkLarge} from "@fortawesome/pro-light-svg-icons";
import Slider from "react-native-slider";
import {Colors} from "../../../../constants/colors";
import {EquipmentType} from "../../../../constants/equipmentType";
import {RequirementType} from "../../../../constants/requirementType";
import EditContainer from "../../../../components/EditContainer";


const maximumTrackTintColor = '#EFF3F4';
const minimumTrackTintColor = Colors.Primary;

const Slide = ({title, icon, maxValue, value, onValueChange}) => {
    return (
        <View style={styles.equipmentItem}>
            <Text>
                <FontAwesomeIcon icon={icon} /> {Math.floor(value)} {title}
            </Text>
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

    const [equipment, setEquipment] = useState(route.params.equipment);

    const navigation = useNavigation();

    const onSave = () => {
        route.params.setEquipment(equipment);
        navigation.goBack();
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
            "equipmentType": equipmentType,
            "requirement": {
                "count": requirementType === RequirementType.Count ? value : undefined,
                "dimension": requirementType === RequirementType.Dimension ? value : undefined,
                "requirementType": requirementType
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
                   icon={faSoccerBall}
                   maxValue={25}
                   value={getCount(EquipmentType.Ball)}
                   onValueChange={value => updateCountEquipmentItem(EquipmentType.Ball, RequirementType.Count, value)}/>
            <Slide title={'Cone(s)'}
                   icon={faTrafficCone}
                   maxValue={25}
                   value={getCount(EquipmentType.Cone)}
                   onValueChange={value => updateCountEquipmentItem(EquipmentType.Cone, RequirementType.Count, value)}/>
            <Slide title={'Goal(s)'}
                   icon={faGoalNet}
                   maxValue={25}
                   value={getCount(EquipmentType.Goal)}
                   onValueChange={value => updateCountEquipmentItem(EquipmentType.Goal, RequirementType.Count, value)}/>

            <View style={styles.equipmentItem}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TextInput style={styles.numberInput}
                               keyboardType="numeric"
                               value={!!getDimension(EquipmentType.Space).length ? `${getDimension(EquipmentType.Space).length}` : ''}
                               onChangeText={value => updateCountEquipmentItem(
                                   EquipmentType.Space,
                                   RequirementType.Dimension,
                                   {
                                       length: parseInt(value),
                                       width: getDimension(EquipmentType.Space).width,
                                   })}/>
                    <FontAwesomeIcon icon={faXmarkLarge} style={{marginRight: 10}}/>
                    <TextInput style={styles.numberInput}
                               keyboardType="numeric"
                               value={!!getDimension(EquipmentType.Space).width ? `${getDimension(EquipmentType.Space).width}` : ''}
                               onChangeText={value => updateCountEquipmentItem(
                                   EquipmentType.Space,
                                   RequirementType.Dimension,
                                   {
                                       length: getDimension(EquipmentType.Space).length,
                                       width: parseInt(value)
                                   })}/>
                    <Text>Yards of space</Text>
                </View>
            </View>
        </EditContainer>
    )
}

const styles = StyleSheet.create({
    numberInput: {
        width: 60,
        fontSize: 20,
        paddingHorizontal: 5,
        paddingBottom: 15,
        paddingTop: 15,
        backgroundColor: '#EFF3F4',
        borderRadius: 5,
        marginRight: 10,
        textAlign: 'center'
    },
    equipmentItem: {
        marginTop: 20
    }
});

export default EditDrillEquipmentScreen;