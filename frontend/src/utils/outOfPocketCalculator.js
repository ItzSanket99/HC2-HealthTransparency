export function calculateOOP({
  treatmentCost,
  scheme,
}) {
  if (!treatmentCost || !scheme) return null;

  const breakdown = {
    Surgery: Math.round(treatmentCost * 0.6),
    Room: Math.round(treatmentCost * 0.15),
    ICU: Math.round(treatmentCost * 0.1),
    Doctor: Math.round(treatmentCost * 0.08),
    Nursing: Math.round(treatmentCost * 0.05),
    Medicines: Math.round(treatmentCost * 0.07),
    Consumables: Math.round(treatmentCost * 0.05),
  };

  const totalBill = Object.values(breakdown)
    .reduce((a, b) => a + b, 0);

  let coverageAmount = 0;

  // 🔹 PMJAY
  if (scheme.id === "PMJAY") {
    coverageAmount = Math.min(
      totalBill,
      scheme.coverageDetails.maxAnnualCoveragePerFamily
    );
  }

  // 🔹 MJPJAY
  if (scheme.id === "MJPJAY") {
    coverageAmount = Math.min(
      totalBill,
      scheme.coverageDetails.baseAnnualCoveragePerFamily
    );
  }

  // 🔹 ESIC
  if (scheme.id === "ESIC") {
    coverageAmount = totalBill * 0.9; // 90% coverage simulation
  }

  // 🔹 CGHS
  if (scheme.id === "CGHS") {
    coverageAmount = totalBill * 0.85; // package-based approx
  }

  // 🔹 RSBY
  if (scheme.id === "RSBY") {
    coverageAmount = Math.min(
      totalBill,
      scheme.coverageLimit
    );
  }

  const nonMedical = Math.round(totalBill * 0.05);
  const finalOOP =
    totalBill - coverageAmount + nonMedical;

  return {
    totalBill,
    coverageAmount: Math.round(coverageAmount),
    finalOOP: Math.round(finalOOP),
    breakdown,
    schemeApplied: scheme,
  };
}