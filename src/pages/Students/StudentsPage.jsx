import React, { useEffect, useState, useCallback } from "react";
import StudentForm from "../../components/StudentForm/StudentForm";
import StudentList from "../../components/StudentList/StudentList";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import "./StudentsPage.css";

const StudentsPage = () => {
  const { token } = useAuth();
  const [students, setStudents] = useState([]);

  const fetchStudents = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/student/students`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Failed to fetch students", error);
    }
  }, [token]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleEdit = (student) => {
    console.log("Edit student:", student);
    // Implementar a lógica de edição aqui
    // Você pode usar um modal para edição ou redirecionar para uma página de edição específica
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/student/students/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchStudents();
    } catch (error) {
      console.error("Failed to delete student", error);
    }
  };

  return (
    <div className="students-page">
      <StudentForm fetchStudents={fetchStudents} />
      <StudentList
        students={students}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default StudentsPage;
