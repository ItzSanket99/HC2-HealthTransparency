import { FaStar, FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HospitalCard = ({ hospital, isSelected, toggleSelect }) => {
  const navigate = useNavigate();
  const t = hospital.treatments[0];

  const handleViewDetails = () => {
    navigate("/search-details", {
      state: {
        hospital,
        treatment: t,
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E3ECEC] p-6 hover:border-[#CFE0E0] transition">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-[18px] font-medium text-[#083A3D]">
            {hospital.hospitalName}
          </h3>
          <p className="text-[14px] text-[#5F7D7E] flex items-center gap-2 mt-1">
            <FaMapMarkerAlt className="text-[#176F6F]" />
            {hospital.city}, {hospital.state}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Rating */}
          <div className="flex items-center gap-1 text-[#176F6F] text-[14px] font-medium">
            <FaStar className="text-[#176F6F]" />
           <span>
  {hospital.rating > 0
    ? hospital.rating.toFixed(1)
    : "New"}
</span>
          </div>

          {/* Select Checkbox */}
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleSelect(hospital)}
            className="w-4 h-4 accent-[#176F6F]"
          />
        </div>
      </div>

      {/* Treatment */}
      <div className="mt-4">
        <p className="text-[13px] text-[#7A9A9B]">Treatment</p>
        <p className="font-medium text-[#083A3D]">{t.name}</p>
      </div>

      {/* Cost */}
      <div className="mt-4 flex items-center gap-2 text-[#083A3D] font-semibold text-[18px]">
        <FaRupeeSign className="text-[#176F6F]" />
        ₹{t.minCost.toLocaleString()} – ₹{t.maxCost.toLocaleString()}
      </div>

      {/* Tags */}
      <div className="mt-4 flex gap-2 text-[12px] text-[#5F7D7E] flex-wrap">
        <span className="px-2 py-1 border border-[#E3ECEC] rounded-full">
          {hospital.type}
        </span>
        <span className="px-2 py-1 border border-[#E3ECEC] rounded-full">
          Risk: {t.riskLevel}
        </span>
        <span className="px-2 py-1 border border-[#E3ECEC] rounded-full">
          Affordability {hospital.affordabilityScore}/10
        </span>
      </div>

      {/* CTA */}
      <div className="mt-5">
        <button
          onClick={handleViewDetails}
          className="text-[#176F6F] font-medium hover:underline"
        >
          View details
        </button>
      </div>
    </div>
  );
};

export default HospitalCard;