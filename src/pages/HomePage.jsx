import { searchContext } from "../contexts/searchContext";

export default function HomePage() {
  const { series, movies, searchFields, search, setSearchFields } =
    searchContext();

  const handleSearchFields = (e) => {
    const newValue = e.target.value;

    setSearchFields({
      word: newValue,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    search();
  };

  return (
    <div className="container py-5">
      <h1>Home</h1>

      <div className="search-bar">
        <form onSubmit={handleFormSubmit}>
          <input
            id="search-input"
            onChange={handleSearchFields}
            value={searchFields.word}
            className="form-control"
            type="text"
            name="word"
          />
          <button className="btn btn-primary">Cerca</button>
        </form>
      </div>

      <div className="result-section">
        <h2>FILM</h2>
        {movies.map((movie) => {
          return (
            <ul key={movie.id}>
              <li>{movie.title}</li>
              <li>{movie.original_title}</li>
              <li>
                <span
                  className={`lang-icon lang-icon-${movie.language}`}
                ></span>
              </li>
              <li>{movie.rating}</li>
            </ul>
          );
        })}
      </div>

      <div className="result-section">
        <h2>SERIE TV</h2>
        {series.map((serie) => {
          return (
            <ul key={serie.id}>
              <li>{serie.title}</li>
              <li>{serie.original_title}</li>
              <li>
                <span
                  className={`lang-icon lang-icon-${serie.language}`}
                ></span>
              </li>
              <li>{serie.rating}</li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
