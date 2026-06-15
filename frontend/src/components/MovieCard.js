import React, { useEffect, useState } from "react";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function MovieCard({ movie, onClick }) {
  const [poster, setPoster] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchPoster = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
            movie
          )}`
        );
        const data = await res.json();

        if (isMounted && data.results && data.results.length > 0) {
          const posterPath = data.results[0].poster_path;
          if (posterPath) {
            setPoster(`https://image.tmdb.org/t/p/w300${posterPath}`);
          }
        }
      } catch (err) {
        console.error("Poster fetch error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPoster();

    return () => {
      isMounted = false;
    };
  }, [movie]);

  const addToWatchlist = (e) => {
    e.stopPropagation();

    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    if (!watchlist.includes(movie)) {
      watchlist.push(movie);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      alert("Added to Watchlist");
    }
  };

  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      <div className="movie-poster">
        {poster ? (
          <img src={poster} alt={movie} />
        ) : (
          <span className="poster-fallback">{loading ? "⏳" : "🎬"}</span>
        )}
      </div>

      <h3>{movie}</h3>

      <button className="watch-btn" onClick={addToWatchlist}>
        ❤️ Watchlist
      </button>
    </div>
  );
}

export default MovieCard;