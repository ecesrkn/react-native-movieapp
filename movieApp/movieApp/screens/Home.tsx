import React, { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import { getDocumentaries, getFamilyMovies, getPopularMovies, getPopularTvShows, getUpcomingMovies } from "../data/services";
import { Movie, TVShow } from "../data/types";
import Swiper from "react-native-swiper";
import { MovieList, TvShowList } from "../components/List";

const dimensions = Dimensions.get("screen")

export default function Home(): JSX.Element {

    const [moviesImages, setMoviesImages] = useState<string[]>([])
    const [popularMovies, setPopularMovies] = useState<Movie[]>([])
    const [familyMovies, setFamilyMovies] = useState<Movie[]>([])
    const [documentaries, setDocumentaries] = useState<Movie[]>([])
    const [popularTvShows, setPopularTvShows] = useState<TVShow[]>([])
    const [error, setError] = useState<Error | undefined>(undefined)

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
                })
                .catch((err: Error) =>
                    setError(err))
        }

        fetchShows();

    }, [])


    return (
        <>
            <ScrollView>
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
                {popularMovies && (
                    <View style={styles.carousel} >
                        <MovieList title={"Popular movies"} content={popularMovies} />
                    </View>
                )}
                {popularTvShows && (
                    <View style={styles.carousel} >
                        <TvShowList title={"Popular TV shows"} content={popularTvShows} />
                    </View>
                )}
                {familyMovies && (
                    <View style={styles.carousel} >
                        <MovieList title={"Family movies"} content={familyMovies} />
                    </View>
                )}
                {documentaries && (
                    <View style={styles.carousel} >
                        <MovieList title={"Documentaries"} content={documentaries} />
                    </View>
                )}



            </ScrollView>


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
    }
});
