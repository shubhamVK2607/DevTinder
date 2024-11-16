import { useEffect } from "react";
import FeedCard from "./FeedCard";
import { API_BASE_URL } from "../uitls/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addSuggestions } from "../store/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feeds = useSelector((store) => store.feed);

  useEffect(() => {
    const getFeedData = async () => {
      const resp = await axios.get(API_BASE_URL + "user/feed?limit=20", {
        withCredentials: true,
      });
      console.log(resp);

      dispatch(addSuggestions(resp.data.data.data));
    };
    getFeedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!feeds) {
    return <>Loading...</>;
  }

  if (!feeds.length) {
    return <>No Suggestion Found</>;
  }
  return (
    <div className="carousel rounded-box w-[25%] h-[100%]">
      {feeds.map((feed) => (
        <FeedCard feed={feed} key={feed._id} />
      ))}
    </div>
  );
};

export default Feed;
