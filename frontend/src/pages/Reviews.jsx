import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Reviews.css";
import { summarizeTextHF } from "../utils/hfSummarizer";
import ReviewPieChart from "../components/ReviewPieChart";

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
    rating: 0,
    visit: "",
    recommend: "",
    pros: "",
    cons: "",
    advice: "",
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
    if (sort === "rating") return b.rating - a.rating;

    const dateA = a.createdAt?.seconds || 0;
    const dateB = b.createdAt?.seconds || 0;

    return dateB - dateA;
  });

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
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
        <section className="insight-hero">
          <div className="insight-card">

            {/* LEFT SIDE */}
            <div className="rating-section">
              <div className="rating-left">
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
            </div>

            {/* RIGHT SIDE — AI */}
            <div className="ai-section">
              {loadingSummary ? (
                <div className="summary-loading">
                  <div className="shimmer" />
                  <div className="shimmer short" />
                </div>
              ) : (
                <p className="summary-text">{reviewSummary}</p>
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

        <button
          className="primary-btn"
          onClick={() => setShowReviewForm(true)}
        >
          + Add Review
        </button>

        {/* REVIEW LIST */}
        <section className="review-list">
          {sortedReviews.map((r) => (
            <div key={r.id} className="review-card">
              <div className="avatar">{r.name?.charAt(0)}</div>

              <div className="review-content">
                <div className="review-header">
                  <h3>{r.name}</h3>
                  <span className="rating">⭐ {r.rating}</span>
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
        <div className="modal-overlay">
          <div className="review-modal">
            <h2>Share Your Experience</h2>
            <p className="subtitle">
              Your feedback helps other patients make confident decisions.
            </p>

            {/* RATING */}
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

            {/* VISIT */}
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
                <option>Emergency</option>
                <option>Follow-up</option>
                <option>Surgery</option>
                <option>Diagnostic Test</option>
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
                value={newReview.pros}
                onChange={(e) =>
                  setNewReview({ ...newReview, pros: e.target.value })
                }
              />
            </div>

            {/* CONS */}
            <div className="form-group">
              <label>What could be improved?</label>
              <textarea
                value={newReview.cons}
                onChange={(e) =>
                  setNewReview({ ...newReview, cons: e.target.value })
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
                onClick={async () => {
                  if (!newReview.rating || !newReview.pros) return;

                  await addDoc(collection(db, "reviews"), {
                    reviewKey,
                    condition,
                    hospitalId: hospital.hospitalId,
                    hospitalName: hospital.hospitalName,
                    name: loggedUser?.name || "User",
                    rating: newReview.rating,
                    visit: newReview.visit,
                    recommend: newReview.recommend === "Yes",
                    review: newReview.pros,
                    pros: newReview.pros,
                    cons: newReview.cons,
                    advice: newReview.advice,
                    helpful: 0,
                    verified: true,
                    createdAt: serverTimestamp(),
                  });

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
