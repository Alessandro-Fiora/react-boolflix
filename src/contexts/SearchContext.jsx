import { createContext, useContext, useState } from "react";

// # CREO UN NUOVO CONTESTO
const SearchContext = createContext();

const moviesApiUrl = import.meta.env.VITE_THEMOVIEDB_MOVIES_API_URL;
const seriesApiUrl = import.meta.env.VITE_THEMOVIEDB_SERIES_API_URL;
const apiKey = import.meta.env.VITE_THEMOVIEDB_API_KEY;
const imgBaseUrl = import.meta.env.VITE_THEMOVIEDB_IMG_BASE_URL;
const imgWidth = 342;

const defaultSearchFields = {
  word: "",
};

// # EXPORT DEL PROVIDER
export const SearchContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [searchFields, setSearchFields] = useState(defaultSearchFields);

  const fetchMovies = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + apiKey,
      },
    };
    fetch(`${moviesApiUrl}?query=${searchFields.word}`, options)
      .then((res) => res.json())
      .then((data) => {
        const movieResults = data.results;
        const newMovies = movieResults.map((movie) => ({
          id: movie.id,
          title: movie.title,
          original_title: movie.original_title,
          language: movie.original_language,
          rating: Math.ceil(movie.vote_average / 2),
          img: movie.poster_path
            ? `${imgBaseUrl}${imgWidth}/${movie.poster_path}`
            : "https://placehold.co/342x513",
        }));
        setMovies(newMovies);
        setSearchFields(defaultSearchFields);
      });
  };

  const fetchSeries = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + apiKey,
      },
    };
    fetch(`${seriesApiUrl}?query=${searchFields.word}`, options)
      .then((res) => res.json())
      .then((data) => {
        const seriesResults = data.results;
        const newSeries = seriesResults.map((serie) => ({
          id: serie.id,
          title: serie.name,
          original_title: serie.original_name,
          language: serie.original_language,
          rating: Math.ceil(serie.vote_average / 2),
          img: serie.poster_path
            ? `${imgBaseUrl}${imgWidth}/${serie.poster_path}`
            : "https://placehold.co/342x513",
        }));
        setSeries(newSeries);
        setSearchFields(defaultSearchFields);
      });
  };

  const search = () => {
    fetchMovies();
    fetchSeries();
  };

  const data = {
    series,
    movies,
    searchFields,
    search,
    setSearchFields,
  };

  // return user context provider
  return (
    <SearchContext.Provider value={data}>{children}</SearchContext.Provider>
  );
};

// # EXPORT DEL CONTEXT PER I CONSUMERS
export const searchContext = () => {
  // Oggetto che rappresenta useContext
  return useContext(SearchContext);
};
