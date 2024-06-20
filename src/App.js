import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import StudentsPage from "./pages/Students/StudentsPage";
import PrivateRoute from "./PrivateRoute";
import "./styles/App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer
          position="bottom-right" // Posição da notificação
          autoClose={3000} // Tempo de auto-fechamento em milissegundos
          hideProgressBar={false} // Exibe ou oculta a barra de progressão
          newestOnTop={false} // Notificações mais recentes no topo
          closeOnClick // Fecha ao clicar
          rtl={false} // Direção da notificação (direita para esquerda)
          pauseOnFocusLoss // Pausa ao perder o foco
          draggable // Permite arrastar a notificação
          pauseOnHover // Pausa ao passar o mouse sobre a notificação
          theme="dark" // Tema (escuro, claro, ou colorido)
        />
        <Navbar />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/students" element={<PrivateRoute />}>
            <Route path="/students" element={<StudentsPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
