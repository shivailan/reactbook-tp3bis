import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    console.log({ email, password });
    setSuccess(true);

    // Message de succès pendant 3 secondes
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email : </label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Mot de passe : </label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Se connecter</button>
      {success && <p>Connexion réussie !</p>}
    </form>
  );
};

export default LoginForm;
