import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import TeacherManagement from "./TeacherManagement";
import StudentManagement from "../student/StudentManagement";
import Reports from "./Reports";
import Settings from "./Settings";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("students");
  const { darkMode } = useContext(ThemeContext);
  const [totalStudents, setTotalStudents] = useState(50);
  const [sectionData, setSectionData] = useState([
    { id: "A", name: "Section A", count: 10 },
    { id: "B", name: "Section B", count: 12 },
    { id: "C", name: "Section C", count: 9 },
    { id: "D", name: "Section D", count: 11 },
    { id: "E", name: "Section E", count: 8 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("All Sections");
  const [selectedTeacher, setSelectedTeacher] = useState("All Teachers");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Mock student data
  const [students, setStudents] = useState([
    {
      lrn: "736600902864",
      name: "Antonio Bautista",
      section: "1-B",
      teacher: "Teacher B",
      date: "07/29/24",
      status: "Enrolled",
    },
    // Additional student data would be here
  ]);

  // Ensure data is preserved across component remounts using localStorage
  useEffect(() => {
    const savedSectionData = localStorage.getItem("sectionData");
    if (savedSectionData) {
      setSectionData(JSON.parse(savedSectionData));
    }

    const savedTotalStudents = localStorage.getItem("totalStudents");
    if (savedTotalStudents) {
      setTotalStudents(parseInt(savedTotalStudents));
    }
  }, []);

  // Save data when it changes
  useEffect(() => {
    localStorage.setItem("sectionData", JSON.stringify(sectionData));
    localStorage.setItem("totalStudents", totalStudents.toString());
  }, [sectionData, totalStudents]);

  // Filter students based on search and filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lrn.includes(searchTerm);
    const matchesSection =
      selectedSection === "All Sections" ||
      student.section.includes(selectedSection);
    const matchesTeacher =
      selectedTeacher === "All Teachers" || student.teacher === selectedTeacher;
    const matchesStatus =
      selectedStatus === "All" || student.status === selectedStatus;

    return matchesSearch && matchesSection && matchesTeacher && matchesStatus;
  });

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h3>Admin Dashboard</h3>
        <ul className="nav-menu">
          <li
            className={activeTab === "home" ? "active" : ""}
            onClick={() => setActiveTab("home")}
          >
            Dashboard Home
          </li>
          <li
            className={activeTab === "students" ? "active" : ""}
            onClick={() => setActiveTab("students")}
          >
            Student Management
          </li>
          <li
            className={activeTab === "teachers" ? "active" : ""}
            onClick={() => setActiveTab("teachers")}
          >
            Teacher Management
          </li>
          <li
            className={activeTab === "reports" ? "active" : ""}
            onClick={() => setActiveTab("reports")}
          >
            Reports
          </li>
          <li
            className={activeTab === "settings" ? "active" : ""}
            onClick={() => setActiveTab("settings")}
          >
            System Settings
          </li>
        </ul>
      </div>

      <div className="content">
        {activeTab === "home" && (
          <div className="admin-dashboard-home">
            <div className="dashboard-summary">
              <div className="summary-card">
                <h3>Total Grade 1 Students</h3>
                <p className="stat-value">{totalStudents}</p>
              </div>
            </div>

            <div className="students-by-section">
              <h3 className="students-by-section-header">
                Students by Section
              </h3>
              <div className="section-grid">
                {sectionData.map((section) => (
                  <div
                    key={section.id}
                    className="section-card"
                    style={{
                      backgroundColor: "#fff",
                      padding: "1rem",
                      borderRadius: "8px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      textAlign: "center",
                      color: darkMode ? "#333" : "#333",
                    }}
                  >
                    <h4
                      className="section-header"
                      style={{
                        margin: "0 0 0.5rem 0",
                        color: darkMode ? "#333" : "#333",
                      }}
                    >
                      Section {section.id}
                    </h4>
                    <p
                      className="section-count"
                      style={{
                        fontSize: "1.75rem",
                        fontWeight: "bold",
                        margin: 0,
                        color: darkMode ? "#333" : "#333",
                      }}
                    >
                      {section.count}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="student-search">
              <input
                type="text"
                placeholder="Search by name or LRN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />

              <div className="filter-controls">
                <div className="filter-group">
                  <label>Section:</label>
                  <select
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                  >
                    <option value="All Sections">All Sections</option>
                    <option value="1-A">1-A</option>
                    <option value="1-B">1-B</option>
                    <option value="1-C">1-C</option>
                    <option value="1-D">1-D</option>
                    <option value="1-E">1-E</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Teacher:</label>
                  <select
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                  >
                    <option value="All Teachers">All Teachers</option>
                    <option value="Teacher A">Teacher A</option>
                    <option value="Teacher B">Teacher B</option>
                    <option value="Teacher C">Teacher C</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Status:</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="Enrolled">Enrolled</option>
                    <option value="Pending">Pending</option>
                    <option value="Transferred">Transferred</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="student-list">
              <table className="students-table">
                <thead>
                  <tr>
                    <th>LRN</th>
                    <th>Name</th>
                    <th>Section</th>
                    <th>Teacher</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.lrn}>
                      <td>{student.lrn}</td>
                      <td>{student.name}</td>
                      <td>{student.section}</td>
                      <td>{student.teacher}</td>
                      <td>{student.date}</td>
                      <td>{student.status}</td>
                      <td>
                        <button className="view-button">View Profile</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === "students" && <StudentManagement userType="admin" />}
        {activeTab === "teachers" && <TeacherManagement />}
        {activeTab === "reports" && <Reports />}
        {activeTab === "settings" && <Settings />}
      </div>
    </div>
  );
};

export default AdminDashboard;
