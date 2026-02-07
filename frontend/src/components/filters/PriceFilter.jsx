import { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

const PriceFilter = ({ value, onApply }) => {
  const [open, setOpen] = useState(false);
  const [min, setMin] = useState(value?.min ?? "");
  const [max, setMax] = useState(value?.max ?? "");

  // sync with parent
  useEffect(() => {
    setMin(value?.min ?? "");
    setMax(value?.max ?? "");
  }, [value]);

  return (
    <div className="relative">
      {/* Pill */}
      <button
        onClick={() => setOpen(p => !p)}
        className="flex items-center gap-2 px-4 py-2 rounded-full
                   border-2 border-teal-900 text-teal-900 text-sm font-semibold"
      >
        Any Price
        <FiChevronDown className={open ? "rotate-180" : ""} />
      </button>

      {open && (
        <div className="absolute left-0 mt-3 w-80 bg-white border border-gray-300 rounded-xl shadow-lg z-30">
          <div className="px-4 py-3 border-b border-gray-300 font-semibold">
            Price Range (₹)
          </div>

          <div className="px-4 py-4 grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500">Minimum</label>
              <input
                type="number"
                placeholder="0"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="w-full border border-gray-300 shadow rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">Maximum</label>
              <input
                type="number"
                placeholder="No limit"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="w-full border border-gray-300  shadow rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="flex justify-between px-4 py-3 border-t border-gray-300 bg-slate-50">
            <button
              onClick={() => {
                onApply({ min: null, max: null });
                setOpen(false);
              }}
              className="text-teal-700 text-sm font-medium"
            >
              Reset
            </button>

            <button
              onClick={() => {
                onApply({
                  min: min ? Number(min) : null,
                  max: max ? Number(max) : null,
                });
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

export default PriceFilter;
