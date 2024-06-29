import { useEffect, useRef } from "react";

const SearchBar = ({ query, setQuery }) => {
  const inputElement = useRef(null);

  useEffect(() => {
    function callback(e) {
      if (document.activeElement === inputElement.current) {
        return;
      }

      if (e.code === "Enter") {
        inputElement.current.focus();
        setQuery("");
      }
    }

    document.addEventListener("keydown", callback);
  }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search Movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElement}
    />
  );
};

export default SearchBar;
