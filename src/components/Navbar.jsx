import { searchContext } from "../contexts/SearchContext";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmRjOGU5ZWYxZTJiNDBiYzJiM2JhYWQyOWExYzdiZCIsIm5iZiI6MTczNDM0NzAyOC40MTIsInN1YiI6IjY3NjAwOTE0NWJkNjZhNWU1ODEzMTA3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tz9cgLFmBxkCprTKkDe1X6xF20VXDpK-V-PDbX4eyZE";

const defaultSearchFields = {
  word: "",
  genre: "",
};

export default function Navbar() {
  const navigate = useNavigate();

  const { search, setIsSearching } = searchContext();

  const [searchFields, setSearchFields] = useState(defaultSearchFields);
  const [genres, setGenres] = useState([]);

  const fetchGenres = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + apiKey,
      },
    };
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
      .then((res) => res.json())
      .then((data) => {
        let genres = data.genres;

        setGenres(genres);
      });
  };

  const handleSearchFields = (e) => {
    const newValue = e.target.value;

    setSearchFields({
      ...searchFields,
      [e.target.name]: newValue,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate("/search");
    setIsSearching(true);
    search(searchFields.word, searchFields.genre);
    // setSearchFields(defaultSearchFields);
    setIsSearching(false);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-dark ">
      <div className="container">
        <Link className="navbar-brand  text-danger fs-1 fw-bold" to="/">
          BOOLFLIX
        </Link>

        <div className="search-bar">
          <form
            onSubmit={handleFormSubmit}
            className="d-flex align-items-center"
          >
            <select
              name="genre"
              className="form-select me-2"
              aria-label="Default select example"
              value={searchFields.genre}
              onChange={handleSearchFields}
            >
              <option value="">Scegli una categoria</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
            <input
              name="word"
              id="search-input"
              onChange={handleSearchFields}
              value={searchFields.word}
              className="form-control search-input"
              type="text"
              // required
            />
            <button data-bs-theme="dark" className="btn btn-dark ms-3">
              Cerca
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
