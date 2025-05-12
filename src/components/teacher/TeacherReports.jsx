import React, { useState, useEffect } from "react";

const TeacherReports = ({ teacherSection = "A" }) => {
  const [reportType, setReportType] = useState("enrollment");
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  const [reportGenerated, setReportGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for the teacher's section only - random count below 50
  const [sectionData, setSectionData] = useState(() => {
    const totalStudents = Math.floor(Math.random() * 10) + 40; // 40-49 students
    const maleCount = Math.floor(totalStudents * 0.52); // About 52% male
    const femaleCount = totalStudents - maleCount; // Remaining female

    return {
      totalStudents,
      maleCount,
      femaleCount,
      attendanceRate: Math.floor(Math.random() * 6) + 93, // 93-98% attendance
      nutritionalStatus: {
        severelyUnderweight: Math.floor(totalStudents * 0.06), // 6%
        underweight: Math.floor(totalStudents * 0.14), // 14%
        normal: Math.floor(totalStudents * 0.6), // 60%
        overweight: Math.floor(totalStudents * 0.12), // 12%
        obese: Math.floor(totalStudents * 0.08), // 8%
      },
    };
  });

  // Function to generate enrollment report data
  const generateEnrollmentData = () => {
    return {
      totalStudents: sectionData.totalStudents,
      byGender: {
        male: sectionData.maleCount,
        female: sectionData.femaleCount,
      },
      bySection: [
        {
          section: teacherSection,
          count: sectionData.totalStudents,
        },
      ],
    };
  };

  // Function to generate attendance report data
  const generateAttendanceData = () => {
    return {
      summary: {
        totalStudents: sectionData.totalStudents,
        averageAttendance: sectionData.attendanceRate,
      },
      bySection: [
        {
          section: teacherSection,
          teacher: `Teacher ${teacherSection}`,
          students: sectionData.totalStudents,
          attendance: sectionData.attendanceRate,
        },
      ],
    };
  };

  // Function to generate nutritional status report data
  const generateNutritionalData = () => {
    return {
      totalStudents: sectionData.totalStudents,
      byStatus: [
        {
          status: "Severely Underweight",
          count: sectionData.nutritionalStatus.severelyUnderweight,
        },
        {
          status: "Underweight",
          count: sectionData.nutritionalStatus.underweight,
        },
        { status: "Normal", count: sectionData.nutritionalStatus.normal },
        {
          status: "Overweight",
          count: sectionData.nutritionalStatus.overweight,
        },
        { status: "Obese", count: sectionData.nutritionalStatus.obese },
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
        <h2>Grade 1 Section {teacherSection} Reports</h2>
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
            <option value="nutritional">Nutritional Status</option>
          </select>
        </div>

        <div className="report-filters">
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
              <h3>
                Grade 1 Section {teacherSection} Enrollment Summary Report
              </h3>
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
            </div>
          )}

          {reportType === "attendance" && reportData && (
            <div className="attendance-report">
              <h3>Grade 1 Section {teacherSection} Attendance Report</h3>
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
                  <h4>Daily Attendance Summary</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Present</th>
                        <th>Absent</th>
                        <th>Late</th>
                        <th>Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Mock attendance data for past 5 days */}
                      {[...Array(5)].map((_, index) => {
                        const date = new Date();
                        date.setDate(date.getDate() - index);
                        const totalStudents = sectionData.totalStudents;
                        const present =
                          Math.floor(Math.random() * 5) + (totalStudents - 5); // Most students present
                        const absent = Math.floor(Math.random() * 3) + 1; // Random between 1-3
                        const late = Math.floor(Math.random() * 2); // Random between 0-1
                        const rate = Math.round(
                          (present / totalStudents) * 100
                        );

                        return (
                          <tr key={index}>
                            <td>{date.toLocaleDateString()}</td>
                            <td>{present}</td>
                            <td>{absent}</td>
                            <td>{late}</td>
                            <td>{rate}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {reportType === "nutritional" && reportData && (
            <div className="nutritional-report">
              <h3>
                Grade 1 Section {teacherSection} Nutritional Status Report
              </h3>
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
                  <table>
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

export default TeacherReports;
