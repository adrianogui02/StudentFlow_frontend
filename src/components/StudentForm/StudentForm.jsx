import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./StudentForm.css";

const StudentForm = ({
  editingStudent,
  onFormSubmit,
  clearEditing,
  fetchStudents,
}) => {
  const { token } = useAuth();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setAge(editingStudent.age);
      setEmail(editingStudent.email);
      setCourse(editingStudent.course);
    } else {
      clearForm();
    }
  }, [editingStudent]);

  const clearForm = () => {
    setName("");
    setAge("");
    setEmail("");
    setCourse("");
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar email antes de enviar
    if (!validateEmail(email)) {
      toast.error("Invalid email address. Please enter a valid email.");
      return;
    }

    const studentData = { name, age, email, course };

    try {
      if (editingStudent) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/student/students/${editingStudent.id}`,
          studentData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        onFormSubmit({ ...studentData, id: editingStudent.id });
        toast.success("Student updated successfully!");
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/student/students`,
          studentData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        onFormSubmit(response.data);
        toast.success("Student added successfully!");
      }
      clearForm();
      fetchStudents();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("Email already exists. Please use a different email.");
        } else if (error.response.status === 400) {
          const errorMessages = error.response.data.error;
          errorMessages.forEach((message) => toast.error(message));
        } else {
          toast.error("Failed to submit student data. Please try again.");
        }
      } else {
        toast.error("Failed to submit student data. Please try again.");
      }
    }
  };

  return (
    <div className="student-form-container">
      <h2>{editingStudent ? "Edit Student" : "Add New Student"}</h2>
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
        <button type="submit">{editingStudent ? "Update" : "Add"}</button>
        {editingStudent && (
          <button
            type="button"
            onClick={clearEditing}
            className="cancel-button"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default StudentForm;
