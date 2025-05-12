import * as XLSX from "xlsx";

/**
 * Exports student data to Excel in SF1 format (School Form 1 - School Register)
 * @param {Array} students - Array of student objects
 * @param {Object} schoolInfo - School information (name, ID, etc.)
 * @param {String} section - Section identifier
 * @param {String} gradeLevel - Grade level
 */
const exportStudentListToExcel = (
  students,
  schoolInfo = {
    schoolId: "",
    schoolName: "Elementary School Learners Profile System",
    division: "Zamboanga del Sur",
    district: "",
    region: "Region VIII",
    schoolYear: "2024-2025",
  },
  section = "",
  gradeLevel = "1"
) => {
  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Get the current date for the filename
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];

  // Calculate age as of first Friday of June for current year
  const calculateAge = (birthdate) => {
    if (!birthdate) return "";

    // Get the first Friday of June for current year
    const currentYear = new Date().getFullYear();
    const june1st = new Date(currentYear, 5, 1); // Month is 0-based, so 5 = June
    const dayOfWeek = june1st.getDay(); // 0 = Sunday, 5 = Friday
    const daysUntilFriday = dayOfWeek <= 5 ? 5 - dayOfWeek : 7 - dayOfWeek + 5;
    const firstFridayJune = new Date(currentYear, 5, 1 + daysUntilFriday);

    // Calculate age
    const birthDate = new Date(birthdate);
    let age = firstFridayJune.getFullYear() - birthDate.getFullYear();
    const m = firstFridayJune.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && firstFridayJune.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  // Format date to mm/dd/yyyy
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  // Prepare header rows exactly as in the SF1 form
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

  // Create column headers that match SF1 exactly
  const columnHeaders = [
    "LRN",
    "NAME\n(Last Name, First Name, Middle Name)",
    "Sex\n(M/F)",
    "BIRTH DATE\n(mm/dd/yyyy)",
    "AGE as of\n1st Friday\nJune",
    "MOTHER\nTONGUE",
    "IP\n(Ethnic\nGroup)",
    "RELIGION",
    "House #/ Street/\nSitio/\nPurok",
    "Barangay",
    "Municipality/\nCity",
    "Province",
    "Father's Name (Last Name,\nFirst Name, Middle Name)",
    "Mother's Maiden Name (Last\nName, First Name, Middle\nName)",
    "Name",
    "Relation-ship",
    "Contact Number\nof Parent or\nGuardian",
    "REMARKS\n(Please refer to the\nlegend on last page)",
  ];

  // Extract last name, first name, middle name from full name
  const extractNameParts = (fullName) => {
    if (!fullName) return { lastName: "", firstName: "", middleName: "" };

    // Simple implementation - assumes Last, First Middle format or First Middle Last format
    const parts = fullName.split(" ");

    if (parts.length === 1) {
      return { lastName: parts[0], firstName: "", middleName: "" };
    } else if (parts.length === 2) {
      return { lastName: parts[1], firstName: parts[0], middleName: "" };
    } else {
      // If there's a comma, assume it's Last, First Middle format
      if (fullName.includes(",")) {
        const mainParts = fullName.split(",");
        const lastName = mainParts[0].trim();
        const remainingParts = mainParts[1].trim().split(" ");
        const firstName = remainingParts[0] || "";
        const middleName = remainingParts.slice(1).join(" ") || "";
        return { lastName, firstName, middleName };
      } else {
        // Otherwise assume First Middle Last
        return {
          lastName: parts[parts.length - 1],
          firstName: parts[0],
          middleName: parts.slice(1, parts.length - 1).join(" "),
        };
      }
    }
  };

  // Prepare the data rows
  const dataRows = students.map((student) => {
    // Extract name parts
    const nameParts = extractNameParts(student.name);
    const formattedName =
      `${nameParts.lastName}, ${nameParts.firstName} ${nameParts.middleName}`.trim();

    // Extract address parts (assuming "123 Main St, Barangay San Miguel, City, Province" format)
    const addressParts = (student.address || "")
      .split(",")
      .map((part) => part.trim());
    const streetAddress = addressParts[0] || "";
    const barangay = addressParts[1] || "";
    const city = addressParts[2] || "";
    const province = addressParts[3] || "";

    // Extract parent name parts
    const parentName = student.parent_name || "";

    // Format birthdate
    const birthdate = formatDate(student.birthdate);

    // Calculate age
    const age = calculateAge(student.birthdate);

    return [
      student.lrn || "", // LRN
      formattedName, // NAME (Last, First Middle)
      student.gender === "Male" ? "M" : "F", // Sex (M/F)
      birthdate, // BIRTH DATE
      age, // AGE as of 1st Friday June
      student.motherTongue || "Filipino", // MOTHER TONGUE
      student.ip || "", // IP (Ethnic Group)
      student.religion || "", // RELIGION
      streetAddress, // ADDRESS - House #/Street
      barangay, // ADDRESS - Barangay
      city, // ADDRESS - Municipality/City
      province, // ADDRESS - Province
      parentName, // PARENTS - Father's Name
      student.motherName || "", // PARENTS - Mother's Maiden Name
      student.guardianName || "", // GUARDIAN - Name
      student.guardianRelationship || "", // GUARDIAN - Relationship
      student.parent_contact || "", // Contact Number
      student.status || "Enrolled", // REMARKS
    ];
  });

  // Create worksheet with merged cells for header
  const ws = XLSX.utils.aoa_to_sheet([
    headerRow1,
    headerRow2,
    [], // Empty row
    columnHeaders,
    ...dataRows,
  ]);

  // Add indicator codes and legend section at the bottom (page 2 content)
  const startRow = dataRows.length + 5; // +5 for headers and column headers

  // Add legend
  const legendHeaders = [
    "Indicator",
    "Code",
    "Required Information",
    "",
    "Code",
    "Required Information",
    "REGISTERED",
    "BoSY",
    "EoSY",
  ];
  ws[XLSX.utils.encode_cell({ r: startRow, c: 0 })] = {
    v: "List and Code of Indicators under REMARKS column",
  };

  XLSX.utils.sheet_add_aoa(ws, [legendHeaders], {
    origin: { r: startRow + 1, c: 0 },
  });

  // Add legend rows
  const legendData = [
    [
      "Transferred Out",
      "T/O",
      "Name of Public (P) Private (PR) School & Effectivity Date",
      "",
      "CCT",
      "CCT Control/reference number & Effectivity Date",
      "MALE",
      "",
      "",
    ],
    [
      "Transferred IN",
      "T/I",
      "Name of Public (P) Private (PR) School & Effectivity Date",
      "",
      "B/A",
      "Name of school last attended & Year",
      "FEMALE",
      "",
      "",
    ],
    [
      "Dropped",
      "DRP",
      "Reason and Effectivity Date",
      "",
      "LWD",
      "Specify",
      "TOTAL",
      "",
      "",
    ],
    [
      "Late Enrollment",
      "LE",
      "Reason (Enrollment beyond 1st Friday of June)",
      "",
      "ACL",
      "Specify Level & Effectivity Data",
      "",
      "",
      "",
    ],
  ];

  XLSX.utils.sheet_add_aoa(ws, legendData, {
    origin: { r: startRow + 2, c: 0 },
  });

  // Add signature lines
  const signatureRow = startRow + 7;
  ws[XLSX.utils.encode_cell({ r: signatureRow, c: 8 })] = { v: "Prepared by:" };
  ws[XLSX.utils.encode_cell({ r: signatureRow, c: 14 })] = {
    v: "Certified Correct:",
  };

  ws[XLSX.utils.encode_cell({ r: signatureRow + 3, c: 8 })] = {
    v: "(Signature of Adviser over Printed Name)",
  };
  ws[XLSX.utils.encode_cell({ r: signatureRow + 3, c: 14 })] = {
    v: "(Signature of School Head over Printed Name)",
  };

  // Add date fields
  ws[XLSX.utils.encode_cell({ r: signatureRow + 4, c: 8 })] = {
    v: "BoSY Date:",
  };
  ws[XLSX.utils.encode_cell({ r: signatureRow + 4, c: 11 })] = {
    v: "EoSYDate:",
  };
  ws[XLSX.utils.encode_cell({ r: signatureRow + 4, c: 14 })] = {
    v: "BoSY Date:",
  };
  ws[XLSX.utils.encode_cell({ r: signatureRow + 4, c: 17 })] = {
    v: "EoSYDate:",
  };

  // Set merged cells for headers
  ws["!merges"] = [
    // First header row merges
    { s: { r: 0, c: 1 }, e: { r: 0, c: 2 } }, // School ID value
    { s: { r: 0, c: 5 }, e: { r: 0, c: 6 } }, // Division value
    { s: { r: 0, c: 7 }, e: { r: 0, c: 8 } }, // District value

    // Second header row merges
    { s: { r: 1, c: 1 }, e: { r: 1, c: 3 } }, // School Name value
    { s: { r: 1, c: 5 }, e: { r: 1, c: 6 } }, // School Year value
    { s: { r: 1, c: 7 }, e: { r: 1, c: 8 } }, // Grade Level value
    { s: { r: 1, c: 9 }, e: { r: 1, c: 10 } }, // Section value

    // Legend section header
    { s: { r: startRow, c: 0 }, e: { r: startRow, c: 17 } }, // Legend title
  ];

  // Set column widths
  const colWidths = [
    { wch: 15 }, // LRN
    { wch: 30 }, // Name
    { wch: 8 }, // Sex
    { wch: 15 }, // Birth date
    { wch: 12 }, // Age
    { wch: 13 }, // Mother tongue
    { wch: 12 }, // IP
    { wch: 15 }, // Religion
    { wch: 18 }, // Address - street
    { wch: 15 }, // Address - barangay
    { wch: 15 }, // Address - city
    { wch: 15 }, // Address - province
    { wch: 25 }, // Father's name
    { wch: 25 }, // Mother's name
    { wch: 15 }, // Guardian name
    { wch: 13 }, // Relationship
    { wch: 15 }, // Contact
    { wch: 20 }, // Remarks
  ];

  ws["!cols"] = colWidths;

  // Set row heights for header and multi-line cells
  ws["!rows"] = [
    { hpt: 25 }, // Header row 1
    { hpt: 25 }, // Header row 2
    { hpt: 15 }, // Empty row
    { hpt: 45 }, // Column headers
  ];

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
