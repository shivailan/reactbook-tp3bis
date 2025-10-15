import { useState } from "react";

const InputLogger = () => {
  const [text, setText] = useState("");

  const handleChange = (event) => {
    console.log(event); // Pour observer le SyntheticEvent
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" onChange={handleChange} placeholder="Tape quelque chose..." />
      <p>Valeur saisie : {text}</p>
    </div>
  );
};

export default InputLogger;
