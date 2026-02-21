import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Reviews.css";
import { summarizeTextHF } from "../utils/hfSummarizer";
import ReviewPieChart from "../components/ReviewPieChart";
import aiChip from "../assets/ai-icon.png";

import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  doc,
  increment,
} from "firebase/firestore";

const Reviews = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // const hospital = state?.hospital;
  // const condition = state?.condition;

  const loggedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [reviews, setReviews] = useState([]);
  const [sort, setSort] = useState("recent");
  const [showReviewForm, setShowReviewForm] = useState(false);

  const [reviewSummary, setReviewSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

const [newReview, setNewReview] = useState({
  overallRating: 0,
  doctorRating: 0,
  cleanlinessRating: 0,
  waitingRating: 0,
  costRating: 0,
  visit: "",
  visitDate: "",
  treatmentType: "",
  recommend: "",
  review: "",
  anonymous: false,
});

  const hospital = state?.hospital || JSON.parse(localStorage.getItem("selectedHospital"));
const condition = state?.condition || "General";

if (!hospital) {
  return <div className="empty">No hospital selected</div>;
}

  /* =========================
     UNIQUE REVIEW KEY
  ========================== */
  const reviewKey = `${condition}_${hospital.hospitalId}`;

  /* =========================
     FETCH REVIEWS (REALTIME)
  ========================== */
  useEffect(() => {
    const q = query(
      collection(db, "reviews"),
      where("reviewKey", "==", reviewKey)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReviews(fetched);
    });

    return () => unsubscribe();
  }, [reviewKey]);

  /* =========================
     SORTING
  ========================== */
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sort === "rating")
  return (b.overallRating || 0) - (a.overallRating || 0);

    const dateA = a.createdAt?.seconds || 0;
    const dateB = b.createdAt?.seconds || 0;

    return dateB - dateA;
  });

 const avgRating =
  reviews.length > 0
    ? reviews.reduce((sum, r) => sum + (r.overallRating || 0), 0) /
      reviews.length
    : 0;

  /* =========================
     AI SUMMARY
  ========================== */
  useEffect(() => {
    const generateReviewSummary = async () => {
      if (!reviews.length) {
        setReviewSummary("");
        return;
      }

      setLoadingSummary(true);

      const combinedText = reviews
        .map((r) => r.review)
        .filter((text) => text && text.trim().length > 20)
        .join(" ")
        .slice(0, 2000);

      try {
        const summary = await summarizeTextHF(
          combinedText,
          "English",
          "review-summary"
        );
        setReviewSummary(summary);
      } catch (err) {
        setReviewSummary("Unable to generate summary.");
      }

      setLoadingSummary(false);
    };

    generateReviewSummary();
  }, [reviews]);

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
            <p><strong>Condition:</strong> {condition}</p>
          </div>

          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </header>


{/* INSIGHT HERO */}

{/* INSIGHT HERO */}
<section className="insight-hero">
  <div className="insight-card">

    {/* LEFT — RATING */}
    <div className="rating-section">
      <div className="rating-score">
        <span className="rating-number">
          {avgRating.toFixed(1)}
        </span>
        <span className="rating-outof">/ 5</span>
      </div>

      <div className="stars">
        {[1,2,3,4,5].map(i => (
          <span
            key={i}
            className={i <= Math.round(avgRating) ? "filled" : ""}
          >
            ★
          </span>
        ))}
      </div>

      <div className="review-count">
        {reviews.length} verified patient reviews
      </div>
    </div>

    {/* RIGHT — AI CARD */}
    <div className="ai-card">

      <div className="ai-card-header">
        <div className="ai-logo-wrapper">
          <img src={aiChip} alt="AI Logo" className="ai-logo" />
        </div>

        <div>
          <h4>AI Review Summary</h4>
          <span>Auto-generated insights from patient feedback</span>
        </div>
      </div>

      {loadingSummary ? (
        <div className="summary-loading">
          <div className="shimmer" />
          <div className="shimmer short" />
        </div>
      ) : (
        <p className="summary-text">
          {reviewSummary || "No summary available yet."}
        </p>
      )}

    </div>

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
<div className="add-review-section">
  <button
    className="add-review-btn"
    onClick={() => setShowReviewForm(!showReviewForm)}
  >
    {showReviewForm ? "✖ Cancel Review" : "＋ Write a Review"}
  </button>
</div>

        {/* REVIEW LIST */}
        <section className="review-list">
          {sortedReviews.map((r) => (
            <div key={r.id} className="review-card">
              <div className="avatar">{r.name?.charAt(0)}</div>

              <div className="review-content">
                <div className="review-header">
                  <h3>{r.name}</h3>
                  <span className="rating">⭐ {r.overallRating}</span>
                </div>

                <div className="badges">
                  {r.verified && (
                    <span className="badge verified">Verified Patient</span>
                  )}
                  {r.visit && (
                    <span className="badge">{r.visit}</span>
                  )}
                  {r.recommend && (
                    <span className="badge recommend">Recommended</span>
                  )}
                </div>

                <p className="review-text">{r.review}</p>

                <div className="review-footer">
                  <span>
                    {r.createdAt?.seconds
                      ? new Date(
                          r.createdAt.seconds * 1000
                        ).toLocaleDateString()
                      : ""}
                  </span>

                  <button
                    onClick={async () => {
                      const reviewRef = doc(db, "reviews", r.id);
                      await updateDoc(reviewRef, {
                        helpful: increment(1),
                      });
                    }}
                  >
                    👍 Helpful ({r.helpful || 0})
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* ADD REVIEW MODAL */}
{showReviewForm && (
  <div
    className="review-modal-overlay"
    onClick={() => setShowReviewForm(false)}
  >
    <div
      className="review-modal professional"
      onClick={(e) => e.stopPropagation()}
    >
      <h2>Share Your Experience</h2>
      <p className="subtitle">
        Your feedback helps other patients make informed decisions.
      </p>

      {/* ⭐ OVERALL RATING */}
      <div className="form-group">
        <label>Overall Rating *</label>
        <div className="stars interactive">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={
                star <= newReview.overallRating ? "filled" : ""
              }
              onClick={() =>
                setNewReview({ ...newReview, overallRating: star })
              }
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* ⭐ CATEGORY RATINGS */}
      <div className="rating-grid">

        {[
          { label: "Doctor Care", key: "doctorRating" },
          { label: "Cleanliness", key: "cleanlinessRating" },
          { label: "Waiting Time", key: "waitingRating" },
          { label: "Cost Transparency", key: "costRating" },
        ].map((item) => (
          <div key={item.key} className="form-group">
            <label>{item.label}</label>
            <div className="stars interactive small">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={
                    star <= newReview[item.key] ? "filled" : ""
                  }
                  onClick={() =>
                    setNewReview({
                      ...newReview,
                      [item.key]: star,
                    })
                  }
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        ))}

      </div>

      {/* 📅 VISIT DATE */}
      <div className="form-group">
        <label>Visit Date</label>
        <input
          type="date"
          value={newReview.visitDate}
          onChange={(e) =>
            setNewReview({
              ...newReview,
              visitDate: e.target.value,
            })
          }
        />
      </div>

      {/* 🏥 TREATMENT TYPE */}
      <div className="form-group">
        <label>Treatment Type</label>
        <input
          type="text"
          placeholder="e.g. Knee Surgery, Consultation"
          value={newReview.treatmentType}
          onChange={(e) =>
            setNewReview({
              ...newReview,
              treatmentType: e.target.value,
            })
          }
        />
      </div>

      {/* 👍 RECOMMEND */}
      <div className="form-group">
        <label>Would you recommend this hospital?</label>
        <div className="recommend-toggle">
          <button
            className={
              newReview.recommend === "Yes" ? "active" : ""
            }
            onClick={() =>
              setNewReview({ ...newReview, recommend: "Yes" })
            }
          >
            👍 Yes
          </button>
          <button
            className={
              newReview.recommend === "No" ? "active" : ""
            }
            onClick={() =>
              setNewReview({ ...newReview, recommend: "No" })
            }
          >
            👎 No
          </button>
        </div>
      </div>

      {/* 📝 REVIEW TEXT */}
      <div className="form-group">
        <label>Your Detailed Review *</label>
        <textarea
          rows="5"
          placeholder="Tell us about your experience..."
          value={newReview.review}
          onChange={(e) =>
            setNewReview({
              ...newReview,
              review: e.target.value,
            })
          }
        />
      </div>

      {/* 🔒 ANONYMOUS */}
      <div className="form-group checkbox">
        <input
          type="checkbox"
          checked={newReview.anonymous}
          onChange={(e) =>
            setNewReview({
              ...newReview,
              anonymous: e.target.checked,
            })
          }
        />
        <label>Submit as Anonymous</label>
      </div>

      {/* ACTIONS */}
      <div className="form-actions">
        <button
          className="secondary-btn"
          onClick={() => setShowReviewForm(false)}
        >
          Cancel
        </button>

        <button
          className="primary-btn"
          onClick={async () => {
            if (
              !newReview.overallRating ||
              !newReview.review
            )
              return;

            await addDoc(collection(db, "reviews"), {
              reviewKey,
              condition,
              hospitalId: hospital.hospitalId,
              hospitalName: hospital.hospitalName,
              name: newReview.anonymous
                ? "Anonymous"
                : loggedUser?.name || "User",
              ...newReview,
              helpful: 0,
              verified: true,
              createdAt: serverTimestamp(),
            });

            setShowReviewForm(false);

            setNewReview({
              overallRating: 0,
              doctorRating: 0,
              cleanlinessRating: 0,
              waitingRating: 0,
              costRating: 0,
              visit: "",
              visitDate: "",
              treatmentType: "",
              recommend: "",
              review: "",
              anonymous: false,
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
