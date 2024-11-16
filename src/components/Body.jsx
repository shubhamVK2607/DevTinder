import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { API_BASE_URL } from "../uitls/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const getLoggedInUserData = async () => {
    try {
      const resp = await axios.get(API_BASE_URL + "profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(resp.data));
    } catch (error) {
      if (error.status === 401) navigate("/login");
      console.log(error);
    }
  };
  useEffect(() => {
    if (!userData) {
      getLoggedInUserData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-screen flex flex-col h-screen p-20 items-center">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;
