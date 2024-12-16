import { searchContext } from "../contexts/searchContext";

import ResultSection from "../components/ResultSection.jsx";

export default function HomePage() {
  const printStars = (rating) => {
    let resultStars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        resultStars.push(true);
      } else resultStars.push(false);
    }

    return resultStars;
  };
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

      <ResultSection datas={movies}>
        <h2>Film</h2>
      </ResultSection>

      <ResultSection datas={series}>
        <h2>Serie TV</h2>
      </ResultSection>
    </div>
  );
}
