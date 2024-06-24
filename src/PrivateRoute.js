import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const PrivateRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    // Enquanto estiver carregando, você pode mostrar um indicador de carregamento ou nada
    return;
  }

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
