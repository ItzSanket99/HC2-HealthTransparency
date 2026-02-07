import { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

const DISTANCE_OPTIONS = [5, 10, 25, 50];

const DistanceFilter = ({ value = Infinity, onApply }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value);

  // sync with parent
  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <div className="relative">
      {/* Pill Button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="flex items-center gap-2 px-4 py-2 rounded-full
                   border-2 border-teal-800 text-teal-800 text-sm font-semibold"
      >
        {selected === Infinity
          ? "All distances"
          : `Within ${selected} miles`}
        <FiChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 mt-3 w-72 bg-white border border-gray-300 rounded-xl shadow-lg z-30">
          <div className="px-4 py-3 border-b border-gray-300 font-semibold">
            Distance
          </div>

          <div className="px-4 py-3 space-y-3">
            {DISTANCE_OPTIONS.map((miles) => (
              <label
                key={miles}
                className="flex items-center gap-3 cursor-pointer text-sm"
              >
                <input
                  type="radio"
                  name="distance"
                  checked={selected === miles}
                  onChange={() => setSelected(miles)}
                  className="accent-teal-700"
                />
                Within {miles} miles
              </label>
            ))}
          </div>

          <div className="flex justify-between px-4 py-3 border-t border-gray-300  bg-slate-100">
            <button
              onClick={() => {
                onApply(Infinity); // show all hospitals
                setOpen(false);
              }}
              className="text-teal-700 text-sm font-medium"
            >
              Reset
            </button>

            <button
              onClick={() => {
                onApply(selected);
                setOpen(false);
              }}
              className="bg-teal-700 text-white px-4 py-2 rounded-full text-sm"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DistanceFilter;
