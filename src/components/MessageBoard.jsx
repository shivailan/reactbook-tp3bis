import { useState } from "react";
import MessageForm from "./MessageForm";

const MessageBoard = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (msg) => {
    setMessages(prev => [...prev, msg]);
  };

  console.log("render <MessageBoard>");

  return (
    <div>
      <h2>Message Board</h2>
      <MessageForm onAddMessage={addMessage} />
      <ul>
        {messages.map((msg, i) => <li key={i}>{msg}</li>)}
      </ul>
    </div>
  );
};

export default MessageBoard;
