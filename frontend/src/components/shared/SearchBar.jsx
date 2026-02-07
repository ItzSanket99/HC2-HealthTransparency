import { useState, useMemo } from "react";
import { mockSearchData } from "../../data/searchResults";
import { FiSearch } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";

const SearchBar = ({ onSearch }) => {
  /* -------------------- INPUT STATES -------------------- */
  const [surgeryInput, setSurgeryInput] = useState("");
  const [selectedSurgery, setSelectedSurgery] = useState("");

  const [cityInput, setCityInput] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  /* -------------------- DROPDOWNS -------------------- */
  const [showSurgeryDropdown, setShowSurgeryDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  /* -------------------- DATA -------------------- */
  const allSurgeries = useMemo(() => {
    const set = new Set();
    mockSearchData.forEach(block =>
      block.results.forEach(hospital =>
        hospital.treatments.forEach(t => set.add(t.name))
      )
    );
    return Array.from(set);
  }, []);

  const filteredSurgeries = allSurgeries.filter(s =>
    s.toLowerCase().includes(surgeryInput.toLowerCase())
  );

  const allCitiesForSurgery = useMemo(() => {
    if (!selectedSurgery) return [];
    const set = new Set();
    mockSearchData.forEach(block =>
      block.results.forEach(hospital =>
        hospital.treatments.forEach(t => {
          if (t.name === selectedSurgery) set.add(hospital.city);
        })
      )
    );
    return Array.from(set);
  }, [selectedSurgery]);

  const filteredCities = allCitiesForSurgery.filter(city =>
    city.toLowerCase().includes(cityInput.toLowerCase())
  );

  /* -------------------- UI -------------------- */
  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow-sm flex items-center gap-2 px-3 py-2 relative">

      {/* -------- CONDITION -------- */}
      <div className="flex items-center gap-2 flex-1 px-3">
        <FiSearch className="text-gray-500 text-lg" />
        <input
          value={surgeryInput}
          placeholder="Search for care (e.g. Angioplasty)"
          onChange={(e) => {
            setSurgeryInput(e.target.value);
            setShowSurgeryDropdown(true);
            setSelectedSurgery("");
            setCityInput("");
            setSelectedCity("");
          }}
          onFocus={() => setShowSurgeryDropdown(true)}
          className="w-full outline-none text-sm"
        />
      </div>

      {/* Divider */}
      <div className="h-8 w-px bg-gray-400" />

      {/* -------- LOCATION -------- */}
      <div className="flex items-center gap-2 flex-1 px-3">
        <HiOutlineLocationMarker className="text-gray-500 text-lg" />
        <input
          value={cityInput}
          placeholder="Location"
          disabled={!selectedSurgery}
          onChange={(e) => {
            setCityInput(e.target.value);
            setShowCityDropdown(true);
            setSelectedCity("");
          }}
          onFocus={() => selectedSurgery && setShowCityDropdown(true)}
          className={`w-full outline-none text-sm
            ${!selectedSurgery ? "bg-transparent cursor-not-allowed text-gray-400" : ""}`}
        />
      </div>

      {/* -------- SEARCH BUTTON -------- */}
      <button
        onClick={() => onSearch(selectedSurgery, selectedCity)}
        disabled={!selectedSurgery || !selectedCity}
        className={`ml-2 p-3 rounded-lg text-white
          ${!selectedSurgery || !selectedCity
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-teal-700 hover:bg-teal-800"
          }`}
      >
        <FiSearch className="text-lg" />
      </button>

      {/* -------- SURGERY DROPDOWN -------- */}
      {showSurgeryDropdown && filteredSurgeries.length > 0 && (
        <div className="absolute top-full left-0 mt-2 w-[45%] bg-white border border-gray-300 rounded-xl shadow-lg z-20 max-h-48 overflow-auto">
          {filteredSurgeries.map(surgery => (
            <div
              key={surgery}
              onClick={() => {
                setSurgeryInput(surgery);
                setSelectedSurgery(surgery);
                setShowSurgeryDropdown(false);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-teal-50 text-sm"
            >
              {surgery}
            </div>
          ))}
        </div>
      )}

      {/* -------- CITY DROPDOWN -------- */}
      {showCityDropdown && filteredCities.length > 0 && (
        <div className="absolute top-full left-[45%] mt-2 w-[40%] bg-white border border-gray-300 rounded-xl shadow-lg z-20 max-h-48 overflow-auto">
          {filteredCities.map(city => (
            <div
              key={city}
              onClick={() => {
                setCityInput(city);
                setSelectedCity(city);
                setShowCityDropdown(false);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-teal-50 text-sm"
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
