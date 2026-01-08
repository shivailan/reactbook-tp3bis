import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    login({ username: "Alice" });
    navigate("/");
  };

  return (
    <div>
      <h2>Connexion</h2>
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
}

export default LoginPage;
