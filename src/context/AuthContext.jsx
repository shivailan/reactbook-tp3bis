import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login strict pour l’utilisateur Shiva
  const login = (username, password) => {
    if (username === "shiva" && password === "shiva") {
      setUser({ name: "Shiva", isAdmin: true });
      return true; // Succès
    } else {
      return false; // Échec
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
