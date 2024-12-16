import { useState } from "react";

const moviesApiUrl = import.meta.env.VITE_THEMOVIEDB_API_URL;
const apiKey = import.meta.env.VITE_THEMOVIEDB_API_KEY;

const defaultFormData = {
  searchedWord: "harry",
};

export default function HomePage() {
  const [formData, setFormData] = useState(defaultFormData);
  const [moviesData, setMoviesData] = useState([]);

  // la funzione che fa il fetch andrà poi nel context
  const fetchMovies = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + apiKey,
      },
    };
    fetch(`${moviesApiUrl}?query=${formData.searchedWord}`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const handleFormData = (e) => {
    const newValue = e.target.value;

    setFormData({
      searchedWord: newValue,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetchMovies();
    setFormData(defaultFormData);
  };

  return (
    <div className="container py-5">
      <h1>Home</h1>

      <div className="search-bar">
        <form onSubmit={handleFormSubmit}>
          <input
            id="search-input"
            onChange={handleFormData}
            value={formData.searchedWord}
            className="form-control"
            type="text"
            name="searchedWord"
          />
          <button className="btn btn-primary">Cerca</button>
        </form>
      </div>
    </div>
  );
}
