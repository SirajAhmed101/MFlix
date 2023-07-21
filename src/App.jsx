import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import "./App.css";
import MovieList from "./Pages/MovieList";
import Tv from "./Pages/Tv";
import Animation from "./Pages/Animation";
import PageNotFound from "./Pages/PageNotFound";
import Navbar from "./Component//Navbar";
import MovieDetails from "./Pages/MovieDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="movie/:id" element={<MovieDetails />} />
          <Route path="/tv" element={<Tv />} />
          <Route path="/kids" element={<Animation />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
