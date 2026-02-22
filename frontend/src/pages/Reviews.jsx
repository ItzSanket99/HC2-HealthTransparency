import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { summarizeTextHF } from "../utils/hfSummarizer";
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

/* ─── inline styles ─────────────────────────────────────────────────── */
const S = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fa",
    fontFamily: "'DM Sans', sans-serif",
    color: "#1a2332",
  },
  container: { maxWidth: 960, margin: "0 auto", padding: "32px 24px" },

  /* header */
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 28,
  },
  hospitalName: { fontSize: 26, fontWeight: 700, margin: 0, color: "#0d7377" },
  hospitalSub: { fontSize: 14, color: "#6b7a90", margin: "4px 0 0" },
  backBtn: {
    background: "none",
    border: "1px solid #d1d9e6",
    borderRadius: 8,
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: 14,
    color: "#4a5568",
  },

  /* insight hero */
  insightHero: {
    background: "#fff",
    borderRadius: 16,
    padding: 28,
    display: "grid",
    gridTemplateColumns: "200px 1fr",
    gap: 28,
    marginBottom: 28,
    boxShadow: "0 1px 4px rgba(0,0,0,.06)",
  },
  ratingSection: { textAlign: "center", paddingTop: 8 },
  ratingNumber: { fontSize: 52, fontWeight: 800, color: "#0d7377", lineHeight: 1 },
  ratingOutof: { fontSize: 18, color: "#9aa5b4", fontWeight: 500 },
  stars: { fontSize: 22, margin: "8px 0 4px", letterSpacing: 2 },
  reviewCount: { fontSize: 13, color: "#9aa5b4" },

  aiCard: {
    background: "#f0fafa",
    borderRadius: 12,
    padding: 20,
    border: "1px solid #c8eaea",
  },
  aiHeader: { display: "flex", alignItems: "center", gap: 12, marginBottom: 12 },
  aiLogo: { width: 36, height: 36, borderRadius: 8, background: "#e0f4f4", padding: 6 },
  aiTitle: { fontSize: 15, fontWeight: 700, margin: 0 },
  aiSubtitle: { fontSize: 12, color: "#6b7a90", margin: 0 },
  summaryText: { fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0 },
  shimmer: {
    height: 12,
    borderRadius: 6,
    background: "linear-gradient(90deg,#e0f0f0 25%,#c8e8e8 50%,#e0f0f0 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite",
    marginBottom: 8,
  },

  /* metrics band */
  metricsBand: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 12,
    marginBottom: 28,
  },
  metricCard: {
    background: "#fff",
    borderRadius: 12,
    padding: "16px 14px",
    textAlign: "center",
    boxShadow: "0 1px 4px rgba(0,0,0,.06)",
  },
  metricValue: { fontSize: 22, fontWeight: 800, color: "#0d7377", margin: 0 },
  metricLabel: { fontSize: 11, color: "#9aa5b4", marginTop: 4, textTransform: "uppercase", letterSpacing: 0.5 },
  metricSub: { fontSize: 12, color: "#4a5568", marginTop: 2 },

  /* controls */
  controls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 18, fontWeight: 700, margin: 0 },
  select: {
    border: "1px solid #d1d9e6",
    borderRadius: 8,
    padding: "6px 12px",
    fontSize: 14,
    background: "#fff",
    cursor: "pointer",
    color: "#1a2332",
  },

  writeBtn: {
    background: "#0d7377",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "10px 22px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    marginBottom: 20,
  },

  /* review card */
  reviewCard: {
    background: "#fff",
    borderRadius: 14,
    padding: 22,
    marginBottom: 14,
    boxShadow: "0 1px 4px rgba(0,0,0,.06)",
  },
  reviewTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 },
  reviewerName: { fontSize: 15, fontWeight: 700, margin: 0 },
  reviewerMeta: { fontSize: 12, color: "#9aa5b4", margin: "3px 0 0" },
  ratingBadge: {
    background: "#e8f8f8",
    color: "#0d7377",
    borderRadius: 8,
    padding: "4px 10px",
    fontSize: 14,
    fontWeight: 700,
  },
  dataGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 8,
    marginBottom: 14,
    background: "#f8fafb",
    borderRadius: 10,
    padding: "12px 14px",
  },
  dataItem: {},
  dataLabel: { fontSize: 10, color: "#9aa5b4", textTransform: "uppercase", letterSpacing: 0.4, margin: 0 },
  dataValue: { fontSize: 13, fontWeight: 600, color: "#1a2332", margin: "2px 0 0" },
  reviewText: { fontSize: 14, color: "#374151", lineHeight: 1.7, margin: "0 0 12px" },
  badges: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 },
  badge: {
    fontSize: 11,
    padding: "3px 10px",
    borderRadius: 20,
    fontWeight: 600,
    background: "#f0f4f8",
    color: "#4a5568",
  },
  badgeGreen: { background: "#e6f9f0", color: "#16a34a" },
  badgeRed: { background: "#fee2e2", color: "#dc2626" },
  badgeBlue: { background: "#e0f0ff", color: "#1d4ed8" },
  reviewFooter: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  reviewDate: { fontSize: 12, color: "#9aa5b4" },
  helpfulBtn: {
    background: "none",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    padding: "4px 12px",
    fontSize: 12,
    cursor: "pointer",
    color: "#4a5568",
  },
  impactNote: {
    background: "#f0fafa",
    border: "1px solid #c8eaea",
    borderRadius: 8,
    padding: "8px 12px",
    fontSize: 12,
    color: "#0d7377",
    marginBottom: 10,
    fontStyle: "italic",
  },

  /* modal */
  overlay: {
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000, padding: 20,
  },
  modal: {
    background: "#fff",
    borderRadius: 18,
    padding: 30,
    width: "100%",
    maxWidth: 620,
    maxHeight: "90vh",
    overflowY: "auto",
  },
  modalTitle: { fontSize: 20, fontWeight: 800, margin: "0 0 4px" },
  modalSub: { fontSize: 13, color: "#6b7a90", margin: "0 0 24px" },
  formSection: {
    background: "#f8fafb",
    borderRadius: 12,
    padding: "16px 18px",
    marginBottom: 16,
  },
  formSectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: "#0d7377",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 14,
  },
  formRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 },
  formGroup: { marginBottom: 12 },
  label: { fontSize: 12, fontWeight: 600, color: "#4a5568", display: "block", marginBottom: 5 },
  input: {
    width: "100%",
    border: "1px solid #d1d9e6",
    borderRadius: 8,
    padding: "8px 12px",
    fontSize: 14,
    boxSizing: "border-box",
    color: "#1a2332",
    background: "#fff",
  },
  select2: {
    width: "100%",
    border: "1px solid #d1d9e6",
    borderRadius: 8,
    padding: "8px 12px",
    fontSize: 14,
    boxSizing: "border-box",
    color: "#1a2332",
    background: "#fff",
    cursor: "pointer",
  },
  textarea: {
    width: "100%",
    border: "1px solid #d1d9e6",
    borderRadius: 8,
    padding: "8px 12px",
    fontSize: 14,
    boxSizing: "border-box",
    resize: "vertical",
    color: "#1a2332",
    fontFamily: "inherit",
  },
  starsInteractive: { display: "flex", gap: 4, fontSize: 24, cursor: "pointer" },
  starsSmall: { display: "flex", gap: 3, fontSize: 18, cursor: "pointer" },
  ratingGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  recommendToggle: { display: "flex", gap: 8 },
  toggleBtn: {
    flex: 1, padding: "8px", border: "1px solid #d1d9e6",
    borderRadius: 8, cursor: "pointer", fontSize: 13, background: "#fff", color: "#4a5568",
  },
  toggleBtnActive: {
    flex: 1, padding: "8px", border: "2px solid #0d7377",
    borderRadius: 8, cursor: "pointer", fontSize: 13, background: "#e8f8f8", color: "#0d7377", fontWeight: 600,
  },
  formActions: { display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 },
  cancelBtn: {
    background: "none", border: "1px solid #d1d9e6",
    borderRadius: 10, padding: "10px 22px", fontSize: 14, cursor: "pointer", color: "#4a5568",
  },
  submitBtn: {
    background: "#0d7377", color: "#fff",
    border: "none", borderRadius: 10,
    padding: "10px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer",
  },
  checkRow: { display: "flex", gap: 8, alignItems: "center", marginTop: 4 },
  emptyState: { textAlign: "center", padding: "48px 0", color: "#9aa5b4", fontSize: 15 },
};

/* ─── helpers ───────────────────────────────────────────────────────── */
const starRating = (value, onChange, small) => {
  const style = small ? S.starsSmall : S.starsInteractive;
  return (
    <div style={style}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          style={{ color: s <= value ? "#f59e0b" : "#d1d9e6", userSelect: "none" }}
          onClick={() => onChange(s)}
        >★</span>
      ))}
    </div>
  );
};

const fmt = (n) => n != null ? `₹${Number(n).toLocaleString("en-IN")}` : "—";
const pct = (a, b) => {
  if (!a || !b) return null;
  const d = ((b - a) / a * 100).toFixed(0);
  return d > 0 ? `+${d}%` : `${d}%`;
};

/* ─── component ─────────────────────────────────────────────────────── */
const Reviews = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const loggedUser = JSON.parse(localStorage.getItem("user")) || {};
  const hospital = state?.hospital || JSON.parse(localStorage.getItem("selectedHospital"));
  const condition = state?.condition || "General";

  const [reviews, setReviews] = useState([]);
  const [sort, setSort] = useState("recent");
  const [showForm, setShowForm] = useState(false);
  const [reviewSummary, setReviewSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  const emptyForm = {
    overallRating: 0,
    doctorRating: 0,
    cleanlinessRating: 0,
    waitingRating: 0,
    costRating: 0,
    // structured fields
    estimatedCost: "",
    finalCost: "",
    hiddenCharges: "",
    insuranceApprovalDays: "",
    waitTimeHours: "",
    communicationRating: 0,
    treatmentOutcome: "",
    complications: "",
    recoveryDays: "",
    treatmentType: "",
    visitDate: "",
    recommend: "",
    review: "",
    anonymous: false,
  };
  const [form, setForm] = useState(emptyForm);

  if (!hospital) return <div style={{ padding: 40, textAlign: "center" }}>No hospital selected.</div>;

  const reviewKey = `${condition}_${hospital.hospitalId}`;

  /* fetch */
  useEffect(() => {
    const q = query(collection(db, "reviews"), where("reviewKey", "==", reviewKey));
    return onSnapshot(q, (snap) => {
      setReviews(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, [reviewKey]);

  /* sort */
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sort === "rating") return (b.overallRating || 0) - (a.overallRating || 0);
    if (sort === "billing") return (b.finalCost || 0) - (a.finalCost || 0);
    return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
  });

  const avgRating = reviews.length
    ? reviews.reduce((s, r) => s + (r.overallRating || 0), 0) / reviews.length
    : 0;

  /* aggregate metrics */
  const withCosts = reviews.filter((r) => r.estimatedCost && r.finalCost);
  const avgDeviation = withCosts.length
    ? withCosts.reduce((s, r) => s + ((r.finalCost - r.estimatedCost) / r.estimatedCost * 100), 0) / withCosts.length
    : null;

  const withInsurance = reviews.filter((r) => r.insuranceApprovalDays > 0);
  const avgInsurance = withInsurance.length
    ? Math.round(withInsurance.reduce((s, r) => s + Number(r.insuranceApprovalDays), 0) / withInsurance.length)
    : null;

  const withWait = reviews.filter((r) => r.waitTimeHours);
  const avgWait = withWait.length
    ? (withWait.reduce((s, r) => s + Number(r.waitTimeHours), 0) / withWait.length).toFixed(1)
    : null;

  const outcomes = reviews.filter((r) => r.treatmentOutcome === "Improved").length;
  const successRate = reviews.length ? Math.round((outcomes / reviews.length) * 100) : null;

  /* ai summary */
  useEffect(() => {
    const run = async () => {
      if (!reviews.length) { setReviewSummary(""); return; }
      setLoadingSummary(true);
      const txt = reviews.map((r) => r.review).filter((t) => t?.trim().length > 20).join(" ").slice(0, 2000);
      try {
        const s = await summarizeTextHF(txt, "English", "review-summary");
        setReviewSummary(s);
      } catch { setReviewSummary("Unable to generate summary."); }
      setLoadingSummary(false);
    };
    run();
  }, [reviews]);

  /* submit */
  const handleSubmit = async () => {
    if (!form.overallRating || !form.review) return;
    await addDoc(collection(db, "reviews"), {
      reviewKey, condition,
      hospitalId: hospital.hospitalId,
      hospitalName: hospital.hospitalName,
      name: form.anonymous ? "Anonymous" : (loggedUser?.name || "Patient"),
      ...form,
      estimatedCost: form.estimatedCost ? Number(form.estimatedCost) : null,
      finalCost: form.finalCost ? Number(form.finalCost) : null,
      insuranceApprovalDays: form.insuranceApprovalDays ? Number(form.insuranceApprovalDays) : null,
      waitTimeHours: form.waitTimeHours ? Number(form.waitTimeHours) : null,
      recoveryDays: form.recoveryDays ? Number(form.recoveryDays) : null,
      helpful: 0,
      verified: true,
      createdAt: serverTimestamp(),
    });
    setShowForm(false);
    setForm(emptyForm);
  };

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:#f1f5f9}
        ::-webkit-scrollbar-thumb{background:#c8d5e3;border-radius:3px}
        input:focus,select:focus,textarea:focus{outline:2px solid #0d7377;outline-offset:1px}
      `}</style>

      <div style={S.page}>
        <div style={S.container}>

          {/* HEADER */}
          <header style={S.header}>
            <div>
              <h1 style={S.hospitalName}>{hospital.hospitalName}</h1>
              <p style={S.hospitalSub}>{hospital.city}, {hospital.state} · <strong>Condition:</strong> {condition}</p>
            </div>
            <button style={S.backBtn} onClick={() => navigate(-1)}>← Back</button>
          </header>

          {/* INSIGHT HERO */}
          <section style={S.insightHero}>
            <div style={S.ratingSection}>
              <div>
                <span style={S.ratingNumber}>{avgRating.toFixed(1)}</span>
                <span style={S.ratingOutof}> / 5</span>
              </div>
              <div style={S.stars}>
                {[1,2,3,4,5].map(i => (
                  <span key={i} style={{ color: i <= Math.round(avgRating) ? "#f59e0b" : "#d1d9e6" }}>★</span>
                ))}
              </div>
              <div style={S.reviewCount}>{reviews.length} verified patient reviews</div>
            </div>

            <div style={S.aiCard}>
              <div style={S.aiHeader}>
                <div style={S.aiLogo}>
                  <img src={aiChip} alt="AI" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
                <div>
                  <p style={S.aiTitle}>AI Review Summary</p>
                  <p style={S.aiSubtitle}>Auto-generated insights from patient feedback</p>
                </div>
              </div>
              {loadingSummary ? (
                <>
                  <div style={S.shimmer} />
                  <div style={{ ...S.shimmer, width: "70%" }} />
                </>
              ) : (
                <p style={S.summaryText}>{reviewSummary || "No summary available yet."}</p>
              )}
            </div>
          </section>

          {/* METRICS BAND */}
          {reviews.length > 0 && (
            <div style={S.metricsBand}>
              <div style={S.metricCard}>
                <p style={{ ...S.metricValue, color: avgDeviation > 0 ? "#dc2626" : "#16a34a" }}>
                  {avgDeviation != null ? `${avgDeviation > 0 ? "+" : ""}${avgDeviation.toFixed(0)}%` : "—"}
                </p>
                <p style={S.metricLabel}>Billing Deviation</p>
                <p style={S.metricSub}>{withCosts.length} reports</p>
              </div>
              <div style={S.metricCard}>
                <p style={S.metricValue}>{avgInsurance != null ? `${avgInsurance}d` : "—"}</p>
                <p style={S.metricLabel}>Avg Insurance Days</p>
                <p style={S.metricSub}>{withInsurance.length} reports</p>
              </div>
              <div style={S.metricCard}>
                <p style={S.metricValue}>{avgWait != null ? `${avgWait}h` : "—"}</p>
                <p style={S.metricLabel}>Avg Wait Time</p>
                <p style={S.metricSub}>{withWait.length} reports</p>
              </div>
              <div style={S.metricCard}>
                <p style={{ ...S.metricValue, color: "#16a34a" }}>{successRate != null ? `${successRate}%` : "—"}</p>
                <p style={S.metricLabel}>Improvement Rate</p>
                <p style={S.metricSub}>{reviews.length} reports</p>
              </div>
            </div>
          )}

          {/* CONTROLS */}
          <div style={S.controls}>
            <h2 style={S.sectionTitle}>Patient Reviews</h2>
            <select style={S.select} value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="recent">Most Recent</option>
              <option value="rating">Highest Rated</option>
              <option value="billing">Highest Final Cost</option>
            </select>
          </div>

          <button style={S.writeBtn} onClick={() => setShowForm(!showForm)}>
            {showForm ? "✖ Cancel" : "+ Write a Review"}
          </button>

          {/* REVIEW LIST */}
          <section>
            {sortedReviews.length === 0 && (
              <div style={S.emptyState}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>🏥</div>
                <p>Be the first to review this hospital for {condition}.</p>
                <p style={{ fontSize: 13 }}>Your structured data will help future patients make informed decisions.</p>
              </div>
            )}
            {sortedReviews.map((r, idx) => {
              const deviation = r.estimatedCost && r.finalCost
                ? ((r.finalCost - r.estimatedCost) / r.estimatedCost * 100).toFixed(0)
                : null;
              return (
                <div key={r.id} style={S.reviewCard}>
                  {/* impact note for recent reviews */}
                  {idx === 0 && reviews.length > 1 && (
                    <div style={S.impactNote}>
                      💡 This review has contributed to billing transparency data for {reviews.length - 1} future patients.
                    </div>
                  )}

                  <div style={S.reviewTop}>
                    <div>
                      <p style={S.reviewerName}>{r.name}</p>
                      <p style={S.reviewerMeta}>
                        {r.treatmentType || condition}
                        {r.visitDate ? ` · ${r.visitDate}` : ""}
                      </p>
                    </div>
                    <span style={S.ratingBadge}>⭐ {r.overallRating}</span>
                  </div>

                  {/* structured data grid */}
                  {(r.estimatedCost || r.finalCost || r.waitTimeHours || r.insuranceApprovalDays || r.treatmentOutcome || r.recoveryDays) && (
                    <div style={S.dataGrid}>
                      {r.estimatedCost && (
                        <div style={S.dataItem}>
                          <p style={S.dataLabel}>Estimated Cost</p>
                          <p style={S.dataValue}>{fmt(r.estimatedCost)}</p>
                        </div>
                      )}
                      {r.finalCost && (
                        <div style={S.dataItem}>
                          <p style={S.dataLabel}>Final Cost</p>
                          <p style={{ ...S.dataValue, color: deviation > 0 ? "#dc2626" : "#16a34a" }}>
                            {fmt(r.finalCost)}{deviation != null ? ` (${deviation > 0 ? "+" : ""}${deviation}%)` : ""}
                          </p>
                        </div>
                      )}
                      {r.waitTimeHours != null && (
                        <div style={S.dataItem}>
                          <p style={S.dataLabel}>Wait Time</p>
                          <p style={S.dataValue}>{r.waitTimeHours}h</p>
                        </div>
                      )}
                      {r.insuranceApprovalDays != null && (
                        <div style={S.dataItem}>
                          <p style={S.dataLabel}>Insurance Approval</p>
                          <p style={S.dataValue}>{r.insuranceApprovalDays} days</p>
                        </div>
                      )}
                      {r.treatmentOutcome && (
                        <div style={S.dataItem}>
                          <p style={S.dataLabel}>Outcome</p>
                          <p style={{ ...S.dataValue, color: r.treatmentOutcome === "Improved" ? "#16a34a" : r.treatmentOutcome === "No Improvement" ? "#dc2626" : "#d97706" }}>
                            {r.treatmentOutcome}
                          </p>
                        </div>
                      )}
                      {r.recoveryDays && (
                        <div style={S.dataItem}>
                          <p style={S.dataLabel}>Recovery</p>
                          <p style={S.dataValue}>{r.recoveryDays} days</p>
                        </div>
                      )}
                    </div>
                  )}

                  <div style={S.badges}>
                    {r.verified && <span style={{ ...S.badge, ...S.badgeGreen }}>✓ Verified Patient</span>}
                    {r.recommend === "Yes" && <span style={{ ...S.badge, ...S.badgeBlue }}>👍 Recommends</span>}
                    {r.hiddenCharges && <span style={{ ...S.badge, ...S.badgeRed }}>⚠ Hidden Charges Reported</span>}
                    {r.complications && <span style={{ ...S.badge, ...S.badgeRed }}>⚕ Complications Noted</span>}
                  </div>

                  <p style={S.reviewText}>{r.review}</p>

                  <div style={S.reviewFooter}>
                    <span style={S.reviewDate}>
                      {r.createdAt?.seconds ? new Date(r.createdAt.seconds * 1000).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : ""}
                    </span>
                    <button
                      style={S.helpfulBtn}
                      onClick={async () => {
                        await updateDoc(doc(db, "reviews", r.id), { helpful: increment(1) });
                      }}
                    >
                      👍 Helpful ({r.helpful || 0})
                    </button>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </div>

      {/* MODAL */}
      {showForm && (
        <div style={S.overlay} onClick={() => setShowForm(false)}>
          <div style={S.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={S.modalTitle}>Share Your Experience</h2>
            <p style={S.modalSub}>Your structured data helps future patients make safer, more informed decisions.</p>

            {/* RATINGS */}
            <div style={S.formSection}>
              <p style={S.formSectionTitle}>Ratings</p>
              <div style={{ marginBottom: 14 }}>
                <label style={S.label}>Overall Rating *</label>
                {starRating(form.overallRating, (v) => set("overallRating", v))}
              </div>
              <div style={S.ratingGrid}>
                {[
                  ["Doctor Care", "doctorRating"],
                  ["Cleanliness", "cleanlinessRating"],
                  ["Waiting Time", "waitingRating"],
                  ["Cost Transparency", "costRating"],
                  ["Communication", "communicationRating"],
                ].map(([lbl, key]) => (
                  <div key={key} style={S.formGroup}>
                    <label style={S.label}>{lbl}</label>
                    {starRating(form[key], (v) => set(key, v), true)}
                  </div>
                ))}
              </div>
            </div>

            {/* BILLING */}
            <div style={S.formSection}>
              <p style={S.formSectionTitle}>💰 Billing Transparency</p>
              <div style={S.formRow}>
                <div style={S.formGroup}>
                  <label style={S.label}>Estimated Cost (₹)</label>
                  <input style={S.input} type="number" placeholder="e.g. 150000" value={form.estimatedCost} onChange={(e) => set("estimatedCost", e.target.value)} />
                </div>
                <div style={S.formGroup}>
                  <label style={S.label}>Final Cost (₹)</label>
                  <input style={S.input} type="number" placeholder="e.g. 185000" value={form.finalCost} onChange={(e) => set("finalCost", e.target.value)} />
                </div>
              </div>
              <div style={S.formGroup}>
                <label style={S.label}>Hidden Charges (describe if any)</label>
                <input style={S.input} type="text" placeholder="e.g. PPE kit charges, room upgrade fees" value={form.hiddenCharges} onChange={(e) => set("hiddenCharges", e.target.value)} />
              </div>
            </div>

            {/* INSURANCE & WAIT */}
            <div style={S.formSection}>
              <p style={S.formSectionTitle}>🏥 Hospital Experience</p>
              <div style={S.formRow}>
                <div style={S.formGroup}>
                  <label style={S.label}>Insurance Approval (days)</label>
                  <input style={S.input} type="number" placeholder="0 if cash" value={form.insuranceApprovalDays} onChange={(e) => set("insuranceApprovalDays", e.target.value)} />
                </div>
                <div style={S.formGroup}>
                  <label style={S.label}>Wait Time (hours)</label>
                  <input style={S.input} type="number" step="0.5" placeholder="e.g. 2.5" value={form.waitTimeHours} onChange={(e) => set("waitTimeHours", e.target.value)} />
                </div>
              </div>
              <div style={S.formRow}>
                <div style={S.formGroup}>
                  <label style={S.label}>Treatment Type</label>
                  <input style={S.input} type="text" placeholder="e.g. Knee Replacement" value={form.treatmentType} onChange={(e) => set("treatmentType", e.target.value)} />
                </div>
                <div style={S.formGroup}>
                  <label style={S.label}>Visit Date</label>
                  <input style={S.input} type="date" value={form.visitDate} onChange={(e) => set("visitDate", e.target.value)} />
                </div>
              </div>
            </div>

            {/* OUTCOME */}
            <div style={S.formSection}>
              <p style={S.formSectionTitle}>📊 Treatment Outcome</p>
              <div style={S.formRow}>
                <div style={S.formGroup}>
                  <label style={S.label}>Outcome</label>
                  <select style={S.select2} value={form.treatmentOutcome} onChange={(e) => set("treatmentOutcome", e.target.value)}>
                    <option value="">Select outcome</option>
                    <option value="Improved">Improved</option>
                    <option value="Partially Improved">Partially Improved</option>
                    <option value="No Improvement">No Improvement</option>
                    <option value="Worsened">Worsened</option>
                  </select>
                </div>
                <div style={S.formGroup}>
                  <label style={S.label}>Recovery Duration (days)</label>
                  <input style={S.input} type="number" placeholder="e.g. 45" value={form.recoveryDays} onChange={(e) => set("recoveryDays", e.target.value)} />
                </div>
              </div>
              <div style={S.formGroup}>
                <label style={S.label}>Complications (if any)</label>
                <input style={S.input} type="text" placeholder="e.g. post-op infection, delayed wound healing" value={form.complications} onChange={(e) => set("complications", e.target.value)} />
              </div>
            </div>

            {/* REVIEW TEXT */}
            <div style={S.formGroup}>
              <label style={S.label}>Your Detailed Review *</label>
              <textarea style={S.textarea} rows={4} placeholder="Describe your experience — what went well, what could improve..." value={form.review} onChange={(e) => set("review", e.target.value)} />
            </div>

            {/* RECOMMEND */}
            <div style={S.formGroup}>
              <label style={S.label}>Would you recommend this hospital?</label>
              <div style={S.recommendToggle}>
                <button style={form.recommend === "Yes" ? S.toggleBtnActive : S.toggleBtn} onClick={() => set("recommend", "Yes")}>👍 Yes</button>
                <button style={form.recommend === "No" ? S.toggleBtnActive : S.toggleBtn} onClick={() => set("recommend", "No")}>👎 No</button>
              </div>
            </div>

            {/* ANONYMOUS */}
            <div style={S.checkRow}>
              <input type="checkbox" id="anon" checked={form.anonymous} onChange={(e) => set("anonymous", e.target.checked)} />
              <label htmlFor="anon" style={{ fontSize: 13, color: "#4a5568", cursor: "pointer" }}>Submit anonymously</label>
            </div>

            <div style={S.formActions}>
              <button style={S.cancelBtn} onClick={() => setShowForm(false)}>Cancel</button>
              <button style={S.submitBtn} onClick={handleSubmit}>Submit Review</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Reviews;
