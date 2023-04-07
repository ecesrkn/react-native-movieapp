import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../navigation";

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function Detail({navigation, route}: Props) {
    return(
        <TouchableOpacity onPress={()=>navigation.goBack()} >
            <Text> Go back {route.params.type} </Text>
        </TouchableOpacity>
    )
}