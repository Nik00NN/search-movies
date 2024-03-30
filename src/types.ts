export interface MovieType {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface WatchedMovieType {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
}
