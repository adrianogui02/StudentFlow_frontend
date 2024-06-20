import React from "react";
import "./HomePage.css";
import { FaUserGraduate, FaCogs, FaTrophy } from "react-icons/fa"; // Importando ícones específicos

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="animated-background"></div>
      <div className="overlay"></div>
      <div className="content">
        <h1>Welcome to StudentFlow</h1>
        <p>
          Your ultimate solution for managing student information efficiently.
        </p>
        <div className="introduction">
          <div className="intro-item">
            <FaUserGraduate className="intro-icon" />
            <h3>Manage Students</h3>
            <p>
              Easily manage student records, track their progress, and keep all
              the information organized.
            </p>
          </div>
          <div className="intro-item">
            <FaCogs className="intro-icon" />
            <h3>Powerful Features</h3>
            <p>
              Explore a wide range of features that help you streamline student
              administration and data management.
            </p>
          </div>
          <div className="intro-item">
            <FaTrophy className="intro-icon" />
            <h3>Achieve Success</h3>
            <p>
              Utilize our tools to enhance educational outcomes and help
              students achieve their full potential.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
