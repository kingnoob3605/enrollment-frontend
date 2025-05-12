import React, { useState, useEffect } from "react";

const Reports = () => {
  const [reportType, setReportType] = useState("enrollment");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [teacherFilter, setTeacherFilter] = useState("all");
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  const [reportGenerated, setReportGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock teacher data
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Maria Santos",
      section: "A",
      students: 10,
      attendance: 95,
      performance: 88,
    },
    {
      id: 2,
      name: "Juan Dela Cruz",
      section: "B",
      students: 12,
      attendance: 92,
      performance: 90,
    },
    {
      id: 3,
      name: "Ana Reyes",
      section: "C",
      students: 9,
      attendance: 96,
      performance: 85,
    },
    {
      id: 4,
      name: "Pedro Lim",
      section: "D",
      students: 11,
      attendance: 94,
      performance: 92,
    },
    {
      id: 5,
      name: "Sofia Garcia",
      section: "E",
      students: 8,
      attendance: 97,
      performance: 91,
    },
  ]);

  useEffect(() => {
    const savedTeachers = localStorage.getItem("teacherData");
    if (savedTeachers) {
      setTeachers(JSON.parse(savedTeachers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("teacherData", JSON.stringify(teachers));
  }, [teachers]);

  // Function to generate enrollment report data
  const generateEnrollmentData = () => {
    const data = {
      totalStudents: teachers.reduce(
        (sum, teacher) => sum + teacher.students,
        0
      ),
      byGender: {
        male: Math.round(
          teachers.reduce((sum, teacher) => sum + teacher.students, 0) * 0.52
        ),
        female: Math.round(
          teachers.reduce((sum, teacher) => sum + teacher.students, 0) * 0.48
        ),
      },
      bySection: teachers.map((teacher) => ({
        section: teacher.section,
        count: teacher.students,
      })),
    };

    // Apply section filter
    if (sectionFilter !== "all") {
      data.bySection = data.bySection.filter(
        (item) => item.section === sectionFilter
      );
      const filteredTeacher = teachers.find((t) => t.section === sectionFilter);
      if (filteredTeacher) {
        data.totalStudents = filteredTeacher.students;
        data.byGender = {
          male: Math.round(filteredTeacher.students * 0.52),
          female: Math.round(filteredTeacher.students * 0.48),
        };
      }
    }

    // Apply teacher filter
    if (teacherFilter !== "all") {
      const filteredTeacher = teachers.find(
        (t) => t.id === parseInt(teacherFilter)
      );
      if (filteredTeacher) {
        data.bySection = [
          {
            section: filteredTeacher.section,
            count: filteredTeacher.students,
          },
        ];
        data.totalStudents = filteredTeacher.students;
        data.byGender = {
          male: Math.round(filteredTeacher.students * 0.52),
          female: Math.round(filteredTeacher.students * 0.48),
        };
      }
    }

    return data;
  };

  // Function to generate attendance report data
  const generateAttendanceData = () => {
    const data = {
      summary: {
        totalStudents: teachers.reduce(
          (sum, teacher) => sum + teacher.students,
          0
        ),
        averageAttendance: Math.round(
          teachers.reduce((sum, teacher) => sum + teacher.attendance, 0) /
            teachers.length
        ),
      },
      bySection: teachers.map((teacher) => ({
        section: teacher.section,
        teacher: teacher.name,
        students: teacher.students,
        attendance: teacher.attendance,
      })),
    };

    // Apply filters
    if (sectionFilter !== "all") {
      data.bySection = data.bySection.filter(
        (item) => item.section === sectionFilter
      );
      if (data.bySection.length > 0) {
        data.summary.totalStudents = data.bySection.reduce(
          (sum, item) => sum + item.students,
          0
        );
        data.summary.averageAttendance = data.bySection[0].attendance;
      }
    }

    if (teacherFilter !== "all") {
      const filteredTeacher = teachers.find(
        (t) => t.id === parseInt(teacherFilter)
      );
      if (filteredTeacher) {
        data.bySection = [
          {
            section: filteredTeacher.section,
            teacher: filteredTeacher.name,
            students: filteredTeacher.students,
            attendance: filteredTeacher.attendance,
          },
        ];
        data.summary.totalStudents = filteredTeacher.students;
        data.summary.averageAttendance = filteredTeacher.attendance;
      }
    }

    return data;
  };

  // Function to generate teacher performance report data
  const generateTeacherData = () => {
    let filteredTeachers = [...teachers];

    // Apply filters
    if (sectionFilter !== "all") {
      filteredTeachers = filteredTeachers.filter(
        (teacher) => teacher.section === sectionFilter
      );
    }

    if (teacherFilter !== "all") {
      filteredTeachers = filteredTeachers.filter(
        (teacher) => teacher.id === parseInt(teacherFilter)
      );
    }

    return {
      teachers: filteredTeachers,
      averagePerformance: Math.round(
        filteredTeachers.reduce(
          (sum, teacher) => sum + teacher.performance,
          0
        ) / (filteredTeachers.length || 1)
      ),
    };
  };

  // Get the appropriate data based on report type
  const getReportData = () => {
    switch (reportType) {
      case "enrollment":
        return generateEnrollmentData();
      case "attendance":
        return generateAttendanceData();
      case "teachers":
        return generateTeacherData();
      default:
        return null;
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange({
      ...dateRange,
      [name]: value,
    });
  };

  const handleGenerateReport = () => {
    setIsLoading(true);
    setTimeout(() => {
      setReportGenerated(true);
      setIsLoading(false);
    }, 1000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    alert("Export functionality would be implemented here (CSV, Excel, PDF)");
  };

  const reportData = getReportData();

  return (
    <div className="reports">
      <div className="panel-header">
        <h2>Grade 1 Reports</h2>
      </div>

      <div className="report-controls">
        <div className="report-type-selector">
          <label>Report Type</label>
          <select
            value={reportType}
            onChange={(e) => {
              setReportType(e.target.value);
              setReportGenerated(false);
            }}
          >
            <option value="enrollment">Enrollment Summary</option>
            <option value="attendance">Attendance Report</option>
            <option value="teachers">Teacher Performance</option>
          </select>
        </div>

        <div className="report-filters">
          <div className="filter-group">
            <label>Section</label>
            <select
              value={sectionFilter}
              onChange={(e) => {
                setSectionFilter(e.target.value);
                setReportGenerated(false);
              }}
            >
              <option value="all">All Sections</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
              <option value="D">Section D</option>
              <option value="E">Section E</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Teacher</label>
            <select
              value={teacherFilter}
              onChange={(e) => {
                setTeacherFilter(e.target.value);
                setReportGenerated(false);
              }}
            >
              <option value="all">All Teachers</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name} (Section {teacher.section})
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={dateRange.startDate}
              onChange={handleDateChange}
            />
          </div>

          <div className="filter-group">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={dateRange.endDate}
              onChange={handleDateChange}
            />
          </div>
        </div>

        <button
          onClick={handleGenerateReport}
          className="generate-button"
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate Report"}
        </button>
      </div>

      {isLoading ? (
        <div className="loading-report">
          <div className="loader"></div>
          <p>Generating report...</p>
        </div>
      ) : !reportGenerated ? (
        <div className="no-report-message">
          <p>
            Select your report criteria and click 'Generate Report' to view the
            data.
          </p>
        </div>
      ) : (
        <div className="report-content">
          {reportType === "enrollment" && reportData && (
            <div className="enrollment-report">
              <h3>Grade 1 Enrollment Summary Report</h3>
              <p className="report-date">
                Generated on: {new Date().toLocaleDateString()}
              </p>

              <div className="summary-stats">
                <div className="stat-box">
                  <h4>Total Students</h4>
                  <p className="stat-value">{reportData.totalStudents}</p>
                </div>
                <div className="stat-box">
                  <h4>Male</h4>
                  <p className="stat-value">{reportData.byGender.male}</p>
                </div>
                <div className="stat-box">
                  <h4>Female</h4>
                  <p className="stat-value">{reportData.byGender.female}</p>
                </div>
              </div>

              <div className="enrollment-tables">
                <div className="section-enrollment">
                  <h4>Enrollment by Section</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Section</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.bySection.map((item) => (
                        <tr key={item.section}>
                          <td>Section {item.section}</td>
                          <td>{item.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {reportType === "attendance" && reportData && (
            <div className="attendance-report">
              <h3>Grade 1 Attendance Report</h3>
              <p className="report-date">
                Generated on: {new Date().toLocaleDateString()}
              </p>

              <div className="summary-stats">
                <div className="stat-box">
                  <h4>Total Students</h4>
                  <p className="stat-value">
                    {reportData.summary.totalStudents}
                  </p>
                </div>
                <div className="stat-box">
                  <h4>Average Attendance</h4>
                  <p className="stat-value">
                    {reportData.summary.averageAttendance}%
                  </p>
                </div>
              </div>

              <div className="attendance-tables">
                <div className="section-attendance">
                  <h4>Attendance by Section</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Section</th>
                        <th>Teacher</th>
                        <th>Students</th>
                        <th>Attendance Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.bySection.map((item) => (
                        <tr key={item.section}>
                          <td>Section {item.section}</td>
                          <td>{item.teacher}</td>
                          <td>{item.students}</td>
                          <td>{item.attendance}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {reportType === "teachers" && reportData && (
            <div className="teacher-report">
              <h3>Grade 1 Teacher Performance Report</h3>
              <p className="report-date">
                Generated on: {new Date().toLocaleDateString()}
              </p>

              <div className="summary-stats">
                <div className="stat-box">
                  <h4>Average Performance Score</h4>
                  <p className="stat-value">{reportData.averagePerformance}%</p>
                </div>
              </div>

              <div className="teacher-tables">
                <div className="teacher-performance">
                  <h4>Teacher Performance by Section</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Teacher</th>
                        <th>Section</th>
                        <th>Students</th>
                        <th>Attendance</th>
                        <th>Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.teachers.map((teacher) => (
                        <tr key={teacher.id}>
                          <td>{teacher.name}</td>
                          <td>Section {teacher.section}</td>
                          <td>{teacher.students}</td>
                          <td>{teacher.attendance}%</td>
                          <td>{teacher.performance}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {reportGenerated && (
            <div className="report-actions">
              <button onClick={handlePrint} className="print-button">
                Print Report
              </button>
              <button onClick={handleExport} className="export-button">
                Export Report
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Reports;
