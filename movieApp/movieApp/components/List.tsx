import { FlatList, StyleSheet, Text, View } from "react-native";
import { Movie, TVShow } from "../data/types";
import Card from "./Card";
import React from 'react'

export class MovieList extends React.PureComponent<{
    title: string, 
    content: Movie[],
}> {
    render() {
        const { title, content } = this.props
        return (
            <View style={styles.list}>
                <View>
                    <Text style={styles.text}>{title}</Text>
                </View>
                <FlatList
                    data={content}
                    horizontal
                    renderItem={({ item }) =>
                        <Card movie={item}  />
                    }
                />
            </View>
        )
    }
}

export class TvShowList extends React.PureComponent<{
    title: string, 
    content: TVShow[],
}> {
    render() {
        const { title, content } = this.props
        return (
            <View style={styles.list}>
                <View>
                    <Text style={styles.text}>{title}</Text>
                </View>
                <FlatList
                    data={content}
                    horizontal
                    renderItem={({ item }) =>
                        <Card tvShow={item}/>
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