import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/watchlist"
          element={<Watchlist />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;