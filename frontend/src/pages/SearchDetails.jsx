import { useLocation, useNavigate } from "react-router-dom";
import DoctorsPanel from "../components/shared/DoctorsPanel";
import { mockSearchData } from "../data/searchResults";
import OutOfPocketPanel from "../components/shared/OutOfPocketPanel";
import FacilitiesPanel from "../components/shared/FacilitiesPanel";
import "../styles/SearchDetails.css";

const SearchDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.hospital) {
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

  let { hospital, treatment } = state;

  // ✅ Pull latest rating calculated from Reviews page
  const storedHospital = sessionStorage.getItem(
    `hospital_${hospital.hospitalId}`
  );

  if (storedHospital) {
    hospital = JSON.parse(storedHospital);
  }

  const conditionData = mockSearchData.find((conditionItem) =>
    conditionItem.results.some(
      (h) =>
        h.hospitalId === hospital.hospitalId &&
        h.treatments.some((t) => t.name === treatment.name)
    )
  );

  const alternatives = conditionData?.alternatives || [];
  const conditionName = conditionData?.condition;
const getScoreTheme = (rating) => {
  if (rating >= 4.5) return "excellent";
  if (rating >= 3.5) return "good";
  if (rating >= 2.5) return "average";
  return "poor";
};

const scoreTheme = getScoreTheme(hospital.rating || 0);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* BACK */}
      <div className="px-8 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="text-teal-700 font-medium"
        >
          ← Back to results
        </button>
      </div>

      {/* MAIN LAYOUT */}
      <div className="px-8 mt-6 grid grid-cols-2 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* HOSPITAL INFO */}
          <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm">
            <h1 className="text-2xl font-semibold">
              {hospital.hospitalName}
            </h1>

            <p className="text-gray-600 mt-1">
              {hospital.city}, {hospital.state}
            </p>

            {/* ⭐ TRUST SCORE — PRIMARY SIGNAL */}
            <div className="mt-5">
              <div
                onClick={() => navigate("/reviews", { state: { hospital } })}
                className={`trust-card ${scoreTheme} cursor-pointer`}

              >
                <div className="trust-left">
                  <div className="trust-ring">
                    <svg viewBox="0 0 36 36" className="circular-chart">
                      <path
                        className="circle-bg"
                        d="M18 2.0845
                           a 15.9155 15.9155 0 0 1 0 31.831
                           a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="circle"
                        strokeDasharray={`${
                          (hospital.rating / 5) * 100
                        }, 100`}
                        d="M18 2.0845
                           a 15.9155 15.9155 0 0 1 0 31.831
                           a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <text x="18" y="20.35" className="percentage">
                        {hospital.rating}
                      </text>
                    </svg>
                  </div>

                  <div>
                    <h3 className="trust-title">Patient Trust Score</h3>
                    <p className="trust-sub">
                      Based on {hospital.reviewCount || 0} verified experiences
                    </p>
                  </div>
                </div>

                <div className="trust-right">
                  View Reviews →
                </div>
              </div>
            </div>

            {/* 🏷️ METADATA (Not Equal To Trust Score) */}
            <div className="flex gap-3 mt-5">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">
                {hospital.type}
              </span>

              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm">
                Affordability {hospital.affordabilityScore}/10
              </span>
            </div>
          </div>

          {/* DOCTORS PANEL */}
          <DoctorsPanel doctors={hospital.doctors} />

          {/* OUT OF POCKET */}
          <OutOfPocketPanel hospital={hospital} treatment={treatment} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <FacilitiesPanel facilities={hospital.facilities} />

          <button
            onClick={() =>
              navigate("/book", {
                state: { hospital, treatment },
              })
            }
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchDetails;
