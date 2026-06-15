import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        🎬 MOVIE RECOMMENDATION SYSTEM
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/watchlist">
          ❤️ Watchlist
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;