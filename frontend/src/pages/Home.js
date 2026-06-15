import React, { useEffect, useState } from "react";
import API from "../services/api";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
import MovieModal from "../components/MovieModals";


function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [visibleCount, setVisibleCount] = useState(50);
  const [moviesFull, setMoviesFull] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    API.get("/movies/full")
      .then((res) => setMoviesFull(res.data))
      .catch(console.error);

    API.get("/genres")
      .then((res) => setGenres(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    API.get("/movies")
      .then((res) => {
        setMovies(res.data);
      })
      .catch(console.error);
  }, []);

  const getRecommendations = async (movie) => {
    try {
      const res = await API.get(`/recommend/${movie}`);
      setRecommendations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRecommendFromModal = (movie) => {
    getRecommendations(movie);
    setSelectedMovie(null);
  };

  const genreMap = {};
  moviesFull.forEach((m) => {
    genreMap[m.title] = m.listed_in;
  });

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.toLowerCase().includes(search.toLowerCase());
    const matchesGenre =
      selectedGenre === "All" ||
      (genreMap[movie] && genreMap[movie].includes(selectedGenre));
    return matchesSearch && matchesGenre;
  });

  const trending = movies.slice(0, 10);

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="hero">
        <h1>Unlimited Movies & Recommendations</h1>
        <p>Discover your next favorite movie.</p>
      </div>

      <SearchBar 
        value={search}
        onChange={(val) => {
          setSearch(val);
          setVisibleCount(50);
        }}
        movies={movies}
        onSelect={(movie) => setSelectedMovie(movie)} 
      />

      {/* Recommended Movies - shown only after a movie is clicked */}
      {recommendations.length > 0 && (
        <>
          <h2>🎯 Recommended Movies</h2>
          <div className="movie-grid">
            {recommendations.map((movie, index) => (
              <MovieCard
                key={index}
                movie={movie}
                onClick={setSelectedMovie}
              />
            ))}
          </div>
        </>
      )}

      {/* Trending Movies */}
      <h2>🔥 Trending Movies</h2>
      <div className="movie-grid">
        {trending.map((movie, index) => (
          <MovieCard
            key={index}
            movie={movie}
            onClick={setSelectedMovie}
          />
        ))}
      </div>

      <div className="genre-filter">
        <button
          className={selectedGenre === "All" ? "genre-btn active" : "genre-btn"}
          onClick={() => {
            setSelectedGenre("All");
            setVisibleCount(50);
          }}
        >
          All
        </button>

        {genres.map((g, i) => (
          <button
            key={i}
            className={selectedGenre === g ? "genre-btn active" : "genre-btn"}
            onClick={() => {
              setSelectedGenre(g);
              setVisibleCount(50);
            }}
          >
           {g}
          </button>
        ))}
      </div>

      {/* Search Results / Full Movie List */}
      <h2>🎬 All Movies</h2>
      <div className="movie-grid">
        {filteredMovies.slice(0, visibleCount).map((movie, index) => (
          <MovieCard
            key={index}
            movie={movie}
            onClick={setSelectedMovie}
          />
        ))}
      </div>
      
      {visibleCount < filteredMovies.length &&(
        <div className="load-more-wrapper">
          <button
          className="load-more-btn"
          onClick={() => setVisibleCount((prev) => prev +50)}
          >
            Load more
          </button>
        </div>
      )}

      {selectedMovie && (
        <MovieModal
        movie= {selectedMovie}
        onClosem= {() => setSelectedMovie(null)}
        onRecommend={handleRecommendFromModal}
        />
      )}

    </div>
  );
}

export default Home;