import React, {useEffect, useState} from "react";
import Main from "./components/Main";
import NavBar from "./components/NavBar";
import Logo from "./components/Logo";
import SearchBar from "./components/SearchBar";
import NumResults from "./components/NumResults";
import MovieList from "./components/MovieList";
import Box from "./components/Box";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import {MovieType} from "./types.ts";
import Loader from "./components/Loader.tsx";
import ErrorMessage from "./components/ErrorMessage.tsx";
import MovieDetails from "./components/MovieDetails.tsx";

const KEY = '4e648649';

function App() {
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    const handleSelectMovie = (id) => {
        setSelectedId(selectedId => id === selectedId ? null : id);
    }

    const handleCloseMovieDetails = () => {
        setSelectedId(null);
    }

    const handleAddWatchedMovie = (movie) => {
        setWatched(watched => [...watched, movie])
    }

    const handleDeleteWatchedMovie = (id) => {
        setWatched(watched => watched.filter(movie => movie.imdbID !== id))
    }

    useEffect(
        function () {
            const controller = new AbortController();


            async function fetchMovies() {
                try {
                    setIsLoading(true);
                    setError("");

                    const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`, {signal: controller.signal});

                    if (!res.ok) throw new Error("Something went wrong with fetching movies")

                    const data = await res.json();

                    if (data.Response === 'False') throw new Error('Movie not found')
                    setMovies(data.Search);
                    setError("");
                } catch (err) {
                    console.error(err.message);

                    if(err.name !== "AbortError"){
                        setError(err.message);
                    }

                } finally {
                    setIsLoading(false);
                }
            }

            if (query.length < 3) {
                setMovies([]);
                setError("");
                return;
            }

            fetchMovies();

            return function (){
                controller.abort();
            }
        }, [query]);

    return (
        <>
            <NavBar>
                <Logo/>
                <SearchBar query={query} setQuery={setQuery}/>
                <NumResults movies={movies}/>
            </NavBar>
            <Main>
                <Box>
                    {isLoading && <Loader/>}
                    {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>}
                    {error && <ErrorMessage message={error}/>}
                </Box>
                <Box>
                    {selectedId ? (
                        <MovieDetails selectedId={selectedId} onCloseMovieDetails={handleCloseMovieDetails}
                                      onAddWatchedMovie={handleAddWatchedMovie} watched={watched}/>) : (
                        <>
                            <WatchedSummary watched={watched}/>
                            <WatchedMoviesList watched={watched} onDeleteWatchedMovie={handleDeleteWatchedMovie}/>
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}

export default App;
