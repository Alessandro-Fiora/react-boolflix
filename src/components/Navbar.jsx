import { searchContext } from "../contexts/SearchContext";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const defaultSearchFields = {
  word: "",
};

export default function Navbar() {
  const navigate = useNavigate();

  const [searchFields, setSearchFields] = useState(defaultSearchFields);

  const { search, setIsSearching } = searchContext();

  const handleSearchFields = (e) => {
    const newValue = e.target.value;

    setSearchFields({
      word: newValue,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate("/search");
    setIsSearching(true);
    search(searchFields.word);
    setSearchFields(defaultSearchFields);
    setIsSearching(false);
  };
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
            <input
              id="search-input"
              onChange={handleSearchFields}
              value={searchFields.word}
              className="form-control search-input"
              type="text"
              name="word"
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
