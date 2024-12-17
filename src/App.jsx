import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SearchContextProvider } from "./contexts/SearchContext";

// layout
import DefaultLayout from "./layouts/DefaultLayout";

// pages
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import DefaultPage from "./pages/DefaultPage";

function App() {
  return (
    <SearchContextProvider>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route index Component={DefaultPage} />
            <Route path="/search" Component={HomePage} />
            <Route path="*" Component={NotFoundPage} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SearchContextProvider>
  );
}

export default App;
