// src/components/StudentList/StudentList.jsx
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./StudentList.css";

const StudentList = ({ students, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Verificar se a página atual ainda é válida após a alteração na lista de estudantes
    const totalPages = Math.ceil(students.length / itemsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages > 0 ? totalPages : 1);
    }
  }, [students.length, currentPage]);

  const totalPages = Math.ceil(students.length / itemsPerPage);
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
      {students.length > 0 ? (
        <>
          <div className="student-list-table-wrapper">
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
                      <button
                        className="edit-button"
                        onClick={() => onEdit(student)}
                      >
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
            <div className="student-list-cards">
              {currentItems.map((student) => (
                <div className="student-card" key={student.id}>
                  <div className="student-card-item">
                    <strong>Name</strong>
                    {student.name}
                  </div>
                  <div className="student-card-item">
                    <strong>Age</strong> {student.age}
                  </div>
                  <div className="student-card-item">
                    <strong>Email</strong> {student.email}
                  </div>
                  <div className="student-card-item">
                    <strong>Course</strong> {student.course}
                  </div>
                  <div className="student-card-actions">
                    <button
                      className="edit-button"
                      onClick={() => onEdit(student)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => onDelete(student.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {totalPages > 1 && (
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
          )}
        </>
      ) : (
        <p>No students registered.</p>
      )}
    </div>
  );
};

export default StudentList;
