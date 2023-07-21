import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { img_300, unavailable } from "../Config/config";
import { AiFillStar } from "react-icons/ai";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "../Pages/Home/Home.css";

const SingleCard = ({ movie }) => {
  const { id, poster_path, title, release_date, vote_average, overview } =
    movie;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className=" cards inline-block cursor-pointer h-[full] transition-transform duration-200 relative rounded-xl overflow-hidden m-[0.19rem] poiter z-0 border border-solid border-[#636363] hover:scale-110 hover:z-50 hover:shadow-xl">
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton height={300} duration={3}></Skeleton>
          </SkeletonTheme>
        </div>
      ) : (
        <Link to={`/movie/${id}`}>
          <div className="cards inline-block cursor-pointer h-[full] relative  transition-transform  duration-200 rounded-xl overflow-hidden m-[0.19rem] poiter z-0 border border-solid border-[#636363] hover:scale-110 hover:z-50 hover:shadow-xl">
            <img
              src={`${img_300}${movie ? poster_path : unavailable}`}
              alt={title}
            />
            <div className="overlay absolute bottom-0 pt-0 px-4 pb-4 flex flex-col justify-end opacity-0 transition-opacity duration-200 hover:opacity-100 text-white h-[100%]">
              <div className=" font-extrabold text-base mb-2">
                {movie ? title : ""}
              </div>
              <div className="text-xs mb-1 flex justify-between items-center">
                <p>{movie ? release_date : ""}</p>
                <span className="float-right  flex justify-cetnter items-center">
                  {movie ? vote_average : ""}
                  <AiFillStar color="yellow " />
                </span>
              </div>
              <div className="text-xs italic mb-1">
                {movie ? overview.slice(0, 118) + "..." : ""}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};
export default SingleCard;
