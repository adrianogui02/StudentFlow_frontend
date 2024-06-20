import React, { useState } from "react";
import "./StudentForm.css";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const StudentForm = ({ fetchStudents }) => {
  const { token } = useAuth();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/student/students`,
        { name, age, email, course },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchStudents();
      setName("");
      setAge("");
      setEmail("");
      setCourse("");
    } catch (error) {
      console.error("Failed to add student", error);
    }
  };

  return (
    <div className="student-form-container">
      <h2>Add New Student</h2>
      <form className="student-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          placeholder="Course"
          required
        />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default StudentForm;
