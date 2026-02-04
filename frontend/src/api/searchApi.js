import { mockSearchData } from "../data/searchResults";

export const searchHospitals = (condition, city) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const match = mockSearchData.find(
        (item) =>
          item.condition.toLowerCase().includes(condition.toLowerCase()) &&
          item.city.toLowerCase() === city.toLowerCase()
      );
      resolve(match || { results: [] });
    }, 500);
  });
};
