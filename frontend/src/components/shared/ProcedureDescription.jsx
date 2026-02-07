import { useState } from "react";

const ProcedureDescription = ({ title, description }) => {
  const [expanded, setExpanded] = useState(false);

  if (!description) return null;

  return (
    <div className="rounded-2xl mb-6 mt-20">
      <h2 className="text-2xl font-semibold text-slate-900">
        {title}
      </h2>

      <p className="text-slate-600 mt-3 leading-relaxed">
        {expanded ? description : `${description.slice(0, 220)}...`}
      </p>

      {description.length > 220 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-teal-700 font-medium text-sm hover:underline"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
};

export default ProcedureDescription;
