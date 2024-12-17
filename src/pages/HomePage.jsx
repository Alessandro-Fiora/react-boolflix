import { searchContext } from "../contexts/SearchContext";

import ResultSection from "../components/ResultSection.jsx";

export default function HomePage() {
  const { series, movies, isSearching } = searchContext();

  return (
    <div className="container py-5">
      <ResultSection display={!isSearching} datas={movies}>
        <h2 className="text-light">Film</h2>
      </ResultSection>

      <ResultSection display={!isSearching} datas={series}>
        <h2 className="text-light">Serie TV</h2>
      </ResultSection>
    </div>
  );
}
