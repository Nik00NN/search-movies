import { MovieType } from "../types";
const MovieList = ({ movies }: { movies: MovieType[] }) => {
    return (
        <ul className="list">
            {movies.length > 0 ? (
                movies.map((movie) => (
                    <Movie movie={movie} key={movie.imdbID} />
                ))
            ) : (
                <li>No movies found</li>
            )}
        </ul>
    );
};

const Movie = ({ movie }: { movie: MovieType }) => {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};
export default MovieList;
