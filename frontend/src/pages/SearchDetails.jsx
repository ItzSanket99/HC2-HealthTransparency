import { useLocation, useNavigate } from "react-router-dom";
import AlternativeCard from "../components/cards/AlternativeCard";
import { mockSearchData } from "../data/searchResults";

const SearchDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.hospital || !state?.treatment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500 mb-4">No hospital selected</p>
        <button
          onClick={() => navigate("/search")}
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          Go to Search
        </button>
      </div>
    );
  }

  const { hospital, treatment } = state;

// Find which CONDITION this hospital + treatment belongs to
const conditionData = mockSearchData.find(conditionItem =>
  conditionItem.results.some(h =>
    h.hospitalId === hospital.hospitalId &&
    h.treatments.some(t => t.name === treatment.name)
  )
);

// alternatives 
const alternatives = conditionData?.alternatives || [];
const conditionName = conditionData?.condition;



  return (
    <div className="bg-gray-50 min-h-screen pb-24">

      {/* Back */}
      <div className="max-w-5xl mx-auto px-4 py-4">
        <button
          onClick={() => navigate(-1)}
          className="text-teal-700 font-medium"
        >
          ← Back to Results
        </button>
      </div>

      {/* Insurance Banner */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-teal-700 text-white rounded-xl p-5 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">
              See how much you'll pay with insurance benefits
            </h3>
            <p className="text-sm opacity-90">
              Prices shown without personalized insurance applied.
            </p>
          </div>
          <button className="bg-teal-100 text-teal-800 px-4 py-2 rounded-lg font-medium">
            Add benefits
          </button>
        </div>
      </div>

      {/* Hospital + Treatment Card */}
      <div className="max-w-5xl mx-auto px-4 mt-6">
        <div className="bg-white rounded-xl border shadow-sm">

          {/* Header */}
          <div className="p-6 border-b">
            <h1 className="text-2xl font-semibold">
              {hospital.hospitalName}
            </h1>
            <p className="text-gray-600">
              {hospital.city}, {hospital.state}
            </p>

            <div className="flex gap-3 mt-4">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm">
                ⭐ {hospital.rating}
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">
                {hospital.type}
              </span>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm">
                Affordability {hospital.affordabilityScore}/10
              </span>
            </div>
          </div>

          {/* Treatment */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-2">
              {treatment.name}
            </h2>

            <div className="mt-3 bg-teal-50 text-teal-700 px-4 py-3 rounded-lg font-medium">
              ✔ Provider offers this treatment
            </div>
          </div>

          {/* Estimated Cost */}
          <div className="p-6 bg-teal-50 border-b">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">Estimated Cost</h3>
                <p className="text-sm text-gray-600">
                  Total price before insurance.
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-teal-800">
                  ₹{treatment.minCost.toLocaleString()} – ₹
                  {treatment.maxCost.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Partially validated</p>
              </div>
            </div>
          </div>

          {/* Calculator */}
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">
                  Calculate Your Out-of-Pocket Cost
                </h4>
                <p className="text-sm text-gray-600">
                  Add insurance to estimate.
                </p>
              </div>
              <button className="text-teal-700 font-medium">
                Show calculator
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="p-6">
            <button className="w-full bg-teal-700 text-white py-3 rounded-lg font-semibold">
              Contact Hospital to Verify
            </button>
          </div>
        </div>
      </div>

      {/* Alternative Treatments */}
      <div className="max-w-5xl mx-auto px-4 mt-8 mb-8">
        <AlternativeCard
          condition={conditionName}
          alternatives={alternatives}
        />
      </div>




      {/* Summary */}
      <div className="max-w-5xl mx-auto px-4 mt-10">
        <div className="bg-white rounded-xl border shadow-sm">

          <div className="p-6 border-b">
            <h3 className="text-xl font-semibold">Summary</h3>
          </div>

          <div className="p-6 space-y-5">
            <div>
              <h4 className="font-semibold">{treatment.name}</h4>
              <p className="text-sm text-gray-600 mt-1">
                A commonly performed procedure with a recovery period of
                approximately {treatment.recoveryTimeDays} days.
              </p>
              <button className="text-teal-700 text-sm mt-2">
                View more
              </button>
            </div>

            <div className="border rounded-lg p-4">
              <p className="font-medium">{hospital.hospitalName}</p>
              <p className="text-sm text-gray-600">
                {hospital.city}, {hospital.state}
              </p>
            </div>

            <div className="border rounded-lg p-4 flex justify-between">
              <div>
                <p className="font-medium">Primary Service Cost</p>
                <p className="text-sm text-gray-600">
                  Includes associated hospital fees.
                </p>
              </div>
              <div className="font-semibold">
                ₹{treatment.maxCost.toLocaleString()}
              </div>
            </div>

            {/* Fees */}
            <div className="border rounded-lg divide-y">
              <div className="p-4 flex justify-between">
                <span>Facility Fees</span>
                <span className="text-gray-500">Multiple fees ⌄</span>
              </div>
              <div className="p-4 flex justify-between">
                <span>Professional Fees</span>
                <span className="text-gray-500">Included ⌄</span>
              </div>
              <div className="p-4 flex justify-between">
                <span>Optional Fees</span>
                <span className="text-gray-500">May apply ⌄</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-5xl mx-auto px-4 mt-6 text-sm text-gray-600">
        <p className="font-semibold">Disclaimer</p>
        <p className="mt-1">
          Costs can vary based on patient condition, length of stay, and
          additional services. Always confirm pricing with the hospital.
        </p>
      </div>

    </div>
  );
};

export default SearchDetails;
