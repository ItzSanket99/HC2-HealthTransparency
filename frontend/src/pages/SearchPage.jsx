import { useState } from "react";
import SearchBar from "../components/shared/SearchBar";
import HospitalCard from "../components/cards/HospitalCard";
import MapView from "../components/MapView";
import { searchHospitals } from "../api/searchApi";


const SearchPage = () => {
  const [results, setResults] = useState([]);

  const handleSearch = async (condition, city) => {
    const data = await searchHospitals(condition, city);
    setResults(data.results || []);
  };

  const mapLocations = results.map((h) => ({
    id: h.hospitalId,
    lat: h.lat,
    lng: h.lng,
    label: `${h.hospitalName} • ₹${h.treatments[0].minCost.toLocaleString()} – ₹${h.treatments[0].maxCost.toLocaleString()}`,
  }));

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Search */}
      <div className="max-w-7xl mx-auto p-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* LEFT: RESULTS */}
        <div className="lg:col-span-3 space-y-4">
          {results.length === 0 ? (
            <p className="text-gray-500">Search to see hospitals</p>
          ) : (
            results.map((h) => (
              <HospitalCard key={h.hospitalId} hospital={h} />
            ))
          )}
        </div>

        {/* RIGHT: MAP */}
        <div className="lg:col-span-2">
          <MapView locations={mapLocations} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
