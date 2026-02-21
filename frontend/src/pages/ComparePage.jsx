import { useLocation, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const ComparePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const hospitals = state?.hospitals || [];

  if (!hospitals.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-4">
          No hospitals selected for comparison
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-[#176F6F] text-white px-6 py-2 rounded-full"
        >
          Go Back
        </button>
      </div>
    );
  }

  /* ----------------- Find Best Rating ----------------- */
  const bestRating = Math.max(
    ...hospitals.map((h) => h.rating || 0)
  );

  /* ----------------- Find Lowest Price ----------------- */
  const lowestPrice = Math.min(
    ...hospitals.map((h) => h.treatments[0].minCost)
  );

  return (
    <div className="min-h-screen bg-[var(--bg)] px-8 py-10">
      <h1 className="text-4xl font-semibold mb-10 text-[#083A3D]">
        Hospital Comparison
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {hospitals.map((h) => {
          const isBestRating = h.rating === bestRating;
          const isLowestPrice =
            h.treatments[0].minCost === lowestPrice;

          return (
            <div
              key={h.hospitalId}
              className={`bg-white p-6 rounded-2xl border transition shadow-sm hover:shadow-lg ${
                isBestRating
                  ? "border-[#176F6F]"
                  : "border-[#E3ECEC]"
              }`}
            >
              {/* Hospital Name */}
              <h3 className="text-lg font-semibold text-[#083A3D] mb-2">
                {h.hospitalName}
              </h3>

              {/* Badges */}
              <div className="flex gap-2 mb-4 flex-wrap">
                {isBestRating && (
                  <span className="bg-[#176F6F] text-white text-xs px-3 py-1 rounded-full">
                    ⭐ Top Rated
                  </span>
                )}

                {isLowestPrice && (
                  <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                    💰 Best Price
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="mb-4">
                <p className="text-sm text-gray-500">Rating</p>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <span className="font-medium">
                    {h.rating
                      ? h.rating.toFixed(1)
                      : "New"}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-4">
                <p className="text-sm text-gray-500">Price Range</p>
                <p className="font-medium">
                  ₹{h.treatments[0].minCost.toLocaleString()} –
                  ₹{h.treatments[0].maxCost.toLocaleString()}
                </p>
              </div>

              {/* Distance */}
              <div className="mb-4">
                <p className="text-sm text-gray-500">Distance</p>
                <p>{h.distanceMiles} mi</p>
              </div>

              {/* Risk */}
              <div className="mb-4">
                <p className="text-sm text-gray-500">Risk Level</p>
                <p>{h.treatments[0].riskLevel}</p>
              </div>

              {/* Affordability */}
              <div className="mb-6">
                <p className="text-sm text-gray-500">
                  Affordability
                </p>
                <p>{h.affordabilityScore}/10</p>
              </div>

              {/* CTA */}
              <button
                onClick={() =>
                  navigate("/search-details", {
                    state: { hospital: h },
                  })
                }
                className="w-full bg-[#176F6F] text-white py-2 rounded-full hover:bg-[#0E5658] transition"
              >
                View Details
              </button>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default ComparePage;