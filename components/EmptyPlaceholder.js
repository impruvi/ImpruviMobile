import {Image, Text, View} from "react-native";
import EmptyGreyIcon from "../assets/icons/EmptyGrey.png";

const EmptyPlaceholder = ({text}) => {
    return (
        <View style={{paddingVertical: 25, width: '100%', alignItems: 'center', marginBottom: 20}}>
            <Image source={EmptyGreyIcon} style={{width: 80, height: 80, resizeMode: 'contain'}}/>
            <Text style={{color: '#BFBFBF', fontWeight: '500', fontSize: 13}}>{text}</Text>
        </View>
    )
}

export default EmptyPlaceholder;