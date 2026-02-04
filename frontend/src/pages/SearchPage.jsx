import { useState } from "react";
import SearchBar from "../components/shared/SearchBar";
import HospitalCard from "../components/cards/HospitalCard";
import { searchHospitals } from "../api/searchApi";

const SearchPage = () => {
  const [results, setResults] = useState([]);

  const handleSearch = async (condition, city) => {
    const data = await searchHospitals(condition, city);
    setResults(data.results || []);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
    <div className="max-w-6xl mx-auto p-6">
      <SearchBar onSearch={handleSearch} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.length === 0 ? (
          <p className="text-gray-500">No results found</p>
        ) : (
          results.map((h) => (
            <HospitalCard key={h.hospitalId} hospital={h} />
          ))
        )}
      </div>
    </div>
    </div>
  );
};

export default SearchPage;
