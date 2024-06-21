import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // Importar o contexto de autenticação
import StudentList from "../../components/StudentList/StudentList";
import StudentForm from "../../components/StudentForm/StudentForm";
import "../../styles/Background.css"; // Importa o fundo animado
import "./StudentsPage.css"; // Estilos específicos para a página de estudantes

const StudentsPage = () => {
  const { token } = useAuth(); // Obter o token do contexto de autenticação
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

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
    setEditingStudent(null); // Limpar o formulário após a submissão
  };

  return (
    <div className="animated-background">
      <div className="students-page">
        <h1 className="students-title">Students Management</h1>
        <div className="students-content">
          <StudentForm
            editingStudent={editingStudent}
            onFormSubmit={handleFormSubmit}
            clearEditing={() => setEditingStudent(null)}
          />
          <StudentList
            students={students}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;
