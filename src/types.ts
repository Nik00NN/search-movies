export interface MovieType {
  Title:string,
  Year:string,
  imdbID:string,
  Type:string,
  Poster:string
}

export interface WatchedMovieType {
  imdbID: string;
  title: string;
  year: string;
  poster: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
}
