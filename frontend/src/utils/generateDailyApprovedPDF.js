import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateDailyApprovedPDF = (
  appointments,
  selectedDate,
  hospitalName
) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(16);
  doc.text("Daily Approved Appointments Report", 14, 15);

  doc.setFontSize(11);
  doc.text(`Hospital: ${hospitalName}`, 14, 25);
  doc.text(`Date: ${selectedDate}`, 14, 32);
  doc.text(
    `Generated On: ${new Date().toLocaleString()}`,
    14,
    39
  );

  // Prepare table data
  const tableData = appointments.map((appt, index) => [
    index + 1,
    appt.patientName,
    appt.condition,
    appt.time,
    appt.patientEmail,
  ]);

  autoTable(doc, {
    startY: 45,
    head: [["#", "Patient Name", "Condition", "Time", "Email"]],
    body: tableData,
  });

  doc.save(
    `Approved_Appointments_${selectedDate}.pdf`
  );
};
