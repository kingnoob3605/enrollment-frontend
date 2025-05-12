import React, { useState, useEffect } from "react";

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Teacher A",
      position: "Class Advisor",
      grade: "1",
      section: "A",
      email: "teachera@school.edu",
      phone: "123-456-7891",
      subjects: ["Mathematics", "English", "Science"],
      students_count: 10,
    },
    {
      id: 2,
      name: "Teacher B",
      position: "Class Advisor",
      grade: "1",
      section: "B",
      email: "teacherb@school.edu",
      phone: "123-456-7892",
      subjects: ["Mathematics", "English", "Science"],
      students_count: 12,
    },
    {
      id: 3,
      name: "Teacher C",
      position: "Class Advisor",
      grade: "1",
      section: "C",
      email: "teacherc@school.edu",
      phone: "123-456-7893",
      subjects: ["Mathematics", "English", "Science"],
      students_count: 9,
    },
    {
      id: 4,
      name: "Teacher D",
      position: "Class Advisor",
      grade: "1",
      section: "D",
      email: "teacherd@school.edu",
      phone: "123-456-7894",
      subjects: ["Mathematics", "English", "Science"],
      students_count: 11,
    },
    {
      id: 5,
      name: "Teacher E",
      position: "Class Advisor",
      grade: "1",
      section: "E",
      email: "teachere@school.edu",
      phone: "123-456-7895",
      subjects: ["Mathematics", "English", "Science"],
      students_count: 8,
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [viewingTeacher, setViewingTeacher] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    position: "Class Advisor",
    grade: "1",
    section: "",
    email: "",
    phone: "",
    subjects: [],
  });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter teachers based on search term
  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (teacher.email &&
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (teacher.section &&
        teacher.section.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "subjects") {
      // Handle subjects as an array
      const subjectsArray = value.split(",").map((subject) => subject.trim());
      setFormData({
        ...formData,
        [name]: subjectsArray,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingTeacher) {
      // Update existing teacher
      const updatedTeachers = teachers.map((teacher) =>
        teacher.id === editingTeacher.id
          ? { ...formData, id: teacher.id }
          : teacher
      );
      setTeachers(updatedTeachers);
      setEditingTeacher(null);

      alert("Teacher updated successfully!");
    } else {
      // Add new teacher
      const newTeacher = {
        ...formData,
        id: Math.max(...teachers.map((t) => t.id)) + 1,
        students_count: 0,
      };
      setTeachers([...teachers, newTeacher]);

      alert("Teacher added successfully!");
    }

    // Reset form and close it
    setFormData({
      name: "",
      position: "Class Advisor",
      grade: "1",
      section: "",
      email: "",
      phone: "",
      subjects: [],
    });
    setShowAddForm(false);
  };

  // Start editing a teacher
  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      name: teacher.name,
      position: teacher.position || "Class Advisor",
      grade: teacher.grade || "1",
      section: teacher.section || "",
      email: teacher.email || "",
      phone: teacher.phone || "",
      subjects: teacher.subjects || [],
    });
    setShowAddForm(true);
    setViewingTeacher(null);
  };

  // View teacher details
  const handleView = (teacher) => {
    setViewingTeacher(teacher);
    setShowAddForm(false);
    setEditingTeacher(null);
  };

  // Delete a teacher
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      setTeachers(teachers.filter((teacher) => teacher.id !== id));

      if (viewingTeacher && viewingTeacher.id === id) {
        setViewingTeacher(null);
      }

      alert("Teacher deleted successfully!");
    }
  };

  // Render teacher profile
  const renderTeacherProfile = () => {
    if (!viewingTeacher) return null;

    return (
      <div className="teacher-profile">
        <div className="profile-header">
          <h2>{viewingTeacher.name}'s Profile</h2>
          <button
            onClick={() => setViewingTeacher(null)}
            className="close-button"
          >
            Close
          </button>
        </div>

        <div className="profile-sections">
          <div className="profile-section">
            <h3>Personal Information</h3>
            <div className="profile-details">
              <div className="detail-item">
                <label>Name:</label>
                <span>{viewingTeacher.name}</span>
              </div>
              <div className="detail-item">
                <label>Position:</label>
                <span>{viewingTeacher.position}</span>
              </div>
              <div className="detail-item">
                <label>Grade & Section:</label>
                <span>
                  Grade {viewingTeacher.grade}, Section {viewingTeacher.section}
                </span>
              </div>
              <div className="detail-item">
                <label>Email:</label>
                <span>{viewingTeacher.email}</span>
              </div>
              <div className="detail-item">
                <label>Phone:</label>
                <span>{viewingTeacher.phone}</span>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h3>Teaching Information</h3>
            <div className="profile-details">
              <div className="detail-item">
                <label>Subjects Taught:</label>
                <span>
                  {viewingTeacher.subjects &&
                  Array.isArray(viewingTeacher.subjects)
                    ? viewingTeacher.subjects.join(", ")
                    : "None specified"}
                </span>
              </div>
              <div className="detail-item">
                <label>Students:</label>
                <span>{viewingTeacher.students_count || "0"} students</span>
              </div>
              <div className="detail-item">
                <label>Schedule:</label>
                <span>Monday to Friday, 7:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button
            onClick={() => handleEdit(viewingTeacher)}
            className="edit-button"
          >
            Edit Information
          </button>
          <button className="print-button">Print Profile</button>
        </div>
      </div>
    );
  };

  return (
    <div className="teacher-management">
      <div className="panel-header">
        <h2>Teacher Management</h2>
        <button
          className="add-button"
          onClick={() => {
            setEditingTeacher(null);
            setFormData({
              name: "",
              position: "Class Advisor",
              grade: "1",
              section: "",
              email: "",
              phone: "",
              subjects: [],
            });
            setShowAddForm(true);
            setViewingTeacher(null);
          }}
        >
          Add New Teacher
        </button>
      </div>

      {loading ? (
        <div className="loading-overlay">
          <div className="loader"></div>
          <p className="loading-text">Loading teacher data...</p>
        </div>
      ) : (
        <>
          {showAddForm ? (
            <div className="teacher-form">
              <h3>{editingTeacher ? "Edit Teacher" : "Add New Teacher"}</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name*:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Position*:</label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                  >
                    <option value="Class Advisor">Class Advisor</option>
                    <option value="Subject Teacher">Subject Teacher</option>
                    <option value="Department Head">Department Head</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Grade*:</label>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      required
                    >
                      <option value="1">Grade 1</option>
                      <option value="2">Grade 2</option>
                      <option value="3">Grade 3</option>
                      <option value="4">Grade 4</option>
                      <option value="5">Grade 5</option>
                      <option value="6">Grade 6</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Section*:</label>
                    <select
                      name="section"
                      value={formData.section}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Section</option>
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                      <option value="C">Section C</option>
                      <option value="D">Section D</option>
                      <option value="E">Section E</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Email*:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone*:</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Subjects Taught (comma-separated):</label>
                  <input
                    type="text"
                    name="subjects"
                    value={
                      Array.isArray(formData.subjects)
                        ? formData.subjects.join(", ")
                        : ""
                    }
                    onChange={handleChange}
                  />
                  <small>E.g. Mathematics, Science, English</small>
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-button">
                    {editingTeacher ? "Update Teacher" : "Add Teacher"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingTeacher(null);
                    }}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : viewingTeacher ? (
            renderTeacherProfile()
          ) : (
            <div className="teacher-list-container">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search teachers by name, email or section..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              <table className="teachers-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Grade & Section</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.length > 0 ? (
                    filteredTeachers.map((teacher) => (
                      <tr key={teacher.id}>
                        <td>{teacher.name}</td>
                        <td>{teacher.position}</td>
                        <td>
                          {teacher.grade && teacher.section
                            ? `Grade ${teacher.grade}, Section ${teacher.section}`
                            : "N/A"}
                        </td>
                        <td>{teacher.email}</td>
                        <td>{teacher.phone}</td>
                        <td>
                          <button
                            onClick={() => handleView(teacher)}
                            className="view-button"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEdit(teacher)}
                            className="edit-button"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(teacher.id)}
                            className="delete-button"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="no-results">
                        No teachers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TeacherManagement;
