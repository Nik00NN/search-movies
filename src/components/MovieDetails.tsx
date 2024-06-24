import {useEffect, useState} from "react";
import StarRating from "./StarRating.tsx";
import Loader from "./Loader.tsx";

const KEY = '4e648649';

const MovieDetails = ({selectedId, onCloseMovieDetails}: { selectedId: string }) => {
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
        Genre: genre
    } = movie;
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        async function getMovieDetails() {
            setIsLoading(true)
            const res = await fetch(` http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
            const data = await res.json();

            setMovie(data)
            setIsLoading(false)
        }

        getMovieDetails()
    }, [selectedId]);

    return (
        <div className="details">
            {isLoading ? <Loader/> : <>
                <header>
                    <img src={poster} alt={`Poster of ${movie} movie`}/>
                    <div className="details-overview">
                        <h2>{title}</h2>
                        <p>{released} &bull; {runtime}</p>
                        <p>{genre}</p>
                        <p><span>⭐</span>{imdbRating} IMDB rating</p>
                    </div>
                    <button className="btn-back" onClick={onCloseMovieDetails}>
                        &larr;
                    </button>
                </header>
                <section>
                    <div className="rating">
                        <StarRating maxRating={10} size={25}/>
                    </div>
                    <p><em>{plot}</em></p>
                    <p>Starring: {actors}</p>
                    <p>Directed by {director}</p>
                </section>
            </>}

        </div>
    )
}

export default MovieDetails;