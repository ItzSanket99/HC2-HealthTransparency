export const insurancePlans = [
  {
    id: "star-health",
    name: "Star Health Insurance",
    coveragePercent: 70,
    maxCoverage: 300000,
    hospitalsCovered: ["Jehangir Hospital", "Deenanath Mangeshkar Hospital"],
  },
  {
    id: "hdfc-ergo",
    name: "HDFC ERGO",
    coveragePercent: 80,
    maxCoverage: 500000,
    hospitalsCovered: ["Jehangir Hospital"],
  },
  {
    id: "icici-lombard",
    name: "ICICI Lombard",
    coveragePercent: 75,
    maxCoverage: 400000,
    hospitalsCovered: ["Kokilaben Dhirubhai Ambani Hospital"],
  },
];

export const governmentSchemes = [
  {
    id: "pmjay",
    name: "Ayushman Bharat (PM-JAY)",
    coveragePercent: 100,
    maxCoverage: 500000,
    eligibleHospitalTypes: ["Government"],
  },
  {
    id: "mahatma-jyotiba",
    name: "Mahatma Jyotiba Phule Jan Arogya Yojana",
    coveragePercent: 90,
    maxCoverage: 300000,
    eligibleStates: ["Maharashtra"],
  },
];
