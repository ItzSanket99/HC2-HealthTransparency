import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Reviews.css";
import { summarizeTextHF } from "../utils/hfSummarizer";
import ReviewPieChart from "../components/ReviewPieChart";

const Reviews = () => {
  const [reviewSummary, setReviewSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

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
      review: "Average experience. Billing process took longer than expected.",
      helpful: 2,
    },
    {
      id: 4,
      name: "Anita Kulkarni",
      rating: 5,
      date: "2024-08-05",
      visit: "Follow-up",
      recommend: true,
      verified: true,
      review:
        "I had a very positive experience at Jehangir Hospital. The doctors explained my condition in detail and answered all my questions patiently. The nursing staff was attentive and regularly checked on me during my stay. The hospital premises were clean and well maintained. Overall, I felt safe and well cared for throughout my treatment.",
      helpful: 4,
    },
    {
      id: 5,
      name: "Rahul Deshmukh",
      rating: 4,
      date: "2024-08-10",
      visit: "Emergency",
      recommend: true,
      verified: true,
      review:
        "I visited the emergency department late at night and was impressed by how quickly the staff responded. The initial assessment was done within minutes, and the doctor was professional and calm. However, the waiting time for diagnostic reports was slightly longer than expected. The billing desk was helpful but the process could be more streamlined. Overall, the medical care was satisfactory.",
      helpful: 3,
    },
    {
      id: 6,
      name: "Meena Joshi",
      rating: 4,
      date: "2024-08-14",
      visit: "First Visit",
      recommend: true,
      verified: true,
      review:
        "The hospital infrastructure is modern and clean. The receptionist guided me properly during registration and appointment booking. The doctor listened carefully and provided clear treatment instructions. Pharmacy services were convenient, although the queue was a bit long during peak hours. I would recommend this hospital for general consultations.",
      helpful: 5,
    },
    {
      id: 7,
      name: "Vikram Shah",
      rating: 2,
      date: "2024-08-18",
      visit: "Follow-up",
      recommend: false,
      verified: true,
      review:
        "My experience was mixed. The doctor was knowledgeable, but the waiting time exceeded one hour despite having a prior appointment. Communication at the billing counter was not very clear, and I had to ask multiple times for clarification on charges. The facilities were clean but overall coordination felt slow. I hope the management improves operational efficiency.",
      helpful: 2,
    },
    {
      id: 8,
      name: "Priya Nair",
      rating: 5,
      date: "2024-08-22",
      visit: "Surgery",
      recommend: true,
      verified: true,
      review:
        "I underwent a minor surgical procedure here and the entire process was handled professionally. The surgeon explained the risks and recovery steps clearly beforehand. The nursing team was compassionate and ensured I was comfortable during post-operative care. Cleanliness standards were excellent in both the ward and operation theater. I am satisfied with the overall experience.",
      helpful: 6,
    },
    {
      id: 9,
      name: "Amit Chavan",
      rating: 3,
      date: "2024-08-26",
      visit: "Diagnostic Test",
      recommend: false,
      verified: true,
      review:
        "The diagnostic services were accurate and the equipment appeared modern. However, I experienced delays in receiving my test reports. The waiting area was slightly crowded and seating was limited. Staff members were polite but seemed overwhelmed. The hospital should improve report turnaround time.",
      helpful: 1,
    },
    {
      id: 10,
      name: "Sneha More",
      rating: 4,
      date: "2024-08-30",
      visit: "First Visit",
      recommend: true,
      verified: true,
      review:
        "The appointment booking process was simple and efficient. The doctor took time to explain my medical condition and suggested preventive measures. Laboratory tests were conducted smoothly with minimal discomfort. The only drawback was the delay at the payment counter during discharge. Overall, it was a good experience.",
      helpful: 3,
    },
    {
      id: 11,
      name: "Rohit Pawar",
      rating: 5,
      date: "2024-09-02",
      visit: "Emergency",
      recommend: true,
      verified: true,
      review:
        "I brought my father to the emergency unit and the response time was commendable. The medical team acted quickly and stabilized his condition efficiently. Doctors communicated transparently about the treatment plan and expected costs. The ICU facilities were clean and well organized. We are grateful for the timely care provided.",
      helpful: 7,
    },
    {
      id: 12,
      name: "Neha Bhosale",
      rating: 4,
      date: "2024-09-06",
      visit: "Follow-up",
      recommend: true,
      verified: true,
      review:
        "Follow-up consultation was smooth and the doctor reviewed my reports thoroughly. The support staff was courteous and guided me properly between departments. Although there was a short wait before consultation, the overall coordination was good. Billing was transparent and charges were explained clearly. I would consider returning for future treatments.",
      helpful: 2,
    },
    {
      id: 13,
      name: "Kiran Gaikwad",
      rating: 3,
      date: "2024-09-10",
      visit: "First Visit",
      recommend: false,
      verified: true,
      review:
        "The hospital facilities are decent, but the waiting time for consultation was longer than scheduled. The doctor was professional, yet the appointment system needs better management. Some confusion occurred during payment processing which caused delays. Cleanliness was satisfactory but the reception area was crowded. Improvements in administrative coordination would enhance the experience.",
      helpful: 1,
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

  useEffect(() => {
    const generateReviewSummary = async () => {
      if (!reviews || reviews.length === 0) return;

      setLoadingSummary(true);

      const combinedText = reviews
        .map((r) => r.review)
        .filter((text) => text && text.trim().length > 20)
        .join(" ")
        .slice(0, 2000);

      console.log("COMBINED TEXT:", combinedText);


      const summary = await summarizeTextHF(
        combinedText,
        "English",
        "review-summary",
      );

      setReviewSummary(summary);
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
          </div>

          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </header>

        {/* INSIGHT HERO */}
        <section className="insight-hero">
          <div className="insight-card">
            {/* LEFT SIDE  */}
            <div className="rating-section">
              <div className="rating-left">
                <div className="rating-score">
                  <span className="rating-number">{avgRating.toFixed(1)}</span>
                  <span className="rating-outof">/ 5</span>
                </div>

                <div className="stars">
                  {[1, 2, 3, 4, 5].map((i) => (
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

              <div className="rating-right">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = reviews.filter((r) => r.rating === star).length;
                  const percent = (count / reviews.length) * 100 || 0;

                  return (
                    <div key={star} className="rating-row">
                      <span className="star-label">{star}</span>
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

            {/* RIGHT SIDE — AI INSIGHT */}
            <div className="ai-section">
              <div className="ai-header-modern">
                <div className="ai-badge">
                  <div className="ai-pulse"></div>
                  AI
                </div>

                <div>
                  <h3>AI Patient Insight</h3>
                  <p className="ai-subtext">
                    Extracted from recurring patient experience patterns
                  </p>
                </div>
              </div>

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
                      setReviews((prev) =>
                        prev.map((x) =>
                          x.id === r.id ? { ...x, helpful: x.helpful + 1 } : x,
                        ),
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
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= newReview.rating ? "filled" : ""}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
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

                  setReviews((prev) => [
                    {
                      id: Date.now(),
                      name: loggedUser?.name || loggedUser?.username || "User",
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
