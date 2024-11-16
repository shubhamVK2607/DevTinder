import { useState } from "react";
import Toast from "./Toast";
import { API_BASE_URL } from "../uitls/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    about: "",
    photoURL: "",
  });

  const navigate = useNavigate();

  const { firstName, lastName, email, password, age, about, photoURL } =
    userProfile;
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

  const profileUpdateHandler = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };
  const saveProfileHandler = async () => {
    try {
      console.log("userProfle---", userProfile);
      await axios.post(API_BASE_URL + "signup", userProfile, {
        withCredentials: true,
      });
      setError("");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data);
      console.log(error);
    }
  };

  return (
    <div className="bg-base-100 w-screen h-screen flex justify-center items-center">
      {showToast && <Toast />}
      <div className="card bg-base-300 text-neutral-content w-[30%] pt-8 flex justify-center">
        <div className="card-body items-center text-center flex flex-col gap-5">
          <h1 className="text-3xl font-bold mb-6">Create Your Profile</h1>
          <div className="flex items-center gap-4 w-full">
            <h1 className="font-semibold text-xl w-[30%]">First Name</h1>
            <input
              type="text"
              name="firstName"
              className="input input-bordered w-full max-w-xs text-white"
              value={firstName}
              onChange={profileUpdateHandler}
            />
          </div>
          <div className="flex items-center gap-4 w-full">
            <h1 className="font-semibold text-xl w-[30%]">Last Name</h1>
            <input
              type="text"
              name="lastName"
              className="input input-bordered w-full max-w-xs text-white"
              value={lastName}
              onChange={profileUpdateHandler}
            />
          </div>
          <div className="flex items-center gap-4 w-full">
            <h1 className="font-semibold text-xl w-[30%]">Email</h1>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full max-w-xs text-white"
              value={email}
              onChange={profileUpdateHandler}
            />
          </div>
          <div className="flex items-center gap-4 w-full">
            <h1 className="font-semibold text-xl w-[30%]">Password</h1>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full max-w-xs text-white"
              value={password}
              onChange={profileUpdateHandler}
            />
          </div>
          <div className="flex items-center gap-4 w-full">
            <h1 className="font-semibold text-xl w-[30%]">Age</h1>
            <input
              type="text"
              name="age"
              className="input input-bordered w-full max-w-xs text-white"
              value={age}
              onChange={profileUpdateHandler}
            />
          </div>
          <div className="flex items-center gap-4 w-full ">
            <h1 className="font-semibold text-xl w-[30%]">photoURL</h1>
            <input
              type="text"
              name="photoURL"
              className="input input-bordered w-full max-w-xs text-white"
              value={photoURL}
              onChange={profileUpdateHandler}
            />
          </div>
          <div className="flex items-center gap-4 w-full">
            <h1 className="font-semibold text-xl w-[30%]">About</h1>
            <input
              type="text"
              name="about"
              className="input input-bordered w-full max-w-xs text-white"
              value={about}
              onChange={profileUpdateHandler}
            />
          </div>
          <h1 className="text-red-500">{error}</h1>
          <button
            onClick={saveProfileHandler}
            className="btn btn-primary mt-4 text-2xl">
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
