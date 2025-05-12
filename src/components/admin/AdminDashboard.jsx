import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import TeacherManagement from "./TeacherManagement";
import StudentManagement from "../student/StudentManagement";
import Reports from "./Reports";
import Settings from "./Settings";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const { darkMode } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("All Sections");
  const [selectedTeacher, setSelectedTeacher] = useState("All Teachers");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showCharts, setShowCharts] = useState(true);

  // Colors for charts
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  // Define Grade 1 sections
  const grade1Sections = ["A", "B", "C", "D", "E"];

  // Generate section data with random student counts (40-49 per section)
  const [sectionData, setSectionData] = useState(() => {
    return grade1Sections.map((section) => ({
      id: section,
      name: `Section ${section}`,
      count: Math.floor(Math.random() * 10) + 40,
    }));
  });

  // Mock student data - just a few examples for the dashboard table
  const [students, setStudents] = useState([
    {
      id: 1,
      lrn: "736600902864",
      name: "Antonio Bautista",
      section: "B",
      teacher: "Teacher B",
      date: "07/29/24",
      status: "Enrolled",
      gender: "Male",
    },
    {
      id: 2,
      lrn: "736600902865",
      name: "Maria Santos",
      section: "A",
      teacher: "Teacher A",
      date: "07/30/24",
      status: "Enrolled",
      gender: "Female",
    },
    {
      id: 3,
      lrn: "736600902866",
      name: "Juan Cruz",
      section: "C",
      teacher: "Teacher C",
      date: "07/28/24",
      status: "Enrolled",
      gender: "Male",
    },
    {
      id: 4,
      lrn: "736600902867",
      name: "Sofia Garcia",
      section: "D",
      teacher: "Teacher D",
      date: "07/31/24",
      status: "Enrolled",
      gender: "Female",
    },
    {
      id: 5,
      lrn: "736600902868",
      name: "Rafael Lim",
      section: "E",
      teacher: "Teacher E",
      date: "07/29/24",
      status: "Enrolled",
      gender: "Male",
    },
  ]);

  // Calculate total students across all sections
  const totalStudents = sectionData.reduce(
    (sum, section) => sum + section.count,
    0
  );

  // Calculate gender distribution (approximately 52% male, 48% female)
  const maleCount = Math.round(totalStudents * 0.52);
  const femaleCount = totalStudents - maleCount;

  // Prepare chart data
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    // Generate enrollment data for charts
    setEnrollmentData(
      sectionData.map((section) => ({
        name: section.name,
        students: section.count,
      }))
    );

    // Generate gender data for pie chart
    setGenderData([
      { name: "Male", value: maleCount },
      { name: "Female", value: femaleCount },
    ]);

    // Generate attendance data for the past 7 days
    const sevenDaysData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const day = date.toLocaleDateString("en-US", { weekday: "short" });

      // Generate a random attendance percentage between 90-98%
      const rate = Math.floor(Math.random() * 8) + 90;

      sevenDaysData.push({
        day: day,
        rate: rate,
      });
    }
    setAttendanceData(sevenDaysData);
  }, [sectionData]);

  // Ensure data is preserved across component remounts using localStorage
  useEffect(() => {
    const savedSectionData = localStorage.getItem("sectionData");
    if (savedSectionData) {
      setSectionData(JSON.parse(savedSectionData));
    }
  }, []);

  // Save data when it changes
  useEffect(() => {
    localStorage.setItem("sectionData", JSON.stringify(sectionData));
  }, [sectionData]);

  // Filter students based on search and filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lrn.includes(searchTerm);
    const matchesSection =
      selectedSection === "All Sections" ||
      student.section === selectedSection.replace("Section ", "");
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
            <div className="panel-header">
              <h2>Grade 1 Overview Dashboard</h2>
              <div className="panel-actions">
                <button
                  className="action-btn view-button"
                  onClick={() => setShowCharts(!showCharts)}
                >
                  {showCharts ? "Hide Charts" : "Show Charts"}
                </button>
              </div>
            </div>

            <div className="student-summary-cards">
              <div className="summary-card-item">
                <div className="summary-icon male-icon"></div>
                <div className="summary-details">
                  <h3>Male Students</h3>
                  <p className="summary-value">{maleCount}</p>
                </div>
              </div>

              <div className="summary-card-item">
                <div className="summary-icon female-icon"></div>
                <div className="summary-details">
                  <h3>Female Students</h3>
                  <p className="summary-value">{femaleCount}</p>
                </div>
              </div>

              <div className="summary-card-item">
                <div className="summary-icon total-icon"></div>
                <div className="summary-details">
                  <h3>Total Students</h3>
                  <p className="summary-value">{totalStudents}</p>
                </div>
              </div>

              <div className="summary-card-item">
                <div className="summary-icon enrolled-icon">📝</div>
                <div className="summary-details">
                  <h3>Enrolled</h3>
                  <p className="summary-value">{totalStudents}</p>
                </div>
              </div>
            </div>

            {showCharts && (
              <div className="analytics-dashboard">
                <div className="dashboard-title">
                  <h3>Student Distribution Analysis</h3>
                </div>

                <div className="charts-row">
                  <div className="chart-container">
                    <h4>Enrollment by Section</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={enrollmentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 50]} />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="students"
                          fill="#8884d8"
                          name="Students"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="chart-container">
                    <h4>Gender Distribution</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={genderData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {genderData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [value, "Students"]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="chart-container full-width">
                  <h4>Weekly Attendance Trend</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis domain={[85, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="rate"
                        fill="#82ca9d"
                        name="Attendance Rate %"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            <div className="section-summary">
              <div className="students-list-header">
                <h3>Grade 1 Sections</h3>
              </div>
              <div className="section-grid">
                {sectionData.map((section) => (
                  <div
                    key={section.id}
                    className="section-card"
                    onClick={() => setSelectedSection(`Section ${section.id}`)}
                    style={{
                      backgroundColor: "#fff",
                      padding: "1.5rem",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      textAlign: "center",
                      color: darkMode ? "#333" : "#333",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      cursor: "pointer",
                    }}
                  >
                    <h4
                      className="section-header"
                      style={{
                        margin: "0 0 0.5rem 0",
                        color: darkMode ? "#333" : "#333",
                        fontSize: "1.2rem",
                      }}
                    >
                      Section {section.id}
                    </h4>
                    <p
                      className="section-count"
                      style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                        margin: 0,
                        color: darkMode ? "#333" : "#333",
                      }}
                    >
                      {section.count}
                    </p>
                    <p
                      className="section-teacher"
                      style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}
                    >
                      Teacher {section.id}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="student-list">
              <div className="students-list-header">
                <h3>Recent Enrollments</h3>
                <div className="view-all-link">
                  <button
                    className="text-button"
                    onClick={() => setActiveTab("students")}
                  >
                    View All Students →
                  </button>
                </div>
              </div>
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
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.lrn}</td>
                      <td>{student.name}</td>
                      <td>{student.section}</td>
                      <td>{student.teacher}</td>
                      <td>{student.date}</td>
                      <td>{student.status}</td>
                      <td>
                        <button
                          className="view-button"
                          onClick={() => {
                            setActiveTab("students");
                            // In a real app, you would set the selected student here
                          }}
                        >
                          View Profile
                        </button>
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
