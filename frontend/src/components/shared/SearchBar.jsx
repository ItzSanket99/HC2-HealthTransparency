import { useState, useMemo, useEffect, useRef } from "react";
import { mockSearchData } from "../../data/searchResults";
import { FiSearch } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onSearch, initialSurgery, initialCity }) => {
  const navigate = useNavigate();

  const [surgeryInput, setSurgeryInput] = useState("");
  const [selectedSurgery, setSelectedSurgery] = useState("");

  const [cityInput, setCityInput] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [showSurgeryDropdown, setShowSurgeryDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

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

  const allSurgeries = useMemo(() => {
    const set = new Set();
    mockSearchData.forEach((block) =>
      block.results.forEach((hospital) =>
        hospital.treatments.forEach((t) => set.add(t.name))
      )
    );
    return Array.from(set);
  }, []);

  const filteredSurgeries = allSurgeries.filter((s) =>
    s.toLowerCase().includes(surgeryInput.toLowerCase())
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
        })
      )
    );

    return Array.from(set);
  }, [selectedSurgery]);

  const filteredCities = allCitiesForSurgery.filter((city) =>
    city.toLowerCase().includes(cityInput.toLowerCase())
  );

  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSurgeryDropdown(false);
        setShowCityDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-white border border-[var(--border-strong)] rounded-xl grid items-center h-[72px] w-full relative"
      style={{ gridTemplateColumns: "1fr 1px 1fr auto" }}
    >

      {/* SEARCH FIELD */}
      <div className="flex items-center gap-3 px-5 relative">
        <FiSearch className="text-[var(--teal-900)] text-xl" />

        <input
          value={surgeryInput}
          placeholder="Search for care"
          onChange={(e) => {
            setSurgeryInput(e.target.value);
            setShowSurgeryDropdown(true);
            setSelectedSurgery("");
            setCityInput("");
            setSelectedCity("");
          }}
          onFocus={() => setShowSurgeryDropdown(true)}
          className="w-full outline-none text-[15px] text-[var(--text-strong)] placeholder:text-[var(--text-muted)] bg-transparent"
        />

        {showSurgeryDropdown && filteredSurgeries.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white border border-[var(--border-subtle)] rounded-b-xl shadow-sm z-30 max-h-56 overflow-auto">
            {filteredSurgeries.map((surgery) => (
              <div
                key={surgery}
                onClick={() => {
                  setSurgeryInput(surgery);
                  setSelectedSurgery(surgery);
                  setShowSurgeryDropdown(false);
                }}
                className="px-5 py-3 cursor-pointer hover:bg-[var(--teal-100)] text-[15px]"
              >
                {surgery}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DIVIDER */}
      <div className="w-px h-full bg-[var(--border-subtle)]" />

      {/* LOCATION FIELD */}
      <div className="flex items-center gap-3 px-5 relative">
        

        <div className="leading-tight w-full">
          <div className="text-[12px] text-[var(--text-muted)]">Location</div>
          <input
            value={cityInput}
            placeholder="Enter city"
            disabled={!selectedSurgery}
            onChange={(e) => {
              setCityInput(e.target.value);
              setShowCityDropdown(true);
              setSelectedCity("");
            }}
            onFocus={() => selectedSurgery && setShowCityDropdown(true)}
            className="w-full outline-none bg-transparent text-[15px] text-[var(--text-strong)] placeholder:text-[var(--text-muted)]"
          />
        </div>

        {showCityDropdown && filteredCities.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white border border-[var(--border-subtle)] rounded-b-xl shadow-sm z-30 max-h-56 overflow-auto">
            {filteredCities.map((city) => (
              <div
                key={city}
                onClick={() => {
                  setCityInput(city);
                  setSelectedCity(city);
                  setShowCityDropdown(false);
                }}
                className="px-5 py-3 cursor-pointer hover:bg-[var(--teal-100)] text-[15px]"
              >
                {city}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BUTTON SLOT */}
      <div className="flex items-center pr-3">
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
          className={`h-[44px] w-[44px] rounded-lg flex items-center justify-center transition
            ${
              !selectedSurgery || !selectedCity
                ? "bg-gray-300 text-white"
                : "bg-[var(--teal-700)] hover:brightness-95 text-white"
            }`}
        >
          <FiSearch className="text-lg" />
        </button>
      </div>

    </div>
  );
};

export default SearchBar;
