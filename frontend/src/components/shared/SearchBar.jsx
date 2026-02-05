import { useState, useMemo } from "react";
import { mockSearchData } from "../../data/searchResults";

const SearchBar = ({ onSearch }) => {
  /* -------------------- INPUT STATES -------------------- */

  // Text typed by user in surgery input
  const [surgeryInput, setSurgeryInput] = useState("");

  // Final selected surgery (used for filtering)
  const [selectedSurgery, setSelectedSurgery] = useState("");

  // Text typed by user in city input
  const [cityInput, setCityInput] = useState("");

  // Final selected city
  const [selectedCity, setSelectedCity] = useState("");

  /* -------------------- DROPDOWN VISIBILITY -------------------- */

  const [showSurgeryDropdown, setShowSurgeryDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  /* -------------------- DATA DERIVATION -------------------- */

  // Extract ALL unique surgeries from mock data (runs once)
  const allSurgeries = useMemo(() => {
    const set = new Set();

    mockSearchData.forEach(block =>
      block.results.forEach(hospital =>
        hospital.treatments.forEach(t =>
          set.add(t.name)
        )
      )
    );

    return Array.from(set);
  }, []);

  // Filter surgeries as user types (autocomplete behavior)
  const filteredSurgeries = allSurgeries.filter(surgery =>
    surgery.toLowerCase().includes(surgeryInput.toLowerCase())
  );

  // Get all cities where selected surgery is available
  const allCitiesForSurgery = useMemo(() => {
    if (!selectedSurgery) return [];

    const set = new Set();

    mockSearchData.forEach(block =>
      block.results.forEach(hospital =>
        hospital.treatments.forEach(t => {
          if (t.name === selectedSurgery) {
            set.add(hospital.city);
          }
        })
      )
    );

    return Array.from(set);
  }, [selectedSurgery]);

  // Filter cities as user types
  const filteredCities = allCitiesForSurgery.filter(city =>
    city.toLowerCase().includes(cityInput.toLowerCase())
  );

  /* -------------------- UI -------------------- */

  return (
    <div className="bg-white shadow-md p-6 rounded-2xl flex gap-4 relative">

      {/* -------------------- SURGERY AUTOCOMPLETE -------------------- */}
      <div className="w-full relative">
        <input
          value={surgeryInput}
          placeholder="Search surgery (e.g. Angioplasty)"
          onChange={(e) => {
            // Reset everything when surgery input changes
            setSurgeryInput(e.target.value);
            setShowSurgeryDropdown(true);
            setSelectedSurgery("");
            setCityInput("");
            setSelectedCity("");
          }}
          onFocus={() => setShowSurgeryDropdown(true)}
          className="w-full border rounded-full px-4 py-2 focus:ring-2 focus:ring-teal-500"
        />

        {/* Surgery dropdown list */}
        {showSurgeryDropdown && filteredSurgeries.length > 0 && (
          <div className="absolute z-10 mt-2 w-full bg-white border rounded-2xl shadow-lg max-h-48 overflow-auto">
            {filteredSurgeries.map((surgery) => (
              <div
                key={surgery}
                onClick={() => {
                  // Lock selected surgery
                  setSurgeryInput(surgery);
                  setSelectedSurgery(surgery);
                  setShowSurgeryDropdown(false);
                }}
                className="px-4 py-2 cursor-pointer hover:bg-teal-50"
              >
                {surgery}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* -------------------- CITY AUTOCOMPLETE -------------------- */}
      <div className="w-full relative">
        <input
          value={cityInput}
          placeholder="Search city"
          disabled={!selectedSurgery}
          onChange={(e) => {
            setCityInput(e.target.value);
            setShowCityDropdown(true);
            setSelectedCity("");
          }}
          onFocus={() => selectedSurgery && setShowCityDropdown(true)}
          className={`w-full border rounded-full px-4 py-2 focus:ring-2 focus:ring-teal-500
            ${!selectedSurgery ? "bg-gray-100 cursor-not-allowed" : ""}`}
        />

        {/* City dropdown list */}
        {showCityDropdown && filteredCities.length > 0 && (
          <div className="absolute z-10 mt-2 w-full bg-white border rounded-2xl shadow-lg max-h-48 overflow-auto">
            {filteredCities.map((city) => (
              <div
                key={city}
                onClick={() => {
                  // Lock selected city
                  setCityInput(city);
                  setSelectedCity(city);
                  setShowCityDropdown(false);
                }}
                className="px-4 py-2 cursor-pointer hover:bg-teal-50"
              >
                {city}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* -------------------- SEARCH BUTTON -------------------- */}
      <button
        onClick={() => onSearch(selectedSurgery, selectedCity)}
        disabled={!selectedSurgery || !selectedCity}
        className={`px-6 py-2 rounded-full text-white
          ${!selectedSurgery || !selectedCity
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-teal-600 hover:bg-teal-700"
          }`}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
