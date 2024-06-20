import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/students">Manage Students</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <Link
            to="/logout"
            onClick={() => {
              // Limpar o token ou fazer logout
              localStorage.removeItem("token");
              window.location.href = "/login"; // Redirecionar para login após logout
            }}
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
