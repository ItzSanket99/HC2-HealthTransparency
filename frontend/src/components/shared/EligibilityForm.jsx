import { useState } from "react";

const EligibilityForm = ({ onChange }) => {
  const [form, setForm] = useState({
    income: 0,
    state: "",
    hasRationCard: false,
    policyYears: 0,
  });

  const update = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    onChange(updated);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-4 shadow-sm space-y-3">
      <h4 className="font-semibold">Eligibility Details</h4>

      <input
        type="number"
        placeholder="Annual Income"
        className="w-full border border-gray-300 p-2 rounded"
        onChange={(e) =>
          update("income", Number(e.target.value))
        }
      />

      <input
        type="text"
        placeholder="State"
        className="w-full border border-gray-300 p-2 rounded"
        onChange={(e) => update("state", e.target.value)}
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          onChange={(e) =>
            update("hasRationCard", e.target.checked)
          }
        />
        <span>Have Ration Card</span>
      </div>

      <input
        type="number"
        placeholder="Policy Years (for private)"
        className="w-full border p-2 rounded"
        onChange={(e) =>
          update("policyYears", Number(e.target.value))
        }
      />
    </div>
  );
};

export default EligibilityForm;
