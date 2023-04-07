import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../navigation";
import { useEffect, useState } from "react";
import { Movie, TVShow } from "../data/types";
import { getMovieDetail, getTvDetail } from "../data/services";

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function Detail({ navigation, route }: Props) {
    const { type, id } = route.params
    const [movie, setMovie] = useState<Movie | undefined>(undefined)
    const [tvShow, setTvShow] = useState<TVShow | undefined>(undefined)

    useEffect(() => {
      const fetch = () => {
        if(type==="movie"){
            getMovieDetail(id)
            .then(m => setMovie(m))
        }else{
            getTvDetail(id)
            .then(t => setTvShow(t))
        }
        
      }
      fetch()
    
    }, [])
    

    return (
        <TouchableOpacity onPress={() => navigation.goBack()} >
            <Text> Go back {type} </Text>
            <Text> Movie title: {movie?.title} </Text>
            <Text> Tv Show title: {tvShow?.name} </Text>
        </TouchableOpacity>
    )
}