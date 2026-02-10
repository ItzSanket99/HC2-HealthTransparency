import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Reviews.css";
import ReviewPieChart from "../components/ReviewPieChart";

const Reviews = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const hospital = state?.hospital;

  // logged-in user
  const loggedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [sort, setSort] = useState("recent");
  const [showReviewForm, setShowReviewForm] = useState(false);

  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Towhidur Rahman",
      rating: 5,
      date: "2024-10-24",
      visit: "First Visit",
      recommend: true,
      verified: true,
      review:
        "Doctors were extremely professional. Clean facilities and smooth coordination.",
      helpful: 18,
    },
    {
      id: 2,
      name: "Anita Sharma",
      rating: 4,
      date: "2024-09-11",
      visit: "Regular Patient",
      recommend: true,
      verified: false,
      review:
        "Good overall experience. Staff was polite, waiting time can be improved.",
      helpful: 7,
    },
    {
      id: 3,
      name: "Suresh Patil",
      rating: 3,
      date: "2024-08-02",
      visit: "First Visit",
      recommend: false,
      verified: true,
      review:
        "Average experience. Billing process took longer than expected.",
      helpful: 2,
    },
  ]);

  const [newReview, setNewReview] = useState({
    rating: 0,
    visit: "",
    recommend: "",
    pros: "",
    cons: "",
    advice: "",
  });

  if (!hospital) {
    return <div className="empty">No hospital selected</div>;
  }

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sort === "rating") return b.rating - a.rating;
    return new Date(b.date) - new Date(a.date);
  });

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="reviews-page">
      <div className="container">

        {/* HEADER */}
        <header className="page-header">
          <div>
            <h1 className="hospital-name">{hospital.hospitalName}</h1>
            <p className="hospital-location">
              {hospital.city}, {hospital.state}
            </p>
          </div>

          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </header>

        {/* KPI SECTION */}
        <section className="kpi-grid">

          {/* TOTAL REVIEWS */}
          <div className="kpi-card accent-teal">
            <p>Total Reviews</p>
            <h2>{reviews.length}</h2>
            <span className="positive">↑ 21% this year</span>

            <div className="mini-bar-wrapper">
              <div className="mini-bar-chart">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = reviews.filter(r => r.rating === star).length;
                  const max = Math.max(
                    ...[1, 2, 3, 4, 5].map(s =>
                      reviews.filter(r => r.rating === s).length
                    ),
                    1
                  );

                  const heightPercent = (count / max) * 100;

                  return (
                    <div key={star} className="bar-item">
                      <div className="bar-container">
                        <div
                          className={`bar star-${star}`}
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>
                      <span className="bar-label">{star}★</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* AVERAGE RATING */}
          <div className="kpi-card accent-blue">
            <p>Average Rating</p>
            <h2>
              {avgRating.toFixed(1)} <span>/ 5</span>
            </h2>

            <div className="stars">
              {[1, 2, 3, 4, 5].map(i => (
                <span
                  key={i}
                  className={i <= Math.round(avgRating) ? "filled" : ""}
                >
                  ★
                </span>
              ))}
            </div>

            <p className="subtext">
              Overall rating of {reviews.length} patient reviews
            </p>

            <div className="rating-distribution">
              {[5, 4, 3, 2, 1].map(star => {
                const count = reviews.filter(r => r.rating === star).length;
                const percent = (count / reviews.length) * 100 || 0;

                return (
                  <div key={star} className="rating-row">
                    <span>{star}★</span>
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* PIE CHART */}
          <div className="kpi-card accent-green chart-card">
            <ReviewPieChart reviews={reviews} />
          </div>
        </section>

        {/* CONTROLS */}
        <section className="controls">
          <h2>Patient Reviews</h2>

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="recent">Most Recent</option>
            <option value="rating">Highest Rated</option>
          </select>
        </section>

        <button className="primary-btn" onClick={() => setShowReviewForm(true)}>
          + Add Review
        </button>

        {/* REVIEWS */}
        <section className="review-list">
          {sortedReviews.map((r) => (
            <div key={r.id} className="review-card">
              <div className="avatar">{r.name.charAt(0)}</div>

              <div className="review-content">
                <div className="review-header">
                  <h3>{r.name}</h3>
                  <span className="rating">⭐ {r.rating}</span>
                </div>

                <div className="badges">
                  {r.verified && (
                    <span className="badge verified">Verified Patient</span>
                  )}
                  <span className="badge">{r.visit}</span>
                  {r.recommend && (
                    <span className="badge recommend">Recommended</span>
                  )}
                </div>

                <p className="review-text">{r.review}</p>

                <div className="review-footer">
                  <span>{new Date(r.date).toLocaleDateString()}</span>
                  <button
                    onClick={() =>
                      setReviews(prev =>
                        prev.map(x =>
                          x.id === r.id
                            ? { ...x, helpful: x.helpful + 1 }
                            : x
                        )
                      )
                    }
                  >
                    👍 Helpful ({r.helpful})
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* ADD REVIEW MODAL */}
  {showReviewForm && (
  <div className="modal-overlay">
    <div className="review-modal">

      <h2>Share Your Experience</h2>
      <p className="subtitle">
        Your feedback helps other patients make confident decisions.
      </p>

      {/* ⭐ OVERALL RATING */}
      <div className="form-group">
        <label>Overall Experience</label>
        <div className="stars">
          {[1,2,3,4,5].map(star => (
            <span
              key={star}
              className={star <= newReview.rating ? "filled" : ""}
              onClick={() =>
                setNewReview({ ...newReview, rating: star })
              }
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* VISIT TYPE */}
      <div className="form-group">
        <label>Visit Type</label>
        <select
          value={newReview.visit}
          onChange={(e) =>
            setNewReview({ ...newReview, visit: e.target.value })
          }
        >
          <option value="">Select visit type</option>
          <option>First Visit</option>
          <option>Regular Patient</option>
        </select>
      </div>

      {/* RECOMMEND */}
      <div className="form-group">
        <label>Would you recommend this hospital?</label>
        <select
          value={newReview.recommend}
          onChange={(e) =>
            setNewReview({ ...newReview, recommend: e.target.value })
          }
        >
          <option value="">Select</option>
          <option>Yes</option>
          <option>Maybe</option>
          <option>No</option>
        </select>
      </div>

      {/* PROS */}
      <div className="form-group">
        <label>What went well?</label>
        <textarea
          placeholder="Doctors, staff behaviour, cleanliness, treatment clarity..."
          value={newReview.pros}
          onChange={(e) =>
            setNewReview({ ...newReview, pros: e.target.value })
          }
        />
      </div>

      {/* CONS */}
      <div className="form-group">
        <label>What could be improved? (optional)</label>
        <textarea
          placeholder="Waiting time, billing, crowd management..."
          value={newReview.cons}
          onChange={(e) =>
            setNewReview({ ...newReview, cons: e.target.value })
          }
        />
      </div>

      {/* ADVICE */}
      <div className="form-group">
        <label>Advice for future patients (optional)</label>
        <textarea
          placeholder="Book early, carry reports, ask questions..."
          value={newReview.advice}
          onChange={(e) =>
            setNewReview({ ...newReview, advice: e.target.value })
          }
        />
      </div>

      {/* ACTIONS */}
      <div className="modal-actions">
        <button
          className="ghost"
          onClick={() => setShowReviewForm(false)}
        >
          Cancel
        </button>

        <button
          className="primary"
          onClick={() => {
            if (!newReview.rating || !newReview.pros) return;

            setReviews(prev => [
              {
                id: Date.now(),
                name:
                  loggedUser?.name ||
                  loggedUser?.username ||
                  "User",
                rating: newReview.rating,
                date: new Date().toISOString(),
                visit: newReview.visit || "First Visit",
                recommend: newReview.recommend === "Yes",
                verified: true,
                review: newReview.pros,
                helpful: 0,
              },
              ...prev,
            ]);

            setShowReviewForm(false);
            setNewReview({
              rating: 0,
              visit: "",
              recommend: "",
              pros: "",
              cons: "",
              advice: "",
            });
          }}
        >
          Submit Review
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Reviews;
