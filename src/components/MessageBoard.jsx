import { useState } from "react";
import MessageForm from "./MessageForm";

const MessageBoard = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  console.log("render <MessageBoard>");

  return (
    <div>
      <h2>Message Board</h2>
      <MessageForm onAddMessage={addMessage} />
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default MessageBoard;
