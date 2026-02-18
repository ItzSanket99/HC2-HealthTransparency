import { useState } from "react";
import InsuranceSelector from "./InsuranceSelector";
import EligibilityForm from "./EligibilityForm";
import CostBreakdownTable from "./CostBreakdownTable";
import { calculateOOP } from "../../utils/outOfPocketCalculator";
import { generateBillPDF } from "../../utils/pdfGenerator";

const OutOfPocketPanel = ({ hospital, treatment }) => {
const [insurance, setInsurance] = useState(null);
const [eligibility, setEligibility] = useState({});
const [result, setResult] = useState(null);

if (!hospital || !treatment) return null;

const insuranceOptions = [
...(hospital.insurance?.privateInsurance || []).map((i) => ({
...i,
type: "PRIVATE",
})),
...(hospital.insurance?.governmentSchemes || []).map((i) => ({
...i,
type: "GOVT",
})),
];

const calculate = () => {
const res = calculateOOP({
treatmentCost: treatment.maxCost,
selectedInsurance: insurance,
eligibility,
});
setResult(res);
};

return ( <div className="space-y-6 bg-[#fcfefe] p-7 rounded-2xl border border-[#e2e8ea] shadow-sm">
  {/* TITLE */}
  <div>
    <h2 className="text-2xl font-semibold text-[#0f2f33]">
      Estimate Your Treatment Cost
    </h2>
    <p className="text-sm text-[#5f7a7f] mt-1">
      Calculate how much you may pay after insurance coverage
    </p>
  </div>

  {/* INSURANCE */}
  <div className="bg-white border border-[#e2e8ea] rounded-xl p-5">
    <InsuranceSelector options={insuranceOptions} onSelect={setInsurance} />
  </div>

  {/* ELIGIBILITY */}
  <div className="bg-white border border-[#e2e8ea] rounded-xl p-5">
    <EligibilityForm onChange={setEligibility} />
  </div>

  {/* CALCULATE BUTTON */}
  <button
    onClick={calculate}
    className="w-full bg-[#1f6f6b] text-white py-3 rounded-full font-semibold hover:brightness-95 transition"
  >
    Calculate Out-of-Pocket Cost
  </button>

  {/* RESULT */}
  {result && (
    <div className="space-y-5 pt-2 border-t border-[#e2e8ea]">

      <div className="bg-[#f4fbfa] border border-[#d7eeea] rounded-xl p-5">
        <h3 className="font-semibold text-[#0f2f33] mb-3">
          Cost Breakdown
        </h3>
        <CostBreakdownTable data={result} />
      </div>

      <button
        onClick={() =>
          generateBillPDF({
            hospital,
            treatment,
            result,
          })
        }
        className="w-full bg-[#0f2f33] text-white py-2.5 rounded-full font-medium hover:brightness-110 transition"
      >
        Download Detailed Bill (PDF)
      </button>
    </div>
  )}
</div>
);
};

export default OutOfPocketPanel;
