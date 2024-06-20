import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Carregar usuário e token do localStorage
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setUser(jwtDecode(savedToken));
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/user/login",
        { username, password }
      );
      const { token } = response.data;
      setToken(token);
      setUser(jwtDecode(token));
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
