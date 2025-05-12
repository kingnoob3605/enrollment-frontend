import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
  const [showCharts, setShowCharts] = useState(true);

  // Define sections
  const allSections = ["A", "B", "C", "D", "E"];

  // Mock teacher data
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Maria Santos",
      section: "A",
      students: Math.floor(Math.random() * 10) + 40, // 40-49 students
      attendance: 95,
      performance: 88,
    },
    {
      id: 2,
      name: "Juan Dela Cruz",
      section: "B",
      students: Math.floor(Math.random() * 10) + 40,
      attendance: 92,
      performance: 90,
    },
    {
      id: 3,
      name: "Ana Reyes",
      section: "C",
      students: Math.floor(Math.random() * 10) + 40,
      attendance: 96,
      performance: 85,
    },
    {
      id: 4,
      name: "Pedro Lim",
      section: "D",
      students: Math.floor(Math.random() * 10) + 40,
      attendance: 94,
      performance: 92,
    },
    {
      id: 5,
      name: "Sofia Garcia",
      section: "E",
      students: Math.floor(Math.random() * 10) + 40,
      attendance: 97,
      performance: 91,
    },
  ]);

  // Mock data for charts
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [nutritionalStatusData, setNutritionalStatusData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  // Colors for charts
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  useEffect(() => {
    const savedTeachers = localStorage.getItem("teacherData");
    if (savedTeachers) {
      setTeachers(JSON.parse(savedTeachers));
    }

    // Generate initial chart data
    generateChartData();
  }, []);

  useEffect(() => {
    localStorage.setItem("teacherData", JSON.stringify(teachers));
  }, [teachers]);

  // Generate chart data based on filters
  const generateChartData = () => {
    // Enrollment by section data
    const sectionEnrollmentData = teachers.map((teacher) => ({
      name: `Section ${teacher.section}`,
      students: teacher.students,
    }));
    setEnrollmentData(sectionEnrollmentData);

    // Gender distribution data (random distribution, but consistent)
    const totalStudents = teachers.reduce(
      (sum, teacher) => sum + teacher.students,
      0
    );
    const maleCount = Math.round(totalStudents * 0.52); // 52% male
    const femaleCount = totalStudents - maleCount;

    setGenderData([
      { name: "Male", value: maleCount },
      { name: "Female", value: femaleCount },
    ]);

    // Nutritional status data (random but realistic distribution)
    setNutritionalStatusData([
      { name: "Normal", value: Math.round(totalStudents * 0.6) }, // 60%
      { name: "Underweight", value: Math.round(totalStudents * 0.14) }, // 14%
      { name: "Overweight", value: Math.round(totalStudents * 0.12) }, // 12%
      { name: "Severely Underweight", value: Math.round(totalStudents * 0.06) }, // 6%
      { name: "Obese", value: Math.round(totalStudents * 0.08) }, // 8%
    ]);

    // Attendance data for past 30 days (random but trending upward)
    const thirtyDaysData = [];
    let baseAttendance = 91;
    for (let i = 0; i < 30; i++) {
      // Slightly increase base attendance over time with some randomness
      baseAttendance = Math.min(
        98,
        baseAttendance + (Math.random() * 0.4 - 0.1)
      );
      thirtyDaysData.push({
        day: i + 1,
        attendance: Math.round(baseAttendance * 10) / 10, // Round to 1 decimal
      });
    }
    setAttendanceData(thirtyDaysData);
  };

  // Function to generate enrollment report data
  const generateEnrollmentData = () => {
    // Filter by section and teacher if needed
    let filteredTeachers = [...teachers];

    if (sectionFilter !== "all") {
      filteredTeachers = filteredTeachers.filter(
        (t) => t.section === sectionFilter
      );
    }

    if (teacherFilter !== "all") {
      filteredTeachers = filteredTeachers.filter(
        (t) => t.id === parseInt(teacherFilter)
      );
    }

    const totalStudents = filteredTeachers.reduce(
      (sum, teacher) => sum + teacher.students,
      0
    );
    const maleCount = Math.round(totalStudents * 0.52); // Assuming 52% male
    const femaleCount = totalStudents - maleCount;

    return {
      totalStudents,
      byGender: {
        male: maleCount,
        female: femaleCount,
      },
      bySection: filteredTeachers.map((teacher) => ({
        section: teacher.section,
        count: teacher.students,
        teacher: teacher.name,
      })),
    };
  };

  // Function to generate attendance report data
  const generateAttendanceData = () => {
    // Filter by section and teacher if needed
    let filteredTeachers = [...teachers];

    if (sectionFilter !== "all") {
      filteredTeachers = filteredTeachers.filter(
        (t) => t.section === sectionFilter
      );
    }

    if (teacherFilter !== "all") {
      filteredTeachers = filteredTeachers.filter(
        (t) => t.id === parseInt(teacherFilter)
      );
    }

    const totalStudents = filteredTeachers.reduce(
      (sum, teacher) => sum + teacher.students,
      0
    );
    const averageAttendance = Math.round(
      filteredTeachers.reduce((sum, teacher) => sum + teacher.attendance, 0) /
        (filteredTeachers.length || 1)
    );

    return {
      summary: {
        totalStudents,
        averageAttendance,
      },
      bySection: filteredTeachers.map((teacher) => ({
        section: teacher.section,
        teacher: teacher.name,
        students: teacher.students,
        attendance: teacher.attendance,
      })),
    };
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

  // Function to generate nutritional status report data
  const generateNutritionalData = () => {
    // Filter by section and teacher if needed
    let filteredTeachers = [...teachers];

    if (sectionFilter !== "all") {
      filteredTeachers = filteredTeachers.filter(
        (t) => t.section === sectionFilter
      );
    }

    if (teacherFilter !== "all") {
      filteredTeachers = filteredTeachers.filter(
        (t) => t.id === parseInt(teacherFilter)
      );
    }

    const totalStudents = filteredTeachers.reduce(
      (sum, teacher) => sum + teacher.students,
      0
    );

    // Generate status distribution (percentages are approximate)
    return {
      totalStudents,
      byStatus: [
        { status: "Normal", count: Math.round(totalStudents * 0.6) }, // 60%
        { status: "Underweight", count: Math.round(totalStudents * 0.14) }, // 14%
        { status: "Overweight", count: Math.round(totalStudents * 0.12) }, // 12%
        {
          status: "Severely Underweight",
          count: Math.round(totalStudents * 0.06),
        }, // 6%
        { status: "Obese", count: Math.round(totalStudents * 0.08) }, // 8%
      ],
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
      case "nutritional":
        return generateNutritionalData();
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
        <h2>Grade 1 Reports and Analytics Dashboard</h2>
        <div className="panel-actions">
          <button
            className="action-btn view-button"
            onClick={() => setShowCharts(!showCharts)}
          >
            {showCharts ? "Hide Charts" : "Show Charts"}
          </button>
        </div>
      </div>

      {showCharts && (
        <div className="analytics-dashboard">
          <div className="dashboard-summary">
            <div className="summary-stats">
              <div className="stat-box">
                <h4>Total Students</h4>
                <p className="stat-value">
                  {teachers.reduce((sum, teacher) => sum + teacher.students, 0)}
                </p>
              </div>
              <div className="stat-box">
                <h4>Average Attendance</h4>
                <p className="stat-value">
                  {Math.round(
                    teachers.reduce(
                      (sum, teacher) => sum + teacher.attendance,
                      0
                    ) / teachers.length
                  )}
                  %
                </p>
              </div>
              <div className="stat-box">
                <h4>Average Performance</h4>
                <p className="stat-value">
                  {Math.round(
                    teachers.reduce(
                      (sum, teacher) => sum + teacher.performance,
                      0
                    ) / teachers.length
                  )}
                  %
                </p>
              </div>
            </div>

            <div className="charts-row">
              <div className="chart-container">
                <h4>Enrollment by Section</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="students" fill="#8884d8" name="Students" />
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

            <div className="charts-row">
              <div className="chart-container">
                <h4>Nutritional Status</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={nutritionalStatusData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" name="Students" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-container">
                <h4>Attendance Trend (Last 30 Days)</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="day"
                      label={{
                        value: "Day",
                        position: "insideBottom",
                        offset: -5,
                      }}
                    />
                    <YAxis
                      domain={[80, 100]}
                      label={{
                        value: "Attendance %",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="attendance"
                      stroke="#8884d8"
                      name="Attendance %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

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
            <option value="nutritional">Nutritional Status</option>
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
              {allSections.map((section) => (
                <option key={section} value={section}>
                  Section {section}
                </option>
              ))}
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
                  <table className="report-table">
                    <thead>
                      <tr>
                        <th>Section</th>
                        <th>Teacher</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.bySection.map((item) => (
                        <tr key={item.section}>
                          <td>Section {item.section}</td>
                          <td>{item.teacher}</td>
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
                  <table className="report-table">
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
                  <table className="report-table">
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

          {reportType === "nutritional" && reportData && (
            <div className="nutritional-report">
              <h3>Grade 1 Nutritional Status Report</h3>
              <p className="report-date">
                Generated on: {new Date().toLocaleDateString()}
              </p>

              <div className="summary-stats">
                <div className="stat-box">
                  <h4>Total Students</h4>
                  <p className="stat-value">{reportData.totalStudents}</p>
                </div>
              </div>

              <div className="nutritional-tables">
                <div className="nutritional-status">
                  <h4>Nutritional Status Summary</h4>
                  <table className="report-table">
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th>Count</th>
                        <th>Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.byStatus.map((item, index) => (
                        <tr key={index}>
                          <td>{item.status}</td>
                          <td>{item.count}</td>
                          <td>
                            {Math.round(
                              (item.count / reportData.totalStudents) * 100
                            )}
                            %
                          </td>
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
