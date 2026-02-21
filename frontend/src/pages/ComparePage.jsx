import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from "recharts";

/* ═══════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════ */
const C = {
  dark:      "#062B2E",
  teal:      "#176F6F",
  teal2:     "#1E8A8A",
  tealLight: "#E4F3F3",
  tealMid:   "#A8D8D8",
  palette:   ["#176F6F", "#2DA89E", "#5DC8BF"],
  text:      "#0B3538",
  muted:     "#6B8E8E",
  border:    "#DFF0F0",
  bg:        "#F2FAFA",
  white:     "#FFFFFF",
};

/* ═══════════════════════════════════════
   ATOMS
═══════════════════════════════════════ */
const Pill = ({ children, bg = C.tealLight, color = C.teal }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 5,
    background: bg, color, fontSize: 11, fontWeight: 700,
    padding: "4px 11px", borderRadius: 99, letterSpacing: 0.3, whiteSpace: "nowrap",
  }}>{children}</span>
);

const Ring = ({ score, max = 10, color = C.teal, size = 72 }) => {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const filled = (score / max) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.border} strokeWidth={7}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color}
        strokeWidth={7} strokeLinecap="round"
        strokeDasharray={`${filled} ${circ}`}
        style={{ transition: "stroke-dasharray 1.2s cubic-bezier(.22,1,.36,1)" }}
      />
    </svg>
  );
};

const ProgressBar = ({ value, max = 10, color = C.teal, height = 5 }) => (
  <div style={{ background: C.border, borderRadius: 99, height, overflow: "hidden" }}>
    <div style={{
      height: "100%", width: `${Math.min(100,(value/max)*100)}%`,
      background: `linear-gradient(90deg,${color},${color}BB)`,
      borderRadius: 99, transition: "width 1.1s cubic-bezier(.22,1,.36,1)",
    }}/>
  </div>
);

const StatRow = ({ label, value, best }) => (
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "9px 0", borderBottom: `1px solid ${C.border}`,
  }}>
    <span style={{ fontSize: 12, color: C.muted }}>{label}</span>
    <span style={{
      fontSize: 13, fontWeight: 700,
      color: best ? C.teal : C.text,
      background: best ? C.tealLight : "none",
      padding: best ? "2px 10px" : 0, borderRadius: 99,
    }}>{best ? "✓ " : ""}{value}</span>
  </div>
);

const PriceTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: C.white, border: `1px solid ${C.border}`,
      borderRadius: 12, padding: "10px 16px",
      boxShadow: "0 8px 24px rgba(23,111,111,.14)", fontSize: 13,
    }}>
      <p style={{ fontWeight: 700, color: C.text, margin: "0 0 6px" }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.fill, margin: "2px 0" }}>
          {p.name}: ₹{Number(p.value).toLocaleString()}
        </p>
      ))}
    </div>
  );
};

/* Card wrapper */
const Card = ({ children, style = {} }) => (
  <div style={{
    background: C.white, borderRadius: 20,
    border: `1px solid ${C.border}`,
    boxShadow: "0 2px 20px rgba(23,111,111,.07)",
    overflow: "hidden", ...style,
  }}>{children}</div>
);

/* ═══════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════ */
const ComparePage = () => {
  const { state }  = useLocation();
  const navigate   = useNavigate();
  const [tab, setTab]         = useState("overview");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  /* fallback demo data */
  const hospitals = state?.hospitals || [
    { hospitalId: 1, hospitalName: "Ruby Hall Clinic",          rating: null, distanceMiles: 7.5, affordabilityScore: 7.1,
      treatments: [{ minCost: 150000, maxCost: 320000, riskLevel: "Medium" }] },
    { hospitalId: 2, hospitalName: "Jehangir Hospital",         rating: null, distanceMiles: 6.3, affordabilityScore: 7.3,
      treatments: [{ minCost: 140000, maxCost: 300000, riskLevel: "Medium" }] },
    { hospitalId: 3, hospitalName: "Sassoon General Hospital",  rating: null, distanceMiles: 6.3, affordabilityScore: 9.4,
      treatments: [{ minCost: 60000,  maxCost: 150000, riskLevel: "Medium" }] },
  ];

  /* empty guard */
  if (!hospitals.length) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
      <p style={{ color: C.muted, fontSize: 16 }}>No hospitals selected for comparison.</p>
      <button onClick={() => navigate(-1)} style={{
        background: C.teal, color: "#fff", border: "none",
        padding: "11px 28px", borderRadius: 99, cursor: "pointer", fontWeight: 700,
      }}>← Go Back</button>
    </div>
  );

  /* derived winners */
  const bestRating  = Math.max(...hospitals.map(h => h.rating || 0));
  const lowestPrice = Math.min(...hospitals.map(h => h.treatments[0].minCost));
  const bestAffird  = Math.max(...hospitals.map(h => h.affordabilityScore));
  const nearest     = Math.min(...hospitals.map(h => h.distanceMiles));
  const short       = h => h.hospitalName.split(" ").slice(0, 2).join(" ");

  /* chart data */
  const radarData = ["Affordability","Distance","Rating","Price Score","Safety"].map((metric, mi) => {
    const entry = { metric };
    hospitals.forEach(h => {
      entry[h.hospitalName] = [
        h.affordabilityScore,
        Math.max(0, 10 - h.distanceMiles),
        h.rating ? h.rating * 2 : 5,
        Math.max(0, Math.round(10 - h.treatments[0].minCost / 32000)),
        h.treatments[0].riskLevel === "Low" ? 9 : h.treatments[0].riskLevel === "Medium" ? 6 : 3,
      ][mi];
    });
    return entry;
  });

  const barData = hospitals.map(h => ({
    name: short(h),
    "Min Cost": h.treatments[0].minCost,
    "Max Cost": h.treatments[0].maxCost,
  }));

  const tableRows = [
    { label: "Min Cost",      vals: hospitals.map(h => `₹${h.treatments[0].minCost.toLocaleString()}`),
      bestIdx: hospitals.indexOf(hospitals.reduce((a, b) => a.treatments[0].minCost < b.treatments[0].minCost ? a : b)) },
    { label: "Max Cost",      vals: hospitals.map(h => `₹${h.treatments[0].maxCost.toLocaleString()}`) },
    { label: "Affordability", vals: hospitals.map(h => `${h.affordabilityScore}/10`),
      bestIdx: hospitals.indexOf(hospitals.reduce((a, b) => a.affordabilityScore > b.affordabilityScore ? a : b)) },
    { label: "Distance",      vals: hospitals.map(h => `${h.distanceMiles} mi`),
      bestIdx: hospitals.indexOf(hospitals.reduce((a, b) => a.distanceMiles < b.distanceMiles ? a : b)) },
    { label: "Risk Level",    vals: hospitals.map(h => h.treatments[0].riskLevel) },
    { label: "Rating",        vals: hospitals.map(h => h.rating ? `${h.rating}/5` : "New") },
  ];

  const TABS = [
    { id: "overview", label: "Overview" },
    { id: "price",    label: "Price Analysis" },
    { id: "radar",    label: "Score Radar" },
  ];

  /* ── render ── */
  return (
    /*
      ROOT layout: flex column, full viewport height.
      The scrollable area is the content div below the sticky tab bar.
      This prevents the comparison table from rendering outside/below the page footer.
    */
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(165deg, #EEF9F9 0%, #FAFFFE 55%, #EAF5F5 100%)`,
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* ── HERO ────────────────────────────────────────── */}
      <div style={{
        background: `linear-gradient(130deg, ${C.dark} 0%, ${C.teal} 60%, ${C.teal2} 100%)`,
        padding: "40px 48px 52px",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}>
        {/* Decorative blobs */}
        <div style={{ position:"absolute", top:"-70px", right:"-70px", width:"260px", height:"260px", borderRadius:"50%", background:"rgba(255,255,255,.05)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:"-50px", right:"220px", width:"170px", height:"170px", borderRadius:"50%", background:"rgba(255,255,255,.05)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", top:"30px", left:"55%", width:"90px", height:"90px", borderRadius:"50%", background:"rgba(255,255,255,.03)", pointerEvents:"none" }}/>

        <button onClick={() => navigate(-1)} style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)",
          color: "#fff", borderRadius: 99, padding: "8px 20px",
          cursor: "pointer", fontSize: 13, fontWeight: 600,
          backdropFilter: "blur(8px)", marginBottom: 28,
        }}>
          ← Back to Results
        </button>

        <h1 style={{ fontSize: 40, fontWeight: 900, color: "#fff", margin: "0 0 8px", letterSpacing: "-1.5px", lineHeight: 1.1 }}>
          Hospital&nbsp;<span style={{ color: "#7DD8D8" }}>Comparison</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,.6)", fontSize: 15, margin: 0 }}>
          Side-by-side analysis · {hospitals.length} hospitals
        </p>

        {/* Winner chips */}
        <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
          {[
            { e: "⭐", l: "Top Rated",  v: hospitals.find(h => (h.rating||0)===bestRating)  ? short(hospitals.find(h => (h.rating||0)===bestRating)) : "Tied" },
            { e: "💰", l: "Best Price", v: short(hospitals.find(h => h.treatments[0].minCost===lowestPrice)) },
            { e: "📍", l: "Nearest",    v: short(hospitals.find(h => h.distanceMiles===nearest)) },
            { e: "🏆", l: "Best Value", v: short(hospitals.find(h => h.affordabilityScore===bestAffird)) },
          ].map(chip => (
            <div key={chip.l} style={{
              background: "rgba(255,255,255,.11)", border: "1px solid rgba(255,255,255,.2)",
              borderRadius: 99, padding: "6px 16px", fontSize: 12, color: "#fff", fontWeight: 600,
              backdropFilter: "blur(6px)",
            }}>
              {chip.e} <span style={{ opacity: .7 }}>{chip.l}:</span> {chip.v}
            </div>
          ))}
        </div>
      </div>

      {/* ── TAB BAR ─────────────────────────────────────── */}
      <div style={{
        background: C.white,
        borderBottom: `1px solid ${C.border}`,
        display: "flex",
        padding: "0 48px",
        position: "sticky",
        top: 0,
        zIndex: 20,
        boxShadow: "0 2px 14px rgba(23,111,111,.07)",
        flexShrink: 0,
      }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "17px 28px", fontSize: 13, fontWeight: 700,
            border: "none", background: "none", cursor: "pointer",
            color: tab === t.id ? C.teal : C.muted,
            borderBottom: tab === t.id ? `3px solid ${C.teal}` : "3px solid transparent",
            transition: "all .18s", letterSpacing: .2,
          }}>{t.label}</button>
        ))}
      </div>

      {/* ── CONTENT AREA ─────────────────────────────────
          This div takes the remaining height and is the
          only element that scrolls — fixes the footer overlap.
      ─────────────────────────────────────────────────── */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        overflowX: "hidden",
        padding: "36px 48px 72px",
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0)" : "translateY(14px)",
        transition: "all .45s ease",
      }}>

        {/* ══════════ OVERVIEW ══════════ */}
        {tab === "overview" && (
          <div>
            {/* Hospital cards */}
            <div style={{
              display: "grid",
              gridTemplateColumns: `repeat(${hospitals.length}, 1fr)`,
              gap: 22,
              marginBottom: 36,
            }}>
              {hospitals.map((h, idx) => {
                const isBest = (h.rating||0) === bestRating;
                const isLow  = h.treatments[0].minCost === lowestPrice;
                const isAffd = h.affordabilityScore === bestAffird;
                const isNear = h.distanceMiles === nearest;

                return (
                  <div key={h.hospitalId} style={{
                    background: C.white,
                    borderRadius: 22,
                    border: `2px solid ${idx === 0 ? C.teal : C.border}`,
                    padding: "28px 26px 24px",
                    boxShadow: idx === 0
                      ? "0 10px 40px rgba(23,111,111,.16)"
                      : "0 2px 14px rgba(0,0,0,.04)",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    transform:  visible ? "translateY(0)"   : "translateY(22px)",
                    opacity:    visible ? 1                  : 0,
                    transition: `all .5s ease ${idx * .1}s`,
                  }}>
                    {/* Accent bar */}
                    <div style={{
                      height: 4, borderRadius: 99,
                      background: `linear-gradient(90deg,${C.palette[idx]},${C.palette[idx]}66)`,
                      marginBottom: 20,
                    }}/>

                    {/* Selected badge */}
                    {idx === 0 && (
                      <div style={{
                        position: "absolute", top: -1, right: 24,
                        background: C.teal, color: "#fff",
                        fontSize: 10, fontWeight: 800, letterSpacing: 1.2,
                        padding: "4px 12px", borderRadius: "0 0 10px 10px",
                        textTransform: "uppercase",
                      }}>Selected</div>
                    )}

                    <h3 style={{ fontSize: 17, fontWeight: 800, color: C.text, margin: "0 0 3px" }}>
                      {h.hospitalName}
                    </h3>
                    <p style={{ fontSize: 12, color: C.muted, margin: "0 0 14px" }}>Pune, Maharashtra</p>

                    {/* Badges */}
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
                      {isBest && <Pill bg="#FFF8E1" color="#B8860B">⭐ Top Rated</Pill>}
                      {isLow  && <Pill bg="#E8F5E9" color="#2E7D32">💰 Best Price</Pill>}
                      {isAffd && <Pill bg="#E3F2FD" color="#1565C0">🏆 Best Value</Pill>}
                      {isNear && <Pill bg="#FCE4EC" color="#B71C1C">📍 Nearest</Pill>}
                    </div>

                    {/* Affordability ring */}
                    <div style={{
                      display: "flex", alignItems: "center", gap: 14,
                      background: C.tealLight, borderRadius: 14,
                      padding: "14px 16px", marginBottom: 18,
                    }}>
                      <div style={{ position: "relative", width: 72, height: 72 }}>
                        <Ring score={h.affordabilityScore} color={C.palette[idx]}/>
                        <div style={{
                          position: "absolute", inset: 0,
                          display: "flex", flexDirection: "column",
                          alignItems: "center", justifyContent: "center",
                        }}>
                          <span style={{ fontSize: 17, fontWeight: 900, color: C.text, lineHeight: 1 }}>
                            {h.affordabilityScore}
                          </span>
                          <span style={{ fontSize: 9, color: C.muted }}>/10</span>
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: 12, color: C.muted }}>Affordability</p>
                        <p style={{ margin: "3px 0 6px", fontSize: 13, fontWeight: 700, color: C.text }}>
                          {h.affordabilityScore >= 8 ? "Excellent" : h.affordabilityScore >= 6 ? "Good" : "Moderate"}
                        </p>
                        <ProgressBar value={h.affordabilityScore} color={C.palette[idx]}/>
                      </div>
                    </div>

                    {/* Stat rows */}
                    <StatRow label="Price Range"
                      value={`₹${h.treatments[0].minCost.toLocaleString()} – ₹${h.treatments[0].maxCost.toLocaleString()}`}
                      best={isLow}/>
                    <StatRow label="Distance"   value={`${h.distanceMiles} mi`}                             best={isNear}/>
                    <StatRow label="Risk Level" value={h.treatments[0].riskLevel}/>
                    <StatRow label="Rating"     value={h.rating ? `${h.rating.toFixed(1)}/5` : "New"}       best={isBest}/>

                    <div style={{ flex: 1 }}/>

                    <button
                      onClick={() => navigate("/search-details", { state: { hospital: h } })}
                      style={{
                        marginTop: 22, width: "100%",
                        background: idx === 0
                          ? `linear-gradient(135deg,${C.teal},${C.teal2})`
                          : C.white,
                        color:  idx === 0 ? "#fff" : C.teal,
                        border: `2px solid ${C.teal}`,
                        borderRadius: 99, padding: "13px 0",
                        fontWeight: 800, fontSize: 13, cursor: "pointer",
                        boxShadow: idx === 0 ? "0 4px 18px rgba(23,111,111,.28)" : "none",
                        transition: "all .18s",
                      }}>
                      View Full Details →
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Comparison table — inside the scrollable flex child, no z-index issues */}
            <Card>
              <div style={{ background: `linear-gradient(90deg,${C.dark},${C.teal})`, padding: "18px 28px" }}>
                <h2 style={{ color: "#fff", fontSize: 17, fontWeight: 800, margin: 0 }}>
                  Feature Comparison Matrix
                </h2>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#F6FCFC" }}>
                      <th style={{
                        padding: "13px 24px", textAlign: "left",
                        fontSize: 12, color: C.muted, fontWeight: 700,
                        borderBottom: `1px solid ${C.border}`, minWidth: 130,
                      }}>Metric</th>
                      {hospitals.map((h, i) => (
                        <th key={h.hospitalId} style={{
                          padding: "13px 24px", textAlign: "center",
                          fontSize: 13, fontWeight: 800, color: C.palette[i],
                          borderBottom: `1px solid ${C.border}`,
                          borderLeft:   `1px solid ${C.border}`,
                          minWidth: 160,
                        }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.palette[i] }}/>
                            {short(h)}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row, ri) => (
                      <tr key={ri} style={{ background: ri % 2 === 0 ? C.white : "#F9FDFD" }}>
                        <td style={{
                          padding: "12px 24px", fontSize: 13, color: C.text,
                          fontWeight: 600, borderBottom: `1px solid ${C.border}`,
                        }}>{row.label}</td>
                        {row.vals.map((val, vi) => (
                          <td key={vi} style={{
                            padding: "12px 24px", textAlign: "center", fontSize: 13,
                            fontWeight:  vi === (row.bestIdx ?? -1) ? 800 : 400,
                            color:       vi === (row.bestIdx ?? -1) ? C.teal : C.text,
                            background:  vi === (row.bestIdx ?? -1) ? C.tealLight : "transparent",
                            borderBottom:`1px solid ${C.border}`,
                            borderLeft:  `1px solid ${C.border}`,
                          }}>
                            {vi === (row.bestIdx ?? -1) && <span style={{ marginRight: 4, fontSize: 11 }}>✓</span>}
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* ══════════ PRICE ANALYSIS ══════════ */}
        {tab === "price" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>
            <Card style={{ padding: 32 }}>
              <h2 style={{ fontSize: 19, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>Price Range Comparison</h2>
              <p style={{ fontSize: 13, color: C.muted, margin: "0 0 28px" }}>Min and max treatment costs across hospitals</p>
              <ResponsiveContainer width="100%" height={340}>
                <BarChart data={barData} barGap={6} barSize={36}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: C.muted, fontWeight: 700 }} axisLine={false} tickLine={false}/>
                  <YAxis tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: C.muted }} axisLine={false} tickLine={false}/>
                  <Tooltip content={<PriceTip/>}/>
                  <Legend wrapperStyle={{ paddingTop: 20, fontSize: 13 }}/>
                  <Bar dataKey="Min Cost" fill={C.teal}    radius={[7,7,0,0]}/>
                  <Bar dataKey="Max Cost" fill={C.tealMid} radius={[7,7,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {hospitals.map((h, i) => (
                <Card key={h.hospitalId} style={{
                  padding: 20,
                  border: `1px solid ${h.treatments[0].minCost === lowestPrice ? C.teal : C.border}`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: C.text }}>{short(h)}</span>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.palette[i] }}/>
                  </div>
                  <ProgressBar value={h.treatments[0].maxCost} max={320000} color={C.palette[i]}/>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
                    <div>
                      <p style={{ margin: 0, fontSize: 10, color: C.muted }}>Min</p>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: C.text }}>₹{h.treatments[0].minCost.toLocaleString()}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ margin: 0, fontSize: 10, color: C.muted }}>Max</p>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: C.text }}>₹{h.treatments[0].maxCost.toLocaleString()}</p>
                    </div>
                  </div>
                  {h.treatments[0].minCost === lowestPrice && (
                    <div style={{
                      marginTop: 10, background: "#E8F5E9", borderRadius: 8,
                      padding: "5px 10px", fontSize: 11, color: "#2E7D32",
                      fontWeight: 700, textAlign: "center",
                    }}>💰 Lowest Starting Price</div>
                  )}
                </Card>
              ))}

              <div style={{ background: `linear-gradient(135deg,${C.dark},${C.teal})`, borderRadius: 18, padding: 22, color: "#fff" }}>
                <p style={{ fontSize: 11, opacity: .65, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 1 }}>Potential Savings</p>
                <p style={{ fontSize: 32, fontWeight: 900, margin: "0 0 4px", letterSpacing: "-1px" }}>
                  ₹{(Math.max(...hospitals.map(h => h.treatments[0].minCost)) - lowestPrice).toLocaleString()}
                </p>
                <p style={{ fontSize: 12, opacity: .65, margin: 0 }}>vs highest-priced option</p>
              </div>
            </div>
          </div>
        )}

        {/* ══════════ SCORE RADAR ══════════ */}
        {tab === "radar" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 290px", gap: 24 }}>
            <Card style={{ padding: 32 }}>
              <h2 style={{ fontSize: 19, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>Multi-Dimensional Score Radar</h2>
              <p style={{ fontSize: 13, color: C.muted, margin: "0 0 24px" }}>Comparing across 5 key dimensions (scale 0–10)</p>
              <ResponsiveContainer width="100%" height={420}>
                <RadarChart data={radarData} outerRadius="72%">
                  <PolarGrid stroke={C.border}/>
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: C.muted, fontWeight: 600 }}/>
                  {hospitals.map((h, i) => (
                    <Radar key={h.hospitalId}
                      name={short(h)} dataKey={h.hospitalName}
                      stroke={C.palette[i]} fill={C.palette[i]} fillOpacity={0.13}
                      strokeWidth={2.5}
                    />
                  ))}
                  <Legend wrapperStyle={{ fontSize: 13, paddingTop: 16 }}/>
                  <Tooltip/>
                </RadarChart>
              </ResponsiveContainer>
            </Card>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Card style={{ padding: 24 }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: C.text, margin: "0 0 18px" }}>Dimension Rankings</h3>
                {[
                  { label: "💰 Affordability", scores: hospitals.map(h => ({ name: short(h), val: h.affordabilityScore })) },
                  { label: "📍 Distance",      scores: hospitals.map(h => ({ name: short(h), val: Math.round(10 - h.distanceMiles) })) },
                  { label: "🛡️ Safety",        scores: hospitals.map(h => ({ name: short(h), val: h.treatments[0].riskLevel==="Low"?9:h.treatments[0].riskLevel==="Medium"?6:3 })) },
                ].map((dim, di) => (
                  <div key={di} style={{ marginBottom: 20 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: C.text, margin: "0 0 10px" }}>{dim.label}</p>
                    {[...dim.scores].sort((a,b) => b.val - a.val).map((s, si) => (
                      <div key={si} style={{ marginBottom: 7 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 }}>
                          <span style={{ color: C.muted }}>{s.name}</span>
                          <span style={{ color: C.text, fontWeight: 700 }}>{s.val}/10</span>
                        </div>
                        <ProgressBar value={s.val} color={C.palette[si]}/>
                      </div>
                    ))}
                  </div>
                ))}
              </Card>

              <div style={{ background: `linear-gradient(135deg,${C.teal},${C.teal2})`, borderRadius: 18, padding: 22, color: "#fff" }}>
                <p style={{ fontSize: 10, opacity: .65, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 1.2 }}>Smart Pick</p>
                <p style={{ fontSize: 16, fontWeight: 900, margin: "0 0 8px" }}>
                  {hospitals.reduce((a, b) => a.affordabilityScore > b.affordabilityScore ? a : b).hospitalName}
                </p>
                <p style={{ fontSize: 12, opacity: .8, margin: 0, lineHeight: 1.6 }}>
                  Scores highest in affordability and offers the best overall value for this procedure.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>{/* end scrollable content */}
    </div>
  );
};

export default ComparePage;
