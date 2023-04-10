import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { ParamListBase } from "@react-navigation/native";

type NavigationBarProps = {
    main?: boolean,
    navigation: NativeStackNavigationProp<ParamListBase, string>
}

export default function NavigationBar({ main = false, navigation }: NavigationBarProps) {

    return (
        <SafeAreaView>
            {main
                ? (<View style={styles.mainBar}>
                    <IconMC name="popcorn"
                        size={50}
                        color={"#89CFF0"}
                        style={styles.shadow}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                        <Icon name="search"
                            size={30}
                            color={"white"}
                        />
                    </TouchableOpacity>
                </View>)
                : <View>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <Icon name="chevron-back"
                            size={40}
                            color={"#fff"} />
                    </TouchableOpacity>
                </View>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    shadow: {
        textShadowOffset: { width: 2, height: 2 },
        textShadowColor: 'black',
        shadowOpacity: 0.6,
        textShadowRadius: 5,
    },
    mainBar: {
        padding: 6,
        flexDirection: "row",
        justifyContent: "space-between",
    }
})

