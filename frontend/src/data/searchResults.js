export const mockSearchData = [
  /* ===================== PUNE – KNEE PAIN ===================== */
  {
    condition: "Knee Pain",
    city: "Pune",
    description:
      "Knee replacement is a surgical procedure in which damaged or worn parts of the knee joint are replaced with artificial components to relieve pain and restore mobility. It is commonly recommended for severe arthritis or knee injury.",

    alternatives: [
      {
        name: "Physiotherapy & Exercise",
        costScore: 2,
        riskScore: 1,
        effectivenessScore: 6,
        note:
          "Often recommended as first-line treatment for mild to moderate knee pain."
      },
      {
        name: "Medications & Pain Management",
        costScore: 3,
        riskScore: 3,
        effectivenessScore: 5,
        note:
          "Includes pain relievers and anti-inflammatory drugs for symptom control."
      },
      {
        name: "Injections (Steroid / Hyaluronic Acid)",
        costScore: 4,
        riskScore: 4,
        effectivenessScore: 6,
        note:
          "May provide temporary pain relief and improve joint movement."
      }
    ],

    results: [
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
        treatments: [
          {
            treatmentId: 101,
            name: "Knee Replacement",
            description:
              "Knee replacement is a surgical procedure in which damaged or worn parts of the knee joint are replaced with artificial components to relieve pain and restore mobility.",
            minCost: 160000,
            maxCost: 420000,
            recoveryTimeDays: 30,
            riskLevel: "Medium"
          }
        ]
      },
      {
        hospitalId: 101,
        hospitalName: "Deenanath Mangeshkar Hospital",
        type: "Private",
        city: "Pune",
        state: "Maharashtra",
        lat: 18.5079,
        lng: 73.807,
        rating: 4.5,
        affordabilityScore: 8.1,
        treatments: [
          {
            treatmentId: 1102,
            name: "Knee Replacement",
            minCost: 140000,
            maxCost: 360000,
            recoveryTimeDays: 26,
            riskLevel: "Medium"
          }
        ]
      },
      {
        hospitalId: 102,
        hospitalName: "District Civil Hospital Baramati",
        type: "Government",
        city: "Pune",
        state: "Maharashtra",
        lat: 18.1516,
        lng: 74.5777,
        rating: 4.1,
        affordabilityScore: 9.0,
        treatments: [
          {
            treatmentId: 1103,
            name: "Knee Replacement",
            minCost: 90000,
            maxCost: 220000,
            recoveryTimeDays: 35,
            riskLevel: "Medium"
          }
        ]
      }
    ]
  },

  /* ===================== MUMBAI – HEART BLOCKAGE ===================== */
  {
    condition: "Heart Blockage",
    city: "Mumbai",
    description:
      "Angioplasty is a minimally invasive procedure to open blocked coronary arteries that supply blood to the heart.",

    alternatives: [
      {
        name: "Medication & Lifestyle Management",
        costScore: 2,
        riskScore: 2,
        effectivenessScore: 5,
        note:
          "Often suitable for mild to moderate blockages with regular monitoring."
      },
      {
        name: "Cardiac Rehabilitation",
        costScore: 4,
        riskScore: 1,
        effectivenessScore: 6,
        note:
          "Focuses on supervised exercise, diet, and risk-factor control."
      },
      {
        name: "Watchful Monitoring",
        costScore: 1,
        riskScore: 3,
        effectivenessScore: 3,
        note:
          "Used when blockage is stable and symptoms are minimal."
      }
    ],

    results: [
      {
        hospitalId: 2,
        hospitalName: "Kokilaben Dhirubhai Ambani Hospital",
        type: "Private",
        city: "Mumbai",
        state: "Maharashtra",
        lat: 19.1357,
        lng: 72.8296,
        rating: 4.8,
        affordabilityScore: 6.5,
        treatments: [
          {
            treatmentId: 201,
            name: "Angioplasty",
            minCost: 220000,
            maxCost: 600000,
            recoveryTimeDays: 8,
            riskLevel: "High"
          }
        ]
      },
      {
        hospitalId: 201,
        hospitalName: "Breach Candy Hospital",
        type: "Private",
        city: "Mumbai",
        state: "Maharashtra",
        lat: 18.9735,
        lng: 72.8063,
        rating: 4.7,
        affordabilityScore: 6.9,
        treatments: [
          {
            treatmentId: 2201,
            name: "Angioplasty",
            minCost: 240000,
            maxCost: 580000,
            recoveryTimeDays: 7,
            riskLevel: "High"
          }
        ]
      }
    ]
  },

  /* ===================== BENGALURU – BRAIN TUMOR ===================== */
  {
    condition: "Brain Tumor",
    city: "Bengaluru",
    description:
      "Brain tumor surgery involves removing abnormal growths in the brain through precise neurosurgical techniques.",

    alternatives: [
      {
        name: "Radiation Therapy",
        costScore: 6,
        riskScore: 6,
        effectivenessScore: 6,
        note:
          "Used to shrink tumors or prevent further growth."
      },
      {
        name: "Chemotherapy",
        costScore: 7,
        riskScore: 7,
        effectivenessScore: 5,
        note:
          "May be used alone or with surgery depending on tumor type."
      },
      {
        name: "Active Surveillance",
        costScore: 2,
        riskScore: 4,
        effectivenessScore: 3,
        note:
          "Monitoring small, slow-growing tumors without immediate intervention."
      }
    ],

    results: [
      {
        hospitalId: 3,
        hospitalName: "NIMHANS",
        type: "Government",
        city: "Bengaluru",
        state: "Karnataka",
        lat: 12.9435,
        lng: 77.5963,
        rating: 4.9,
        affordabilityScore: 9.5,
        treatments: [
          {
            treatmentId: 301,
            name: "Brain Tumor Surgery",
            minCost: 120000,
            maxCost: 350000,
            recoveryTimeDays: 45,
            riskLevel: "High"
          }
        ]
      }
    ]
  },

  /* ===================== AHMEDABAD – CATARACT ===================== */
  {
    condition: "Cataract",
    city: "Ahmedabad",
    description:
      "Cataract surgery removes the clouded natural lens of the eye and replaces it with an artificial intraocular lens.",

    alternatives: [
      {
        name: "Prescription Glasses",
        costScore: 1,
        riskScore: 1,
        effectivenessScore: 2,
        note:
          "Temporary vision correction in very early cataract stages."
      },
      {
        name: "Lifestyle Adjustments",
        costScore: 1,
        riskScore: 1,
        effectivenessScore: 2,
        note:
          "Includes improved lighting and vision aids."
      }
    ],

    results: [
      {
        hospitalId: 501,
        hospitalName: "Shalby Eye Care",
        type: "Private",
        city: "Ahmedabad",
        state: "Gujarat",
        lat: 23.0395,
        lng: 72.566,
        rating: 4.4,
        affordabilityScore: 8.7,
        treatments: [
          {
            treatmentId: 5501,
            name: "Cataract Surgery",
            minCost: 22000,
            maxCost: 55000,
            recoveryTimeDays: 6,
            riskLevel: "Low"
          }
        ]
      }
    ]
  }
];
