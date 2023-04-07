import { FlatList, StyleSheet, Text, View } from "react-native";
import { Movie, TVShow } from "../data/types";
import Card from "./Card";
import React from 'react'
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";

export class MovieList extends React.PureComponent<{
    title: string, 
    content: Movie[],
    navigation: NativeStackNavigationProp<RootStackParamList, "Home">
}> {
    render() {
        const { title, content, navigation } = this.props
        return (
            <View style={styles.list}>
                <View>
                    <Text style={styles.text}>{title}</Text>
                </View>
                <FlatList
                    data={content}
                    horizontal
                    renderItem={({ item }) =>
                        <Card navigation={navigation} movie={item}  />
                    }
                />
            </View>
        )
    }
}

export class TvShowList extends React.PureComponent<{
    title: string, 
    content: TVShow[],
    navigation: NativeStackNavigationProp<RootStackParamList, "Home">
}> {
    render() {
        const { title, content, navigation } = this.props
        return (
            <View style={styles.list}>
                <View>
                    <Text style={styles.text}>{title}</Text>
                </View>
                <FlatList
                    data={content}
                    horizontal
                    renderItem={({ item }) =>
                        <Card navigation={navigation} tvShow={item}/>
                    }
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 20
    },
    list: {
        marginTop: 25,

    }
})