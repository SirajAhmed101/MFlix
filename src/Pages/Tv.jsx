import { useEffect, useState } from "react";
import axios from "axios";
import SingleCard from "../Component/Card";

const Tv = () => {
  const [latestTvSeries, setLatestTvSeries] = useState([]);
  const [trandingTvSeries, setTrandingTvSeries] = useState([]);

  const getLatestTvSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=${
        import.meta.env.VITE_API_KEY
      }`
    );
    setLatestTvSeries(data.results);
  };
  const getTrandingTvSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=${
        import.meta.env.VITE_API_KEY
      }`
    );

    setTrandingTvSeries(data.results);
  };

  useEffect(() => {
    getLatestTvSeries();
    getTrandingTvSeries();
  }, []);

  console.log(trandingTvSeries);

  return (
    <div className="px-5 py-5">
      {latestTvSeries && (
        <div>
          <h2 className=" uppercase mb-4 text-4xl text-yellow-300 font-semibold py-5">
            Latest
          </h2>
          <div className="grid grid-cols-6  ">
            {latestTvSeries &&
              latestTvSeries.map((movie, i) => {
                return <SingleCard movie={movie} key={i} />;
              })}
          </div>
        </div>
      )}

      {trandingTvSeries && (
        <div>
          <h2 className=" uppercase mb-4 text-4xl text-yellow-300 font-semibold py-5">
            Trending
          </h2>
          <div className="grid grid-cols-6  ">
            {trandingTvSeries &&
              trandingTvSeries.map((movie, i) => {
                return <SingleCard movie={movie} key={i} />;
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tv;
