import DistanceFilter from "./DistanceFilter";
import { FiFilter } from "react-icons/fi";
import PriceFilter from "./PriceFilter";

const FiltersBar = ({ distance, onDistanceApply,price,
  onPriceApply, }) => {
  return (
    <div className="flex items-center gap-3 mt-4 flex-wrap">
      <button className="w-10 h-10 flex items-center justify-center rounded-full text-xl border-2   border-teal-800 text-teal-800">
        <FiFilter />
      </button>

      <DistanceFilter
        value={distance}
        onApply={onDistanceApply}
      />

      <PriceFilter
        value={price}
        onApply={onPriceApply}
      />

      
    </div>
    
  );
};

export default FiltersBar;
