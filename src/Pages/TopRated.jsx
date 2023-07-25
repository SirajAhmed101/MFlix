import { useEffect, useState } from "react";
import axios from "axios";
import SingleCard from "../Component/Card";

const Tv = () => {
  const [topRated, setTopRated] = useState([]);

  const getTopRated = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${
        import.meta.env.VITE_API_KEY
      }`
    );
    setTopRated(data.results);
  };

  useEffect(() => {
    getTopRated();
  }, []);

  return (
    <div className="px-5 py-5">
      {topRated && (
        <div>
          <h2 className=" uppercase mb-6 text-4xl text-yellow-300  text-center font-semibold py-5">
            Top-Rated
          </h2>
          <div className="grid grid-cols-6  ">
            {topRated &&
              topRated.map((movie, i) => {
                return <SingleCard movie={movie} key={i} />;
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tv;
