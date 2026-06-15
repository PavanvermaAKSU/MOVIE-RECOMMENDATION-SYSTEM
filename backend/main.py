from fastapi import FastAPI
import pickle
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

movies = pickle.load(open("model/movies.pkl","rb"))
similarity = pickle.load(open("model/similarity.pkl","rb"))

@app.get("/")
def home():
    return {"message":"Movie recommendation api running"}

@app.get("/movies")
def get_movies():
    return movies["title"].tolist()

@app.get("/recommend/{movie_name}")
def recommend(movie_name: str):

    movie_name = movie_name.lower()

    movie_index = None

    for i, title in enumerate(movies["title"]):
        if str(title).lower() == movie_name:
            movie_index = i
            break

    if movie_index is None:
        return {"error": "Movie not found"}

    distances = similarity[movie_index]

    movies_list = sorted(
        list(enumerate(distances)),
        reverse=True,
        key=lambda x: x[1]
    )[1:11]

    recommendations = []

    for movie in movies_list:
        recommendations.append(
            movies.iloc[movie[0]].title
        )

    return recommendations

@app.get("/movie/{movie_name}")
def movie_details(movie_name:str):

    movie = movies[
        movies["title"].str.lower() == movie_name.lower()
    ]

    if movie.empty:
        return{"error":"movie not found"}
    
    movie = movie.iloc[0]

    return{
        "title":movie["title"],
        "type":movie["type"],
        "year": int(movie["release_year"]),
        "rating": str(movie["rating"]),
        "genre": str(movie["listed_in"]),
        "description": str(movie["desctiption"])
    }

@app.get("/genres")
def genres_list():
    all_genres = set()

    for genre_list in movies["listed_in"]:
        for genre in str(genre_list).split(","):
            g = genre.strip()
            if g and g.lower() != "nan":
                all_genres.add(g)

    return sorted(all_genres)

@app.get("/movies/full")
def get_movies_full():
    return movies[["title","listed_in"]].fillna("").to_dict(orient="records")
