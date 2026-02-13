import { useState, useMemo, useEffect,useRef } from "react";
import { mockSearchData } from "../../data/searchResults";
import { FiSearch } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onSearch, initialSurgery, initialCity }) => {
  const navigate = useNavigate();

  /* -------------------- INPUT STATES -------------------- */
  const [surgeryInput, setSurgeryInput] = useState("");
  const [selectedSurgery, setSelectedSurgery] = useState("");

  const [cityInput, setCityInput] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  /* -------------------- DROPDOWNS -------------------- */
  const [showSurgeryDropdown, setShowSurgeryDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  /* -------------------- HYDRATE FROM URL -------------------- */
  useEffect(() => {
    if (initialSurgery) {
      setSurgeryInput(initialSurgery);
      setSelectedSurgery(initialSurgery);
    }

    if (initialCity) {
      setCityInput(initialCity);
      setSelectedCity(initialCity);
    }
  }, [initialSurgery, initialCity]);

  /* -------------------- DATA -------------------- */
  const allSurgeries = useMemo(() => {
    const set = new Set();
    mockSearchData.forEach((block) =>
      block.results.forEach((hospital) =>
        hospital.treatments.forEach((t) => set.add(t.name)),
      ),
    );
    return Array.from(set);
  }, []);

  const filteredSurgeries = allSurgeries.filter((s) =>
    s.toLowerCase().includes(surgeryInput.toLowerCase()),
  );

  const allCitiesForSurgery = useMemo(() => {
    if (!selectedSurgery) return [];
    const set = new Set();

    mockSearchData.forEach((block) =>
      block.results.forEach((hospital) =>
        hospital.treatments.forEach((t) => {
          if (
            t.name.toLowerCase().trim() === selectedSurgery.toLowerCase().trim()
          ) {
            set.add(hospital.city);
          }
        }),
      ),
    );

    return Array.from(set);
  }, [selectedSurgery]);

  const filteredCities = allCitiesForSurgery.filter((city) =>
    city.toLowerCase().includes(cityInput.toLowerCase()),
  );

  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowSurgeryDropdown(false);
        setShowCityDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  /* -------------------- UI -------------------- */
return (
  <div
    ref={containerRef}
    className="bg-white border border-gray-200 rounded-2xl shadow-xl flex items-center gap-2 px-6 h-16 relative w-full max-w-5xl mx-auto "
  >
    {/* -------- CONDITION -------- */}
    <div className="flex items-center gap-3 flex-1 px-2 relative">
      <FiSearch className="text-gray-400 text-xl" />
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
        className="w-full outline-none text-base text-gray-700 placeholder-gray-400"
      />

      {/* SURGERY DROPDOWN */}
      {showSurgeryDropdown && filteredSurgeries.length > 0 && (
        <div className="absolute top-full left-0 w-[95%] bg-white border border-gray-200 rounded-b-xl shadow-lg z-30 max-h-56 overflow-auto">
          {filteredSurgeries.map((surgery) => (
            <div
              key={surgery}
              onClick={() => {
                setSurgeryInput(surgery);
                setSelectedSurgery(surgery);
                setShowSurgeryDropdown(false);
              }}
              className="px-5 py-3 cursor-pointer hover:bg-teal-50 text-sm"
            >
              {surgery}
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Divider */}
    <div className="h-8 w-px bg-gray-200" />

    {/* -------- LOCATION -------- */}
    <div className="flex items-center gap-3 flex-1 px-2 relative">
      <HiOutlineLocationMarker className="text-gray-400 text-xl" />
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
        className={`w-full outline-none text-base placeholder-gray-400
          ${
            !selectedSurgery
              ? "bg-transparent cursor-not-allowed text-gray-400"
              : "text-gray-700"
          }`}
      />

      {/* CITY DROPDOWN */}
      {showCityDropdown && filteredCities.length > 0 && (
        <div className="absolute top-full left-0 w-[95%] bg-white border border-gray-200 rounded-b-xl shadow-lg z-30 max-h-56 overflow-auto">
          {filteredCities.map((city) => (
            <div
              key={city}
              onClick={() => {
                setCityInput(city);
                setSelectedCity(city);
                setShowCityDropdown(false);
              }}
              className="px-5 py-3 cursor-pointer hover:bg-teal-50 text-sm"
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>

    {/* -------- SEARCH BUTTON -------- */}
    <button
      onClick={() => {
        if (!selectedSurgery || !selectedCity) return;

        if (onSearch) {
          onSearch(selectedSurgery, selectedCity);
        } else {
          navigate(
            `/search?surgery=${encodeURIComponent(
              selectedSurgery
            )}&city=${encodeURIComponent(selectedCity)}`
          );
        }
      }}
      disabled={!selectedSurgery || !selectedCity}
      className={`h-12 w-12 flex items-center justify-center rounded-xl transition
        ${
          !selectedSurgery || !selectedCity
            ? "bg-gray-300 text-white"
            : "bg-teal-700 hover:bg-teal-800 text-white shadow-md"
        }`}
    >
      <FiSearch className="text-lg" />
    </button>
  </div>
);


};;

export default SearchBar;
