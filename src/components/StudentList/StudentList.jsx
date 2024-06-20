import React from "react";
import "./StudentList.css";

const StudentList = ({ students, onEdit, onDelete }) => {
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
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td className="student-list-actions">
                <button className="edit-button" onClick={() => onEdit(student)}>
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => onDelete(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
