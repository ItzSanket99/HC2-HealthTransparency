import { useState } from "react";
import EligibilityForm from "./EligibilityForm";
import CostBreakdownTable from "./CostBreakdownTable";
import { recommendSchemes } from "../../utils/recommendSchemes";
import { calculateOOP } from "../../utils/outOfPocketCalculator";
import { generateBillPDF } from "../../utils/pdfGenerator";

const OutOfPocketPanel = ({ hospital, treatment }) => {
  const [eligibility, setEligibility] = useState({});
  const [recommended, setRecommended] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  /* ===============================
     1️⃣ CHECK ELIGIBLE SCHEMES
  =============================== */
  const checkSchemes = () => {
    const eligibleSchemes = recommendSchemes({
      user: eligibility,
    });

    setRecommended(eligibleSchemes);

    if (eligibleSchemes.length === 0) {
      setSelectedScheme(null);
    }
  };

  /* ===============================
     2️⃣ CALCULATE OOP
  =============================== */
  const calculate = () => {
    if (!treatment) {
      alert("Treatment data missing");
      return;
    }

    const res = calculateOOP({
      treatmentCost: treatment.maxCost,
      scheme: selectedScheme || null,
      user: eligibility,
    });

    setResult(res);
    setShowModal(true);
  };

  /* ===============================
     3️⃣ HANDLE PDF DOWNLOAD
  =============================== */
  const handlePDFDownload = () => {
    if (!hospital || !treatment || !result) {
      alert("Missing data for PDF generation");
      return;
    }

    generateBillPDF({
      hospital,
      treatment,
      result,
    });
  };

  return (
    <>
      <div className="space-y-6 bg-[#fcfefe] p-7 rounded-2xl border border-gray-300 shadow-sm w-full">

        <h2 className="text-2xl font-semibold">
          Estimate Out-of-Pocket Cost
        </h2>

        <EligibilityForm onChange={setEligibility} />

        <button
          onClick={checkSchemes}
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          Check Eligible Schemes
        </button>

        {/* Recommended Schemes */}
        {recommended.length > 0 ? (
          <div className="space-y-2">
            <h4 className="font-semibold">
              Recommended Schemes
            </h4>

            {recommended.map((scheme) => (
              <div
                key={scheme.id}
                onClick={() => setSelectedScheme(scheme)}
                className={`border p-3 rounded cursor-pointer transition ${
                  selectedScheme?.id === scheme.id
                    ? "bg-teal-100 border-teal-600"
                    : "hover:bg-gray-50"
                }`}
              >
                <p className="font-medium">
                  {scheme.name}
                </p>
                <p className="text-sm text-gray-500">
                  Max Coverage: ₹{scheme.maxCoverage}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-3 bg-yellow-50 border rounded">
            No government scheme applicable.
            You can still calculate without insurance.
          </div>
        )}

        <button
          onClick={calculate}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Calculate OOP
        </button>
      </div>

      {/* ===============================
          MODAL POPUP
      =============================== */}
      {showModal && result && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8 relative animate-fadeIn">

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-lg"
            >
              ✕
            </button>

            <h3 className="text-2xl font-semibold mb-6 text-[#0f2f33]">
              Eligibility Result
            </h3>

            <div className="grid grid-cols-2 gap-6 text-sm">

              <div>
                <p className="text-gray-500">Treatment Cost</p>
                <p className="font-semibold text-lg">
                  ₹{result.totalBill}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Coverage</p>
                <p className="font-semibold text-green-600 text-lg">
                  ₹{result.coverageAmount}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Final Out-of-Pocket</p>
                <p className="font-semibold text-red-600 text-lg">
                  ₹{result.finalOOP}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Scheme Applied</p>
                <p className="font-semibold">
                  {selectedScheme
                    ? selectedScheme.shortName
                    : "No Scheme"}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <CostBreakdownTable data={result} />
            </div>

            <button
              onClick={handlePDFDownload}
              className="mt-6 w-full bg-[#0f2f33] text-white py-3 rounded-full font-medium hover:brightness-110 transition"
            >
              Download Detailed Bill (PDF)
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default OutOfPocketPanel;