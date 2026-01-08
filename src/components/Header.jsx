import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
  const { user } = useContext(AuthContext);
  const { theme, dispatch } = useContext(ThemeContext);

  return (
    <header className={`header ${theme}-theme`}>
      <h1>ReactBook</h1>
      <div className="header-right">
        <p>{user ? `Connecté en tant : ${user.name}` : "Invité"}</p>
        <button className="btn-theme" onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
          Changer de thème
        </button>
      </div>
    </header>
  );
};

export default Header;
