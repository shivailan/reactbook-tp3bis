import { useContext } from "react";
import Feed from "./components/Feed";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import { ThemeContext, ThemeProvider } from "./context/ThemeContext";

const AppContent = () => {
  const { theme, dispatch } = useContext(ThemeContext);

  return (
    // On change la couleur du fond et du texte selon le thème avec Tailwind
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === "light" ? "bg-gray-100 text-gray-900" : "bg-gray-900 text-white"
    }`}>
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 py-4 text-right">
        <button 
          onClick={() => dispatch({ type: "TOGGLE_THEME" })}
          className="px-4 py-2 rounded-full font-bold shadow-md transition-all bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400"
        >
          {theme === "light" ? "🌙 Mode Sombre" : "☀️ Mode Clair"}
        </button>
      </div>

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
