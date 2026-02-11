export const mockSearchData = [
  {
    condition: "Knee Pain",
    city: "Pune",
    description:
      "Knee replacement is a surgical procedure to relieve pain and restore mobility in severe arthritis or injury.",

    alternatives: [
      {
        name: "Medication & Lifestyle Management",
        costScore: 2,
        riskScore: 2,
        effectivenessScore: 5,
        note: "Often suitable for mild to moderate cases with regular monitoring.",
      },
      {
        name: "Physiotherapy & Bracing",
        costScore: 3,
        riskScore: 1,
        effectivenessScore: 6,
        note: "Strengthens muscles and improves joint stability without surgery.",
      },
    ],

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
];
