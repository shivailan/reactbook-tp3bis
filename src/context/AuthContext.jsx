// src/context/AuthContext.jsx
import { createContext, useState } from "react";

// Création du contexte
export const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userObject) => setUser(userObject);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
