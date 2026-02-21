import schemes from "../data/governmentSchemes.json";

export function recommendSchemes({ user }) {
  if (!user) return [];

  return schemes.filter((scheme) => {
    const e = scheme.eligibilityCriteria;

    // 🔹 PMJAY
    if (scheme.id === "PMJAY") {
      return user.isSECCListed === true;
    }

    // 🔹 MJPJAY
    if (scheme.id === "MJPJAY") {
      return (
        user.state === "Maharashtra" &&
        ["Yellow", "Orange", "AAY"].includes(user.rationCardType)
      );
    }

    // 🔹 ESIC
    if (scheme.id === "ESIC") {
  const monthlySalary = user.annualIncome / 12;

  return (
    monthlySalary <= 21000 &&
    user.isOrganizedSectorEmployee === true &&
    user.esicRegistered === true &&
    user.contributionDays >= 78
  );
}

    // 🔹 CGHS
    if (scheme.id === "CGHS") {
      return (
        user.isGovernmentEmployee === true ||
        user.isPensioner === true
      );
    }

    // 🔹 RSBY
    if (scheme.id === "RSBY") {
      return (
        user.isBPL === true &&
        user.annualIncome <= 100000
      );
    }

    return false;
  });
}