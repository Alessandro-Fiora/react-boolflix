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

  const printStars = (rating) => {
    let resultStars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        resultStars.push(true);
      } else resultStars.push(false);
    }

    return resultStars;
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
        {movies?.length ? (
          movies.map((movie) => {
            return (
              <ul key={movie.id}>
                <li>{movie.title}</li>
                <li>{movie.original_title}</li>
                <li>
                  <span
                    className={`lang-icon lang-icon-${movie.language}`}
                  ></span>
                </li>
                <li>
                  {printStars(movie.rating).map((star, index) =>
                    star ? (
                      <i key={index} className="fa-solid fa-star" />
                    ) : (
                      <i key={index} className="fa-regular fa-star" />
                    )
                  )}
                </li>
                <li>
                  <img src={movie.img} alt="" />
                </li>
              </ul>
            );
          })
        ) : (
          <h3>Nessun film</h3>
        )}
      </div>

      <div className="result-section">
        <h2>SERIE TV</h2>
        {series?.length ? (
          series.map((serie) => {
            return (
              <ul key={serie.id}>
                <li>{serie.title}</li>
                <li>{serie.original_title}</li>
                <li>
                  <span
                    className={`lang-icon lang-icon-${serie.language}`}
                  ></span>
                </li>
                <li>
                  {printStars(serie.rating).map((star, index) =>
                    star ? (
                      <i key={index} className="fa-solid fa-star" />
                    ) : (
                      <i key={index} className="fa-regular fa-star" />
                    )
                  )}
                </li>
                <li>
                  <img src={serie.img} alt="" />
                </li>
              </ul>
            );
          })
        ) : (
          <h3>Nessuna serie</h3>
        )}
      </div>
    </div>
  );
}
