const HospitalCard = ({ hospital }) => {
  const t = hospital.treatments[0];

  return (
    <div className="bg-white rounded-xl border p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{hospital.hospitalName}</h3>
        <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
          ⭐ {hospital.rating}
        </span>
      </div>

      <p className="text-sm text-gray-500">
        {hospital.city}, {hospital.state} • {hospital.type}
      </p>

      <div className="mt-4">
        <h4 className="font-medium">{t.name}</h4>
        <p className="text-sm text-gray-600">
          Recovery: {t.recoveryTimeDays} days • Risk: {t.riskLevel}
        </p>
      </div>

      <div className="mt-4 text-teal-700 font-semibold text-lg">
        ₹{t.minCost.toLocaleString()} – ₹{t.maxCost.toLocaleString()}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-600">
          Affordability: {hospital.affordabilityScore}/10
        </span>
        <button className="text-teal-600 font-medium hover:underline">
          View details →
        </button>
      </div>
    </div>
  );
};

export default HospitalCard;
