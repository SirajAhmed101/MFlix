import { useEffect, useState } from "react";
import axios from "axios";
import SingleCard from "../Component/Card";

const MovieList = () => {
  const [latestMovies, setLatestMovies] = useState([]);
  const [trandingMovies, setTrandingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const getLatestMovies = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US`
      );
      setLatestMovies(data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getUpcommingMovies = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US`
      );
      setUpcomingMovies(data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getTrandingMovies = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3//trending/movie/day?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );

      setTrandingMovies(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLatestMovies();
    getTrandingMovies();
    getUpcommingMovies();
  }, []);

  return (
    <div className="px-5 py-5">
      <div>
        <h2 className=" uppercase mb-4 text-4xl text-yellow-300 font-semibold py-5  text-center">
          Latest
        </h2>
        <div className="grid grid-cols-6  ">
          {latestMovies &&
            latestMovies.map((movie, i) => {
              return <SingleCard movie={movie} key={i} />;
            })}
        </div>
      </div>

      <div>
        <h2 className=" uppercase mb-4 text-4xl text-yellow-300 font-semibold py-5  text-center">
          Trending
        </h2>
        <div className="grid grid-cols-6  ">
          {trandingMovies &&
            trandingMovies.map((movie, i) => {
              return <SingleCard movie={movie} key={i} />;
            })}
        </div>
      </div>

      <div>
        <h2 className=" uppercase mb-4 text-4xl text-yellow-300 font-semibold py-5  text-center">
          Upcoming
        </h2>
        <div className="grid grid-cols-6  ">
          {upcomingMovies &&
            upcomingMovies.map((movie, i) => {
              return <SingleCard movie={movie} key={i} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
