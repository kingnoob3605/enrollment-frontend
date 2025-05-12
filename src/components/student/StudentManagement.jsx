import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import StudentProfile from "./StudentProfile";
import EnrollmentForm from "../teacher/EnrollmentForm";
import exportStudentListToExcel from "../../utils/exportStudentListToExcel";

// Function to generate mock students for a specific section
const generateSectionStudents = (section) => {
  // Generate a random number of students between 40-49 for each section
  const count = Math.floor(Math.random() * 10) + 40;
  const students = [];
  const firstNames = [
    "John",
    "Maria",
    "Antonio",
    "Sofia",
    "Jose",
    "Ana",
    "Miguel",
    "Elena",
    "Pedro",
    "Lucia",
    "Carlos",
    "Rosa",
    "Daniel",
    "Julia",
    "David",
    "Angela",
    "Juan",
    "Teresa",
    "Luis",
    "Marta",
    "Manuel",
    "Cristina",
    "Pablo",
    "Carmen",
    "Alejandro",
    "Isabel",
    "Roberto",
    "Patricia",
    "Fernando",
    "Laura",
  ];

  const lastNames = [
    "Cruz",
    "Reyes",
    "Lim",
    "Garcia",
    "Santos",
    "Gonzales",
    "Rivera",
    "Torres",
    "Flores",
    "Villanueva",
    "Ramos",
    "Mendoza",
    "De Guzman",
    "Aquino",
    "Castro",
    "Martinez",
    "Rodriguez",
    "Fernandez",
    "Perez",
    "Diaz",
    "Morales",
    "Navarro",
    "Jimenez",
    "Alvarez",
    "Romero",
    "Gomez",
    "Hernandez",
    "Sanchez",
    "Ramirez",
    "Vazquez",
  ];

  for (let i = 1; i <= count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const middleInitial = String.fromCharCode(
      65 + Math.floor(Math.random() * 26)
    );
    const name = `${firstName} ${middleInitial}. ${lastName}`;

    // Generate a unique LRN
    const lrn = `1200010${section}${i.toString().padStart(3, "0")}`;

    // Generate random height (110-130 cm) and weight (18-30 kg) for Grade 1 students
    const height = Math.floor(Math.random() * 20) + 110;
    const weight = Math.floor(Math.random() * 12) + 18;

    // Calculate BMI
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    // Determine nutritional status based on BMI
    let nutritionalStatus = "Normal";
    if (bmi < 14) nutritionalStatus = "Severely Underweight";
    else if (bmi < 15) nutritionalStatus = "Underweight";
    else if (bmi > 19 && bmi < 21) nutritionalStatus = "Overweight";
    else if (bmi >= 21) nutritionalStatus = "Obese";

    // Generate random vision and hearing status
    const vision = Math.random() < 0.1 ? "Needs Correction" : "Normal";
    const hearing = Math.random() < 0.05 ? "Needs Assistance" : "Normal";

    // Create the student object
    students.push({
      id: parseInt(`1${section.charCodeAt(0) - 64}${i}`), // Create unique ID
      lrn: lrn,
      name: name,
      grade: "1",
      section: section,
      gender: Math.random() < 0.5 ? "Male" : "Female",
      birthdate: `2018-${(Math.floor(Math.random() * 12) + 1)
        .toString()
        .padStart(2, "0")}-${(Math.floor(Math.random() * 28) + 1)
        .toString()
        .padStart(2, "0")}`,
      address: `${Math.floor(Math.random() * 500) + 100} ${
        ["Main St", "Rizal Ave", "Bonifacio St", "Mabini Ave", "Quezon Blvd"][
          Math.floor(Math.random() * 5)
        ]
      }, Barangay ${
        ["San Miguel", "Santa Cruz", "San Jose", "San Antonio", "San Roque"][
          Math.floor(Math.random() * 5)
        ]
      }, City`,
      parent_name: `${lastName}, ${
        firstNames[Math.floor(Math.random() * firstNames.length)]
      }`,
      parent_contact: `09${Math.floor(Math.random() * 1000000000)
        .toString()
        .padStart(9, "0")}`,
      parent_email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      status: "Enrolled",
      date_enrolled: "2024-07-01",
      teacher_assigned: `Teacher ${section}`,
      height: height,
      weight: weight,
      bmi: bmi,
      nutritional_status: nutritionalStatus,
      vision: vision,
      hearing: hearing,
      vaccinations: Math.random() < 0.9 ? "Complete" : "Incomplete",
      health: {
        height: height,
        weight: weight,
        bmi: bmi,
        vision: vision,
        hearing: hearing,
        vaccinations: Math.random() < 0.9 ? "Complete" : "Incomplete",
      },
    });
  }

  return students;
};

const StudentManagement = ({ userType, teacherSection }) => {
  const { currentUser } = useContext(AuthContext);
  const grade1Sections = ["A", "B", "C", "D", "E"];

  // Use the provided teacherSection or get it from currentUser if available
  const assignedSection = teacherSection || currentUser?.section || null;

  // Generate mock student data for all sections or just the teacher's section
  const generateMockStudents = () => {
    if (userType === "teacher" && assignedSection) {
      // For teachers, only generate students for their assigned section
      return generateSectionStudents(assignedSection);
    } else {
      // For admins, generate students for all sections
      let allStudents = [];
      grade1Sections.forEach((section) => {
        allStudents = [...allStudents, ...generateSectionStudents(section)];
      });
      return allStudents;
    }
  };

  // Mock student data
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterSection, setFilterSection] = useState(assignedSection || "");
  const [filterTeacher, setFilterTeacher] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showCharts, setShowCharts] = useState(false);

  // Initialize student data
  useEffect(() => {
    const mockStudents = generateMockStudents();
    setStudents(mockStudents);

    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [userType, assignedSection]);

  // Calculate total students
  const totalStudents =
    userType === "teacher" && assignedSection
      ? students.filter((s) => s.section === assignedSection).length
      : students.length;

  // Calculate students by section
  const studentsBySection = {};
  grade1Sections.forEach((section) => {
    studentsBySection[section] = students.filter(
      (s) => s.section === section
    ).length;
  });

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
          {userType === "teacher" && assignedSection
            ? `Grade 1 Section ${assignedSection} Student Management`
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
                  onClick={() => {
                    // Prepare school info object
                    const schoolInfo = {
                      schoolId: "123456",
                      schoolName: "Elementary School Learners Profile System",
                      division: "Zamboanga del Sur",
                      district: "District 1",
                      region: "Region VIII",
                      schoolYear: "2024-2025",
                    };

                    // Get appropriate section for export
                    const sectionToExport =
                      filterSection || assignedSection || "";

                    // Call the export function with filtered students
                    exportStudentListToExcel(
                      filteredStudents, // Only export filtered students
                      schoolInfo,
                      sectionToExport,
                      "1" // Hardcoded to Grade 1 as per the application's scope
                    );
                  }}
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
                    {userType === "teacher" && assignedSection
                      ? `Total Section ${assignedSection} Students`
                      : "Total Grade 1 Students"}
                  </h4>
                  <p className="stat-value">{totalStudents}</p>
                </div>
                <div className="stat-box">
                  <h4>Male Students</h4>
                  <p className="stat-value">
                    {userType === "teacher" && assignedSection
                      ? students.filter(
                          (s) =>
                            s.section === assignedSection && s.gender === "Male"
                        ).length
                      : students.filter((s) => s.gender === "Male").length}
                  </p>
                </div>
                <div className="stat-box">
                  <h4>Female Students</h4>
                  <p className="stat-value">
                    {userType === "teacher" && assignedSection
                      ? students.filter(
                          (s) =>
                            s.section === assignedSection &&
                            s.gender === "Female"
                        ).length
                      : students.filter((s) => s.gender === "Female").length}
                  </p>
                </div>
              </div>

              {/* Section breakdown for admins only */}
              {userType === "admin" && (
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
                    {/* Section filter for admins only */}
                    {userType === "admin" && (
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

                    {/* Teacher filter for admins only */}
                    {userType === "admin" && teachers.length > 0 && (
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

                    {/* Status filter available to all */}
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

                <div className="student-summary-cards">
                  <div className="summary-card-item">
                    <div className="summary-icon male-icon"></div>
                    <div className="summary-details">
                      <h3>Male Students</h3>
                      <p className="summary-value">
                        {userType === "teacher" && assignedSection
                          ? students.filter(
                              (s) =>
                                s.section === assignedSection &&
                                s.gender === "Male"
                            ).length
                          : students.filter((s) => s.gender === "Male").length}
                      </p>
                    </div>
                  </div>

                  <div className="summary-card-item">
                    <div className="summary-icon female-icon"></div>
                    <div className="summary-details">
                      <h3>Female Students</h3>
                      <p className="summary-value">
                        {userType === "teacher" && assignedSection
                          ? students.filter(
                              (s) =>
                                s.section === assignedSection &&
                                s.gender === "Female"
                            ).length
                          : students.filter((s) => s.gender === "Female")
                              .length}
                      </p>
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
                    <div className="summary-icon enrolled-icon"></div>
                    <div className="summary-details">
                      <h3>Enrolled</h3>
                      <p className="summary-value">
                        {userType === "teacher" && assignedSection
                          ? students.filter(
                              (s) =>
                                s.section === assignedSection &&
                                s.status === "Enrolled"
                            ).length
                          : students.filter((s) => s.status === "Enrolled")
                              .length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="students-list-header">
                  <h3>
                    Student List{" "}
                    {filterSection ? `- Section ${filterSection}` : ""}
                  </h3>
                  <div className="list-info">
                    <span>{filteredStudents.length} students found</span>
                  </div>
                </div>

                <table className="students-table">
                  <thead>
                    <tr>
                      <th>LRN</th>
                      <th>Name</th>
                      <th>Section</th>
                      <th>Gender</th>
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
                          <td>{student.gender}</td>
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
                        <td colSpan="6" className="no-results">
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
                userType === "teacher" && assignedSection
                  ? [assignedSection]
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
