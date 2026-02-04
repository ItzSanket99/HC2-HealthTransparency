export const mockSearchData = [
  {
    condition: "Knee Pain",
    city: "Pune",
    results: [
      {
        hospitalId: 1,
        hospitalName: "XYZ Hospital",
        type: "Private",
        city: "Pune",
        state: "Maharashtra",
        lat: 18.5204,
        lng: 73.8567,
        rating: 4.2,
        affordabilityScore: 7.5,
        treatments: [
          {
            treatmentId: 101,
            name: "Knee Replacement",
            minCost: 150000,
            maxCost: 400000,
            recoveryTimeDays: 30,
            riskLevel: "Medium",
          },
        ],
      },
      {
        hospitalId: 2,
        hospitalName: "Sasoon Government Hospital",
        type: "Government",
        city: "Pune",
        state: "Maharashtra",
        lat: 18.5314,
        lng: 73.8446,
        rating: 4.6,
        affordabilityScore: 9.2,
        treatments: [
          {
            treatmentId: 101,
            name: "Knee Replacement",
            minCost: 90000,
            maxCost: 180000,
            recoveryTimeDays: 35,
            riskLevel: "Medium",
          },
        ],
      },
    ],
  },
  {
    condition: "Heart Blockage",
    city: "Mumbai",
    results: [
      {
        hospitalId: 3,
        hospitalName: "Apollo Hospital",
        type: "Private",
        city: "Mumbai",
        state: "Maharashtra",
        lat: 19.076,
        lng: 72.8777,
        rating: 4.7,
        affordabilityScore: 6.8,
        treatments: [
          {
            treatmentId: 201,
            name: "Angioplasty",
            minCost: 200000,
            maxCost: 550000,
            recoveryTimeDays: 10,
            riskLevel: "High",
          },
        ],
      },
    ],
  },
];
