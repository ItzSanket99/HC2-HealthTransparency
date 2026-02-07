export const mockSearchData = [
  /* ===================== PUNE – KNEE PAIN ===================== */
  {
    condition: "Knee Pain",
    city: "Pune",
    description: "Knee replacement is a surgical procedure in which damaged or worn parts of the knee joint are replaced with artificial components to relieve pain and restore mobility. It is commonly recommended for severe arthritis or knee injury.",
    results: [
      {
        hospitalId: 1,
        hospitalName: "Jehangir Hospital",
        type: "Private",
        city: "Pune",
        state: "Maharashtra",
        lat: 18.5286,
        lng: 73.8740, // Central Pune
        rating: 4.4,
        affordabilityScore: 7.2,
        treatments: [
          {
            treatmentId: 101,
            name: "Knee Replacement",
            description: "Knee replacement is a surgical procedure in which damaged or worn parts of the knee joint are replaced with artificial components to relieve pain and restore mobility. It is commonly recommended for severe arthritis or knee injury.",
            minCost: 160000,
            maxCost: 420000,
            recoveryTimeDays: 30,
            riskLevel: "Medium",
          },
        ],
      },
      {
        hospitalId: 101,
        hospitalName: "Deenanath Mangeshkar Hospital",
        type: "Private",
        city: "Pune",
        state: "Maharashtra",
        lat: 18.5079,
        lng: 73.8070, // Near Kothrud (~6 mi)
        rating: 4.5,
        affordabilityScore: 8.1,
        treatments: [
          {
            treatmentId: 1102,
            name: "Knee Replacement",
            description: "Knee replacement is a surgical procedure in which damaged or worn parts of the knee joint are replaced with artificial components to relieve pain and restore mobility. It is commonly recommended for severe arthritis or knee injury.",
            minCost: 140000,
            maxCost: 360000,
            recoveryTimeDays: 26,
            riskLevel: "Medium",
          },
        ],
      },
      {
        hospitalId: 102,
        hospitalName: "District Civil Hospital Baramati",
        type: "Government",
        city: "Pune",
        state: "Maharashtra",
        lat: 18.1516,
        lng: 74.5777, // Baramati (~45 mi)
        rating: 4.1,
        affordabilityScore: 9.0,
        treatments: [
          {
            treatmentId: 1103,
            name: "Knee Replacement",
            description: "Knee replacement is a surgical procedure in which damaged or worn parts of the knee joint are replaced with artificial components to relieve pain and restore mobility. It is commonly recommended for severe arthritis or knee injury.",
            minCost: 90000,
            maxCost: 220000,
            recoveryTimeDays: 35,
            riskLevel: "Medium",
          },
        ],
      },
    ],
  },

  /* ===================== MUMBAI – HEART BLOCKAGE ===================== */
  {
    condition: "Heart Blockage",
    city: "Mumbai",
    description: "Angioplasty is a minimally invasive procedure to open blocked coronary arteries that supply blood to the heart. A small balloon is inflated to widen the artery, and often a stent is placed to keep it open.",
    results: [
      {
        hospitalId: 2,
        hospitalName: "Kokilaben Dhirubhai Ambani Hospital",
        type: "Private",
        city: "Mumbai",
        state: "Maharashtra",
        lat: 19.1357,
        lng: 72.8296, // Andheri
        rating: 4.8,
        affordabilityScore: 6.5,
        treatments: [
          {
            treatmentId: 201,
            name: "Angioplasty",
            description: "Angioplasty is a minimally invasive procedure to open blocked coronary arteries that supply blood to the heart. A small balloon is inflated to widen the artery, and often a stent is placed to keep it open.",
            minCost: 220000,
            maxCost: 600000,
            recoveryTimeDays: 8,
            riskLevel: "High",
          },
        ],
      },
      {
        hospitalId: 201,
        hospitalName: "Breach Candy Hospital",
        type: "Private",
        city: "Mumbai",
        state: "Maharashtra",
        lat: 18.9735,
        lng: 72.8063, // South Mumbai (~10 mi)
        rating: 4.7,
        affordabilityScore: 6.9,
        treatments: [
          {
            treatmentId: 2201,
            name: "Angioplasty",
            description: "Angioplasty is a minimally invasive procedure to open blocked coronary arteries that supply blood to the heart. A small balloon is inflated to widen the artery, and often a stent is placed to keep it open.",
            minCost: 240000,
            maxCost: 580000,
            recoveryTimeDays: 7,
            riskLevel: "High",
          },
        ],
      },
      {
        hospitalId: 202,
        hospitalName: "Kalyan Lifeline Multispeciality Hospital",
        type: "Private",
        city: "Mumbai",
        state: "Maharashtra",
        lat: 19.2437,
        lng: 73.1355, // Kalyan (~33 mi)
        rating: 4.2,
        affordabilityScore: 7.5,
        treatments: [
          {
            treatmentId: 2202,
            name: "Angioplasty",
            description: "Angioplasty is a minimally invasive procedure to open blocked coronary arteries that supply blood to the heart. A small balloon is inflated to widen the artery, and often a stent is placed to keep it open.",
            minCost: 180000,
            maxCost: 450000,
            recoveryTimeDays: 10,
            riskLevel: "High",
          },
        ],
      },
    ],
  },

  /* ===================== BENGALURU – BRAIN TUMOR ===================== */
  {
    condition: "Brain Tumor",
    city: "Bengaluru",
    description: "Brain tumor surgery involves removing abnormal growths in the brain through precise neurosurgical techniques. It aims to remove as much of the tumor as possible while preserving brain function.",
    results: [
      {
        hospitalId: 3,
        hospitalName: "NIMHANS",
        type: "Government",
        city: "Bengaluru",
        state: "Karnataka",
        lat: 12.9435,
        lng: 77.5963, // Central
        rating: 4.9,
        affordabilityScore: 9.5,
        treatments: [
          {
            treatmentId: 301,
            name: "Brain Tumor Surgery",
            description: "Brain tumor surgery involves removing abnormal growths in the brain through precise neurosurgical techniques. It aims to remove as much of the tumor as possible while preserving brain function.",
            minCost: 120000,
            maxCost: 350000,
            recoveryTimeDays: 45,
            riskLevel: "High",
          },
        ],
      },
      {
        hospitalId: 301,
        hospitalName: "Aster CMI Hospital",
        type: "Private",
        city: "Bengaluru",
        state: "Karnataka",
        lat: 13.0406,
        lng: 77.5937, // Hebbal (~9 mi)
        rating: 4.6,
        affordabilityScore: 7.8,
        treatments: [
          {
            treatmentId: 3301,
            name: "Brain Tumor Surgery",
            description: "Brain tumor surgery involves removing abnormal growths in the brain through precise neurosurgical techniques. It aims to remove as much of the tumor as possible while preserving brain function.",
            minCost: 180000,
            maxCost: 420000,
            recoveryTimeDays: 50,
            riskLevel: "High",
          },
        ],
      },
      {
        hospitalId: 302,
        hospitalName: "Ramanagara District Hospital",
        type: "Government",
        city: "Bengaluru",
        state: "Karnataka",
        lat: 12.7210,
        lng: 77.2805, // Ramanagara (~30 mi)
        rating: 4.0,
        affordabilityScore: 9.2,
        treatments: [
          {
            treatmentId: 3302,
            name: "Brain Tumor Surgery",
            description: "Brain tumor surgery involves removing abnormal growths in the brain through precise neurosurgical techniques. It aims to remove as much of the tumor as possible while preserving brain function.",
            minCost: 90000,
            maxCost: 260000,
            recoveryTimeDays: 55,
            riskLevel: "High",
          },
        ],
      },
    ],
  },

  /* ===================== AHMEDABAD – CATARACT ===================== */
  {
    condition: "Cataract",
    city: "Ahmedabad",
    description: "Cataract surgery removes the clouded natural lens of the eye and replaces it with an artificial intraocular lens (IOL). It's a quick outpatient procedure that restores clear vision.",
    results: [
      {
        hospitalId: 501,
        hospitalName: "Shalby Eye Care",
        type: "Private",
        city: "Ahmedabad",
        state: "Gujarat",
        lat: 23.0395,
        lng: 72.5660, // Central
        rating: 4.4,
        affordabilityScore: 8.7,
        treatments: [
          {
            treatmentId: 5501,
            name: "Cataract Surgery",
            description: "Cataract surgery removes the clouded natural lens of the eye and replaces it with an artificial intraocular lens (IOL). It's a quick outpatient procedure that restores clear vision.",
            minCost: 22000,
            maxCost: 55000,
            recoveryTimeDays: 6,
            riskLevel: "Low",
          },
        ],
      },
      {
        hospitalId: 502,
        hospitalName: "Raghudeep Eye Clinic",
        type: "Private",
        city: "Ahmedabad",
        state: "Gujarat",
        lat: 23.0273,
        lng: 72.5080, // Satellite (~7 mi)
        rating: 4.2,
        affordabilityScore: 9.1,
        treatments: [
          {
            treatmentId: 5502,
            name: "Cataract Surgery",
            description: "Cataract surgery removes the clouded natural lens of the eye and replaces it with an artificial intraocular lens (IOL). It's a quick outpatient procedure that restores clear vision.",
            minCost: 18000,
            maxCost: 48000,
            recoveryTimeDays: 5,
            riskLevel: "Low",
          },
        ],
      },
      {
        hospitalId: 503,
        hospitalName: "Anand Eye Institute",
        type: "Private",
        city: "Ahmedabad",
        state: "Gujarat",
        lat: 22.5645,
        lng: 72.9289, // Anand (~38 mi)
        rating: 4.1,
        affordabilityScore: 9.4,
        treatments: [
          {
            treatmentId: 5503,
            name: "Cataract Surgery",
            description: "Cataract surgery removes the clouded natural lens of the eye and replaces it with an artificial intraocular lens (IOL). It's a quick outpatient procedure that restores clear vision.",
            minCost: 15000,
            maxCost: 40000,
            recoveryTimeDays: 6,
            riskLevel: "Low",
          },
        ],
      },
    ],
  },
];
