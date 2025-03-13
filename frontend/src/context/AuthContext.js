import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    if (savedToken) {
      try {
        setUser(jwtDecode(savedToken));
        setToken(savedToken);
      } catch (error) {
        console.error("Invalid token, logging out...");
        logout();
      }
    }
  }, []);
  
  const login = (newToken) => {
    localStorage.setItem("access_token", newToken);
    setToken(newToken);
    setUser(jwtDecode(newToken));
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
