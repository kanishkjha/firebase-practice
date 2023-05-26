import React, { useState, useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import { db } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [movieList, setMovieList] = useState([]);
  const moviesCollectionRef = collection(db, "movies");

  // New movie states
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitNewMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        recievedAnOscar: isNewMovieOscar,
      });
      setIsNewMovieOscar(false);
      setNewMovieTitle("");
      setNewReleaseDate(0);
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <Auth />
      <div>
        <input
          type="text"
          name=""
          id=""
          className="inputField"
          placeholder="Enter a movie..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          type="number"
          name=""
          id=""
          className="inputField"
          placeholder="Enter the release date..."
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <label id="recievedAnOscar">
          Did recieve an oscar or not?
          <input
            type="checkbox"
            name="recievedAnOscar"
            checked={isNewMovieOscar}
            onChange={(e) => setIsNewMovieOscar(e.target.checked)}
          />
        </label>
        <button
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
          }}
          className="submitButton"
          onClick={onSubmitNewMovie}
        >
          Add a movie
        </button>
      </div>
      <div>
        <div>
          {movieList.map((movie) => (
            <div key={movie.title}>
              <h2 style={{ color: movie.recievedAnOscar ? "green" : "red" }}>
                {movie.title}
              </h2>
              <p>Date : {movie.releaseDate}</p>
              <button
                className="delete-button"
                onClick={() => deleteMovie(movie.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
