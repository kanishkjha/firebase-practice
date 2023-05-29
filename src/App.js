import React, { useState, useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import { db, auth, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);
  const moviesCollectionRef = collection(db, "movies");

  // New movie states
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(null);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  // Update state
  const [updatedTitle, setUpdatedTitle] = useState("");

  // File upload
  const [fileUpload, setFileUpload] = useState(null);

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
        userId: auth?.currentUser?.uid,
      });
      setIsNewMovieOscar(false);
      setNewMovieTitle("");
      setNewReleaseDate(0);
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const updateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { title: updatedTitle });
      getMovieList();
    } catch (err) {
      console.log(err.message);
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

  const uploadFile = async () => {
    if (!fileUpload) {
      return;
    }

    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    console.log(fileUpload.name);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
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
          value={newMovieTitle}
        />
        <input
          type="number"
          name=""
          id=""
          className="inputField"
          placeholder="Enter the release date..."
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
          value={newReleaseDate}
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
              <input
                type="text"
                className="inputField"
                placeholder="Update the title if you want..."
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <button
                onClick={() => updateMovieTitle(movie.id)}
                className="delete-button"
                style={{
                  margin: 20,
                  width: "max-content",
                  marginLeft: "auto",
                  marginRight: "auto",
                  padding: "7px",
                  backgroundColor: "yellow",
                  color: "black",
                }}
              >
                Update the movie title
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <input
          type="file"
          name=""
          id=""
          placeholder=""
          className="input-file"
          onChange={(e) => setFileUpload(e.target.files[0])}
        />
        <button
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "18px",
            marginTop: "20px",
            marginBottom: "20px",
            width: "max-content",
            padding: "7px",
            backgroundColor: "grey",
            color: "white",
          }}
          onClick={uploadFile}
        >
          Upload the image
        </button>
      </div>
    </div>
  );
}

export default App;
