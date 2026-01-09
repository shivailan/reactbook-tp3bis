import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    // Vérification stricte des identifiants
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