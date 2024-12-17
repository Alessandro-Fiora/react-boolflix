import { createContext, useContext, useState } from "react";

// # CREO UN NUOVO CONTESTO
const SearchContext = createContext();

const moviesApiUrl = "https://api.themoviedb.org/3/search/movie";
const seriesApiUrl = "https://api.themoviedb.org/3/search/tv";
const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmRjOGU5ZWYxZTJiNDBiYzJiM2JhYWQyOWExYzdiZCIsIm5iZiI6MTczNDM0NzAyOC40MTIsInN1YiI6IjY3NjAwOTE0NWJkNjZhNWU1ODEzMTA3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tz9cgLFmBxkCprTKkDe1X6xF20VXDpK-V-PDbX4eyZE";
const imgBaseUrl = "https://image.tmdb.org/t/p/w";
const imgWidth = 342;

// # EXPORT DEL PROVIDER
export const SearchContextProvider = ({ children }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  const fetchMovies = (word, genre) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + apiKey,
      },
    };
    fetch(`${moviesApiUrl}?query=${word}`, options)
      .then((res) => res.json())
      .then((data) => {
        const movieResults = data.results;
        let newMovies = movieResults.map((movie) => ({
          id: movie.id,
          title: movie.title,
          original_title: movie.original_title,
          overview: movie.overview,
          language: movie.original_language,
          rating: Math.ceil(movie.vote_average / 2),
          genres: movie.genre_ids,
          img: movie.poster_path
            ? `${imgBaseUrl}${imgWidth}/${movie.poster_path}`
            : "https://placehold.co/342x513",
        }));

        if (genre) {
          newMovies = newMovies.filter((movie) => {
            return movie.genres.includes(parseInt(genre));
          });
        }

        setMovies(newMovies);
      });
  };

  const fetchSeries = (word, genre) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + apiKey,
      },
    };
    fetch(`${seriesApiUrl}?query=${word}`, options)
      .then((res) => res.json())
      .then((data) => {
        const seriesResults = data.results;
        let newSeries = seriesResults.map((serie) => ({
          id: serie.id,
          title: serie.name,
          original_title: serie.original_name,
          overview: serie.overview,
          language: serie.original_language,
          rating: Math.ceil(serie.vote_average / 2),
          genres: serie.genre_ids,
          img: serie.poster_path
            ? `${imgBaseUrl}${imgWidth}/${serie.poster_path}`
            : "https://placehold.co/342x513",
        }));

        if (genre) {
          newSeries = newSeries.filter((serie) => {
            return serie.genres.includes(parseInt(genre));
          });
        }

        setSeries(newSeries);
      });
  };

  const search = (word, genre) => {
    fetchMovies(word, genre);
    fetchSeries(word, genre);
  };

  const data = {
    series,
    movies,
    isSearching,
    search,
    setIsSearching,
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
