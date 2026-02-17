export const mockSearchData = [
  {
    condition: "Knee Pain",
    city: "Pune",
    description:
      "Knee replacement is a surgical procedure to relieve pain and restore mobility in severe arthritis or injury.",

    
    results: [
      /* ===================== 1 ===================== */
      {
        hospitalId: 1,
        hospitalName: "Jehangir Hospital",
        type: "Private",
        city: "Pune",
        state: "Maharashtra",
        lat: 18.5286,
        lng: 73.874,
        rating: 4.4,
        affordabilityScore: 7.2,

        facilities: {
          icu: true,
          emergency: true,
          bloodBank: true,
          imaging: true,
          operationTheatre: true,
        },

        insurance: {
          privateInsurance: [
            {
              name: "Star Health",
              coveragePercent: 70,
              maxCoverage: 250000,
              roomRentCapPercent: 1,
              nonMedicalCovered: false,
              eligibility: {
                minPolicyYears: 2,
                preExistingCovered: true,
              },
            },
            {
              name: "HDFC ERGO",
              coveragePercent: 65,
              maxCoverage: 300000,
              roomRentCapPercent: 1,
              nonMedicalCovered: false,
              eligibility: {
                minPolicyYears: 1,
                preAuthorizationRequired: true,
              },
            },
          ],
          governmentSchemes: [
            {
              name: "MJPJAY",
              coveragePercent: 75,
              maxCoverage: 150000,
              roomTypeAllowed: "General",
              nonMedicalCovered: false,
              eligibility: {
                state: "Maharashtra",
                incomeBelow: 100000,
                rationCard: true,
              },
            },
          ],
        },

        doctors: [
          {
            id: "jh-1",
            name: "Dr. Anand Patil",
            specialization: "Orthopedic Surgeon",
            experience: 18,
            successRate: 95,
            rating: 4.6,
          },
          {
            id: "jh-2",
            name: "Dr. Meera Kulkarni",
            specialization: "Joint Replacement Specialist",
            experience: 12,
            successRate: 92,
            rating: 4.4,
          },
        ],

        treatments: [
          {
            treatmentId: 101,
            name: "Knee Replacement",
            minCost: 160000,
            maxCost: 420000,
            recoveryTimeDays: 30,
            riskLevel: "Medium",
          },
        ],
      },

      /* ===================== 2 ===================== */
      {
        hospitalId: 2,
        hospitalName: "Deenanath Mangeshkar Hospital",
        type: "Private",
        city: "Pune",
        state: "Maharashtra",
        lat: 18.5079,
        lng: 73.807,
        rating: 4.5,
        affordabilityScore: 8.1,

        facilities: {
          icu: true,
          emergency: true,
          bloodBank: false,
          imaging: true,
          operationTheatre: true,
        },

        insurance: {
          privateInsurance: [
            {
              name: "ICICI Lombard",
              coveragePercent: 68,
              maxCoverage: 280000,
              roomRentCapPercent: 1,
              nonMedicalCovered: false,
              eligibility: {
                minPolicyYears: 1,
              },
            },
          ],
          governmentSchemes: [
            {
              name: "MJPJAY",
              coveragePercent: 70,
              maxCoverage: 140000,
              roomTypeAllowed: "General",
              nonMedicalCovered: false,
              eligibility: {
                state: "Maharashtra",
                incomeBelow: 120000,
              },
            },
          ],
        },

        doctors: [
          {
            id: "dmh-1",
            name: "Dr. Sachin Kulkarni",
            specialization: "Orthopedic & Trauma Surgeon",
            experience: 20,
            successRate: 94,
            rating: 4.7,
          },
        ],

        treatments: [
          {
            treatmentId: 102,
            name: "Knee Replacement",
            minCost: 140000,
            maxCost: 360000,
            recoveryTimeDays: 26,
            riskLevel: "Medium",
          },
        ],
      },

      /* ===================== 3 ===================== */
      {
        hospitalId: 3,
        hospitalName: "Ruby Hall Clinic",
        type: "Private",
        city: "Pune",
        state: "Maharashtra",
        lat: 18.5314,
        lng: 73.8766,
        rating: 4.6,
        affordabilityScore: 6.8,

        facilities: {
          icu: true,
          emergency: true,
          bloodBank: true,
          imaging: true,
          operationTheatre: true,
        },

        insurance: {
          privateInsurance: [
            {
              name: "Max Bupa",
              coveragePercent: 60,
              maxCoverage: 300000,
              roomRentCapPercent: 1,
              nonMedicalCovered: false,
              eligibility: {
                waitingPeriodCompleted: true,
              },
            },
          ],
          governmentSchemes: [],
        },

        doctors: [
          {
            id: "ruby-1",
            name: "Dr. Kunal Shah",
            specialization: "Joint Replacement Surgeon",
            experience: 15,
            successRate: 93,
            rating: 4.5,
          },
        ],

        treatments: [
          {
            treatmentId: 103,
            name: "Knee Replacement",
            minCost: 180000,
            maxCost: 480000,
            recoveryTimeDays: 28,
            riskLevel: "Medium",
          },
        ],
      },

      /* ===================== GOVERNMENT ===================== */
      {
        hospitalId: 4,
        hospitalName: "Sassoon General Hospital",
        type: "Government",
        city: "Pune",
        state: "Maharashtra",
        lat: 18.528,
        lng: 73.8741,
        rating: 4.2,
        affordabilityScore: 9.5,

        facilities: {
          icu: true,
          emergency: true,
          bloodBank: true,
          imaging: false,
          operationTheatre: true,
        },

        insurance: {
          privateInsurance: [],
          governmentSchemes: [
            {
              name: "Ayushman Bharat (PM-JAY)",
              coveragePercent: 85,
              maxCoverage: 500000,
              roomTypeAllowed: "General",
              nonMedicalCovered: false,
              eligibility: {
                secc: true,
                incomeBelow: 250000,
                rationCard: true,
              },
            },
          ],
        },

        doctors: [
          {
            id: "sas-1",
            name: "Dr. Pravin Deshmukh",
            specialization: "Orthopedic Surgeon",
            experience: 22,
            successRate: 90,
            rating: 4.3,
          },
        ],

        treatments: [
          {
            treatmentId: 104,
            name: "Knee Replacement",
            minCost: 80000,
            maxCost: 200000,
            recoveryTimeDays: 40,
            riskLevel: "Medium",
          },
        ],
      },
    ],
  },
  {
    condition: "Heart Surgery",
    city: "Pune",
    description:
      "Heart surgery such as Coronary Artery Bypass Grafting (CABG) is performed to improve blood flow to the heart in patients with severe coronary artery disease.",

    alternatives: [
      {
        name: "Medication & Lifestyle Changes",
        costScore: 3,
        riskScore: 2,
        effectivenessScore: 6,
        note: "Suitable for early-stage heart disease with strict diet, exercise, and medication compliance.",
      },
      {
        name: "Angioplasty (Stent Placement)",
        costScore: 6,
        riskScore: 4,
        effectivenessScore: 8,
        note: "Less invasive than open-heart surgery and effective for blocked coronary arteries.",
      },
    ],

    results: [
      /* ===================== 1 ===================== */
      {
        hospitalId: 11,
        hospitalName: "Jehangir Hospital",
        type: "Private",
        city: "Pune",
        state: "Maharashtra",
        lat: 18.5286,
        lng: 73.874,
        rating: 4.5,
        affordabilityScore: 6.9,

        facilities: {
          icu: true,
          emergency: true,
          bloodBank: true,
          imaging: true,
          operationTheatre: true,
        },

        insurance: {
          privateInsurance: [
            {
              name: "Star Health",
              coveragePercent: 70,
              maxCoverage: 400000,
              roomRentCapPercent: 1,
              nonMedicalCovered: false,
              eligibility: {
                minPolicyYears: 2,
                preExistingCovered: true,
              },
            },
          ],
          governmentSchemes: [
            {
              name: "MJPJAY",
              coveragePercent: 75,
              maxCoverage: 200000,
              roomTypeAllowed: "General",
              nonMedicalCovered: false,
              eligibility: {
                state: "Maharashtra",
                incomeBelow: 100000,
              },
            },
          ],
        },

        doctors: [
          {
            id: "jh-heart-1",
            name: "Dr. Amit Deshpande",
            specialization: "Cardiothoracic Surgeon",
            experience: 20,
            successRate: 96,
            rating: 4.7,
          },
        ],

        treatments: [
          {
            treatmentId: 201,
            name: "Coronary Artery Bypass Surgery (CABG)",
            minCost: 250000,
            maxCost: 600000,
            recoveryTimeDays: 45,
            riskLevel: "High",
          },
        ],
      },

      /* ===================== 2 ===================== */
      {
        hospitalId: 12,
        hospitalName: "Deenanath Mangeshkar Hospital",
        type: "Private",
        city: "Pune",
        state: "Maharashtra",
        lat: 18.5079,
        lng: 73.807,
        rating: 4.6,
        affordabilityScore: 7.8,

        facilities: {
          icu: true,
          emergency: true,
          bloodBank: true,
          imaging: true,
          operationTheatre: true,
        },

        insurance: {
          privateInsurance: [
            {
              name: "ICICI Lombard",
              coveragePercent: 65,
              maxCoverage: 450000,
              roomRentCapPercent: 1,
              nonMedicalCovered: false,
              eligibility: {
                minPolicyYears: 1,
              },
            },
          ],
          governmentSchemes: [],
        },

        doctors: [
          {
            id: "dmh-heart-1",
            name: "Dr. Rohit Kulkarni",
            specialization: "Cardiac Surgeon",
            experience: 18,
            successRate: 95,
            rating: 4.6,
          },
        ],

        treatments: [
          {
            treatmentId: 202,
            name: "Coronary Artery Bypass Surgery (CABG)",
            minCost: 230000,
            maxCost: 550000,
            recoveryTimeDays: 40,
            riskLevel: "High",
          },
        ],
      },

      /* ===================== 3 ===================== */
      {
        hospitalId: 13,
        hospitalName: "Ruby Hall Clinic",
        type: "Private",
        city: "Pune",
        state: "Maharashtra",
        lat: 18.5314,
        lng: 73.8766,
        rating: 4.7,
        affordabilityScore: 6.5,

        facilities: {
          icu: true,
          emergency: true,
          bloodBank: true,
          imaging: true,
          operationTheatre: true,
        },

        insurance: {
          privateInsurance: [
            {
              name: "Max Bupa",
              coveragePercent: 60,
              maxCoverage: 500000,
              roomRentCapPercent: 1,
              nonMedicalCovered: false,
              eligibility: {
                waitingPeriodCompleted: true,
              },
            },
          ],
          governmentSchemes: [],
        },

        doctors: [
          {
            id: "ruby-heart-1",
            name: "Dr. Kunal Mehta",
            specialization: "Cardiothoracic & Vascular Surgeon",
            experience: 16,
            successRate: 94,
            rating: 4.5,
          },
        ],

        treatments: [
          {
            treatmentId: 203,
            name: "Coronary Artery Bypass Surgery (CABG)",
            minCost: 300000,
            maxCost: 650000,
            recoveryTimeDays: 42,
            riskLevel: "High",
          },
        ],
      },

      /* ===================== GOVERNMENT ===================== */
      {
        hospitalId: 14,
        hospitalName: "Sassoon General Hospital",
        type: "Government",
        city: "Pune",
        state: "Maharashtra",
        lat: 18.528,
        lng: 73.8741,
        rating: 4.3,
        affordabilityScore: 9.7,

        facilities: {
          icu: true,
          emergency: true,
          bloodBank: true,
          imaging: false,
          operationTheatre: true,
        },

        insurance: {
          privateInsurance: [],
          governmentSchemes: [
            {
              name: "Ayushman Bharat (PM-JAY)",
              coveragePercent: 85,
              maxCoverage: 500000,
              roomTypeAllowed: "General",
              nonMedicalCovered: false,
              eligibility: {
                secc: true,
                incomeBelow: 250000,
                rationCard: true,
              },
            },
          ],
        },

        doctors: [
          {
            id: "sas-heart-1",
            name: "Dr. Prakash Jadhav",
            specialization: "Cardiac Surgeon",
            experience: 22,
            successRate: 91,
            rating: 4.4,
          },
        ],

        treatments: [
          {
            treatmentId: 204,
            name: "Coronary Artery Bypass Surgery (CABG)",
            minCost: 120000,
            maxCost: 300000,
            recoveryTimeDays: 50,
            riskLevel: "High",
          },
        ],
      },
    ],
  },
];
