import { FaStar, FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";

const HospitalCard = ({ hospital }) => {
  const t = hospital.treatments[0];

  return (
    <div className="bg-white rounded-xl border p-5 hover:shadow-md transition">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {hospital.hospitalName}
          </h3>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <FaMapMarkerAlt className="text-teal-600" />
            {hospital.city}, {hospital.state}
          </p>
        </div>

        <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded">
          <FaStar className="text-green-600" />
          <span className="text-sm font-medium">{hospital.rating}</span>
        </div>
      </div>

      {/* Treatment */}
      <div className="mt-4">
        <p className="text-sm text-gray-500">Treatment</p>
        <p className="font-medium">{t.name}</p>
      </div>

      {/* Cost */}
      <div className="mt-3 flex items-center gap-2 text-teal-700 font-semibold">
        <FaRupeeSign />
        ₹{t.minCost.toLocaleString()} – ₹{t.maxCost.toLocaleString()}
      </div>

      {/* Tags */}
      <div className="mt-3 flex gap-2 text-xs">
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
          {hospital.type}
        </span>
        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
          Risk: {t.riskLevel}
        </span>
        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
          Affordability {hospital.affordabilityScore}/10
        </span>
      </div>

      {/* CTA */}
      <div className="mt-4 flex justify-between items-center">
        <button className="text-teal-600 font-medium hover:underline">
          View details
        </button>
        <button className="bg-teal-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-teal-700">
          Compare
        </button>
      </div>
    </div>
  );
};

export default HospitalCard;
