import pandas as pd
import pickle

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

df = pd.read_csv("../dataset/netflix_data.csv")

#fill missing value 

df["director"]= df["director"].fillna("")
df["cast"]= df ["cast"].fillna("")
df["listed_in"]= df ["listed_in"].fillna("")
df["description"]= df ["description"].fillna("")

df["tags"]= (
    df["director"] + " " +
    df["cast"] + " " +
    df["listed_in"] + " " +
    df["description"]
)

#TF - IDF 

tfidf = TfidfVectorizer(stop_words="english")

vectors = tfidf.fit_transform(df["tags"])

similarity = cosine_similarity(vectors)

#save files

pickle.dump(df,open("movies.pkl","wb"))
pickle.dump(similarity,open("similarity.pkl","wb"))

print("model created successfully! ")
