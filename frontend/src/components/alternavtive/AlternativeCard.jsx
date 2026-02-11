import {
  DollarSign,
  AlertTriangle,
  TrendingUp,
  Clock,
  Activity,
  ChevronDown,
  ChevronUp,
  Check,
  X,
} from "lucide-react";
import { useState } from "react";

export function AlternativeCard({ alternative, rank, isSelected, onSelect }) {
  const [showDetails, setShowDetails] = useState(false);

  const getRiskColor = (risk) => {
    switch (risk) {
      case "Low":
        return "text-green-700 bg-green-100";
      case "Medium":
        return "text-yellow-700 bg-yellow-100";
      case "High":
        return "text-red-700 bg-red-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Non-Invasive":
        return "text-green-700 bg-green-100";
      case "Minimally Invasive":
        return "text-blue-700 bg-blue-100";
      case "Traditional":
        return "text-purple-700 bg-purple-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  const getEffectivenessColor = (score) => {
    if (score >= 85) return "text-green-700";
    if (score >= 70) return "text-blue-700";
    if (score >= 50) return "text-yellow-700";
    return "text-orange-700";
  };

  return (
    <div
      onClick={onSelect}
      className={`bg-white rounded-lg border-2 transition-all ${
        isSelected ? "border-blue-500 shadow-lg" : "border-gray-200"
      }`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-semibold">
            #{rank}
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-xl font-semibold text-gray-900">
                {alternative.name}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                  alternative.category
                )}`}
              >
                {alternative.category}
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              {alternative.description}
            </p>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-medium text-gray-600">
                Cost Range
              </span>
            </div>
            <p className="font-semibold text-gray-900">
              ₹{alternative.costRange.min.toLocaleString()} – ₹
              {alternative.costRange.max.toLocaleString()}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-medium text-gray-600">
                Effectiveness
              </span>
            </div>
            <p
              className={`text-lg font-semibold ${getEffectivenessColor(
                alternative.effectivenessScore
              )}`}
            >
              {alternative.effectivenessScore}/100
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-medium text-gray-600">
                Risk Level
              </span>
            </div>
            <span
              className={`inline-block px-2 py-1 rounded text-sm font-medium ${getRiskColor(
                alternative.riskLevel
              )}`}
            >
              {alternative.riskLevel}
            </span>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-medium text-gray-600">
                Recovery
              </span>
            </div>
            <p className="font-semibold text-gray-900 text-sm">
              {alternative.recoveryTime}
            </p>
          </div>
        </div>

        {/* Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowDetails(!showDetails);
          }}
          className="w-full flex items-center justify-between text-sm font-medium text-blue-600 hover:text-blue-700 py-3 border-t"
        >
          <span>
            {showDetails ? "Hide" : "Show"} Detailed Information
          </span>
          {showDetails ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {/* Details */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t space-y-4">
            <div>
              <h4 className="font-medium mb-2">Typical Candidates</h4>
              <p className="text-sm text-gray-600">
                {alternative.typicalCandidates}
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                May Be Suitable For
              </h4>
              <ul className="space-y-1">
                {alternative.suitableFor.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-600 flex gap-2"
                  >
                    <Check className="w-4 h-4 text-green-600 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <X className="w-4 h-4 text-red-600" />
                May Not Be Suitable For
              </h4>
              <ul className="space-y-1">
                {alternative.notSuitableFor.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-600 flex gap-2"
                  >
                    <X className="w-4 h-4 text-red-600 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Common Side Effects</h4>
              <div className="flex flex-wrap gap-2">
                {alternative.commonSideEffects.map((effect, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded border"
                  >
                    {effect}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
