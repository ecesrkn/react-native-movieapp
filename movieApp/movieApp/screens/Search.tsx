import { useEffect, useState } from "react"
import { Movie, TVShow } from "../data/types"
import { searchMovie, searchTv } from "../data/services"
import { FlatList, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { RootStackParamList } from "../navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MovieList, TvShowList } from "../components/List";
import Icon from "react-native-vector-icons/Ionicons";
import Card from "../components/Card";


type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;
type ComposedListItem = {
    type: "movie" | "tv",
    movie?: Movie,
    show?: TVShow
}

export default function Search({ navigation }: Props) {
    const [query, setQuery] = useState("")
    const [searchBar, setSearchBar] = useState("")
    const [moviesList, setMoviesList] = useState<Movie[]>([])
    const [tvShowsList, setTvShowsList] = useState<TVShow[]>([])
    const [composedList, setComposedList] = useState<ComposedListItem[]>([])
    // const [loaded, setLoaded] = useState(false)

    const getData = () => {
        return Promise.all([
            searchMovie(query),
            searchTv(query)
        ])
    }

    useEffect(() => {
        const search = async () => {
            getData().then(([movies, shows]) => {
                setMoviesList(movies)
                setTvShowsList(shows)
                setComposedList([])
                movies.map(movie => {
                    setComposedList((movies) => [...movies, { type: "movie", movie: movie }])
                })
                shows.map(show => {
                    setComposedList((shows) => [...shows, { type: "tv", show: show }])
                })
                // setLoaded(true)
            })
        }
        search()

    }, [query])

    const renderCards = (item: ComposedListItem) => {
        if (item.type === "movie") {
            return <Card movie={item.movie!} navigation={navigation as never} />
        } else {
            return <Card tvShow={item.show!} navigation={navigation as never} />
        }
    }

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder={'Search Movie or TV Show'}
                        placeholderTextColor={"grey"}
                        onChangeText={setSearchBar}
                        value={searchBar}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        setQuery(searchBar)
                        Keyboard.dismiss()}}>
                    <Icon name={'search-outline'} size={30} color={"#e4e4e4"}/>
                </TouchableOpacity>
            </View>

            <FlatList
                data={composedList}
                numColumns={3}
                renderItem={({ item }: { item: ComposedListItem }) => renderCards(item)} />


        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 15,
        borderWidth: 0.8,
        height: 50,
        padding: 8,
        color: "#e4e4e4",
        borderColor: "#e4e4e4"
    },
    container: {
        padding: 10,
        paddingTop: 60,
        flexDirection: 'row',
        alignItems: 'center',
    },
    form: {
        flexBasis: 'auto',
        flexGrow: 1,
        paddingRight: 8,
    },

    searchItems: {
        padding: 5,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 10,
        color: "grey"
    },
    main: {
        flex:1,
        backgroundColor: "#2a2a2a",
        alignItems: "center"
    }

});
