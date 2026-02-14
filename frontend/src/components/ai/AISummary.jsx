import { useState, useEffect } from "react";
import { summarizeTextHF } from "../../utils/hfSummarizer";
import "./AISummary.css";
import ailogo from "../../assets/ailogo.png";

const AISummary = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [language, setLanguage] = useState("English");
  const [showHint, setShowHint] = useState(false);

  /* ---------------- ONE TIME HINT LOGIC ---------------- */
  useEffect(() => {
    const seen = localStorage.getItem("ai_hint_seen");

    if (!seen) {
      setShowHint(true);

      // Auto hide after 6 sec
      const timer = setTimeout(() => setShowHint(false), 6000);
      return () => clearTimeout(timer);
    }
  }, []);

  /* ---------------- SUMMARIZER ---------------- */
  const handleSummarize = async () => {
    setLoading(true);
    setSummary("");

    const element = document.getElementById("page-content");
    if (!element) {
      setLoading(false);
      return;
    }

    const content = element.innerText.replace(/\s+/g, " ").slice(0, 2200);
    const result = await summarizeTextHF(content, language);

    setSummary(result);
    setLoading(false);
  };

  /* ---------------- BUTTON CLICK ---------------- */
  const handleOpen = () => {
    setOpen(!open);

    // Mark hint as seen forever
    localStorage.setItem("ai_hint_seen", "true");
    setShowHint(false);
  };

  return (
    <>
      {/* Floating Button */}
<button className="ai-float-btn" onClick={handleOpen}>
  <div className="ai-logo-bg">
    <img src={ailogo} alt="AI Summarizer" className="ai-logo" />
  </div>

  {showHint && (
    <div className="ai-tooltip">
      ✨ New! Try AI Summarizer
    </div>
  )}
</button>




      {/* Panel */}
      {open && (
        <div className="ai-panel">
          <div className="ai-header">
            <div className="ai-brand">
              <span className="ai-icon">✨</span>
              <div>
                <h3>TreatWise AI</h3>
                <p>Smart Page Summary</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="ai-body">
            {/* Language Selector */}
            <label className="ai-label">Language</label>
            <select
              className="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Marathi</option>
              <option>Gujarati</option>
            </select>

            {!summary && !loading && (
              <button className="generate-btn" onClick={handleSummarize}>
                Generate Summary
              </button>
            )}

            {loading && (
              <div className="ai-loading">
                <div className="spinner"></div>
                <p>Analyzing healthcare data…</p>
              </div>
            )}

            {summary && (
              <div className="summary-box">
                {summary}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AISummary;
