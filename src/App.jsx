import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { ThemeContext, ThemeProvider } from "./context/ThemeContext";
import FeedPage from "./pages/FeedPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

const AppContent = () => {
  const { theme, dispatch } = useContext(ThemeContext);

  return (
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

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <FeedPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/user/:username"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
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
