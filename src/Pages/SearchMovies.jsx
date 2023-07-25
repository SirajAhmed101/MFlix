import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleCard from "../Component/Card";
import { BsSearch } from "react-icons/bs";

const SearchMovies = () => {
  const [movieByQuery, setMovieByQuery] = useState([]);
  const [query, setQuery] = useState("");
  console.log(query);

  const getMovieByQuery = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      setMovieByQuery(data.results);
    } catch (error) {
      error;
    }
  };

  useEffect(() => {
    getMovieByQuery();
  }, [query]);

  return (
    movieByQuery && (
      <div className="px-5 py-5">
        <form action="#" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <BsSearch />
            </div>
            <input
              type="text"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Movies..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
          </div>
        </form>
        {query === "" ? (
          <p>""</p>
        ) : (
          <p className=" uppercase mb-4 text-4xl text-yellow-300 font-semibold py-5  text-center">
            Search results for "{query}"
          </p>
        )}

        <div className="grid grid-cols-6 mt-11 ">
          {movieByQuery &&
            movieByQuery.map((movie, i) => {
              return <SingleCard movie={movie} key={i} />;
            })}
        </div>
      </div>
    )
  );
};

export default SearchMovies;
