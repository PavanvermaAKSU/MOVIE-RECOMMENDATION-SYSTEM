# 🎬 Movie Recommendation System

A full-stack content-based movie recommendation system that suggests similar movies based on genres, cast, crew, and keywords using cosine similarity. Built with a **React** frontend and a **FastAPI** backend, featuring a Netflix-inspired dark UI, real-time movie posters via the TMDB API, and a personal watchlist.

---

## ✨ Features

- 🔍 **Search with Autocomplete** – Live suggestions dropdown while typing
- 🎯 **Personalized Recommendations** – Get the top 10 similar movies for any title using cosine similarity
- 🖼️ **Real Movie Posters** – Fetched dynamically from the TMDB API
- 📄 **Movie Details Modal** – View poster, rating, release date, and overview in a popup
- 🎭 **Genre Filters** – Browse movies by genre with quick filter pills
- ❤️ **Watchlist** – Save favorite movies locally (persists via `localStorage`)
- 🔥 **Trending Movies Section** – Highlighted picks on the homepage
- 📜 **Pagination ("Load More")** – Efficiently browse large movie lists
- 🎨 **Netflix-Style UI** – Dark theme, responsive movie grid, hero banner, hover effects

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS (custom Netflix-style theme)
- TMDB API (posters & movie details)

### Backend
- FastAPI
- Python
- Pandas
- Scikit-learn (cosine similarity)
- Pickle (pre-computed model files)


---

## 📂 Project Structure

```
movie-recommendation-system/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── model/
│   │   ├── movies.pkl
│   │   └── similarity.pkl
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── SearchBar.js
│   │   │   ├── MovieCard.js
│   │   │   └── MovieModal.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   └── Watchlist.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.css
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js & npm
- Python 3.8+
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/movie-recommendation-system.git
cd movie-recommendation-system
```

### 2. Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate    # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload
```

The API will run at `http://localhost:8000`.

### 3. Frontend Setup (React)

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
REACT_APP_API_URL=http://localhost:8000
```

Start the development server:

```bash
npm start
```

The app will run at `http://localhost:3000`.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `GET` | `/movies` | Returns a list of all movie titles |
| `GET` | `/movies/full` | Returns movie titles with genre data |
| `GET` | `/recommend/{movie_name}` | Returns top 10 similar movies |
| `GET` | `/movie/{movie_name}` | Returns details for a specific movie |
| `GET` | `/genres` | Returns a list of all unique genres |

---

## 🧠 How It Works

1. **Data Preprocessing** – Movie metadata (genres, cast, keywords) is cleaned and combined into a single feature set.
2. **Feature Extraction** – Text features are vectorized to create a numerical representation of each movie.
3. **Cosine Similarity** – A similarity matrix is precomputed between all movies based on their feature vectors.
4. **Recommendation** – When a user selects a movie, the system returns the 10 most similar titles based on similarity scores.

---

## 🗺️ Roadmap / Future Improvements

- [ ] User authentication & personalized watchlists (cloud-synced)
- [ ] Collaborative filtering using user ratings
- [ ] Movie/TV type toggle
- [ ] Loading skeletons for smoother UX
- [ ] Recently viewed section
- [ ] Hybrid recommendation engine (content + collaborative)


---

## 🙌 Acknowledgements

- [TMDB API](https://www.themoviedb.org/documentation/api) for movie posters and metadata
- [TMDB 5000 Movie Dataset](https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata) for the dataset

---

## 👤 Author

**Pavan**
