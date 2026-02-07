import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import  "../styles/Reviews.css";
import ReviewPieChart from "../components/ReviewPieChart";

const Reviews = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const hospital = state?.hospital;
  const user = JSON.parse(localStorage.getItem("user"));

  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [categoryRatings, setCategoryRatings] = useState({
    cost: 5,
    staff: 5,
    cleanliness: 5,
    waiting: 5,
  });

  const [reviews, setReviews] = useState(() => {
  const saved = localStorage.getItem(`reviews-${hospital?.hospitalName}`);
  return saved
    ? JSON.parse(saved)
    : [
        { name: "Rahul Patil", rating: 5, review: "Excellent service.", categories: { cost: 5, staff: 5, cleanliness: 5, waiting: 4 } },
        { name: "Anita Sharma", rating: 4, review: "Good but waiting time was long.", categories: { cost: 4, staff: 4, cleanliness: 5, waiting: 3 } },
        { name: "Suresh Kulkarni", rating: 3, review: "Average experience.", categories: { cost: 3, staff: 3, cleanliness: 4, waiting: 3 } },
        { name: "Meena Joshi", rating: 5, review: "Very professional doctors.", categories: { cost: 5, staff: 5, cleanliness: 5, waiting: 5 } },
        { name: "Amit Deshpande", rating: 2, review: "Too crowded.", categories: { cost: 2, staff: 3, cleanliness: 3, waiting: 1 } },
        { name: "Neha Patil", rating: 1, review: "Bad management.", categories: { cost: 1, staff: 2, cleanliness: 2, waiting: 1 } },
      ];
});

useEffect(() => {
  if (hospital) {
    localStorage.setItem(
      `reviews-${hospital.hospitalName}`,
      JSON.stringify(reviews)
    );
  }
}, [reviews, hospital]);



  if (!hospital) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-gray-500 mb-4">No hospital data found</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="text-teal-700 font-medium mb-4 hover:underline"
        >
          ← Back to hospital
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-semibold">
            {hospital.hospitalName}
          </h1>
          <p className="text-gray-600">
            {hospital.city}, {hospital.state}
          </p>

          <div className="mt-4 flex items-center gap-4">
            <div className="text-3xl font-bold text-green-700">
              ⭐ {avgRating.toFixed(1)}
            </div>
            <p className="text-gray-600">
              Based on {reviews.length} patient reviews
            </p>
          </div>
        </div>
        {/* Ratings Visualization */}



        {/* Rating Breakdown */}
       <div className="bg-white rounded-2xl border shadow-sm p-6 mb-6">
  <h2 className="text-lg font-semibold mb-4">Rating Breakdown</h2>

  {/* ADD THIS WRAPPER */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* LEFT SIDE – bars */}
    <div>
      {[5, 4, 3, 2, 1].map((star) => {
        const count = reviews.filter((r) => r.rating === star).length;
        const percent = Math.round((count / reviews.length) * 100) || 0;

        return (
          <div key={star} className="flex items-center gap-3 mb-2">
            <span className="w-10 text-sm">{star} ★</span>
            <div className="flex-1 bg-gray-200 h-2 rounded">
              <div
                className="bg-teal-600 h-2 rounded"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-sm text-gray-500">{percent}%</span>
          </div>
        );
      })}
    </div>

    {/* RIGHT SIDE – Pie Chart */}
    <div className="flex flex-col items-center">
      <ReviewPieChart reviews={reviews} />

    </div>

  </div>
</div>


        {/* Category Ratings Summary */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Category Ratings</h2>

          {[
            { key: "cost", label: "💰 Cost Transparency" },
            { key: "staff", label: "🧑‍⚕️ Staff Behaviour" },
            { key: "cleanliness", label: "🧼 Cleanliness" },
            { key: "waiting", label: "⏱️ Waiting Time" },
          ].map((item) => {
            const avg =
              reviews.reduce(
                (sum, r) => sum + (r.categories?.[item.key] || 0),
                0
              ) / reviews.length;

            return (
              <div
                key={item.key}
                className="border rounded-xl p-4 flex justify-between mb-2 hover:bg-gray-50"
              >
                <span className="text-gray-700">{item.label}</span>
                <span className="font-semibold">⭐ {avg.toFixed(1)}</span>
              </div>
            );
          })}
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Patient Reviews</h2>

            <button
              onClick={() => {
                if (!user) {
                  navigate("/signin", { state: { hospital } });
                } else {
                  setShowForm(true);
                }
              }}
              className="bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-800 transition"
            >
              Write a Review
            </button>
          </div>

          {reviews.map((review, index) => (
            <div
              key={index}
              className="border-b last:border-none pb-4 mb-4"
            >
              <div className="flex justify-between">
                <p className="font-medium">{review.name}</p>
                <p className="text-sm">⭐ {review.rating}</p>
              </div>
              <p className="text-gray-600 mt-1 text-sm">
                {review.review}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-fadeIn">

            <h3 className="text-lg font-semibold mb-4">Write a Review</h3>

            {/* Main Rating */}
            <div className="flex gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setNewRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className={`text-2xl cursor-pointer ${
                    star <= (hoverRating || newRating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Category Ratings Input */}
            <div className="space-y-3 mb-4">
              {[
                { key: "cost", label: "💰 Cost Transparency" },
                { key: "staff", label: "🧑‍⚕️ Staff Behaviour" },
                { key: "cleanliness", label: "🧼 Cleanliness" },
                { key: "waiting", label: "⏱️ Waiting Time" },
              ].map((item) => (
                <div key={item.key}>
                  <p className="text-sm font-medium mb-1">{item.label}</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() =>
                          setCategoryRatings((prev) => ({
                            ...prev,
                            [item.key]: star,
                          }))
                        }
                        className={`cursor-pointer text-lg ${
                          star <= categoryRatings[item.key]
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Review Text */}
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Share your experience..."
              className="w-full border rounded-lg p-3 text-sm mb-4 focus:ring-2 focus:ring-teal-500 outline-none"
              rows={4}
            />

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!newReview.trim() || newRating === 0) return;

                  setReviews((prev) => [
                    {
                      name: user?.name || "Anonymous",
                      rating: newRating,
                      review: newReview,
                      categories: { ...categoryRatings },
                    },
                    ...prev,
                  ]);

                  setNewReview("");
                  setNewRating(0);
                  setCategoryRatings({
                    cost: 5,
                    staff: 5,
                    cleanliness: 5,
                    waiting: 5,
                  });
                  setShowForm(false);
                }}
                className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
