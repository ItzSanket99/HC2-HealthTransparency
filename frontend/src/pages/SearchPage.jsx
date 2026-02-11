import { useState, useMemo } from "react";
import SearchBar from "../components/shared/SearchBar";
import HospitalCard from "../components/cards/HospitalCard";
import MapView from "../components/MapView";
import FiltersBar from "../components/filters/FilterBar";
import { mockSearchData } from "../data/searchResults";
import ProcedureDescription from "../components/shared/ProcedureDescription";
import PriceInsight from "../components/shared/PriceInsight";


const DEFAULT_DISTANCE = Infinity;
const DEFAULT_PRICE = { min: null, max: null };


/* -------------------- DISTANCE HELPER (HAVERSINE) -------------------- */
const getDistanceMiles = (lat1, lon1, lat2, lon2) => {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 3958.8; // miles

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
  const [results, setResults] = useState([]);
  const [distance, setDistance] = useState(DEFAULT_DISTANCE);
  const [hasSearched, setHasSearched] = useState(false);
  const [price, setPrice] = useState(DEFAULT_PRICE);
  const [procedureInfo, setProcedureInfo] = useState(null);
  


  /* -------------------- SEARCH -------------------- */
  const handleSearch = (surgery, city) => {
  // reset filters
  setDistance(DEFAULT_DISTANCE);
  setPrice(DEFAULT_PRICE);

  const cityCenter = cityCoordinates[city];

  const block = mockSearchData.find(
    (b) =>
      b.results.some(h =>
        h.city === city &&
        h.treatments.some(t => t.name === surgery)
      )
  );

  const filteredResults = block
    ? block.results
        .filter(h =>
          h.treatments.some(t => t.name === surgery)
        )
        .map(h => ({
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



  /* -------------------- FINAL FILTERED RESULTS -------------------- */
  const filteredResults = results.filter((h) => {
  const treatment = h.treatments[0];

  // distance
  const distanceOk =
    distance === Infinity || h.distanceMiles <= distance;

  // price
  const minOk =
    price.min == null || treatment.minCost >= price.min;

  const maxOk =
    price.max == null || treatment.maxCost <= price.max;

  return distanceOk && minOk && maxOk;
});

  const prices = results.flatMap(h =>
  h.treatments.map(t => [t.minCost, t.maxCost])
).flat();

const minPrice = prices.length ? Math.min(...prices) : 0;
const maxPrice = prices.length ? Math.max(...prices) : 0;
const midpointPrice = prices.length
  ? Math.round((minPrice + maxPrice) / 2)
  : 0;


  /* -------------------- MAP LOCATIONS -------------------- */
  const mapLocations = filteredResults.map(h => ({
    id: h.hospitalId,
    lat: h.lat,
    lng: h.lng,
    label: `${h.hospitalName} • ${h.distanceMiles} mi`,
  }));

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* SEARCH BAR */}
      <div className="max-w-7xl mx-auto pt-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* FILTERS */}
      {hasSearched && (
        <div className="max-w-7xl mx-auto px-6 pb-8">
          <FiltersBar
            distance={distance}
            onDistanceApply={setDistance}
            price={price}
            onPriceApply={setPrice}
          />

        </div>
      )}

      {hasSearched && procedureInfo && (
        <div className="max-w-7xl mx-auto px-6 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT: DESCRIPTION */}
          <div className="lg:col-span-2">
            <ProcedureDescription
              title={procedureInfo.condition}
              description={procedureInfo.description}
            />
          </div>

          {/* RIGHT: PRICE INSIGHT */}
          <div className="lg:col-span-2">
            <PriceInsight
              min={minPrice}
              max={maxPrice}
              midpoint={midpointPrice}
              procedure={procedureInfo.condition}
            />
          </div>

        </div>
      )}



      {/* RESULTS + MAP */}
      {hasSearched && (
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* RESULTS (3/4) */}
          <div className="lg:col-span-2 space-y-4">
            {filteredResults.length === 0 ? (
              <p className="text-gray-500">
                No hospitals found within {distance} miles
              </p>
            ) : (
              filteredResults.map(h => (
                <HospitalCard key={h.hospitalId} hospital={h} />
              ))
            )}
          </div>

          {/* MAP (1/4) */}
          <div className="lg:col-span-1">
            <MapView locations={mapLocations} />
          </div>

        </div>
      )}
    </div>
  );
};

export default SearchPage;
