import { useState, useMemo, useEffect } from "react";
import SearchBar from "../components/shared/SearchBar";
import HospitalCard from "../components/cards/HospitalCard";
import MapView from "../components/MapView";
import FiltersBar from "../components/filters/FilterBar";
import { mockSearchData } from "../data/searchResults";
import ProcedureDescription from "../components/shared/ProcedureDescription";
import PriceInsight from "../components/shared/PriceInsight";
import { useNavigate, useSearchParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const DEFAULT_DISTANCE = Infinity;
const DEFAULT_PRICE = { min: null, max: null };

/* -------------------- DISTANCE HELPER -------------------- */
const getDistanceMiles = (lat1, lon1, lat2, lon2) => {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 3958.8;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return +((R * c) * 5).toFixed(1);
};

/* -------------------- CITY COORDINATES -------------------- */
const cityCoordinates = {
  Pune: { lat: 18.5204, lng: 73.8567 },
  Mumbai: { lat: 19.076, lng: 72.8777 },
  Bengaluru: { lat: 12.9716, lng: 77.5946 },
  Chennai: { lat: 13.0827, lng: 80.2707 },
  Delhi: { lat: 28.6139, lng: 77.209 },
  Hyderabad: { lat: 17.385, lng: 78.4867 },
  Ahmedabad: { lat: 23.0225, lng: 72.5714 },
  Kolkata: { lat: 22.5726, lng: 88.3639 },
  Jaipur: { lat: 26.9124, lng: 75.7873 },
  Lucknow: { lat: 26.8467, lng: 80.9462 },
};

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const surgeryParam = searchParams.get("surgery");
  const cityParam = searchParams.get("city");

  const [results, setResults] = useState([]);
  const [distance, setDistance] = useState(DEFAULT_DISTANCE);
  const [hasSearched, setHasSearched] = useState(false);
  const [price, setPrice] = useState(DEFAULT_PRICE);
  const [procedureInfo, setProcedureInfo] = useState(null);
const [hospitalRatings, setHospitalRatings] = useState({});
const [selectedHospitals, setSelectedHospitals] = useState([]);
  const navigate = useNavigate();

  /* -------------------- SEARCH -------------------- */
  const handleSearch = (surgery, city) => {
    setDistance(DEFAULT_DISTANCE);
    setPrice(DEFAULT_PRICE);

    const cityCenter = cityCoordinates[city];

    const block = mockSearchData.find(
      (b) =>
        b.results.some(
          (h) =>
            h.city === city &&
            h.treatments.some((t) => t.name === surgery)
        )
    );

    const filteredResults = block
      ? block.results
          .filter((h) => h.treatments.some((t) => t.name === surgery))
          .map((h) => ({
            ...h,
            distanceMiles: getDistanceMiles(
              cityCenter.lat,
              cityCenter.lng,
              h.lat,
              h.lng
            ),
          }))
      : [];

    setResults(filteredResults);
    setProcedureInfo(block || null);
    setHasSearched(true);
  };

  useEffect(() => {
    if (surgeryParam && cityParam) {
      handleSearch(surgeryParam, cityParam);
    }
  }, [searchParams]);
  useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, "reviews"),
    (snapshot) => {
      const ratingMap = {};

      snapshot.forEach((doc) => {
        const data = doc.data();
        const hospitalId = data.hospitalId;

        if (!ratingMap[hospitalId]) {
          ratingMap[hospitalId] = { total: 0, count: 0 };
        }

        ratingMap[hospitalId].total += data.overallRating || 0;
        ratingMap[hospitalId].count += 1;
      });

      const averages = {};

      Object.keys(ratingMap).forEach((id) => {
        averages[id] =
          ratingMap[id].total / ratingMap[id].count;
      });

      setHospitalRatings(averages);
    }
  );

  return () => unsubscribe();
}, []);

  /* -------------------- FILTER RESULTS -------------------- */
  const filteredResults = results.filter((h) => {
    const treatment = h.treatments[0];

    const distanceOk = distance === Infinity || h.distanceMiles <= distance;
    const minOk = price.min == null || treatment.minCost >= price.min;
    const maxOk = price.max == null || treatment.maxCost <= price.max;

    return distanceOk && minOk && maxOk;
  });

  const prices = results.flatMap((h) =>
    h.treatments.map((t) => [t.minCost, t.maxCost])
  ).flat();

  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;
  const midpointPrice = prices.length
    ? Math.round((minPrice + maxPrice) / 2)
    : 0;

  const mapLocations = filteredResults.map((h) => ({
    id: h.hospitalId,
    lat: h.lat,
    lng: h.lng,
    label: `${h.hospitalName} • ${h.distanceMiles} mi`,
  }));

  const toggleSelect = (hospital) => {
  const exists = selectedHospitals.find(
    (h) => h.hospitalId === hospital.hospitalId
  );

  if (exists) {
    setSelectedHospitals(
      selectedHospitals.filter(
        (h) => h.hospitalId !== hospital.hospitalId
      )
    );
  } else {
    if (selectedHospitals.length < 3) {
      setSelectedHospitals([...selectedHospitals, hospital]);
    } else {
      alert("You can compare up to 3 hospitals only");
    }
  }
};



  return (
    <div className="bg-[var(--bg)] min-h-screen">

      {/* SEARCH */}
      <div className="pt-8">
        <SearchBar
          onSearch={handleSearch}
          initialSurgery={surgeryParam}
          initialCity={cityParam}
        />
      </div>
      


      {/* FILTERS */}
{hasSearched && (
  <div className="mt-6 px-6">
    <div className="flex items-end gap-4">

      <FiltersBar
        distance={distance}
        onDistanceApply={setDistance}
        price={price}
        onPriceApply={setPrice}
      />

      <button
        onClick={() => navigate("/compare", {
  state: { hospitals: selectedHospitals }
})}
        className="bg-[#176F6F] text-white px-6 py-2 rounded-full hover:bg-[#0E5658] transition whitespace-nowrap"
      >
        Compare Hospitals
      </button>

    </div>
  </div>
)}

      {/* MAIN CONTENT */}
      {hasSearched && procedureInfo && (
        <div className="grid lg:grid-cols-[1fr_420px]">

          {/* LEFT CONTENT FLOW */}
          <div>

            <ProcedureDescription
              title={procedureInfo.condition}
              description={procedureInfo.description}
            />

            {/* RESULTS */}
            <div className="mt-6 space-y-6">
              {filteredResults.length === 0 ? (
                <p className="text-[var(--text-muted)]">
                  No hospitals found within {distance} miles
                </p>
              ) : (
                filteredResults.map((h) => (
  <HospitalCard
    key={h.hospitalId}
    hospital={{
      ...h,
      rating: hospitalRatings[h.hospitalId] || 0,
    }}
    isSelected={selectedHospitals.some(
      (sel) => sel.hospitalId === h.hospitalId
    )}
    toggleSelect={toggleSelect}
  />
))
              )}
            </div>

          </div>

          {/* RIGHT STICKY SIDEBAR */}
          <div className=" space-y-6">

            <div className="sticky top-2 space-y-6">

              <PriceInsight
                min={minPrice}
                max={maxPrice}
                midpoint={midpointPrice}
                procedure={procedureInfo.condition}
              />

              <MapView locations={mapLocations} />

            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default SearchPage;
