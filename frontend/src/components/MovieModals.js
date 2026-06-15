import React, { useEffect, useState } from "react";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function MovieModal({ movie, onClose, onRecommend }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchDetails = async () => {
      try {
        const searchRes = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
            movie
          )}`
        );
        const searchData = await searchRes.json();

        if (isMounted && searchData.results && searchData.results.length > 0) {
          setDetails(searchData.results[0]);
        }
      } catch (err) {
        console.error("Details fetch error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDetails();
    return () => {
      isMounted = false;
    };
  }, [movie]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {loading ? (
          <p>Loading...</p>
        ) : details ? (
          <div className="modal-body">
            {details.poster_path && (
              <img
                className="modal-poster"
                src={`https://image.tmdb.org/t/p/w300${details.poster_path}`}
                alt={movie}
              />
            )}

            <div className="modal-info">
              <h2>{movie}</h2>

              <p className="modal-meta">
                ⭐ {details.vote_average?.toFixed(1) || "N/A"} &nbsp;|&nbsp;
                📅 {details.release_date || "Unknown"}
              </p>

              <p className="modal-overview">
                {details.overview || "No description available."}
              </p>

              <button
                className="watch-btn"
                onClick={() => onRecommend(movie)}
              >
                🎯 Show Similar Movies
              </button>
            </div>
          </div>
        ) : (
          <div className="modal-body">
            <h2>{movie}</h2>
            <p>No additional details found.</p>
            <button className="watch-btn" onClick={() => onRecommend(movie)}>
              🎯 Show Similar Movies
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieModal;