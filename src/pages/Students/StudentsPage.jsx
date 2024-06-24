import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import StudentList from "../../components/StudentList/StudentList";
import StudentForm from "../../components/StudentForm/StudentForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Background.css";
import "./StudentsPage.css";

const StudentsPage = () => {
  const { user, token, isLoading } = useAuth();
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!token) {
        navigate("/");
      } else {
        fetchStudents();
      }
    }
  }, [token, navigate, isLoading]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/student/students`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Failed to fetch students", error);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/student/students/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStudents(students.filter((student) => student.id !== id));
      toast.success("Student Deleted Successfully");
    } catch (error) {
      console.error("Failed to delete student", error);
    }
  };

  const handleFormSubmit = (updatedStudent) => {
    if (editingStudent) {
      setStudents(
        students.map((student) =>
          student.id === updatedStudent.id ? updatedStudent : student
        )
      );
    } else {
      setStudents([...students, updatedStudent]);
    }
    setEditingStudent(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Not authorized. Please log in.</div>;
  }

  return (
    <>
      <div className="animated-background"></div>
      <div className="scrollable-content">
        <div className="students-page">
          <h1 className="students-title">Students Management</h1>
          <div className="students-content">
            <StudentForm
              editingStudent={editingStudent}
              onFormSubmit={handleFormSubmit}
              clearEditing={() => setEditingStudent(null)}
              fetchStudents={fetchStudents}
            />
            <StudentList
              students={students}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentsPage;
