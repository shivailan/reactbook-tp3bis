import { useContext } from "react";
import Feed from "./components/Feed";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import { ThemeContext, ThemeProvider } from "./context/ThemeContext";

const AppContent = () => {
  const { theme, dispatch } = useContext(ThemeContext);

  return (
    <div className={theme === "light" ? "light-theme" : "dark-theme"}>
      <Header />
      <button onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
        Changer de thème
      </button>
      <Feed />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
