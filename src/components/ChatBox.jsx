import axios from "axios";
import { useEffect, useState, useRef, useMemo } from "react";
import { API_BASE_URL } from "../uitls/constants";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const ChatBox = () => {
  const { toUserId } = useParams();
  const [chats, setChats] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const chatContainerRef = useRef(null);
  const [room, setRoom] = useState("");

  const socket = useMemo(() => io("http://localhost:7777"), []);

  const getChatHistory = async () => {
    try {
      const response = await axios.get(API_BASE_URL + "chats/" + toUserId, {
        withCredentials: true,
      });
      setChats(response.data.data);
    } catch (error) {
      console.log("ERROR : " + error);
    }
  };

  const sendMessage = async () => {
    try {
      await axios.post(
        API_BASE_URL + "chats/send/" + toUserId,
        { message: messageInput },
        { withCredentials: true }
      );

      socket.emit("message", { messageInput, room });

      setMessageInput("");
      getChatHistory(); // Fetch updated chat history after sending a message
    } catch (error) {
      console.log("ERROR : ", error);
    }
  };

  useEffect(() => {
    getChatHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toUserId]);

  useEffect(() => {
    // Scroll to the bottom when `chats` updates
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <div className="w-[40%] relative h-screen p-2 bg-black rounded-md">
      <div
        ref={chatContainerRef}
        className="overflow-y-auto h-[85vh] pb-16" // Set a fixed height of 85vh for chat container
      >
        {chats.map((chat, index) =>
          chat.toUserId._id === toUserId ? (
            <div key={index} className="chat chat-end">
              <div className="chat-bubble chat-bubble-info">{chat.message}</div>
              <img
                src={chat.fromUserId.photoURL}
                className="w-10 h-10 rounded-full"
                alt="chat image"
              />
            </div>
          ) : (
            <div key={index} className="chat chat-start">
              <img
                src={chat.fromUserId.photoURL}
                className="w-10 h-10 rounded-full"
                alt="chat image"
              />
              <div className="chat-bubble chat-bubble-accent">
                {chat.message}
              </div>
            </div>
          )
        )}
      </div>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-info w-full text-white"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <div className="flex absolute bottom-0 w-[98%] gap-1">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-info w-full text-white"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />

        <button className="btn btn-info" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
