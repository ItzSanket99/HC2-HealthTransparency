export const mockSearchData = [
  //knee replacement Pune (3 Hospitals)
{
  condition: "Knee Replacement",
  city: "Pune",
  description:
    "Knee replacement is a surgical procedure to replace damaged knee joint surfaces in severe arthritis, deformity, or injury to relieve pain and restore mobility.",

  results: [
    {
      hospitalId: 701,
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
        privateInsurance: [],
        governmentSchemes: [],
      },

      doctors: [
        {
          id: "rh-kr-2",
          name: "Dr. Kunal Shah",
          specialization: "Orthopedic Surgeon",
          experience: 17,
          successRate: 95,
          rating: 4.7,
        },
      ],

      treatments: [
        {
          treatmentId: 1001,
          name: "Knee Replacement",
          minCost: 185000,
          maxCost: 460000,
          recoveryTimeDays: 30,
          riskLevel: "Medium",
        },
      ],
    },

    {
      hospitalId: 702,
      hospitalName: "Jehangir Hospital",
      type: "Private",
      city: "Pune",
      state: "Maharashtra",
      lat: 18.5286,
      lng: 73.874,
      rating: 4.5,
      affordabilityScore: 7.3,

      facilities: {
        icu: true,
        emergency: true,
        bloodBank: true,
        imaging: true,
        operationTheatre: true,
      },

      insurance: {
        privateInsurance: [],
        governmentSchemes: [],
      },

      doctors: [
        {
          id: "jeh-kr-2",
          name: "Dr. Anand Patil",
          specialization: "Joint Replacement Specialist",
          experience: 21,
          successRate: 96,
          rating: 4.8,
        },
      ],

      treatments: [
        {
          treatmentId: 1002,
          name: "Knee Replacement",
          minCost: 170000,
          maxCost: 420000,
          recoveryTimeDays: 28,
          riskLevel: "Medium",
        },
      ],
    },

    {
      hospitalId: 703,
      hospitalName: "Deenanath Mangeshkar Hospital",
      type: "Private",
      city: "Pune",
      state: "Maharashtra",
      lat: 18.5079,
      lng: 73.807,
      rating: 4.4,
      affordabilityScore: 7.9,

      facilities: {
        icu: true,
        emergency: true,
        bloodBank: false,
        imaging: true,
        operationTheatre: true,
      },

      insurance: {
        privateInsurance: [],
        governmentSchemes: [],
      },

      doctors: [
        {
          id: "dmh-kr-2",
          name: "Dr. Sachin Kulkarni",
          specialization: "Orthopedic Surgeon",
          experience: 18,
          successRate: 93,
          rating: 4.5,
        },
      ],

      treatments: [
        {
          treatmentId: 1003,
          name: "Knee Replacement",
          minCost: 150000,
          maxCost: 390000,
          recoveryTimeDays: 26,
          riskLevel: "Medium",
        },
      ],
    },
  ],
},
  //Knee ACL Reconstruction – Pune (3 Hospitals)
{
  condition: "Knee ACL Reconstruction",
  city: "Pune",
  description:
    "ACL reconstruction is a ligament repair surgery performed after ACL tear causing knee instability.",

  results: [
    {
      hospitalId: 601, // Ruby Hall again
      hospitalName: "Ruby Hall Clinic",
      type: "Private",
      city: "Pune",
      state: "Maharashtra",
      lat: 18.5314,
      lng: 73.8766,
      rating: 4.6,
      affordabilityScore: 7.1,

      facilities: {
        icu: true,
        emergency: true,
        bloodBank: true,
        imaging: true,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "rh-acl-1",
          name: "Dr. Kunal Shah",
          specialization: "Sports Orthopedic Surgeon",
          experience: 16,
          successRate: 95,
          rating: 4.7,
        },
      ],

      treatments: [
        {
          treatmentId: 904,
          name: "Knee ACL Reconstruction",
          minCost: 150000,
          maxCost: 320000,
          recoveryTimeDays: 25,
          riskLevel: "Medium",
        },
      ],
    },

    {
      hospitalId: 602, // Jehangir again
      hospitalName: "Jehangir Hospital",
      type: "Private",
      city: "Pune",
      state: "Maharashtra",
      lat: 18.5286,
      lng: 73.874,
      rating: 4.5,
      affordabilityScore: 7.3,

      facilities: {
        icu: true,
        emergency: true,
        bloodBank: true,
        imaging: true,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "jeh-acl-1",
          name: "Dr. Anand Patil",
          specialization: "Sports Orthopedic Surgeon",
          experience: 20,
          successRate: 95,
          rating: 4.7,
        },
      ],

      treatments: [
        {
          treatmentId: 905,
          name: "Knee ACL Reconstruction",
          minCost: 140000,
          maxCost: 300000,
          recoveryTimeDays: 24,
          riskLevel: "Medium",
        },
      ],
    },

    {
      hospitalId: 604,
      hospitalName: "Sassoon General Hospital",
      type: "Government",
      city: "Pune",
      state: "Maharashtra",
      lat: 18.528,
      lng: 73.8741,
      rating: 4.2,
      affordabilityScore: 9.4,

      facilities: {
        icu: true,
        emergency: true,
        bloodBank: true,
        imaging: false,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "sas-acl-1",
          name: "Dr. Pravin Deshmukh",
          specialization: "Orthopedic Surgeon",
          experience: 22,
          successRate: 91,
          rating: 4.3,
        },
      ],

      treatments: [
        {
          treatmentId: 906,
          name: "Knee ACL Reconstruction",
          minCost: 60000,
          maxCost: 150000,
          recoveryTimeDays: 35,
          riskLevel: "Medium",
        },
      ],
    },
  ],
},
  //Knee Meniscus Repair – Pune (3 Hospitals)
{
  condition: "Knee Meniscus Repair",
  city: "Pune",
  description:
    "Knee meniscus repair is a surgical procedure to repair torn cartilage in the knee joint, commonly due to sports injuries.",

  results: [
    {
      hospitalId: 601,
      hospitalName: "Ruby Hall Clinic",
      type: "Private",
      city: "Pune",
      state: "Maharashtra",
      lat: 18.5314,
      lng: 73.8766,
      rating: 4.6,
      affordabilityScore: 7.0,

      facilities: {
        icu: true,
        emergency: true,
        bloodBank: true,
        imaging: true,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "rh-men-1",
          name: "Dr. Kunal Shah",
          specialization: "Sports Orthopedic Surgeon",
          experience: 16,
          successRate: 94,
          rating: 4.6,
        },
      ],

      treatments: [
        {
          treatmentId: 907,
          name: "Knee Meniscus Repair",
          minCost: 90000,
          maxCost: 220000,
          recoveryTimeDays: 21,
          riskLevel: "Low",
        },
      ],
    },

    {
      hospitalId: 602,
      hospitalName: "Jehangir Hospital",
      type: "Private",
      city: "Pune",
      state: "Maharashtra",
      lat: 18.5286,
      lng: 73.874,
      rating: 4.5,
      affordabilityScore: 7.4,

      facilities: {
        icu: true,
        emergency: true,
        bloodBank: true,
        imaging: true,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "jeh-men-1",
          name: "Dr. Anand Patil",
          specialization: "Orthopedic Surgeon",
          experience: 20,
          successRate: 95,
          rating: 4.7,
        },
      ],

      treatments: [
        {
          treatmentId: 908,
          name: "Knee Meniscus Repair",
          minCost: 85000,
          maxCost: 200000,
          recoveryTimeDays: 20,
          riskLevel: "Low",
        },
      ],
    },

    {
      hospitalId: 603,
      hospitalName: "Deenanath Mangeshkar Hospital",
      type: "Private",
      city: "Pune",
      state: "Maharashtra",
      lat: 18.5079,
      lng: 73.807,
      rating: 4.4,
      affordabilityScore: 7.9,

      facilities: {
        icu: true,
        emergency: true,
        bloodBank: false,
        imaging: true,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "dmh-men-1",
          name: "Dr. Sachin Kulkarni",
          specialization: "Orthopedic Surgeon",
          experience: 18,
          successRate: 93,
          rating: 4.5,
        },
      ],

      treatments: [
        {
          treatmentId: 909,
          name: "Knee Meniscus Repair",
          minCost: 80000,
          maxCost: 180000,
          recoveryTimeDays: 22,
          riskLevel: "Low",
        },
      ],
    },
  ],
},
  //Knee Ligament Injury Treatment – Pune (3 Hospitals)
{
  condition: "Knee Ligament Injury Treatment",
  city: "Pune",
  description:
    "Knee ligament injury treatment includes non-surgical and surgical management of ligament tears causing pain, swelling, or instability.",

  results: [
    {
      hospitalId: 601,
      hospitalName: "Ruby Hall Clinic",
      type: "Private",
      city: "Pune",
      state: "Maharashtra",
      lat: 18.5314,
      lng: 73.8766,
      rating: 4.6,
      affordabilityScore: 7.1,

      facilities: {
        icu: true,
        emergency: true,
        bloodBank: true,
        imaging: true,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "rh-lig-1",
          name: "Dr. Kunal Shah",
          specialization: "Orthopedic Surgeon",
          experience: 16,
          successRate: 94,
          rating: 4.6,
        },
      ],

      treatments: [
        {
          treatmentId: 910,
          name: "Knee Ligament Injury Treatment",
          minCost: 30000,
          maxCost: 150000,
          recoveryTimeDays: 18,
          riskLevel: "Low",
        },
      ],
    },

    {
      hospitalId: 604,
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

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "sas-lig-1",
          name: "Dr. Pravin Deshmukh",
          specialization: "Orthopedic Surgeon",
          experience: 22,
          successRate: 91,
          rating: 4.3,
        },
      ],

      treatments: [
        {
          treatmentId: 911,
          name: "Knee Ligament Injury Treatment",
          minCost: 20000,
          maxCost: 90000,
          recoveryTimeDays: 30,
          riskLevel: "Low",
        },
      ],
    },

    {
      hospitalId: 602,
      hospitalName: "Jehangir Hospital",
      type: "Private",
      city: "Pune",
      state: "Maharashtra",
      lat: 18.5286,
      lng: 73.874,
      rating: 4.5,
      affordabilityScore: 7.3,

      facilities: {
        icu: true,
        emergency: true,
        bloodBank: true,
        imaging: true,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "jeh-lig-1",
          name: "Dr. Anand Patil",
          specialization: "Sports Orthopedic Surgeon",
          experience: 20,
          successRate: 95,
          rating: 4.7,
        },
      ],

      treatments: [
        {
          treatmentId: 912,
          name: "Knee Ligament Injury Treatment",
          minCost: 40000,
          maxCost: 160000,
          recoveryTimeDays: 20,
          riskLevel: "Low",
        },
      ],
    },
  ],
},
 //Knee Replacement – Mumbai (3 Hospitals)
{
  condition: "Knee Replacement",
  city: "Mumbai",
  description:
    "Knee replacement is a surgical procedure to replace damaged knee joint surfaces in severe arthritis, deformity, or injury to relieve pain and restore mobility.",

  results: [
    {
      hospitalId: 801,
      hospitalName: "Kokilaben Dhirubhai Ambani Hospital",
      type: "Private",
      city: "Mumbai",
      state: "Maharashtra",
      lat: 19.1334,
      lng: 72.8267,
      rating: 4.7,
      affordabilityScore: 6.2,

      facilities: {
        icu: true,
        emergency: true,
        bloodBank: true,
        imaging: true,
        operationTheatre: true,
      },

      insurance: {
        privateInsurance: [],
        governmentSchemes: [],
      },

      doctors: [
        {
          id: "koka-kr-1",
          name: "Dr. Amit Shah",
          specialization: "Joint Replacement Specialist",
          experience: 19,
          successRate: 96,
          rating: 4.8,
        },
      ],

      treatments: [
        {
          treatmentId: 1101,
          name: "Knee Replacement",
          minCost: 260000,
          maxCost: 600000,
          recoveryTimeDays: 32,
          riskLevel: "Medium",
        },
      ],
    },

    {
      hospitalId: 802,
      hospitalName: "Lilavati Hospital",
      type: "Private",
      city: "Mumbai",
      state: "Maharashtra",
      lat: 19.0509,
      lng: 72.8295,
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
        privateInsurance: [],
        governmentSchemes: [],
      },

      doctors: [
        {
          id: "lila-kr-1",
          name: "Dr. Rajiv Mehta",
          specialization: "Orthopedic Surgeon",
          experience: 18,
          successRate: 95,
          rating: 4.6,
        },
      ],

      treatments: [
        {
          treatmentId: 1102,
          name: "Knee Replacement",
          minCost: 230000,
          maxCost: 520000,
          recoveryTimeDays: 30,
          riskLevel: "Medium",
        },
      ],
    },

    {
      hospitalId: 803,
      hospitalName: "Nanavati Max Hospital",
      type: "Private",
      city: "Mumbai",
      state: "Maharashtra",
      lat: 19.0955,
      lng: 72.8417,
      rating: 4.5,
      affordabilityScore: 7.1,

      facilities: {
        icu: true,
        emergency: true,
        bloodBank: true,
        imaging: true,
        operationTheatre: true,
      },

      insurance: {
        privateInsurance: [],
        governmentSchemes: [],
      },

      doctors: [
        {
          id: "nano-kr-1",
          name: "Dr. Kiran Patel",
          specialization: "Joint Replacement Surgeon",
          experience: 17,
          successRate: 94,
          rating: 4.5,
        },
      ],

      treatments: [
        {
          treatmentId: 1103,
          name: "Knee Replacement",
          minCost: 210000,
          maxCost: 480000,
          recoveryTimeDays: 29,
          riskLevel: "Medium",
        },
      ],
    },
  ],
},
 //Knee ACL Reconstruction – Mumbai (3 Hospitals)
{
  condition: "Knee ACL Reconstruction",
  city: "Mumbai",
  description:
    "ACL reconstruction is a ligament repair surgery performed after ACL tear causing knee instability or sports injury.",

  results: [
    {
      hospitalId: 801,
      hospitalName: "Kokilaben Dhirubhai Ambani Hospital",
      type: "Private",
      city: "Mumbai",
      state: "Maharashtra",
      lat: 19.1334,
      lng: 72.8267,
      rating: 4.7,
      affordabilityScore: 6.4,

      facilities: {
        icu: true,
        emergency: true,
        bloodBank: true,
        imaging: true,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "koka-acl-1",
          name: "Dr. Amit Shah",
          specialization: "Sports Orthopedic Surgeon",
          experience: 19,
          successRate: 96,
          rating: 4.8,
        },
      ],

      treatments: [
        {
          treatmentId: 1301,
          name: "Knee ACL Reconstruction",
          minCost: 220000,
          maxCost: 450000,
          recoveryTimeDays: 26,
          riskLevel: "Medium",
        },
      ],
    },

    {
      hospitalId: 802,
      hospitalName: "Lilavati Hospital",
      type: "Private",
      city: "Mumbai",
      state: "Maharashtra",
      lat: 19.0509,
      lng: 72.8295,
      rating: 4.6,
      affordabilityScore: 6.9,

      facilities: {
        icu: true,
        emergency: true,
        bloodBank: true,
        imaging: true,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "lila-acl-1",
          name: "Dr. Rajiv Mehta",
          specialization: "Orthopedic Surgeon",
          experience: 18,
          successRate: 95,
          rating: 4.6,
        },
      ],

      treatments: [
        {
          treatmentId: 1302,
          name: "Knee ACL Reconstruction",
          minCost: 200000,
          maxCost: 420000,
          recoveryTimeDays: 25,
          riskLevel: "Medium",
        },
      ],
    },

    {
      hospitalId: 803,
      hospitalName: "Nanavati Max Hospital",
      type: "Private",
      city: "Mumbai",
      state: "Maharashtra",
      lat: 19.0955,
      lng: 72.8417,
      rating: 4.5,
      affordabilityScore: 7.2,

      facilities: {
        icu: true,
        emergency: true,
        bloodBank: true,
        imaging: true,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "nano-acl-1",
          name: "Dr. Kiran Patel",
          specialization: "Sports Injury Specialist",
          experience: 17,
          successRate: 94,
          rating: 4.5,
        },
      ],

      treatments: [
        {
          treatmentId: 1303,
          name: "Knee ACL Reconstruction",
          minCost: 190000,
          maxCost: 400000,
          recoveryTimeDays: 27,
          riskLevel: "Medium",
        },
      ],
    },
  ],
},
//Knee Meniscus Repair – Mumbai (3 Hospitals)
{
  condition: "Knee Meniscus Repair",
  city: "Mumbai",
  description:
    "Knee meniscus repair is a surgical procedure to repair torn cartilage in the knee joint, commonly caused by sports injuries or sudden twisting movements.",

  results: [
    {
      hospitalId: 811,
      hospitalName: "Kokilaben Dhirubhai Ambani Hospital",
      type: "Private",
      city: "Mumbai",
      state: "Maharashtra",
      lat: 19.1334,
      lng: 72.8267,
      rating: 4.7,
      affordabilityScore: 6.4,

      facilities: {
        icu: true,
        emergency: true,
        bloodBank: true,
        imaging: true,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "mumbai-men-1",
          name: "Dr. Amit Shah",
          specialization: "Sports Orthopedic Surgeon",
          experience: 19,
          successRate: 96,
          rating: 4.8,
        },
      ],

      treatments: [
        {
          treatmentId: 1501,
          name: "Knee Meniscus Repair",
          minCost: 150000,
          maxCost: 320000,
          recoveryTimeDays: 22,
          riskLevel: "Low",
        },
      ],
    },

    {
      hospitalId: 812,
      hospitalName: "Lilavati Hospital",
      type: "Private",
      city: "Mumbai",
      state: "Maharashtra",
      lat: 19.0509,
      lng: 72.8295,
      rating: 4.6,
      affordabilityScore: 6.9,

      facilities: {
        icu: true,
        emergency: true,
        bloodBank: true,
        imaging: true,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "mumbai-men-2",
          name: "Dr. Rajiv Mehta",
          specialization: "Orthopedic Surgeon",
          experience: 18,
          successRate: 95,
          rating: 4.6,
        },
      ],

      treatments: [
        {
          treatmentId: 1502,
          name: "Knee Meniscus Repair",
          minCost: 140000,
          maxCost: 300000,
          recoveryTimeDays: 21,
          riskLevel: "Low",
        },
      ],
    },

    {
      hospitalId: 813,
      hospitalName: "KEM Hospital",
      type: "Government",
      city: "Mumbai",
      state: "Maharashtra",
      lat: 19.0025,
      lng: 72.8421,
      rating: 4.3,
      affordabilityScore: 9.5,

      facilities: {
        icu: true,
        emergency: true,
        bloodBank: true,
        imaging: false,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "mumbai-men-3",
          name: "Dr. Sunil Patankar",
          specialization: "Orthopedic Surgeon",
          experience: 23,
          successRate: 91,
          rating: 4.4,
        },
      ],

      treatments: [
        {
          treatmentId: 1503,
          name: "Knee Meniscus Repair",
          minCost: 70000,
          maxCost: 160000,
          recoveryTimeDays: 28,
          riskLevel: "Low",
        },
      ],
    },
  ],
},
//Knee Ligament Injury Treatment – Mumbai (3 Hospitals)
{
  condition: "Knee Ligament Injury Treatment",
  city: "Mumbai",
  description:
    "Knee ligament injury treatment includes non-surgical and surgical management of ligament tears causing knee pain, swelling, and instability.",

  results: [
    {
      hospitalId: 811,
      hospitalName: "Kokilaben Dhirubhai Ambani Hospital",
      type: "Private",
      city: "Mumbai",
      state: "Maharashtra",
      lat: 19.1334,
      lng: 72.8267,
      rating: 4.7,
      affordabilityScore: 6.5,

      facilities: {
        icu: true,
        emergency: true,
        bloodBank: true,
        imaging: true,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "mumbai-lig-1",
          name: "Dr. Amit Shah",
          specialization: "Orthopedic Surgeon",
          experience: 19,
          successRate: 96,
          rating: 4.8,
        },
      ],

      treatments: [
        {
          treatmentId: 1504,
          name: "Knee Ligament Injury Treatment",
          minCost: 60000,
          maxCost: 220000,
          recoveryTimeDays: 20,
          riskLevel: "Low",
        },
      ],
    },

    {
      hospitalId: 812,
      hospitalName: "Lilavati Hospital",
      type: "Private",
      city: "Mumbai",
      state: "Maharashtra",
      lat: 19.0509,
      lng: 72.8295,
      rating: 4.6,
      affordabilityScore: 7.0,

      facilities: {
        icu: true,
        emergency: true,
        bloodBank: true,
        imaging: true,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "mumbai-lig-2",
          name: "Dr. Rajiv Mehta",
          specialization: "Sports Injury Specialist",
          experience: 18,
          successRate: 95,
          rating: 4.6,
        },
      ],

      treatments: [
        {
          treatmentId: 1505,
          name: "Knee Ligament Injury Treatment",
          minCost: 50000,
          maxCost: 200000,
          recoveryTimeDays: 18,
          riskLevel: "Low",
        },
      ],
    },

    {
      hospitalId: 813,
      hospitalName: "KEM Hospital",
      type: "Government",
      city: "Mumbai",
      state: "Maharashtra",
      lat: 19.0025,
      lng: 72.8421,
      rating: 4.3,
      affordabilityScore: 9.6,

      facilities: {
        icu: true,
        emergency: true,
        bloodBank: true,
        imaging: false,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "mumbai-lig-3",
          name: "Dr. Sunil Patankar",
          specialization: "Orthopedic Surgeon",
          experience: 23,
          successRate: 91,
          rating: 4.4,
        },
      ],

      treatments: [
        {
          treatmentId: 1506,
          name: "Knee Ligament Injury Treatment",
          minCost: 25000,
          maxCost: 100000,
          recoveryTimeDays: 30,
          riskLevel: "Low",
        },
      ],
    },
  ],
},
//Cataract eye Surgery – Pune (3 Hospitals)
{
  condition: "Cataract Eye Surgery",
  city: "Pune",
  description:
    "Cataract surgery is a procedure to remove the cloudy natural lens of the eye and replace it with an artificial intraocular lens.",

  results: [
    {
      hospitalId: 2001,
      hospitalName: "Ruby Hall Clinic",
      type: "Private",
      city: "Pune",
      state: "Maharashtra",
      lat: 18.5314,
      lng: 73.8766,
      rating: 4.6,
      affordabilityScore: 7.5,

      facilities: {
        icu: false,
        emergency: true,
        bloodBank: false,
        imaging: true,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "pune-eye-1",
          name: "Dr. Neha Kulkarni",
          specialization: "Ophthalmologist",
          experience: 14,
          successRate: 97,
          rating: 4.7,
        },
      ],

      treatments: [
        {
          treatmentId: 3001,
          name: "Cataract Eye Surgery",
          minCost: 25000,
          maxCost: 90000,
          recoveryTimeDays: 7,
          riskLevel: "Low",
        },
      ],
    },

    {
      hospitalId: 2002,
      hospitalName: "Jehangir Hospital",
      type: "Private",
      city: "Pune",
      state: "Maharashtra",
      lat: 18.5286,
      lng: 73.874,
      rating: 4.5,
      affordabilityScore: 7.8,

      facilities: {
        icu: false,
        emergency: true,
        bloodBank: false,
        imaging: true,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "pune-eye-2",
          name: "Dr. Rohan Patil",
          specialization: "Cataract Specialist",
          experience: 12,
          successRate: 96,
          rating: 4.5,
        },
      ],

      treatments: [
        {
          treatmentId: 3002,
          name: "Cataract Eye Surgery",
          minCost: 22000,
          maxCost: 80000,
          recoveryTimeDays: 6,
          riskLevel: "Low",
        },
      ],
    },

    {
      hospitalId: 2003,
      hospitalName: "Sassoon General Hospital",
      type: "Government",
      city: "Pune",
      state: "Maharashtra",
      lat: 18.528,
      lng: 73.8741,
      rating: 4.2,
      affordabilityScore: 9.5,

      facilities: {
        icu: false,
        emergency: true,
        bloodBank: false,
        imaging: false,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "pune-eye-3",
          name: "Dr. Anil Deshmukh",
          specialization: "Ophthalmologist",
          experience: 20,
          successRate: 94,
          rating: 4.3,
        },
      ],

      treatments: [
        {
          treatmentId: 3003,
          name: "Cataract Eye Surgery",
          minCost: 8000,
          maxCost: 25000,
          recoveryTimeDays: 10,
          riskLevel: "Low",
        },
      ],
    },
  ],
},
//LASIK Eye Surgery – Pune (3 Hospitals)
{
  condition: "LASIK Eye Surgery",
  city: "Pune",
  description:
    "LASIK eye surgery is a laser procedure to correct refractive errors like myopia, hyperopia, and astigmatism.",

  results: [
    {
      hospitalId: 2001,
      hospitalName: "Ruby Hall Clinic",
      type: "Private",
      city: "Pune",
      state: "Maharashtra",
      lat: 18.5314,
      lng: 73.8766,
      rating: 4.6,
      affordabilityScore: 7.0,

      facilities: {
        icu: false,
        emergency: false,
        bloodBank: false,
        imaging: true,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "pune-lasik-1",
          name: "Dr. Neha Kulkarni",
          specialization: "Refractive Surgeon",
          experience: 14,
          successRate: 98,
          rating: 4.8,
        },
      ],

      treatments: [
        {
          treatmentId: 3004,
          name: "LASIK Eye Surgery",
          minCost: 40000,
          maxCost: 120000,
          recoveryTimeDays: 3,
          riskLevel: "Low",
        },
      ],
    },

    {
      hospitalId: 2002,
      hospitalName: "Jehangir Hospital",
      type: "Private",
      city: "Pune",
      state: "Maharashtra",
      lat: 18.5286,
      lng: 73.874,
      rating: 4.5,
      affordabilityScore: 7.4,

      facilities: {
        icu: false,
        emergency: false,
        bloodBank: false,
        imaging: true,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "pune-lasik-2",
          name: "Dr. Rohan Patil",
          specialization: "Ophthalmologist",
          experience: 12,
          successRate: 97,
          rating: 4.6,
        },
      ],

      treatments: [
        {
          treatmentId: 3005,
          name: "LASIK Eye Surgery",
          minCost: 35000,
          maxCost: 100000,
          recoveryTimeDays: 4,
          riskLevel: "Low",
        },
      ],
    },

    {
      hospitalId: 2004,
      hospitalName: "Vasan Eye Care Pune",
      type: "Private",
      city: "Pune",
      state: "Maharashtra",
      lat: 18.5204,
      lng: 73.8567,
      rating: 4.4,
      affordabilityScore: 8.2,

      facilities: {
        icu: false,
        emergency: false,
        bloodBank: false,
        imaging: true,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "pune-lasik-3",
          name: "Dr. Shruti Mehta",
          specialization: "Refractive Surgery Specialist",
          experience: 10,
          successRate: 96,
          rating: 4.5,
        },
      ],

      treatments: [
        {
          treatmentId: 3006,
          name: "LASIK Eye Surgery",
          minCost: 30000,
          maxCost: 90000,
          recoveryTimeDays: 3,
          riskLevel: "Low",
        },
      ],
    },
  ],
},
//Eye Glaucoma Treatment – Pune (3 Hospitals)
{
  condition: "Eye Glaucoma Treatment",
  city: "Pune",
  description:
    "Eye glaucoma treatment includes medication, laser therapy, or surgical procedures to reduce intraocular pressure and prevent vision loss.",

  results: [
    {
      hospitalId: 2101,
      hospitalName: "Ruby Hall Clinic",
      type: "Private",
      city: "Pune",
      state: "Maharashtra",
      lat: 18.5314,
      lng: 73.8766,
      rating: 4.6,
      affordabilityScore: 7.3,

      facilities: {
        icu: false,
        emergency: true,
        bloodBank: false,
        imaging: true,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "eye-glau-pune-1",
          name: "Dr. Neha Kulkarni",
          specialization: "Glaucoma Specialist",
          experience: 14,
          successRate: 95,
          rating: 4.6,
        },
      ],

      treatments: [
        {
          treatmentId: 3201,
          name: "Eye Glaucoma Treatment",
          minCost: 15000,
          maxCost: 90000,
          recoveryTimeDays: 7,
          riskLevel: "Medium",
        },
      ],
    },

    {
      hospitalId: 2102,
      hospitalName: "Jehangir Hospital",
      type: "Private",
      city: "Pune",
      state: "Maharashtra",
      lat: 18.5286,
      lng: 73.874,
      rating: 4.5,
      affordabilityScore: 7.8,

      facilities: {
        icu: false,
        emergency: true,
        bloodBank: false,
        imaging: true,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "eye-glau-pune-2",
          name: "Dr. Rohan Patil",
          specialization: "Ophthalmologist",
          experience: 12,
          successRate: 94,
          rating: 4.5,
        },
      ],

      treatments: [
        {
          treatmentId: 3202,
          name: "Eye Glaucoma Treatment",
          minCost: 12000,
          maxCost: 80000,
          recoveryTimeDays: 6,
          riskLevel: "Medium",
        },
      ],
    },

    {
      hospitalId: 2103,
      hospitalName: "Sassoon General Hospital",
      type: "Government",
      city: "Pune",
      state: "Maharashtra",
      lat: 18.528,
      lng: 73.8741,
      rating: 4.2,
      affordabilityScore: 9.6,

      facilities: {
        icu: false,
        emergency: true,
        bloodBank: false,
        imaging: false,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "eye-glau-pune-3",
          name: "Dr. Anil Deshmukh",
          specialization: "Ophthalmologist",
          experience: 20,
          successRate: 92,
          rating: 4.3,
        },
      ],

      treatments: [
        {
          treatmentId: 3203,
          name: "Eye Glaucoma Treatment",
          minCost: 5000,
          maxCost: 25000,
          recoveryTimeDays: 10,
          riskLevel: "Medium",
        },
      ],
    },
  ],
},
//Eye Retina Surgery – Pune (3 Hospitals)
{
  condition: "Eye Retina Surgery",
  city: "Pune",
  description:
    "Eye retina surgery is performed to treat retinal detachment, diabetic retinopathy, and other retinal disorders affecting vision.",

  results: [
    {
      hospitalId: 2101,
      hospitalName: "Ruby Hall Clinic",
      type: "Private",
      city: "Pune",
      state: "Maharashtra",
      lat: 18.5314,
      lng: 73.8766,
      rating: 4.6,
      affordabilityScore: 6.9,

      facilities: {
        icu: true,
        emergency: true,
        bloodBank: true,
        imaging: true,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "eye-retina-pune-1",
          name: "Dr. Neha Kulkarni",
          specialization: "Retina Specialist",
          experience: 14,
          successRate: 96,
          rating: 4.7,
        },
      ],

      treatments: [
        {
          treatmentId: 3204,
          name: "Eye Retina Surgery",
          minCost: 45000,
          maxCost: 180000,
          recoveryTimeDays: 14,
          riskLevel: "Medium",
        },
      ],
    },

    {
      hospitalId: 2102,
      hospitalName: "Jehangir Hospital",
      type: "Private",
      city: "Pune",
      state: "Maharashtra",
      lat: 18.5286,
      lng: 73.874,
      rating: 4.5,
      affordabilityScore: 7.4,

      facilities: {
        icu: true,
        emergency: true,
        bloodBank: true,
        imaging: true,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "eye-retina-pune-2",
          name: "Dr. Rohan Patil",
          specialization: "Retina Surgeon",
          experience: 12,
          successRate: 95,
          rating: 4.6,
        },
      ],

      treatments: [
        {
          treatmentId: 3205,
          name: "Eye Retina Surgery",
          minCost: 40000,
          maxCost: 160000,
          recoveryTimeDays: 12,
          riskLevel: "Medium",
        },
      ],
    },

    {
      hospitalId: 2103,
      hospitalName: "Sassoon General Hospital",
      type: "Government",
      city: "Pune",
      state: "Maharashtra",
      lat: 18.528,
      lng: 73.8741,
      rating: 4.2,
      affordabilityScore: 9.7,

      facilities: {
        icu: true,
        emergency: true,
        bloodBank: false,
        imaging: false,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "eye-retina-pune-3",
          name: "Dr. Anil Deshmukh",
          specialization: "Retina Surgeon",
          experience: 20,
          successRate: 92,
          rating: 4.3,
        },
      ],

      treatments: [
        {
          treatmentId: 3206,
          name: "Eye Retina Surgery",
          minCost: 15000,
          maxCost: 60000,
          recoveryTimeDays: 18,
          riskLevel: "Medium",
        },
      ],
    },
  ],
},
//Cataract Eye Surgery – Mumbai (3 Hospitals)
{
  condition: "Cataract Eye Surgery",
  city: "Mumbai",
  description:
    "Cataract eye surgery is a procedure to remove the cloudy natural lens of the eye and replace it with an artificial intraocular lens.",

  results: [
    {
      hospitalId: 3101,
      hospitalName: "Kokilaben Dhirubhai Ambani Hospital",
      type: "Private",
      city: "Mumbai",
      state: "Maharashtra",
      lat: 19.1334,
      lng: 72.8267,
      rating: 4.7,
      affordabilityScore: 6.8,

      facilities: {
        icu: false,
        emergency: true,
        bloodBank: false,
        imaging: true,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "mum-cat-1",
          name: "Dr. Aditi Mehra",
          specialization: "Ophthalmologist",
          experience: 15,
          successRate: 97,
          rating: 4.8,
        },
      ],

      treatments: [
        {
          treatmentId: 4001,
          name: "Cataract Eye Surgery",
          minCost: 35000,
          maxCost: 120000,
          recoveryTimeDays: 7,
          riskLevel: "Low",
        },
      ],
    },

    {
      hospitalId: 3102,
      hospitalName: "Lilavati Hospital",
      type: "Private",
      city: "Mumbai",
      state: "Maharashtra",
      lat: 19.0509,
      lng: 72.8295,
      rating: 4.6,
      affordabilityScore: 7.2,

      facilities: {
        icu: false,
        emergency: true,
        bloodBank: false,
        imaging: true,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "mum-cat-2",
          name: "Dr. Ritesh Shah",
          specialization: "Cataract Specialist",
          experience: 13,
          successRate: 96,
          rating: 4.6,
        },
      ],

      treatments: [
        {
          treatmentId: 4002,
          name: "Cataract Eye Surgery",
          minCost: 30000,
          maxCost: 100000,
          recoveryTimeDays: 6,
          riskLevel: "Low",
        },
      ],
    },

    {
      hospitalId: 3103,
      hospitalName: "KEM Hospital",
      type: "Government",
      city: "Mumbai",
      state: "Maharashtra",
      lat: 19.0025,
      lng: 72.8421,
      rating: 4.3,
      affordabilityScore: 9.6,

      facilities: {
        icu: false,
        emergency: true,
        bloodBank: false,
        imaging: false,
        operationTheatre: true,
      },

      insurance: { privateInsurance: [], governmentSchemes: [] },

      doctors: [
        {
          id: "mum-cat-3",
          name: "Dr. Sandeep Patankar",
          specialization: "Ophthalmologist",
          experience: 22,
          successRate: 94,
          rating: 4.4,
        },
      ],

      treatments: [
        {
          treatmentId: 4003,
          name: "Cataract Eye Surgery",
          minCost: 10000,
          maxCost: 35000,
          recoveryTimeDays: 10,
          riskLevel: "Low",
        },
      ],
    },
  ],
},
//LASIK Eye Surgery – Mumbai (3 Hospitals)
{
  condition: "LASIK Eye Surgery",
  city: "Mumbai",
  description:
    "LASIK eye surgery is a laser procedure used to correct refractive errors such as myopia, hyperopia, and astigmatism.",

  results: [
    {
      hospitalId: 3101,
      hospitalName: "Kokilaben Dhirubhai Ambani Hospital",
      type: "Private",
      city: "Mumbai",
      state: "Maharashtra",
      lat: 19.1334,
      lng: 72.8267,
      rating: 4.7,
      affordabilityScore: 6.5,
      facilities: { icu: false, emergency: false, bloodBank: false, imaging: true, operationTheatre: true },
      insurance: { privateInsurance: [], governmentSchemes: [] },
      doctors: [
        {
          id: "mum-lasik-1",
          name: "Dr. Aditi Mehra",
          specialization: "Refractive Surgeon",
          experience: 15,
          successRate: 98,
          rating: 4.8,
        },
      ],
      treatments: [
        {
          treatmentId: 4004,
          name: "LASIK Eye Surgery",
          minCost: 50000,
          maxCost: 150000,
          recoveryTimeDays: 3,
          riskLevel: "Low",
        },
      ],
    },

    {
      hospitalId: 3102,
      hospitalName: "Lilavati Hospital",
      type: "Private",
      city: "Mumbai",
      state: "Maharashtra",
      lat: 19.0509,
      lng: 72.8295,
      rating: 4.6,
      affordabilityScore: 6.9,
      facilities: { icu: false, emergency: false, bloodBank: false, imaging: true, operationTheatre: true },
      insurance: { privateInsurance: [], governmentSchemes: [] },
      doctors: [
        {
          id: "mum-lasik-2",
          name: "Dr. Ritesh Shah",
          specialization: "Ophthalmologist",
          experience: 13,
          successRate: 97,
          rating: 4.6,
        },
      ],
      treatments: [
        {
          treatmentId: 4005,
          name: "LASIK Eye Surgery",
          minCost: 45000,
          maxCost: 130000,
          recoveryTimeDays: 4,
          riskLevel: "Low",
        },
      ],
    },

    {
      hospitalId: 3104,
      hospitalName: "Hinduja Hospital",
      type: "Private",
      city: "Mumbai",
      state: "Maharashtra",
      lat: 19.0330,
      lng: 72.8397,
      rating: 4.5,
      affordabilityScore: 7.3,
      facilities: { icu: false, emergency: false, bloodBank: false, imaging: true, operationTheatre: true },
      insurance: { privateInsurance: [], governmentSchemes: [] },
      doctors: [
        {
          id: "mum-lasik-3",
          name: "Dr. Priya Kapoor",
          specialization: "Refractive Surgery Specialist",
          experience: 11,
          successRate: 96,
          rating: 4.5,
        },
      ],
      treatments: [
        {
          treatmentId: 4006,
          name: "LASIK Eye Surgery",
          minCost: 40000,
          maxCost: 120000,
          recoveryTimeDays: 3,
          riskLevel: "Low",
        },
      ],
    },
  ],
},
//Eye Glaucoma Treatment – Mumbai (3 Hospitals)
{
  condition: "Eye Glaucoma Treatment",
  city: "Mumbai",
  description:
    "Eye glaucoma treatment includes medication, laser therapy, or surgery to control intraocular pressure and prevent optic nerve damage.",

  results: [
    {
      hospitalId: 3101,
      hospitalName: "Kokilaben Dhirubhai Ambani Hospital",
      type: "Private",
      city: "Mumbai",
      state: "Maharashtra",
      lat: 19.1334,
      lng: 72.8267,
      rating: 4.7,
      affordabilityScore: 6.6,
      facilities: { icu: false, emergency: true, bloodBank: false, imaging: true, operationTheatre: true },
      insurance: { privateInsurance: [], governmentSchemes: [] },
      doctors: [
        {
          id: "mum-glau-1",
          name: "Dr. Aditi Mehra",
          specialization: "Glaucoma Specialist",
          experience: 15,
          successRate: 96,
          rating: 4.8,
        },
      ],
      treatments: [
        {
          treatmentId: 4007,
          name: "Eye Glaucoma Treatment",
          minCost: 20000,
          maxCost: 110000,
          recoveryTimeDays: 7,
          riskLevel: "Medium",
        },
      ],
    },

    {
      hospitalId: 3102,
      hospitalName: "Lilavati Hospital",
      type: "Private",
      city: "Mumbai",
      state: "Maharashtra",
      lat: 19.0509,
      lng: 72.8295,
      rating: 4.6,
      affordabilityScore: 7.0,
      facilities: { icu: false, emergency: true, bloodBank: false, imaging: true, operationTheatre: true },
      insurance: { privateInsurance: [], governmentSchemes: [] },
      doctors: [
        {
          id: "mum-glau-2",
          name: "Dr. Ritesh Shah",
          specialization: "Ophthalmologist",
          experience: 13,
          successRate: 95,
          rating: 4.6,
        },
      ],
      treatments: [
        {
          treatmentId: 4008,
          name: "Eye Glaucoma Treatment",
          minCost: 18000,
          maxCost: 95000,
          recoveryTimeDays: 6,
          riskLevel: "Medium",
        },
      ],
    },

    {
      hospitalId: 3103,
      hospitalName: "KEM Hospital",
      type: "Government",
      city: "Mumbai",
      state: "Maharashtra",
      lat: 19.0025,
      lng: 72.8421,
      rating: 4.3,
      affordabilityScore: 9.7,
      facilities: { icu: false, emergency: true, bloodBank: false, imaging: false, operationTheatre: true },
      insurance: { privateInsurance: [], governmentSchemes: [] },
      doctors: [
        {
          id: "mum-glau-3",
          name: "Dr. Sandeep Patankar",
          specialization: "Ophthalmologist",
          experience: 22,
          successRate: 93,
          rating: 4.4,
        },
      ],
      treatments: [
        {
          treatmentId: 4009,
          name: "Eye Glaucoma Treatment",
          minCost: 7000,
          maxCost: 30000,
          recoveryTimeDays: 10,
          riskLevel: "Medium",
        },
      ],
    },
  ],
},
//Eye Retina Surgery – Mumbai (3 Hospitals)
{
  condition: "Eye Retina Surgery",
  city: "Mumbai",
  description:
    "Eye retina surgery is performed to treat retinal detachment, diabetic retinopathy, and other serious retinal conditions affecting vision.",

  results: [
    {
      hospitalId: 3101,
      hospitalName: "Kokilaben Dhirubhai Ambani Hospital",
      type: "Private",
      city: "Mumbai",
      state: "Maharashtra",
      lat: 19.1334,
      lng: 72.8267,
      rating: 4.7,
      affordabilityScore: 6.4,
      facilities: { icu: true, emergency: true, bloodBank: true, imaging: true, operationTheatre: true },
      insurance: { privateInsurance: [], governmentSchemes: [] },
      doctors: [
        {
          id: "mum-ret-1",
          name: "Dr. Aditi Mehra",
          specialization: "Retina Specialist",
          experience: 15,
          successRate: 97,
          rating: 4.8,
        },
      ],
      treatments: [
        {
          treatmentId: 4010,
          name: "Eye Retina Surgery",
          minCost: 60000,
          maxCost: 220000,
          recoveryTimeDays: 14,
          riskLevel: "Medium",
        },
      ],
    },

    {
      hospitalId: 3102,
      hospitalName: "Lilavati Hospital",
      type: "Private",
      city: "Mumbai",
      state: "Maharashtra",
      lat: 19.0509,
      lng: 72.8295,
      rating: 4.6,
      affordabilityScore: 6.9,
      facilities: { icu: true, emergency: true, bloodBank: true, imaging: true, operationTheatre: true },
      insurance: { privateInsurance: [], governmentSchemes: [] },
      doctors: [
        {
          id: "mum-ret-2",
          name: "Dr. Ritesh Shah",
          specialization: "Retina Surgeon",
          experience: 13,
          successRate: 96,
          rating: 4.6,
        },
      ],
      treatments: [
        {
          treatmentId: 4011,
          name: "Eye Retina Surgery",
          minCost: 55000,
          maxCost: 200000,
          recoveryTimeDays: 12,
          riskLevel: "Medium",
        },
      ],
    },

    {
      hospitalId: 3103,
      hospitalName: "KEM Hospital",
      type: "Government",
      city: "Mumbai",
      state: "Maharashtra",
      lat: 19.0025,
      lng: 72.8421,
      rating: 4.3,
      affordabilityScore: 9.8,
      facilities: { icu: true, emergency: true, bloodBank: false, imaging: false, operationTheatre: true },
      insurance: { privateInsurance: [], governmentSchemes: [] },
      doctors: [
        {
          id: "mum-ret-3",
          name: "Dr. Sandeep Patankar",
          specialization: "Retina Surgeon",
          experience: 22,
          successRate: 93,
          rating: 4.4,
        },
      ],
      treatments: [
        {
          treatmentId: 4012,
          name: "Eye Retina Surgery",
          minCost: 20000,
          maxCost: 80000,
          recoveryTimeDays: 18,
          riskLevel: "Medium",
        },
      ],
    },
  ],
}];
