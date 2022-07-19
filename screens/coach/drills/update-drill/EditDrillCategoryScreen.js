import {useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import EditHeader from "../../../../components/EditHeader";
import {Picker} from "@react-native-picker/picker";
import {CategoryType} from "../../../../constants/categoryType";
import EditContainer from "../../../../components/EditContainer";

const EditDrillCategoryScreen = ({route}) => {

    const [category, setCategory] = useState(route.params.category);

    const navigation = useNavigation();

    const onSave = () => {
        route.params.setCategory(category);
        navigation.goBack();
    }

    return (
        <EditContainer>
            <EditHeader onCancel={() => navigation.goBack()}
                        onSave={onSave}
                        title={'Category'}/>
            <Picker
                selectedValue={category}
                onValueChange={itemValue => setCategory(itemValue)}>
                {Object.entries(CategoryType).map(categoryType => {
                    return (
                        <Picker.Item label={categoryType[0]} value={categoryType[1]} />
                    )
                })}
            </Picker>
        </EditContainer>
    )
}

export default EditDrillCategoryScreen;

