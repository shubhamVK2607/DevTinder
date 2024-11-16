import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const Temporary = () => {
  const [inputValue, setInputValue] = useState("");
  const [room, setRoom] = useState("");

  const socket = useMemo(() => io("http://localhost:7777"), []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });

    socket.on("receive message", (data) => {
      console.log(data);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { inputValue, room });
    setInputValue(""); // Clear the input field after submission
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80">
        <label
          htmlFor="inputField"
          className="block text-lg font-medium text-gray-700 mb-2">
          Enter something
        </label>
        <input
          id="inputField"
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Room ID"
        />
        <input
          id="inputField"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Message"
        />
        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Temporary;
