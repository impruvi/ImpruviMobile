import {Image, Text, View} from "react-native";
import {Colors} from "../constants/colors";
import {getCategoryDisplayValue} from "../constants/categoryType";
import Box from "./Box";

const SessionDrillItem = ({drill}) => {
    return (
        <Box key={drill.drillId} style={{flexDirection: 'row'}}>
            <View style={{padding: 15}}>
                <Image source={{uri: drill.demos.frontThumbnail.fileLocation}} style={{width: 60, height: 90, borderRadius: 3}}/>
            </View>
            <View style={{paddingVertical: 20, paddingRight: 20, flex: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                    <View style={{flexWrap: 'wrap', flexDirection: 'row', flex: 1}}>
                        <Text style={{fontWeight: '500', marginBottom: 3, flex: 1, flexWrap: 'wrap'}}>
                            {drill.name}
                        </Text>
                    </View>
                </View>
                <Text style={{fontWeight: '500', color: Colors.TextSecondary}}>
                    {getCategoryDisplayValue(drill.category)}
                </Text>
                {!!drill.notes && (
                    <Text style={{marginTop: 10}}>{drill.notes}</Text>
                )}
            </View>
        </Box>
    )
}

export default SessionDrillItem;