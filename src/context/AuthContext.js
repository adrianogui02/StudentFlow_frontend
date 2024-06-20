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
      try {
        // Verificar se o token tem o formato correto (3 partes separadas por ".")
        if (savedToken.split(".").length === 3) {
          setToken(savedToken);
          setUser(jwtDecode(savedToken));
        } else {
          console.warn("Invalid token format");
          localStorage.removeItem("token"); // Remover o token inválido
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        localStorage.removeItem("token"); // Remover o token inválido
      }
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        {
          username,
          password,
        }
      );
      const { token } = response.data;
      if (token) {
        setToken(token);
        setUser(jwtDecode(token));
        localStorage.setItem("token", token);
      } else {
        console.error("No token returned from login response");
      }
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
