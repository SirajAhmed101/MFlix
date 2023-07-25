import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import "./App.css";
import MovieList from "./Pages/MovieList";
import TopRated from "./Pages/TopRated";
import PageNotFound from "./Pages/PageNotFound";
import Navbar from "./Component//Navbar";
import MovieDetails from "./Pages/MovieDetails";
import SearchMovies from "./Pages/SearchMovies";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="movies/:id" element={<MovieDetails />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/search-movies" element={<SearchMovies />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
