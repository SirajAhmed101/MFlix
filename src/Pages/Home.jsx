import { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AiFillStar } from "react-icons/ai";
import { img_original } from "../Config/config";
import MovieList from "./MovieList";
import { Link } from "react-router-dom";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${
        import.meta.env.VITE_API_KEY
      }`
    );
    setPopularMovies(data.results);
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <>
      <Carousel
        showArrows={true}
        showThumbs={false}
        autoPlay={true}
        transitionTime={3}
        infiniteLoop={true}
        showStatus={false}
      >
        {popularMovies.map((movie) => {
          return (
            <>
              <Link to={`movies/${movie.id}`}>
                <div className="w-full h-[570px] max-xl:h-[400px] max-md:h-[300px] max-[425px]:h-[250px]">
                  <img
                    src={`${img_original}${movie && movie.backdrop_path}`}
                    className="h-full w-full m-auto block   "
                  />
                </div>
                <div className="overlay bg-bg-overlay opacity-1  absolute p-[5rem] bottom-0  h-[100%] flex flex-col w-full justify-end items-start text-[#bbb] ">
                  <div className=" text-[3rem] text-left font-bold mb-[0.4rem] text-white max-xl:text-[2.5rem] max-md:text-[1.5rem] max-[425px]:text-[1rem]">
                    {movie ? movie.original_title : ""}
                  </div>
                  <div className=" text-[2rem] mb-[1rem] flex max-xl:text-[1.5rem] max-md:text-[1rem]  max-[425px]:text-[0.8rem]">
                    <p>{movie ? movie.release_date : ""}</p>
                    <span className=" ml-[1rem] flex justify-cetnter items-center">
                      {movie ? movie.vote_average : ""}
                      <AiFillStar color="yellow " />
                    </span>
                  </div>
                  <div className="posterImage__description text-[1rem] mb-[0.25rem] flex w-[50%] text-left italic max-xl:w-[60%] max-xl:text-[0.8rem] max-[425px]:w-[100%]  max-[425px]:text-[0.5rem]">
                    {movie ? movie.overview : ""}
                  </div>
                </div>
              </Link>
            </>
          );
        })}
      </Carousel>
      <MovieList />
    </>
  );
};

export default Home;
