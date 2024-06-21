import React, { useState } from "react";
import { FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./StudentList.css";

const StudentList = ({ students, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de itens por página

  // Calcular o número total de páginas
  const totalPages = Math.ceil(students.length / itemsPerPage);

  // Calcular os itens para a página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = students.slice(startIndex, startIndex + itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="student-list-container">
      <h2>Student List</h2>
      <table className="student-list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td className="student-list-actions">
                <button className="edit-button" onClick={() => onEdit(student)}>
                  <FaEdit />
                </button>
                <button
                  className="delete-button"
                  onClick={() => onDelete(student.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <FaArrowLeft />
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default StudentList;
