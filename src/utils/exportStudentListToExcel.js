import * as XLSX from "xlsx";

/**
 * Exports student data to Excel in SF1 format
 * @param {Array} students - Array of student objects
 * @param {Object} schoolInfo - School information (name, ID, etc.)
 * @param {String} section - Section identifier
 * @param {String} gradeLevel - Grade level
 */
const exportStudentListToExcel = (
  students,
  schoolInfo = {},
  section = "",
  gradeLevel = "1"
) => {
  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Get the current date for the filename
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];

  // Prepare header rows
  const headerRow1 = [
    "School ID",
    schoolInfo.schoolId || "",
    "Region VIII",
    "",
    "Division",
    schoolInfo.division || "",
    "District",
    schoolInfo.district || "",
  ];

  const headerRow2 = [
    "School Name",
    schoolInfo.schoolName || "Elementary School Learners Profile System",
    "",
    "",
    "School Year",
    schoolInfo.schoolYear || "2024-2025",
    "Grade Level",
    gradeLevel,
    "Section",
    section,
  ];

  // Create column headers that match SF1
  const columnHeaders = [
    "LRN",
    "NAME (Last Name, First Name, Middle Name)",
    "Sex (M/F)",
    "BIRTH DATE (mm/dd/yyyy)",
    "AGE as of 1st Friday June",
    "MOTHER TONGUE",
    "IP (Ethnic Group)",
    "RELIGION",
    "ADDRESS - House #/Street/Sitio/Purok",
    "ADDRESS - Barangay",
    "ADDRESS - Municipality/City",
    "ADDRESS - Province",
    "PARENTS - Father's Name",
    "PARENTS - Mother's Maiden Name",
    "GUARDIAN - Name",
    "GUARDIAN - Relationship",
    "Contact Number of Parent or Guardian",
    "REMARKS",
  ];

  // Prepare the data rows
  const dataRows = students.map((student) => [
    student.lrn || "",
    student.name || "",
    student.gender === "Male" ? "M" : "F",
    student.birthdate || "",
    student.age || "",
    student.motherTongue || "Filipino",
    student.ip || "",
    student.religion || "",
    student.address ? student.address.split(",")[0] : "",
    student.address ? student.address.split(",")[1] : "",
    student.address ? student.address.split(",")[2] : "",
    student.address ? student.address.split(",")[3] : "",
    student.parent || "",
    student.motherName || "",
    "", // Guardian name (if different)
    "", // Relationship
    student.contact || "",
    student.status || "Enrolled",
  ]);

  // Create worksheet
  const ws = XLSX.utils.aoa_to_sheet([
    headerRow1,
    headerRow2,
    [], // Empty row
    columnHeaders,
    ...dataRows,
  ]);

  // Set column widths
  const colWidths = [
    { wch: 15 }, // LRN
    { wch: 30 }, // Name
    { wch: 8 }, // Sex
    { wch: 15 }, // Birth date
    { wch: 10 }, // Age
    { wch: 15 }, // Mother tongue
    { wch: 15 }, // IP
    { wch: 15 }, // Religion
    { wch: 25 }, // Address - street
    { wch: 20 }, // Address - barangay
    { wch: 20 }, // Address - city
    { wch: 20 }, // Address - province
    { wch: 25 }, // Father's name
    { wch: 25 }, // Mother's name
    { wch: 20 }, // Guardian name
    { wch: 15 }, // Relationship
    { wch: 20 }, // Contact
    { wch: 20 }, // Remarks
  ];

  ws["!cols"] = colWidths;

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(
    wb,
    ws,
    `Grade ${gradeLevel} - Section ${section}`
  );

  // Generate a string filename for the Excel file
  const fileName = `SF1_Grade${gradeLevel}_Section${section}_${dateStr}.xlsx`;

  // Write the workbook and trigger download
  XLSX.writeFile(wb, fileName);
};

export default exportStudentListToExcel;
