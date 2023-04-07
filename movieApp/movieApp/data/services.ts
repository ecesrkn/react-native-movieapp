import axios from "axios"
import { Genre, Movie, TVShow } from "./types";


const API_KEY = "api_key=41e409a3cf79fdd5cd7dae4026f0f83f"
const BASE_URL = "https://api.themoviedb.org/3"
const genre_Ids = {
    "Family": "10751",
    "Documentary": "99"
}

export async function getPopularMovies(): Promise<Movie[]> {
    const result = await axios.get(`${BASE_URL}/movie/popular?${API_KEY}`)
    return result.data.results;

}

export async function getUpcomingMovies(): Promise<Movie[]> {
    const result = await axios.get(`${BASE_URL}/movie/upcoming?${API_KEY}`)
    return result.data.results;

}

export async function getPopularTvShows(): Promise<TVShow[]> {
    const result = await axios.get(`${BASE_URL}/tv/popular?${API_KEY}`)
    return result.data.results;

}

export async function getFamilyMovies(): Promise<Movie[]> {
    const result = await axios.get(`${BASE_URL}/discover/movie?${API_KEY}&sort_by=popularity.desc&with_genres=${genre_Ids.Family}`)
    return result.data.results;

}

export async function getDocumentaries(): Promise<Movie[]> {
    const result = await axios.get(`${BASE_URL}/discover/movie?${API_KEY}&sort_by=popularity.desc&with_genres=${genre_Ids.Documentary}`)
    return result.data.results;

}


export async function getMovieDetail(id: number): Promise<{
    movie: Movie,
    genres: Genre[]
}> {
    const result = await axios.get(`${BASE_URL}/movie/${id}?${API_KEY}`)
    return {
        movie: result.data as Movie,
        genres: result.data.genres
    };

}

export async function getTvDetail(id: number): Promise<{
    tvShow: TVShow,
    genres: Genre[]
}> {
    const result = await axios.get(`${BASE_URL}/tv/${id}?${API_KEY}`)
    return {
        tvShow: result.data as TVShow,
        genres: result.data.genres
    };

}