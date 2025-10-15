import { useState } from "react";

const InputLogger = () => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
    console.log(e);
  };

  console.log("render <InputLogger>");

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} placeholder="Tapez ici..." />
      <p>Valeur saisie : {text}</p>
    </div>
  );
};

export default InputLogger;
