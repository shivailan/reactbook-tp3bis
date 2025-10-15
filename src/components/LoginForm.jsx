import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  console.log("render <LoginForm>");

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email :</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Mot de passe :</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Se connecter</button>
      {success && <p>Connexion réussie !</p>}
    </form>
  );
};

export default LoginForm;
