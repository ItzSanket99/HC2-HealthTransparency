import {
  ArrowLeft,
  Info,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { AlternativeCard } from "./AlternativeCard";
import { ComparisonChart } from "./ComparisonChart";
import { mockAlternatives } from "../../data/mockAlternatives";

export function AlternativesExplorer({ searchParams, onBackToResults }) {
  const [selectedAlternativeId, setSelectedAlternativeId] = useState(null);
  const [sortBy, setSortBy] = useState("effectiveness");

  // Get alternatives
  const alternatives = mockAlternatives;

  // Sort alternatives
  const sortedAlternatives = [...alternatives].sort((a, b) => {
    switch (sortBy) {
      case "effectiveness":
        return b.effectivenessScore - a.effectivenessScore;
      case "cost":
        return a.costRange.min - b.costRange.min;
      case "risk":
        const riskOrder = { Low: 0, Medium: 1, High: 2 };
        return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
      default:
        return 0;
    }
  });

  const selectedAlternative = selectedAlternativeId
    ? alternatives.find((a) => a.id === selectedAlternativeId)
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <button
          onClick={onBackToResults}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 font-medium text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Back to Hospital Results
        </button>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
              Treatment Alternatives for {searchParams.treatment}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Explore alternative treatment options that may be suitable for
              your condition
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-900 mb-1">
                Informational Guidance Only
              </h3>
              <p className="text-sm text-amber-800">
                This information is provided for educational purposes only.
                Treatment suitability varies by individual.
                <strong>
                  {" "}
                  Never change or start treatments without consulting your
                  doctor.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Rank by:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy("effectiveness")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                sortBy === "effectiveness"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <TrendingUp className="w-4 h-4 inline mr-1" />
              Effectiveness
            </button>

            <button
              onClick={() => setSortBy("cost")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                sortBy === "cost"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <DollarSign className="w-4 h-4 inline mr-1" />
              Cost
            </button>

            <button
              onClick={() => setSortBy("risk")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                sortBy === "risk"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <AlertTriangle className="w-4 h-4 inline mr-1" />
              Risk Level
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Chart */}
      <div className="mb-8">
        <ComparisonChart alternatives={sortedAlternatives} />
      </div>

      {/* Alternatives */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">
          Available Treatment Options
        </h3>

        <div className="flex flex-col gap-4">
          {sortedAlternatives.map((alternative, index) => (
            <AlternativeCard
              key={alternative.id}
              alternative={alternative}
              rank={index + 1}
              isSelected={selectedAlternativeId === alternative.id}
              onSelect={() =>
                setSelectedAlternativeId(
                  selectedAlternativeId === alternative.id
                    ? null
                    : alternative.id
                )
              }
            />
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          Next Steps for Informed Decision-Making
        </h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>
            <strong>1.</strong> Discuss these options with your doctor
          </li>
          <li>
            <strong>2.</strong> Consider your priorities (cost, recovery,
            effectiveness)
          </li>
          <li>
            <strong>3.</strong> Seek a second opinion for major procedures
          </li>
          <li>
            <strong>4.</strong> Verify insurance coverage
          </li>
        </ul>
      </div>
    </div>
  );
}
