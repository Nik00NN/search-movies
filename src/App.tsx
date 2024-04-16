import {useEffect, useState} from "react";
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

const KEY = '4e648649';

function App() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [watched, setWatched] = useState([]);

    useEffect(() => {
        fetch(` http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=wars`).then(
            res => res.json()
        ).then(data => setMovies(data.Search))
    }, []);

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}

export default App;
