import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);

  return <header>{user ? `Connecté en tant que ${user.name}` : "Invité"}</header>;
};

export default Header;
