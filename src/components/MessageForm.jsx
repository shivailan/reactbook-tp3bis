import { useState } from "react";

const MessageForm = ({ onAddMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onAddMessage(message);
    setMessage("");
  };

  console.log("render <MessageForm>");

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Tape ton message..."
      />
      <button type="submit">Publier</button>
    </form>
  );
};

export default MessageForm;
