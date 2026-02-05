export const mockSearchData = [
  {
    condition: "Knee Pain",
    city: "Pune",
    results: [
      {
        hospitalId: 1,
        hospitalName: "Jehangir Hospital",
        type: "Private",
        city: "Pune",
        state: "Maharashtra",
        lat: 18.5286,
        lng: 73.8740,
        rating: 4.4,
        affordabilityScore: 7.2,
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
    ],
  },

  {
    condition: "Heart Blockage",
    city: "Mumbai",
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
            riskLevel: "High",
          },
        ],
      },
    ],
  },

  {
    condition: "Brain Tumor",
    city: "Bengaluru",
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
            riskLevel: "High",
          },
        ],
      },
    ],
  },

  {
    condition: "Kidney Failure",
    city: "Chennai",
    results: [
      {
        hospitalId: 4,
        hospitalName: "Apollo Hospitals Greams Road",
        type: "Private",
        city: "Chennai",
        state: "Tamil Nadu",
        lat: 13.0604,
        lng: 80.2496,
        rating: 4.7,
        affordabilityScore: 6.9,
        treatments: [
          {
            treatmentId: 401,
            name: "Kidney Transplant",
            minCost: 500000,
            maxCost: 900000,
            recoveryTimeDays: 60,
            riskLevel: "High",
          },
        ],
      },
    ],
  },

  {
    condition: "Liver Cirrhosis",
    city: "Delhi",
    results: [
      {
        hospitalId: 5,
        hospitalName: "AIIMS Delhi",
        type: "Government",
        city: "Delhi",
        state: "Delhi",
        lat: 28.5672,
        lng: 77.2100,
        rating: 4.8,
        affordabilityScore: 9.7,
        treatments: [
          {
            treatmentId: 501,
            name: "Liver Transplant",
            minCost: 300000,
            maxCost: 700000,
            recoveryTimeDays: 75,
            riskLevel: "High",
          },
        ],
      },
    ],
  },

  {
    condition: "Spinal Disc Herniation",
    city: "Hyderabad",
    results: [
      {
        hospitalId: 6,
        hospitalName: "Yashoda Hospitals Somajiguda",
        type: "Private",
        city: "Hyderabad",
        state: "Telangana",
        lat: 17.4213,
        lng: 78.4586,
        rating: 4.6,
        affordabilityScore: 7.1,
        treatments: [
          {
            treatmentId: 601,
            name: "Spinal Decompression Surgery",
            minCost: 180000,
            maxCost: 350000,
            recoveryTimeDays: 25,
            riskLevel: "Medium",
          },
        ],
      },
    ],
  },

  {
    condition: "Cataract",
    city: "Ahmedabad",
    results: [
      {
        hospitalId: 7,
        hospitalName: "Drashti Netralaya",
        type: "Private",
        city: "Ahmedabad",
        state: "Gujarat",
        lat: 23.0225,
        lng: 72.5714,
        rating: 4.5,
        affordabilityScore: 8.9,
        treatments: [
          {
            treatmentId: 701,
            name: "Cataract Surgery",
            minCost: 20000,
            maxCost: 60000,
            recoveryTimeDays: 7,
            riskLevel: "Low",
          },
        ],
      },
    ],
  },

  {
    condition: "Breast Cancer",
    city: "Kolkata",
    results: [
      {
        hospitalId: 8,
        hospitalName: "Tata Medical Center",
        type: "Private",
        city: "Kolkata",
        state: "West Bengal",
        lat: 22.5726,
        lng: 88.3639,
        rating: 4.7,
        affordabilityScore: 7.8,
        treatments: [
          {
            treatmentId: 801,
            name: "Chemotherapy",
            minCost: 150000,
            maxCost: 500000,
            recoveryTimeDays: 120,
            riskLevel: "High",
          },
        ],
      },
    ],
  },

  {
    condition: "Gallstones",
    city: "Jaipur",
    results: [
      {
        hospitalId: 9,
        hospitalName: "SMS Hospital",
        type: "Government",
        city: "Jaipur",
        state: "Rajasthan",
        lat: 26.9124,
        lng: 75.7873,
        rating: 4.3,
        affordabilityScore: 9.1,
        treatments: [
          {
            treatmentId: 901,
            name: "Laparoscopic Cholecystectomy",
            minCost: 40000,
            maxCost: 120000,
            recoveryTimeDays: 10,
            riskLevel: "Low",
          },
        ],
      },
    ],
  },

  {
    condition: "COVID-19 Complications",
    city: "Lucknow",
    results: [
      {
        hospitalId: 10,
        hospitalName: "SGPGIMS",
        type: "Government",
        city: "Lucknow",
        state: "Uttar Pradesh",
        lat: 26.7417,
        lng: 80.9462,
        rating: 4.6,
        affordabilityScore: 9.3,
        treatments: [
          {
            treatmentId: 1001,
            name: "ICU Respiratory Care",
            minCost: 50000,
            maxCost: 200000,
            recoveryTimeDays: 20,
            riskLevel: "High",
          },
        ],
      },
    ],
  },
];
