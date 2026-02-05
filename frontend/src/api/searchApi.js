import { mockSearchData } from "../data/searchResults";

// Simulated backend search
export const searchHospitals = (surgery, city) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Flatten all hospitals
      const hospitals = mockSearchData.flatMap(block => block.results);

      // Filter by selected surgery + city
      const filtered = hospitals.filter(hospital =>
        hospital.city.toLowerCase() === city.toLowerCase() &&
        hospital.treatments.some(t => t.name === surgery)
      );

      resolve({ results: filtered });
    }, 500); // simulate network delay
  });
};
