import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header style={{ padding: "10px", borderBottom: "1px solid gray" }}>
      <h1>ReactBook</h1>
      <p>Connecté en tant que : {user ? user.name : "Invité"}</p>
    </header>
  );
};

export default Header;
