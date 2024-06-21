// src/context/AuthContext.js

import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        if (savedToken.split(".").length === 3) {
          setToken(savedToken);
          setUser(jwtDecode(savedToken));
        } else {
          console.warn("Invalid token format");
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        { username, password }
      );
      const { token, user } = response.data;
      if (token) {
        setToken(token);
        setUser(user); // Set the user directly
        localStorage.setItem("token", token);
        return { success: true }; // Retornar sucesso
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error("Login failed", error);

      return { success: false }; // Retornar falha
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
