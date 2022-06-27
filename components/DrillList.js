import {FlatList, Image, Text, TouchableOpacity, useWindowDimensions} from "react-native";
import {Colors} from "../constants/colors";
import {getCategoryDisplayValue} from "../constants/categoryType";


const DrillList = ({drills, onPressDrill}) => {

    const {width} = useWindowDimensions();

    const imageDimension = width / 3 - 16;

    return (
        <FlatList
            data={drills}
            keyExtractor={(item) => item.drillId}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            renderItem={({item}) => (
                <TouchableOpacity style={{width: '32%', marginHorizontal: 2, marginBottom: 10}}
                                  activeOpacity={.6}
                                  onPress={() => onPressDrill(item)}>
                    <Image source={{ uri: `${item.demos.frontThumbnail.fileLocation}?${Date.now()}` }} style={{width: imageDimension, height: imageDimension, borderRadius: 5}} />
                    <Text style={{fontWeight: '600', marginTop: 5}}>{item.name}</Text>
                    <Text style={{color: Colors.TextSecondary}}>{getCategoryDisplayValue(item.category)}</Text>
                </TouchableOpacity>
            )}
        />
    )
}

export default DrillList;