import React, { useEffect, useState } from "react";

function Watchlist() {

  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {

    const saved =
      JSON.parse(localStorage.getItem("watchlist")) || [];

    setWatchlist(saved);

  }, []);

  return (
    <div>

      <h1>My Watchlist ❤️</h1>

      {watchlist.map((movie, index) => (
        <div key={index}>
          {movie}
        </div>
      ))}

    </div>
  );
}

export default Watchlist;