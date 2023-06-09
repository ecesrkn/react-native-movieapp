import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Detail from "../screens/Detail";
import { NavigationContainer } from "@react-navigation/native";
import NavigationBar from "../components/NavigationBar";
import Search from "../screens/Search";




export type RootStackParamList = {
    Home: undefined,
    Detail: { type: "movie" | "tv", id: number },
    Search: undefined
};



const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerTransparent: true,
                    header: ({ navigation }) => <NavigationBar navigation={navigation} main />
                }}
            />
            <Stack.Screen
                name="Detail"
                component={Detail}
                options={{
                    headerTransparent: true,
                    header: ({ navigation }) => <NavigationBar navigation={navigation} />
                }}
            />

            <Stack.Screen
                name="Search"
                component={Search}
                options={{
                    headerTransparent: true,
                    header: ({ navigation }) => <NavigationBar navigation={navigation} />
                }}
            />
        </Stack.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    );
}
