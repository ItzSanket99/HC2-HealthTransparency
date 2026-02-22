import { useState } from "react";

const FieldHint = ({ text }) => (
  <p className="text-xs text-[#6b8a8f] mt-1">{text}</p>
);

const SectionTitle = ({ children }) => (
  <h3 className="text-sm font-semibold text-[#0f2f33] uppercase tracking-wide mb-2">
    {children}
  </h3>
);

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
      checked ? "bg-teal-600" : "bg-gray-300"
    }`}
  >
    <div
      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
        checked ? "translate-x-5" : ""
      }`}
    />
  </button>
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
    <div className="bg-white p-8 rounded-2xl border border-[#e2e8ea] shadow-md space-y-8">

      {/* BASIC DETAILS */}
      <div>
        <SectionTitle>Basic Information</SectionTitle>

        <div className="space-y-5">

          <div>
            <input
              placeholder="State (e.g., Maharashtra)"
              className="w-full border border-[#d6e1e3] focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition p-3 rounded-xl outline-none"
              onChange={(e) => update("state", e.target.value)}
            />
            <FieldHint text="Used to check state-specific schemes like MJPJAY." />
          </div>

          <div>
            <select
              className="w-full border border-[#d6e1e3] focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition p-3 rounded-xl outline-none"
              onChange={(e) =>
                update("rationCardType", e.target.value)
              }
            >
              <option value="">Select Ration Card Type</option>
              <option value="Yellow">Yellow</option>
              <option value="Orange">Orange</option>
              <option value="AAY">Antyodaya (AAY)</option>
              <option value="White">White</option>
            </select>
            <FieldHint text="Required for income-based schemes." />
          </div>

          <div>
            <input
              type="number"
              placeholder="Annual Income (₹)"
              className="w-full border border-[#d6e1e3] focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition p-3 rounded-xl outline-none"
              onChange={(e) =>
                update("annualIncome", Number(e.target.value))
              }
            />
            <FieldHint text="Used for BPL / RSBY and ESIC eligibility." />
          </div>

        </div>
      </div>

      {/* SOCIAL STATUS */}
      <div>
        <SectionTitle>Socio-Economic Status</SectionTitle>

        <div className="space-y-5">

          <div className="flex justify-between items-start bg-[#f7fafb] p-4 rounded-xl border">
            <div>
              <p className="font-medium">SECC Listed</p>
              <FieldHint text="Family listed in SECC 2011 (PM-JAY)." />
            </div>
            <Toggle
              checked={form.isSECCListed}
              onChange={(val) => update("isSECCListed", val)}
            />
          </div>

          <div className="flex justify-between items-start bg-[#f7fafb] p-4 rounded-xl border">
            <div>
              <p className="font-medium">BPL Family</p>
              <FieldHint text="Below Poverty Line (required for RSBY)." />
            </div>
            <Toggle
              checked={form.isBPL}
              onChange={(val) => update("isBPL", val)}
            />
          </div>

        </div>
      </div>

      {/* EMPLOYMENT */}
      <div>
        <SectionTitle>Employment Details</SectionTitle>

        <div className="space-y-5">

          <div className="flex justify-between items-start bg-[#f7fafb] p-4 rounded-xl border">
            <div>
              <p className="font-medium">
                Organized Sector Employee
              </p>
              <FieldHint text="Working in registered company/factory (ESIC)." />
            </div>
            <Toggle
              checked={form.isOrganizedSectorEmployee}
              onChange={(val) =>
                update("isOrganizedSectorEmployee", val)
              }
            />
          </div>

          {/* ESIC Conditional */}
          {form.isOrganizedSectorEmployee && (
            <div className="bg-teal-50 border border-teal-200 p-5 rounded-xl space-y-4">

              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">
                    ESIC Registered
                  </p>
                  <FieldHint text="Do you have ESIC number?" />
                </div>
                <Toggle
                  checked={form.esicRegistered}
                  onChange={(val) =>
                    update("esicRegistered", val)
                  }
                />
              </div>

              <div>
                <input
                  type="number"
                  placeholder="ESIC Contribution Days"
                  className="w-full border border-teal-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition p-3 rounded-xl outline-none"
                  onChange={(e) =>
                    update(
                      "contributionDays",
                      Number(e.target.value)
                    )
                  }
                />
                <FieldHint text="Minimum 78 contribution days required." />
              </div>

            </div>
          )}

          <div className="flex justify-between items-start bg-[#f7fafb] p-4 rounded-xl border">
            <div>
              <p className="font-medium">
                Government Employee
              </p>
              <FieldHint text="Central Government employee (CGHS)." />
            </div>
            <Toggle
              checked={form.isGovernmentEmployee}
              onChange={(val) =>
                update("isGovernmentEmployee", val)
              }
            />
          </div>

          <div className="flex justify-between items-start bg-[#f7fafb] p-4 rounded-xl border">
            <div>
              <p className="font-medium">Pensioner</p>
              <FieldHint text="Central Government pensioner (CGHS)." />
            </div>
            <Toggle
              checked={form.isPensioner}
              onChange={(val) =>
                update("isPensioner", val)
              }
            />
          </div>

        </div>
      </div>

    </div>
  );
};

export default EligibilityForm;