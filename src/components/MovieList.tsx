import { MovieType } from "../types";
const MovieList = ({ movies, onSelectMovie }: { movies: MovieType[] }) => {

    return (
        <ul className="list list-movies">
            {movies.length > 0 ? (
                movies.map((movie) => (
                    <Movie movie={movie} key={movie.imdbID} onSelectMovie ={onSelectMovie}/>
                ))
            ) : (
                ""
            )}
        </ul>
    );
};

const Movie = ({ movie, onSelectMovie }: { movie: MovieType }) => {
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
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
