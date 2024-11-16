/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../uitls/constants";
import { addUser } from "../store/userSlice";
import UserProfileCard from "./userProfileCard";
import Toast from "./Toast";

const EditProfile = ({ userData }) => {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const [userProfile, setUserProfile] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    age: userData.age,
    about: userData.about,
    photoURL: userData.photoURL,
  });

  const { firstName, lastName, age, about, photoURL } = userProfile;

  const profileUpdateHandler = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const saveProfileHandler = async () => {
    try {
      setShowToast(true);

      const res = await axios.patch(
        API_BASE_URL + "profile/edit",
        userProfile,
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data.data));
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-base-100 w-screen h-screen flex justify-center items-center">
      {showToast && <Toast text="Profile updated successfully" />}
      <div className="card bg-base-300 text-neutral-content w-[30%] pt-8 flex justify-center">
        <div className="card-body items-center text-center flex flex-col gap-5">
          <h1 className="text-3xl font-bold mb-6">Update Profile</h1>
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
          <button
            onClick={saveProfileHandler}
            className="btn btn-primary mt-4 text-2xl">
            Save Profile
          </button>
        </div>
      </div>
      <UserProfileCard feed={userProfile} />
    </div>
  );
};

export default EditProfile;
