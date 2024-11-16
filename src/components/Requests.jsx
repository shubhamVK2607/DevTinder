import { useEffect } from "react";
import { API_BASE_URL } from "../uitls/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../store/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  console.log(requests);
  const fetchConnectionRequests = async () => {
    try {
      const response = await axios.get(
        API_BASE_URL + "user/requests/received",
        { withCredentials: true }
      );

      dispatch(addRequest(response.data.data));
    } catch (error) {
      console.log("ERROR : " + error);
    }
  };
  useEffect(() => {
    fetchConnectionRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestClickHandler = async (status, requestedId) => {
    try {
      const response = await axios.post(
        API_BASE_URL + "request/review/" + status + "/" + requestedId,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestedId));

      console.log(response);
    } catch (error) {
      console.log("ERROR : " + error);
    }
  };
  if (!requests) {
    return <>Loading...</>;
  }
  if (!requests.length) {
    return <h1>No Requests Pending</h1>;
  }

  return (
    <div className="flex flex-col gap-5 w-[30%] items-center">
      <span className="text-4xl mb-3 font-bold text-white ">Requests</span>
      {requests?.map((request) => (
        <div
          key={request._id}
          className="flex flex-col gap-3 w-full bg-green-100 rounded-md">
          <div className="flex gap-5 p-4  items-center w-full">
            <img
              src={request?.fromUserId?.photoURL}
              alt="photo"
              className="rounded-full object-cover w-20 h-20"
            />

            <div className="text-black flex flex-col gap-4 p-2">
              <h1 className="font-bold text-2xl">
                {request.fromUserId.firstName} {request.fromUserId.lastName},{" "}
                {request.fromUserId.age}
              </h1>
              <h1>{request.fromUserId.about}</h1>
            </div>
          </div>
          <div className="flex justify-end gap-2 p-1">
            <button
              className="btn btn-active btn-primary text-white"
              onClick={() => requestClickHandler("accepted", request._id)}>
              Accept
            </button>
            <button
              className="btn btn-active btn-nutral text-white"
              onClick={() => requestClickHandler("rejected", request._id)}>
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Requests;
