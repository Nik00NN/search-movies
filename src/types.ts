interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface WatchedMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
}
