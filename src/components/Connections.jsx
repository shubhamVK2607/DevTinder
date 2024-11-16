import axios from "axios";
import { useEffect } from "react";
import { API_BASE_URL } from "../uitls/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const getConnections = async () => {
    try {
      const response = await axios.get(
        API_BASE_URL + "user/connections",

        { withCredentials: true }
      );

      dispatch(addConnections(response?.data?.data?.data));
    } catch (error) {
      console.log("ERROR : " + error);
    }
  };

  useEffect(() => {
    getConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!connections) {
    return <>Loading...</>;
  }

  if (!connections.length) {
    return <h1>No Connection </h1>;
  }

  return (
    <div className="flex flex-col gap-5 w-[30%] items-center">
      <span className="text-4xl mb-3 font-bold text-white ">Connections</span>
      {connections.map((connection) => (
        <div
          key={connection._id}
          className="flex p-4 border bg-green-100 rounded-md gap-10 items-center w-full">
          <img
            src={connection.photoURL}
            alt="photo"
            className=" rounded-full object-contain w-20 h-20"
          />

          <div className="text-black flex flex-col gap-4 p-2">
            <h1 className="font-bold text-2xl">
              {connection.firstName} {connection.lastName}, {connection.age}
            </h1>
            <h1>{connection.about}</h1>
            <Link
              to={`/chat/${connection._id}`}
              className="btn btn-active btn-secondary w-32 text-lg text-white">
              Chat Now
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connections;
