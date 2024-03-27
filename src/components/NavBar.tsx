import { useState } from "react";
const NavBar = () => {
  return (
    <nav className="nav-bar">
      <Logo />
      <SearchBar />
      <NumResults />
    </nav>
  );
};

const Logo = () => {
  return (
    <div className="logo">
      <span role="img">🚀</span>
      <h1>SearchMoviesApp</h1>
    </div>
  );
};

const NumResults = () => {
  return (
    <p className="num-results">
      Found <strong>X</strong> results
    </p>
  );
};

const SearchBar = () => {
  const [query, setQuery] = useState("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search Movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default NavBar;
