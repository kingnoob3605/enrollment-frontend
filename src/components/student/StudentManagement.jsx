import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import StudentProfile from "./StudentProfile";
import EnrollmentForm from "../teacher/EnrollmentForm";

const StudentManagement = ({ userType }) => {
  const { currentUser } = useContext(AuthContext);
  const grade1Sections = ["A", "B", "C", "D", "E"];

  // Mock student data
  const [students, setStudents] = useState([
    {
      id: 1,
      lrn: "120001001001",
      name: "John M. Cruz",
      grade: "1",
      section: "A",
      gender: "Male",
      birthdate: "2018-05-15",
      address: "123 Main St, Barangay San Miguel, City",
      parent_name: "Cruz, Maria",
      parent_contact: "09123456789",
      status: "Enrolled",
      date_enrolled: "2024-07-01",
      teacher_assigned: "Teacher A",
      height: 118,
      weight: 22,
      bmi: 15.8,
      nutritional_status: "Normal",
      vision: "Normal",
      hearing: "Normal",
      vaccinations: "Complete",
      health: {
        height: 118,
        weight: 22,
        bmi: 15.8,
        vision: "Normal",
        hearing: "Normal",
        vaccinations: "Complete",
      },
    },
    {
      id: 2,
      lrn: "120001001002",
      name: "Maria S. Reyes",
      grade: "1",
      section: "A",
      gender: "Female",
      birthdate: "2018-07-22",
      address: "456 Rizal Ave, Barangay Santa Cruz, City",
      parent_name: "Reyes, Antonio",
      parent_contact: "09234567890",
      status: "Enrolled",
      date_enrolled: "2024-07-01",
      teacher_assigned: "Teacher A",
      height: 115,
      weight: 20,
      bmi: 15.1,
      nutritional_status: "Normal",
      vision: "Normal",
      hearing: "Normal",
      vaccinations: "Complete",
      health: {
        height: 115,
        weight: 20,
        bmi: 15.1,
        vision: "Normal",
        hearing: "Normal",
        vaccinations: "Complete",
      },
    },
    {
      id: 3,
      lrn: "120001002001",
      name: "Antonio B. Lim",
      grade: "1",
      section: "B",
      gender: "Male",
      birthdate: "2018-04-10",
      address: "789 Bonifacio St, Barangay San Jose, City",
      parent_name: "Lim, Sofia",
      parent_contact: "09345678901",
      status: "Enrolled",
      date_enrolled: "2024-07-02",
      teacher_assigned: "Teacher B",
      height: 120,
      weight: 23,
      bmi: 16.0,
      nutritional_status: "Normal",
      vision: "Needs Correction",
      hearing: "Normal",
      vaccinations: "Complete",
      health: {
        height: 120,
        weight: 23,
        bmi: 16.0,
        vision: "Needs Correction",
        hearing: "Normal",
        vaccinations: "Complete",
      },
    },
  ]);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterSection, setFilterSection] = useState("");
  const [filterTeacher, setFilterTeacher] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showCharts, setShowCharts] = useState(true);
  const [totalStudents, setTotalStudents] = useState(50);
  const [studentsBySection, setStudentsBySection] = useState({
    A: 10,
    B: 12,
    C: 9,
    D: 11,
    E: 8,
  });

  // Mock chart data
  const [enrollmentData, setEnrollmentData] = useState([
    { name: "Section A", students: 10 },
    { name: "Section B", students: 12 },
    { name: "Section C", students: 9 },
    { name: "Section D", students: 11 },
    { name: "Section E", students: 8 },
  ]);

  const [genderData, setGenderData] = useState([
    { name: "Male", value: 26 },
    { name: "Female", value: 24 },
  ]);

  const [bmiData, setBmiData] = useState([
    { name: "Severely Underweight", value: 3 },
    { name: "Underweight", value: 7 },
    { name: "Normal", value: 30 },
    { name: "Overweight", value: 6 },
    { name: "Obese", value: 4 },
  ]);

  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Set initial filter section based on teacher's assigned section
  useEffect(() => {
    if (userType === "teacher" && currentUser && currentUser.section) {
      setFilterSection(currentUser.section);
    }
  }, [userType, currentUser]);

  // Handle adding a new student
  const handleAddStudent = (newStudent) => {
    // Generate a new ID
    const newId = Math.max(...students.map((s) => s.id)) + 1;

    // Create full student object
    const studentData = {
      ...newStudent,
      id: newId,
      date_enrolled: new Date().toISOString().split("T")[0],
      health: {
        height: parseFloat(newStudent.height),
        weight: parseFloat(newStudent.weight),
        bmi: parseFloat(newStudent.bmi),
        vision: newStudent.vision,
        hearing: newStudent.hearing,
        vaccinations: newStudent.vaccinations,
      },
    };

    // Add to students array
    setStudents([...students, studentData]);
    setShowAddForm(false);

    // Update stats
    setTotalStudents(totalStudents + 1);
    setStudentsBySection({
      ...studentsBySection,
      [newStudent.section]: (studentsBySection[newStudent.section] || 0) + 1,
    });

    alert("Student added successfully!");
  };

  // Handle viewing a student profile
  const handleViewStudent = (id) => {
    setSelectedStudent(id);
  };

  // Get list of teachers for filtering
  const teachers = Array.from(
    new Set(students.map((student) => student.teacher_assigned))
  ).filter(Boolean);

  // Filter students based on search and filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lrn.includes(searchTerm);
    const matchesSection = !filterSection || student.section === filterSection;
    const matchesTeacher =
      !filterTeacher || student.teacher_assigned === filterTeacher;
    const matchesStatus = !filterStatus || student.status === filterStatus;

    return matchesSearch && matchesSection && matchesTeacher && matchesStatus;
  });

  return (
    <div className="student-management">
      <div className="panel-header">
        <h2>
          {userType === "teacher" && currentUser && currentUser.section
            ? `Grade 1 Section ${currentUser.section} Student Management`
            : "Grade 1 Student Management"}
        </h2>
        <div className="panel-actions">
          {(userType === "admin" || userType === "teacher") && (
            <button
              className="action-btn add-button"
              onClick={() => {
                setSelectedStudent(null);
                setShowAddForm(true);
              }}
            >
              Add New Student
            </button>
          )}
          {!showAddForm && !selectedStudent && (
            <>
              <button
                className="action-btn view-button"
                onClick={() => setShowCharts(!showCharts)}
              >
                {showCharts ? "Hide Charts" : "Show Charts"}
              </button>
              {(userType === "admin" || userType === "teacher") && (
                <button
                  className="action-btn export-button"
                  onClick={() =>
                    alert(
                      "Export to Excel functionality would be implemented here"
                    )
                  }
                >
                  Export to SF1 Excel
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {loading ? (
        <div className="loading-overlay">
          <div className="loader"></div>
          <p className="loading-text">Loading student data...</p>
        </div>
      ) : (
        <>
          {/* Grade 1 Dashboard Summary */}
          {!showAddForm && !selectedStudent && (
            <div className="dashboard-summary">
              <div className="summary-stats">
                <div className="stat-box">
                  <h4>
                    {userType === "teacher" &&
                    currentUser &&
                    currentUser.section
                      ? `Total Section ${currentUser.section} Students`
                      : "Total Grade 1 Students"}
                  </h4>
                  <p className="stat-value">{totalStudents}</p>
                </div>
                <div className="stat-box">
                  <h4>Male Students</h4>
                  <p className="stat-value">
                    {students.filter((s) => s.gender === "Male").length}
                  </p>
                </div>
                <div className="stat-box">
                  <h4>Female Students</h4>
                  <p className="stat-value">
                    {students.filter((s) => s.gender === "Female").length}
                  </p>
                </div>
              </div>

              {/* Section breakdown for admins or all teachers */}
              {(userType === "admin" ||
                (userType === "teacher" &&
                  (!currentUser || !currentUser.section))) && (
                <div className="section-summary">
                  <h4>Students by Section</h4>
                  <div className="section-grid">
                    {grade1Sections.map((section) => (
                      <div
                        key={section}
                        className="section-card"
                        onClick={() => setFilterSection(section)}
                      >
                        <h5>Section {section}</h5>
                        <p className="section-count">
                          {studentsBySection[section] || 0}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Student list with filters */}
              <div className="student-list-container">
                <div className="filters">
                  <div className="search-box">
                    <input
                      type="text"
                      placeholder="Search by name or LRN..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                  </div>

                  <div className="filter-controls">
                    {/* Section filter (if not a teacher with assigned section) */}
                    {(userType !== "teacher" ||
                      !currentUser ||
                      !currentUser.section) && (
                      <div className="filter-group">
                        <label>Section:</label>
                        <select
                          value={filterSection}
                          onChange={(e) => setFilterSection(e.target.value)}
                        >
                          <option value="">All Sections</option>
                          {grade1Sections.map((section) => (
                            <option key={section} value={section}>
                              Section {section}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Teacher filter */}
                    {(userType !== "teacher" ||
                      !currentUser ||
                      !currentUser.section) &&
                      teachers.length > 0 && (
                        <div className="filter-group">
                          <label>Teacher:</label>
                          <select
                            value={filterTeacher}
                            onChange={(e) => setFilterTeacher(e.target.value)}
                          >
                            <option value="">All Teachers</option>
                            {teachers.map((teacher) => (
                              <option key={teacher} value={teacher}>
                                {teacher}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                    {/* Status filter */}
                    <div className="filter-group">
                      <label>Status:</label>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      >
                        <option value="">All</option>
                        <option value="Enrolled">Enrolled</option>
                        <option value="Promoted">Promoted</option>
                        <option value="Transferred">Transferred</option>
                      </select>
                    </div>
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
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <tr key={student.id}>
                          <td>{student.lrn}</td>
                          <td>{student.name}</td>
                          <td>
                            {student.grade}-{student.section}
                          </td>
                          <td>{student.teacher_assigned}</td>
                          <td>
                            {student.date_enrolled
                              ? new Date(
                                  student.date_enrolled
                                ).toLocaleDateString()
                              : "N/A"}
                          </td>
                          <td>{student.status}</td>
                          <td>
                            <button
                              onClick={() => handleViewStudent(student.id)}
                              className="view-button"
                            >
                              View Profile
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="no-results">
                          No students found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {showAddForm ? (
            <EnrollmentForm
              onClose={() => setShowAddForm(false)}
              onSave={handleAddStudent}
              defaultGrade="1"
              sections={
                userType === "teacher" && currentUser && currentUser.section
                  ? [currentUser.section]
                  : grade1Sections
              }
            />
          ) : selectedStudent ? (
            <StudentProfile
              student={students.find((s) => s.id === selectedStudent)}
              onClose={() => setSelectedStudent(null)}
              viewOnly={userType === "parent"}
            />
          ) : null}
        </>
      )}
    </div>
  );
};

export default StudentManagement;
