import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");

  return (
    <div className="bg-white shadow-md p-6 rounded-xl flex gap-4">
      <input
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
        placeholder="Condition (e.g. Knee Pain)"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
      />
      <input
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        onClick={() => onSearch(condition, city)}
        className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
