import { useEffect, useState } from "react";
import axios from "axios";
import SingleCard from "../Component/Card";

const MovieList = () => {
  const [latestovies, setLatestMovies] = useState([]);
  const fetchLatest = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${
        import.meta.env.VITE_API_KEY
      }`
    );
    setLatestMovies(data.results);
  };

  useEffect(() => {
    fetchLatest();
  }, []);

  return (
    <>
      <div className="px-5 py-5">
        <h2 className="text-white text-5xl uppercase mb-4">Latest</h2>
        <div className="grid grid-cols-6  ">
          {latestovies &&
            latestovies.map((movie, i) => {
              return <SingleCard movie={movie} key={i} />;
            })}
        </div>
      </div>
    </>
  );
};

export default MovieList;
