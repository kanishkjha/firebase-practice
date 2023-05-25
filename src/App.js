import React, { useState, useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import { db } from "./config/firebase";
import { getDocs, collection } from "firebase/firestore";

function App() {
  const [movieList, setMovieList] = useState([]);
  const moviesCollectionRef = collection(db, "movies");

  // New movie states
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  useEffect(() => {
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

    getMovieList();
  }, []);

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
        />
        <input
          type="number"
          name=""
          id=""
          className="inputField"
          placeholder="Enter the release date..."
        />
        <label id="recievedAnOscar">
          Did recieve an oscar or not?
          <input type="checkbox" name="recievedAnOscar" />
        </label>
        <button
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
          }}
          className="submitButton"
        >
          Add a movie
        </button>
      </div>
      <div>
        <div>
          {movieList.map((movie) => (
            <>
              <h2 style={{ color: movie.recievedAnOscar ? "green" : "red" }}>
                {movie.title}
              </h2>
              <p>Date : {movie.releaseDate}</p>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
