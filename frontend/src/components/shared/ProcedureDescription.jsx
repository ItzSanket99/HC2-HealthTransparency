import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProcedureDescription = ({ title, description }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  if (!description) return null;

  return (
    <div className=" mt-4 bg-white border border-[#E3ECEC] rounded-2xl p-8">
      
      {/* TITLE */}
      <h1 className="font-serif font-medium text-[44px] leading-[1.05] tracking-[-0.02em] text-[#083A3D] max-w-[680px]">
        {title}
      </h1>

      {/* DESCRIPTION */}
      <p className="mt-5 text-[#3E5F60] leading-[1.7] max-w-[640px]">
        {expanded ? description : `${description.slice(0, 220)}...`}
      </p>

      {/* SHOW MORE */}
      {description.length > 220 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-[#176F6F] font-medium text-sm hover:underline"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}

      {/* SEE ALTERNATIVES BUTTON */}
      <div className="mt-6">
        <button
          onClick={() =>
            navigate(`/alternatives/${encodeURIComponent(title)}`)
          }
          className="bg-[#176F6F] hover:bg-[#0E5658] text-white px-6 py-3 rounded-full font-medium transition"
        >
          See treatment alternatives
        </button>
      </div>
    </div>
  );
};

export default ProcedureDescription;
