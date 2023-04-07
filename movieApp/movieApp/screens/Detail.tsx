import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../navigation";
import { useEffect, useState } from "react";
import { Genre, Movie, TVShow } from "../data/types";
import { getMovieDetail, getTvDetail } from "../data/services";
import StarRating from "react-native-star-rating";
import { format } from "date-fns";
import PlayButton from "../components/PlayButton";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VideoPlayer from "react-native-video-controls"

const dimensions = Dimensions.get("screen")
type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;
const placeholderImage = require("../assets/images/placeholder.jpg")

export default function Detail({ navigation, route }: Props) {
    const { type, id } = route.params
    const [movie, setMovie] = useState<Movie | undefined>(undefined)
    const [tvShow, setTvShow] = useState<TVShow | undefined>(undefined)
    const [loaded, setLoaded] = useState(false);
    const [posterPath, setPosterPath] = useState("")
    const [genres, setGenres] = useState<Genre[]>([])
    const [formattedDate, setFormattedDate] = useState("")
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        if (type === "movie") {
            getMovieDetail(id)
                .then(m => {
                    setMovie(m.movie)
                    setPosterPath(m.movie.poster_path)
                    setGenres(m.genres)
                    setFormattedDate(format(new Date(m.movie.release_date), "MMMM dd, yyyy"))
                    setLoaded(true)
                })
        } else {
            getTvDetail(id)
                .then(t => {
                    setTvShow(t.tvShow)
                    setPosterPath(t.tvShow.poster_path)
                    setFormattedDate(format(new Date(t.tvShow.first_air_date), "MMMM dd, yyyy"))
                    setGenres(t.genres)
                    setLoaded(true)
                })
        }

    }, [])


    return (
        loaded
            ? <><ScrollView>
                <Image
                    style={styles.image}
                    source={
                        posterPath
                            ? { uri: `https://image.tmdb.org/t/p/w500${posterPath}` }
                            : placeholderImage}

                />
                {
                    !posterPath && (
                        <Text style={styles.movieName}>{movie ? movie.title : tvShow?.name}</Text>
                    )
                }

                <View style={styles.container}>
                    <View style={styles.playButton}>
                        <PlayButton handlePress={() => setModalVisible(true)} />
                    </View>
                    <Text style={styles.title}>{movie ? movie.title : tvShow?.name}</Text>
                    <View style={styles.genresContainer}>

                        {genres.map(genre =>
                            <Text style={styles.genre} key={genre.id}>{genre.name}</Text>
                        )}
                    </View>

                    <StarRating
                        maxStars={5}
                        disabled
                        fullStarColor="#FFC733"
                        starSize={30}
                        rating={movie ? (movie.vote_average / 2) : (tvShow!.vote_average / 2)} />

                    <Text style={styles.overiew}>
                        {movie ? movie.overview : tvShow!.overview}
                    </Text>
                    <Text style={styles.release} >
                        Release date: {formattedDate}
                    </Text>
                </View>
            </ScrollView>
                <Modal
                    animationType="slide"
                    visible={modalVisible}
                >
                    <View style={styles.container}>
                        <VideoPlayer source={{
                            uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        }}
                            // navigator={navigation}
                            onBack={() => setModalVisible(false)} />
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text>Close modal</Text>
                        </TouchableOpacity>
                    </View>

                </Modal>
            </>
            : <View style={styles.loadingIndicator}>
                <ActivityIndicator size="large" color={"pink"} />
            </View>

    )
}

const styles = StyleSheet.create({
    image: {
        height: dimensions.height / 2.5
    },
    movieName: {
        position: "absolute",
        width: 100,
        textAlign: "center",
        top: 10
    },
    loadingIndicator: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 5
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    genresContainer: {
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 20
    },
    genre: {
        color: "grey",
        alignContent: "center",
        fontFamily: "monospace",
        marginHorizontal: 4
    },
    overiew: {
        padding: 10,
        textAlign: "justify"
    },
    release: {
        fontWeight: "bold"
    },
    playButton: {
        position: "absolute",
        zIndex: 100,
        top: -40,
        right: 15
    }
});