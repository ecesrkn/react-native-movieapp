import { Image, StyleSheet, Text, TouchableOpacity } from "react-native"
import { Movie, TVShow } from "../data/types"

type CardProps = {
    movie?: Movie,
    tvShow?: TVShow,
}

type CardItem = {
    poster_path: string,
    title: string
}
const placeholderImage = require("../assets/images/placeholder.jpg")

export default function Card({ movie, tvShow }: CardProps) {
    const item: CardItem = movie
        ? {
            poster_path: movie.poster_path,
            title: movie.title
        }
        : {
            poster_path: tvShow!.poster_path,
            title: tvShow!.name
        }
    return (
        <TouchableOpacity style={styles.contianer}>
            <Image
                style={styles.image}
                source={
                    item.poster_path
                        ? { uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }
                        : placeholderImage}

            />
            {
                !item.poster_path && (
                    <Text style={styles.movieName}>{item.title}</Text>
                )
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    contianer: {
        padding: 5,
        position: "relative",
        alignItems: "center",
        height: 200
    },
    image: {
        height: 200,
        width: 120,
        borderRadius: 20,
        resizeMode: "cover"
    },
    movieName: {
        position: "absolute",
        width: 100,
        textAlign: "center",
        top: 10
    }
})