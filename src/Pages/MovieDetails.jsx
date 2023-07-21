import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();

  console.log(id);

  const [currentMovieDetail, setCurrentMovieDetail] = useState([]);

  const fetchMovieById = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${
        import.meta.env.VITE_API_KEY
      }`
    );
    setCurrentMovieDetail(data);
  };

  useEffect(() => {
    fetchMovieById();
  }, []);
  const { poster_path, title, release_date, vote_average, overview } =
    currentMovieDetail;

  return (
    <>
      <p className="text-white">{title}</p>;
    </>
  );
};

export default MovieDetails;
