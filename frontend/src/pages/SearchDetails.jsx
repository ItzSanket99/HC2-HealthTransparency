import { useLocation, useNavigate } from "react-router-dom";
import DoctorsPanel from "../components/shared/DoctorsPanel";
import { mockSearchData } from "../data/searchResults";
import OutOfPocketPanel from "../components/shared/OutOfPocketPanel";
import FacilitiesPanel from "../components/shared/FacilitiesPanel";

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
  
  const { hospital, treatment } = state;
  const conditionData = mockSearchData.find(conditionItem =>
    conditionItem.results.some(h =>
      h.hospitalId === hospital.hospitalId &&
      h.treatments.some(t => t.name === treatment.name)
    )
  );
  
  const alternatives = conditionData?.alternatives || [];
  const conditionName = conditionData?.condition;
  
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
            <div className="flex flex-wrap gap-3 mt-4">
              <span 
  onClick={() => navigate("/reviews", { state: { hospital } })}
  className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm cursor-pointer hover:bg-green-200 transition"
>
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

          {/* DOCTORS PANEL */}
          <DoctorsPanel doctors={hospital.doctors} />
          
          {/* OUT OF POCKET */}
          <OutOfPocketPanel
            hospital={hospital}
            treatment={treatment}
          />
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <FacilitiesPanel facilities={hospital.facilities} />
          
          {/* ✅ FIXED: Remove conflicting CSS, stay in grid */}
        <button
          onClick={() =>
            navigate("/book", {
              state: {
                hospital,
                treatment, // PASS FULL TREATMENT OBJECT
              },
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
