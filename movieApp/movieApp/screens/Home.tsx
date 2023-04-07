import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getDocumentaries, getFamilyMovies, getPopularMovies, getPopularTvShows, getUpcomingMovies } from "../data/services";
import { Movie, TVShow } from "../data/types";
import Swiper from "react-native-swiper";
import { MovieList, TvShowList } from "../components/List";
import ErrorPage from "../components/Error";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";

const dimensions = Dimensions.get("screen")
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: Props): JSX.Element {

    const [moviesImages, setMoviesImages] = useState<string[]>([])
    const [popularMovies, setPopularMovies] = useState<Movie[]>([])
    const [familyMovies, setFamilyMovies] = useState<Movie[]>([])
    const [documentaries, setDocumentaries] = useState<Movie[]>([])
    const [popularTvShows, setPopularTvShows] = useState<TVShow[]>([])
    const [error, setError] = useState<Error | undefined>(undefined)
    const [loaded, setLoaded] = useState(false)

    const getData = () => {
        return Promise.all([
            getUpcomingMovies(),
            getPopularMovies(),
            getPopularTvShows(),
            getFamilyMovies(),
            getDocumentaries()
        ])
    }

    useEffect(() => {
        const fetchShows = async () => {
            getData()
                .then(([upcomingMoviesData,
                    popularMoviesData,
                    popularTvShowsData,
                    familyMoviesData,
                    documentariesData
                ]) => {
                    const moviesImagesArray: string[] = []
                    upcomingMoviesData.forEach(movie => {
                        moviesImagesArray.push(`https://image.tmdb.org/t/p/w500${movie.poster_path}`)
                    })

                    setMoviesImages(moviesImagesArray)
                    setPopularMovies(popularMoviesData)
                    setPopularTvShows(popularTvShowsData)
                    setFamilyMovies(familyMoviesData)
                    setDocumentaries(documentariesData)
                    setLoaded(true)
                })
                .catch((err: Error) =>
                    setError(err))
        }

        fetchShows();

    }, [])


    return (
        <>
            {error
                ? <ErrorPage message1={error.name} message2={error.message} />
                : <>
                    {loaded
                        ? <ScrollView>
                            {/* Upcoming Movies - Big Swiper */}
                            {moviesImages && (
                                <View style={styles.sliderContainer} >
                                    <Swiper
                                        autoplay
                                        height={dimensions.height / 1.5}
                                        style={styles.swiper}
                                        dotStyle={styles.noDot}
                                        activeDotStyle={styles.noDot} >

                                        {moviesImages.map(image => {
                                            return (
                                                <Image
                                                    key={image}
                                                    source={{ uri: image }}
                                                    style={styles.poster} />
                                            )
                                        })}
                                    </Swiper>
                                </View>
                            )}
                            {/* Popular Movies */}
                            {popularMovies && (
                                <View style={styles.carousel} >
                                    <MovieList navigation={navigation} title={"Popular movies"} content={popularMovies} />
                                </View>
                            )}
                            {/* Popular TV Shows */}
                            {popularTvShows && (
                                <View style={styles.carousel} >
                                    <TvShowList navigation={navigation} title={"Popular TV shows"} content={popularTvShows}  />
                                </View>
                            )}
                            {/* Family Movies */}
                            {familyMovies && (
                                <View style={styles.carousel} >
                                    <MovieList navigation={navigation} title={"Family movies"} content={familyMovies}/>
                                </View>
                            )}
                            {/* Documentaries */}
                            {documentaries && (
                                <View style={styles.carousel} >
                                    <MovieList navigation={navigation} title={"Documentaries"} content={documentaries}  />
                                </View>
                            )}



                        </ScrollView>
                        : <View style={styles.loadingIndicator}>
                            <ActivityIndicator size="large" color={"pink"} />
                        </View>
                    }
                </>}
        </>

    );
}

const styles = StyleSheet.create({
    sliderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    carousel: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    poster: {
        resizeMode: "cover",
        flex: 1
    },
    swiper: {
        // marginTop: 20
    },
    noDot: {
        height: 0
    },
    loadingIndicator: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});
