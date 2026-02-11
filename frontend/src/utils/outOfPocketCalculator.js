export function calculateOOP({
  treatmentCost,
  selectedInsurance,
  eligibility,
}) {
  if (!treatmentCost || treatmentCost <= 0) {
    return null;
  }

  // Base breakdown (realistic hospital bill)
  const breakdown = {
    SurgeryCharges: Math.round(treatmentCost * 0.6),
    RoomCharges: Math.round(treatmentCost * 0.15),
    ICUCharges: Math.round(treatmentCost * 0.1),
    DoctorFees: Math.round(treatmentCost * 0.08),
    NursingCharges: Math.round(treatmentCost * 0.05),
    Medicines: Math.round(treatmentCost * 0.07),
    Consumables: Math.round(treatmentCost * 0.05),
  };

  const totalBill = Object.values(breakdown).reduce(
    (sum, val) => sum + val,
    0
  );

  if (!selectedInsurance) {
    return {
      totalBill,
      coverageAmount: 0,
      finalOOP: totalBill,
      breakdown,
      insuranceName: "No Insurance",
    };
  }

  let eligible = true;

  // ---- GOVT CHECK ----
  if (selectedInsurance.type === "GOVT") {
    if (
      selectedInsurance.eligibility?.incomeBelow &&
      eligibility.income > selectedInsurance.eligibility.incomeBelow
    ) {
      eligible = false;
    }

    if (
      selectedInsurance.eligibility?.rationCard &&
      !eligibility.hasRationCard
    ) {
      eligible = false;
    }

    if (
      selectedInsurance.eligibility?.state &&
      eligibility.state !== selectedInsurance.eligibility.state
    ) {
      eligible = false;
    }
  }

  // ---- PRIVATE CHECK ----
  if (selectedInsurance.type === "PRIVATE") {
    if (
      selectedInsurance.eligibility?.minPolicyYears &&
      eligibility.policyYears <
        selectedInsurance.eligibility.minPolicyYears
    ) {
      eligible = false;
    }
  }

  if (!eligible) {
    return {
      totalBill,
      coverageAmount: 0,
      finalOOP: totalBill,
      breakdown,
      insuranceName: selectedInsurance.name,
      notEligible: true,
    };
  }

  // ---- COVERAGE CALCULATION ----
  let coverageAmount =
    (totalBill * selectedInsurance.coveragePercent) / 100;

  // Max coverage cap
  if (selectedInsurance.maxCoverage) {
    coverageAmount = Math.min(
      coverageAmount,
      selectedInsurance.maxCoverage
    );
  }

  // Room rent cap logic
  if (selectedInsurance.roomRentCapPercent) {
    const allowedRoom =
      (selectedInsurance.roomRentCapPercent / 100) *
      selectedInsurance.maxCoverage;

    if (breakdown.RoomCharges > allowedRoom) {
      const extra = breakdown.RoomCharges - allowedRoom;
      coverageAmount -= extra;
    }
  }

  if (coverageAmount < 0) coverageAmount = 0;

  const finalOOP = totalBill - coverageAmount;

  return {
    totalBill,
    coverageAmount: Math.round(coverageAmount),
    finalOOP: Math.round(finalOOP),
    breakdown,
    insuranceName: selectedInsurance.name,
  };
}
