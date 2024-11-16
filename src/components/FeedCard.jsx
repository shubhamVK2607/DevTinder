import axios from "axios";
import { API_BASE_URL } from "../uitls/constants";
import { useDispatch } from "react-redux";
import { removeSuggestion } from "../store/feedSlice";

/* eslint-disable react/prop-types */
const FeedCard = ({ feed }) => {
  const dispatch = useDispatch();
  const { photoURL, firstName, lastName, age, about, gender, _id } = feed;

  const suggestionClickHandler = async (status, toUserId) => {
    try {
      const response = await axios.post(
        API_BASE_URL + "request/send/" + status + "/" + toUserId,
        {},
        { withCredentials: true }
      );
      dispatch(removeSuggestion(toUserId));
      console.log(response);
    } catch (error) {
      console.log("ERROR: " + error);
    }
  };
  return (
    <div className="card bg-base-300 w-full shadow-xl carousel-item relative">
      <figure className="relative h-[100%]">
        <img
          src={photoURL}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body absolute bottom-[15%] w-full p-6 bg-gradient-to-t from-black to-transparent opacity-100">
        <div className="flex flex-col gap-6 text-white">
          <div className="flex flex-col gap-2 py-3">
            <h3 className="card-title text-5xl font-bold">
              {firstName + " " + lastName}
            </h3>
            <p className="text-xl font-semibold">
              {age} years, {gender}
            </p>
            <p className="text-xl font-semibold">{about}</p>
          </div>
        </div>
      </div>
      <div className="card-actions absolute bottom-0 py-3 flex justify-center bg-black w-full space-x-2">
        <button
          className=" flex items-center justify-center w-20 h-20 text-2xl rounded-full border-2 border-red-500 bg-transparent"
          onClick={() => suggestionClickHandler("ignored", _id)}>
          ❌
        </button>
        <button
          className=" flex items-center justify-center w-20 h-20 text-2xl rounded-full border-2 border-green-500 bg-transparent"
          onClick={() => suggestionClickHandler("interested", _id)}>
          💚
        </button>
      </div>
    </div>
  );
};

export default FeedCard;
