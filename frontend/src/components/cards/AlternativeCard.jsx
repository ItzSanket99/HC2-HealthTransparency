import React from "react";

/**
 * score: number from 0–10
 * label: string (Cost / Risk / Effectiveness)
 */
const ScoreBar = ({ label, score, type }) => {
  const getColor = () => {
    // Cost & Risk → lower is better
    if (type === "negative") {
      if (score <= 3) return "bg-green-500";
      if (score <= 6) return "bg-yellow-400";
      return "bg-red-500";
    }

    // Effectiveness → higher is better
    if (type === "positive") {
      if (score >= 7) return "bg-green-500";
      if (score >= 4) return "bg-yellow-400";
      return "bg-red-500";
    }

    return "bg-gray-400";
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm text-gray-600">
        <span>{label}</span>
        <span>{score}/10</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${getColor()}`}
          style={{ width: `${score * 10}%` }}
        />
      </div>
    </div>
  );
};

const AlternativeCard = ({ condition, alternatives }) => {
  if (!alternatives || alternatives.length === 0) return null;

  return (
    <div className="border rounded-lg p-5 bg-white space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">
        Alternative treatment options
      </h3>

      <p className="text-sm text-gray-600">
        Depending on the severity of <span className="font-medium">{condition}</span>,
        non-surgical options may be considered before invasive procedures.
      </p>

      <div className="space-y-4">
        {alternatives.map((alt, index) => (
          <div
            key={index}
            className="border rounded-md p-4 bg-gray-50 space-y-3"
          >
            <div>
              <h4 className="font-medium text-gray-800">{alt.name}</h4>
              <p className="text-sm text-gray-600">{alt.note}</p>
            </div>

            <div className="space-y-2">
                <ScoreBar label="Cost" score={alt.costScore} type="negative" />
                <ScoreBar label="Risk" score={alt.riskScore} type="negative" />
                <ScoreBar
                    label="Effectiveness"
                    score={alt.effectivenessScore}
                    type="positive"
                />

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlternativeCard;
