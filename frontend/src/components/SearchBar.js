import React, { useState } from "react";

function SearchBar({ value, onChange, movies, onSelect }) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions =
    value.length > 0
      ? movies
          .filter((movie) =>
            movie.toLowerCase().includes(value.toLowerCase())
          )
          .slice(0, 6)
      : [];

  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Search Movie..."
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
      />

      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((movie, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => {
                onSelect(movie);
                onChange("");
                setShowSuggestions(false);
              }}
            >
              {movie}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;