import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import axios from "axios";
import { useParams } from "react-router-dom";
import { img_300, img_original } from "../Config/config";
import YouTube from "react-youtube";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SingleCard from "../Component/Card";

const MovieDetails = () => {
  const { id } = useParams();

  const [currentMovieDetail, setCurrentMovieDetail] = useState([]);
  const [movieCast, setMovieCast] = useState([]);
  const [similerMovies, setSimilerMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMovieDetails();
    getMovieCast();
    getSimilerMovies();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    setInterval(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const getMovieDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${
          import.meta.env.VITE_API_KEY
        }&append_to_response=videos`
      );

      setCurrentMovieDetail(data);
    } catch (error) {
      console.log("ApiError");
    }
  };

  const getSimilerMovies = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );

      setSimilerMovies(data.results);
    } catch (error) {
      console.log("ApiError");
    }
  };

  const getMovieCast = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US`
      );
      const cast = data.cast.slice(0, 6);
      setMovieCast(cast);
    } catch (error) {
      console.log(error.message);
    }
  };

  const opts = {
    height: "390",
    width: "840",
  };

  const onPlayerReady = (event) => {
    const player = event.target;
    player.pauseVideo();
  };

  const filterResults =
    currentMovieDetail &&
    currentMovieDetail.videos &&
    currentMovieDetail.videos.results.find((video) => {
      return video.name === "Official Trailer" || video.site === "YouTube";
    });

  return (
    <>
      {isLoading ? (
        <div className=" flex flex-col items-center">
          <div className="w-[80%] ">
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <Skeleton height={600} duration={3}></Skeleton>
            </SkeletonTheme>
          </div>
        </div>
      ) : (
        currentMovieDetail && (
          <div className="relative flex flex-col items-center w-full">
            {/* Movie-Details */}
            <div className="w-[85%] relative">
              <img
                src={`${img_original}${currentMovieDetail.backdrop_path}`}
                alt={currentMovieDetail.title}
                className="w-full h-[500px] object-cover object-center"
              />
              <div className="overlay absolute w-full h-[500px] bg-bg-overlay opacity-[0.7] text-white top-0"></div>
            </div>
            <div className="movie-details relative flex w-[75%] bottom-[225px] items-center  ">
              <div className="movie__detailLeft mr-7">
                <div className="movie-poster w-[300px]">
                  <img
                    src={`${img_300}${currentMovieDetail.poster_path}`}
                    alt={currentMovieDetail.title}
                    className="h-full rounded shadow"
                  />
                </div>
              </div>
              {/* About-Movie */}
              <div className="movie__detailRight text-white flex flex-col justify-between h-[450px]">
                <div className="movie-details-top">
                  {/* Movie-title */}
                  <div className="text-4xl font-semibold drop-shadow-3xl mb-[.5rem]">
                    {currentMovieDetail && currentMovieDetail.original_title}
                  </div>
                  <div className="drop-shadow-3xl mb-[.5rem]">
                    {currentMovieDetail && currentMovieDetail.tagline}
                  </div>
                  <div className="flex  items-center mb-[.5rem]">
                    <span className="flex justify-center items-center drop-shadow-3xl">
                      {currentMovieDetail && currentMovieDetail.vote_average}
                      <AiFillStar color="yellow " />
                    </span>
                    <span className="movie__voteCount ml-8">
                      {currentMovieDetail &&
                        currentMovieDetail.vote_count + "votes"}
                    </span>
                  </div>
                  <div className="drop-shadow-3xl mb-[.5rem]">
                    {currentMovieDetail && currentMovieDetail.runtime + " mins"}
                  </div>

                  <div className=" my-5 drop-shadow-3xl">
                    {currentMovieDetail.genres
                      ? currentMovieDetail.genres.map((genre) => {
                          return (
                            <>
                              <span
                                className="rounded-3xl  border-2 border-white p-2 mr-4"
                                id={genre.id}
                              >
                                {genre.name}
                              </span>
                            </>
                          );
                        })
                      : ""}
                  </div>
                </div>

                <div className="movie__detailRightBottom flex-[0.8] mt-8">
                  <div className="relative items-center flex mb-5 text-3xl font-semibold">
                    Synopsis
                  </div>
                  <div className="ml-auto">
                    {currentMovieDetail && currentMovieDetail.overview}
                  </div>
                </div>
              </div>
            </div>
            {/* Movie-Cast */}
            <div className="movie-cast  w-[75%] absolute top-[50rem] ">
              <h1 className="text-4xl text-yellow-300 mb-7 font-semibold ">
                Cast
              </h1>
              <div className="flex gap-2">
                {movieCast &&
                  movieCast.map((cast) => {
                    return (
                      <div className="w-full h-[200px] ">
                        <img
                          src={`${img_original}${cast.profile_path}`}
                          alt=""
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="cast-details text-center">
                          <h1 className="text-white">{cast.original_name}</h1>
                          <p className="text-white">{cast.character}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            {/* Movie-Trailer */}
            <div className="movie-trailer  w-[75%] absolute top-[75rem]">
              {filterResults && (
                <>
                  <h1 className="text-4xl text-yellow-300 mb-7 font-semibold ">
                    {filterResults?.name}
                  </h1>
                  <div className="flex justify-center items-center">
                    <YouTube
                      videoId={filterResults?.key}
                      opts={opts}
                      onReady={onPlayerReady}
                    />
                  </div>
                </>
              )}
            </div>
            {/* Similier-Movies */}

            <div className="absolute top-[110rem]  w-[75%]">
              <h1 className="text-4xl text-yellow-300 mb-7 font-semibold ">
                Similer Movies
              </h1>

              {similerMovies.length === 0 ? (
                <p className="text-4xl text-yellow-300 mb-7 font-semibold ">
                  404: Error Not Found
                </p>
              ) : (
                <div className="grid grid-cols-4">
                  {similerMovies?.map((movie, i) => {
                    return <SingleCard movie={movie} key={i} />;
                  })}
                </div>
              )}
            </div>
          </div>
        )
      )}
    </>
  );
};

export default MovieDetails;
