import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating.tsx";
import Loader from "./Loader.tsx";

const KEY = "4e648649";

const MovieDetails = ({
  selectedId,
  onCloseMovieDetails,
  onAddWatchedMovie,
  watched,
}: {
  selectedId: string;
}) => {
  const [movie, setMovie] = useState({});
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) {
      countRef.current = countRef.current++;
    }
  }, [userRating]);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const handleAddToWatched = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };

    onAddWatchedMovie(newWatchedMovie);
    onCloseMovieDetails();
  };

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        ` http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.json();

      setMovie(data);
      setIsLoading(false);
    }

    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return function () {
      document.title = "Search Movies";
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
            <button className="btn-back" onClick={onCloseMovieDetails}>
              &larr;
            </button>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={25}
                    onSetRating={setUserRating}
                  />{" "}
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddToWatched}>
                      Add to Watched list
                    </button>
                  )}{" "}
                </>
              ) : (
                <p>You rated this movie {watchedUserRating}⭐</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
