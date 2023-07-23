import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import axios from "axios";
import { useParams } from "react-router-dom";
import { img_300, img_original } from "../Config/config";
import { BsCollectionPlayFill } from "react-icons/bs";
import YouTube from "react-youtube";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieDetails = () => {
  const { id } = useParams();

  const [currentMovieDetail, setCurrentMovieDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMovieById();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    setInterval(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const fetchMovieById = async () => {
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
      return video.name === "Official Trailer";
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
            <div className="w-[80%] ">
              <img
                src={`${img_original}${currentMovieDetail.backdrop_path}`}
                alt={currentMovieDetail.title}
                className="w-full h-[500px] object-cover object-top "
              />
            </div>
            <div className="movie-details relative flex w-[75%] bottom-[225px] items-center">
              <div className="movie__detailLeft mr-7">
                <div className="movie-poster w-[300px]">
                  <img
                    src={`${img_300}${currentMovieDetail.poster_path}`}
                    alt={currentMovieDetail.title}
                    className="h-full rounded shadow"
                  />
                </div>
              </div>

              <div className="movie__detailRight text-white flex flex-col justify-between h-[450px]">
                <div className="movie-details-top">
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

                  <div className="w-[30%]">
                    <div className=" mt-14 drop-shadow-3xl hover:bg-[#020916] hover:text-white bg-white text-[#020916] cursor-pointer text-xl rounded-3xl  border-2 border-white py-2   font-semibold w-full">
                      <a
                        href={currentMovieDetail.homepage}
                        target="_blank"
                        className="flex justify-center items-center text-center"
                      >
                        <BsCollectionPlayFill className="mr-2" size={25} />{" "}
                        <span>WatchTrailer</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Movie-Trailer */}
            <div className="movie-trailer  w-[75%] absolute top-[50rem]">
              {filterResults ? (
                <>
                  <h1 className="text-4xl text-white mb-7 font-semibold ">
                    Videos
                    <sup className="text-yellow-300">{filterResults?.name}</sup>
                  </h1>
                  <div className="flex justify-center items-center">
                    <YouTube
                      videoId={filterResults?.key}
                      opts={opts}
                      onReady={onPlayerReady}
                    />
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-4xl text-white mb-7 font-semibold ">
                    Videos
                  </h1>
                  <div className="flex justify-center flex-col items-center">
                    <YouTube
                      videoId={currentMovieDetail.videos?.results[0]?.key}
                      opts={opts}
                      onReady={onPlayerReady}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )
      )}
    </>
  );
};

export default MovieDetails;
