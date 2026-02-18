import { useLocation, useNavigate } from "react-router-dom";
import DoctorsPanel from "../components/shared/DoctorsPanel";
import { mockSearchData } from "../data/searchResults";
import OutOfPocketPanel from "../components/shared/OutOfPocketPanel";
import FacilitiesPanel from "../components/shared/FacilitiesPanel";
import { hospitalReviews } from "../data/reviewData";

const SearchDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.hospital) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6f8f8]">
        <p className="text-[#5c7478] mb-4">No hospital selected</p>
        <button
          onClick={() => navigate("/search")}
          className="bg-[#1f6f6b] text-white px-5 py-2 rounded-full hover:brightness-95 transition"
        >
          Go to Search
        </button>
      </div>
    );
  }

  const { hospital, treatment } = state;

  /* FIND CONDITION */
  const conditionData = mockSearchData.find((conditionItem) =>
    conditionItem.results.some(
      (h) =>
        h.hospitalId === hospital.hospitalId &&
        h.treatments.some((t) => t.name === treatment.name)
    )
  );

  const conditionName = conditionData?.condition;

  if (!conditionName) {
    console.error("Condition not found for hospital");
  }

  const avgRating =
    hospitalReviews.reduce((s, r) => s + r.rating, 0) /
    hospitalReviews.length;

  const ratingCounts = [5, 4, 3, 2, 1].map(
    (star) => hospitalReviews.filter((r) => r.rating === star).length
  );

  return (
    <div className="bg-white min-h-screen pt-6 pb-14">

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="text-[#1f6f6b] font-medium mb-6 hover:underline"
      >
        ← Back to results
      </button>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-[1.65fr_0.9fr] gap-8 items-start">

        {/* LEFT COLUMN */}
        <div className="space-y-6">

          {/* HOSPITAL INFO */}
          <div className="bg-white border border-[#e2e8ea] rounded-2xl p-7">
            <h1 className="text-[30px] leading-tight font-semibold text-[#0f2f33]">
              {hospital.hospitalName}
            </h1>

            <p className="text-[#5f7a7f] mt-1">
              {hospital.city}, {hospital.state}
            </p>

            <div className="flex flex-wrap gap-3 mt-5">

              <span
                onClick={() =>
                  navigate("/reviews", {
                    state: {
                      hospital,
                      condition: conditionName,
                    },
                  })
                }
                className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm cursor-pointer hover:bg-green-200 transition"
              >
                ⭐ {hospital.rating}
              </span>

              <span className="bg-[#eef3ff] text-[#3554d1] px-3.5 py-1.5 rounded-full text-sm">
                {hospital.type}
              </span>

              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm">
                Affordability {hospital.affordabilityScore}/10
              </span>
            </div>
          </div>

          {/* DOCTORS */}
          <DoctorsPanel doctors={hospital.doctors} />

          {/* COST PANEL */}
          <OutOfPocketPanel hospital={hospital} treatment={treatment} />
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="relative">
          <div className="sticky top-28 space-y-6">

            {/* FACILITIES */}
            <div className="bg-white border border-[#e2e8ea] rounded-2xl p-6">
              <FacilitiesPanel facilities={hospital.facilities} />

              <button
                onClick={() =>
                  navigate("/book", { state: { hospital, treatment } })
                }
                className="w-full bg-[#1f6f6b] text-white py-3 rounded-full font-medium hover:brightness-95 transition mt-5"
              >
                Book Appointment
              </button>
            </div>

            {/* REVIEW CARD */}
            <div className="bg-white border border-[#e2e8ea] rounded-2xl p-6">

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-[#0f2f33] text-lg">
                    Patient Experience
                  </h3>
                  <p className="text-xs text-[#6b8a8f]">
                    Based on verified patient feedback
                  </p>
                </div>

                <button
                  onClick={() =>
                    navigate("/reviews", {
                      state: { hospital, condition: conditionName },
                    })
                  }
                  className="text-sm text-[#1f6f6b] font-medium hover:underline"
                >
                  View all →
                </button>
              </div>

              {/* AVG */}
              <div className="flex items-end gap-3 mt-4">
                <div className="text-3xl font-semibold text-[#0f2f33]">
                  {avgRating.toFixed(1)}
                </div>
                <div className="text-[#1f6f6b] text-lg">★★★★★</div>
                <div className="text-sm text-[#5f7a7f]">
                  {hospitalReviews.length} reviews
                </div>
              </div>

              {/* DISTRIBUTION */}
              <div className="mt-4 space-y-2">
                {[5, 4, 3, 2, 1].map((star, i) => {
                  const percent =
                    (ratingCounts[i] / hospitalReviews.length) * 100 || 0;

                  return (
                    <div key={star} className="flex items-center gap-2 text-xs">
                      <span className="w-3">{star}</span>
                      <div className="flex-1 h-2 bg-[#edf3f4] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#1f6f6b]"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* PREVIEW */}
              <div className="mt-5 pt-4 border-t border-[#eef3f4]">
                <p className="text-sm text-[#5f7a7f] italic">
                  “{hospitalReviews[0]?.review}”
                </p>
              </div>
            </div>

            {/* TRUST CARD */}
            <div className="bg-white border border-[#e2e8ea] rounded-2xl p-6">
              <h3 className="font-semibold text-[#0f2f33] text-lg mb-3">
                Why Choose This Hospital?
              </h3>

              <ul className="space-y-2 text-sm text-[#5f7a7f]">
                <li>✔ NABH Accredited</li>
                <li>✔ Experienced Surgeons</li>
                <li>✔ Modern Equipment</li>
                <li>✔ High Success Rate</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDetails;