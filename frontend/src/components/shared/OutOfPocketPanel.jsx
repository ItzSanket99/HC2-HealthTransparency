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
    ...(hospital.insurance?.privateInsurance || []).map(i => ({
      ...i,
      type: "PRIVATE",
    })),
    ...(hospital.insurance?.governmentSchemes || []).map(i => ({
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

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-300 shadow-sm">

      <InsuranceSelector
        options={insuranceOptions}
        onSelect={setInsurance}
      />

      <EligibilityForm onChange={setEligibility} />

      <button
        onClick={calculate}
        className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold"
      >
        Calculate Out-of-Pocket Cost
      </button>

      {result && (
        <>
          <CostBreakdownTable data={result} />

          <button
            onClick={() =>
              generateBillPDF({
                hospital,
                treatment,
                result,
              })
            }
            className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold"
          >
            Download Professional Hospital Bill (PDF)
          </button>
        </>
      )}
    </div>
  );
};

export default OutOfPocketPanel;
