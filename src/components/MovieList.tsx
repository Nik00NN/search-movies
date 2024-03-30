import { MovieType } from "../types";
import { Movie } from "./ListBox";
const MovieList = ({ movies }: { movies: MovieType[] }) => {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
};

export default MovieList;
