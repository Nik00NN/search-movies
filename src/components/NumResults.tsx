import { MovieType } from "../types";

const NumResults = ({ movies }: { movies: MovieType[] }) => {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};

export default NumResults;
