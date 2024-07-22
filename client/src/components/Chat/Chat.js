"use client";

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useSearchParams } from "next/navigation";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";

const ENDPOINT = "http://localhost:5000";

let socket;

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const name = searchParams.get("name");
    const room = searchParams.get("room");

    if (name && room) {
      socket = io(ENDPOINT);

      setName(name);
      setRoom(room);

      socket.emit("join", { name, room });

      return () => {
        if (socket) {
          socket.disconnect();
          socket.off();
        }
      };
    }
  }, [searchParams]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (message) => {
        setMessages((messages) => [...messages, message]);
      });
    }
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
