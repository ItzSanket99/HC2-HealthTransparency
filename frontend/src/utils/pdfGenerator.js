import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generateBillPDF({
  hospital,
  treatment,
  result,
  patientDetails = {},
}) {
  if (!result) return;

  const doc = new jsPDF();

  const {
    totalBill,
    coverageAmount,
    finalOOP,
    breakdown,
    insuranceName,
  } = result;

  // -------------------------
  // HEADER
  // -------------------------
  doc.setFontSize(18);
  doc.text(hospital.hospitalName, 14, 20);

  doc.setFontSize(10);
  doc.text(
    `${hospital.city}, ${hospital.state}`,
    14,
    26
  );

  doc.line(14, 30, 196, 30);

  // -------------------------
  // BILL INFO
  // -------------------------
  doc.setFontSize(12);
  doc.text("Hospital Bill Summary", 14, 38);

  doc.setFontSize(10);
  doc.text(
    `Treatment: ${treatment.name}`,
    14,
    44
  );

  doc.text(
    `Insurance Applied: ${insuranceName}`,
    14,
    50
  );

  doc.text(
    `Generated On: ${new Date().toLocaleDateString()}`,
    14,
    56
  );

  // -------------------------
  // COST TABLE
  // -------------------------
  const tableRows = Object.entries(breakdown || {}).map(
    ([key, value]) => [
      key.replace(/([A-Z])/g, " $1"),
      `₹${value.toLocaleString()}`,
    ]
  );

  autoTable(doc, {
    startY: 62,
    head: [["Charge Type", "Amount"]],
    body: tableRows,
    theme: "striped",
    styles: { fontSize: 10 },
    headStyles: {
      fillColor: [0, 128, 128],
    },
  });

  const finalY = doc.lastAutoTable.finalY + 10;

  // -------------------------
  // TOTALS
  // -------------------------
  doc.setFontSize(11);

  doc.text(
    `Total Hospital Bill: ₹${totalBill.toLocaleString()}`,
    14,
    finalY
  );

  doc.text(
    `Insurance Coverage: ₹${coverageAmount.toLocaleString()}`,
    14,
    finalY + 6
  );

  doc.setFontSize(13);
  doc.text(
    `Final Out-of-Pocket: ₹${finalOOP.toLocaleString()}`,
    14,
    finalY + 14
  );

  // -------------------------
  // FOOTER
  // -------------------------
  doc.setFontSize(9);
  doc.text(
    "This is a system-generated estimate. Final bill may vary based on actual hospital usage.",
    14,
    285
  );

  doc.save("Hospital_Bill_Estimate.pdf");
}
