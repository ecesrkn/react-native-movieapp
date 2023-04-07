export type Movie = {
  adult: boolean,
  original_title: string,
  release_date: string,
  title: string,
  video: false,
} & Screenplay

export type TVShow = {
  first_air_date: string,
  name: string,
  origin_country: string[],
  original_name: string,
} & Screenplay


interface Screenplay {
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  original_language: string,
  overview: string,
  popularity: number,
  poster_path: string,
  vote_average: number,
  vote_count: number
}

export type Genre = {
  name: string,
  id: number
}