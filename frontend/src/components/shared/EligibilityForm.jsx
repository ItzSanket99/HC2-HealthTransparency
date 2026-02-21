import { useState } from "react";

const FieldHint = ({ text }) => (
  <p className="text-xs text-gray-500 mt-1">{text}</p>
);

const EligibilityForm = ({ onChange }) => {
  const [form, setForm] = useState({
    state: "",
    rationCardType: "",
    annualIncome: 0,
    isBPL: false,
    isSECCListed: false,
    isOrganizedSectorEmployee: false,
    esicRegistered: false,
    contributionDays: 0,
    isGovernmentEmployee: false,
    isPensioner: false,
  });

  const update = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    onChange(updated);
  };

  return (
    <div className="bg-white p-6 rounded-xl border space-y-4 shadow-sm">

      <div>
        <input
          placeholder="State (e.g., Maharashtra)"
          className="w-full border p-2 rounded"
          onChange={(e) => update("state", e.target.value)}
        />
        <FieldHint text="Used to check state-specific schemes like MJPJAY." />
      </div>

      <div>
        <select
          className="w-full border p-2 rounded"
          onChange={(e) => update("rationCardType", e.target.value)}
        >
          <option value="">Select Ration Card Type</option>
          <option value="Yellow">Yellow</option>
          <option value="Orange">Orange</option>
          <option value="AAY">Antyodaya (AAY)</option>
          <option value="White">White</option>
        </select>
        <FieldHint text="Required for state income-based schemes." />
      </div>

      <div>
        <input
          type="number"
          placeholder="Annual Income (₹)"
          className="w-full border p-2 rounded"
          onChange={(e) =>
            update("annualIncome", Number(e.target.value))
          }
        />
        <FieldHint text="Used for BPL / RSBY and ESIC eligibility." />
      </div>

      <div className="space-y-3 text-sm">

        <label className="flex items-start gap-2">
          <input type="checkbox"
            onChange={(e) =>
              update("isSECCListed", e.target.checked)
            } />
          <div>
            <p className="font-medium">SECC Listed</p>
            <FieldHint text="If your family appears in SECC 2011 database (PM-JAY)." />
          </div>
        </label>

        <label className="flex items-start gap-2">
          <input type="checkbox"
            onChange={(e) =>
              update("isBPL", e.target.checked)
            } />
          <div>
            <p className="font-medium">BPL Family</p>
            <FieldHint text="Below Poverty Line family (required for RSBY)." />
          </div>
        </label>

        <label className="flex items-start gap-2">
          <input type="checkbox"
            onChange={(e) =>
              update("isOrganizedSectorEmployee", e.target.checked)
            } />
          <div>
            <p className="font-medium">Organized Sector Employee</p>
            <FieldHint text="Working in registered company/factory (ESIC)." />
          </div>
        </label>

        {form.isOrganizedSectorEmployee && (
          <div className="bg-gray-50 p-4 rounded border space-y-3">

            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                onChange={(e) =>
                  update("esicRegistered", e.target.checked)
                }
              />
              <div>
                <p className="font-medium">ESIC Registered</p>
                <FieldHint text="Do you have ESIC insurance number?" />
              </div>
            </label>

            <input
              type="number"
              placeholder="ESIC Contribution Days"
              className="w-full border p-2 rounded"
              onChange={(e) =>
                update("contributionDays", Number(e.target.value))
              }
            />
            <FieldHint text="Minimum 78 contribution days required." />

          </div>
        )}

        <label className="flex items-start gap-2">
          <input type="checkbox"
            onChange={(e) =>
              update("isGovernmentEmployee", e.target.checked)
            } />
          <div>
            <p className="font-medium">Government Employee</p>
            <FieldHint text="Central Government employee (CGHS)." />
          </div>
        </label>

        <label className="flex items-start gap-2">
          <input type="checkbox"
            onChange={(e) =>
              update("isPensioner", e.target.checked)
            } />
          <div>
            <p className="font-medium">Pensioner</p>
            <FieldHint text="Central Government pensioner (CGHS)." />
          </div>
        </label>

      </div>
    </div>
  );
};

export default EligibilityForm;