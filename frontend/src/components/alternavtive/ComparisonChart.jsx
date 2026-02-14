import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { useState } from "react";

export function ComparisonChart({ alternatives }) {
  const [chartType, setChartType] = useState("bar");

  if (!alternatives || alternatives.length === 0) {
    return <p>No alternatives available.</p>;
  }

  const topAlternatives = alternatives.slice(0, 5);

  // 🔥 Dynamic Cost Normalization (Fixes Negative Issue)
  const maxCost = Math.max(...topAlternatives.map(a => a.costRange.max));
  const minCost = Math.min(...topAlternatives.map(a => a.costRange.min));

  const normalizeCost = (cost) => {
    if (maxCost === minCost) return 100; // avoid divide by zero
    const score =
      100 - ((cost - minCost) / (maxCost - minCost)) * 100;
    return Math.max(0, Math.min(100, score)); // clamp between 0–100
  };

  // ================= BAR CHART DATA =================
  const barChartData = topAlternatives.map((alt) => ({
    name:
      alt.name.length > 20
        ? alt.name.substring(0, 20) + "..."
        : alt.name,
    Effectiveness: alt.effectivenessScore,
    "Success Rate": alt.successRate,
    "Cost (scaled)": normalizeCost(alt.costRange.min),
  }));

  // ================= RADAR CHART DATA =================
  const radarChartData = [
    {
      metric: "Effectiveness",
      ...Object.fromEntries(
        topAlternatives.map((alt, i) => [
          `Option ${i + 1}`,
          alt.effectivenessScore,
        ])
      ),
    },
    {
      metric: "Success Rate",
      ...Object.fromEntries(
        topAlternatives.map((alt, i) => [
          `Option ${i + 1}`,
          alt.successRate,
        ])
      ),
    },
    {
      metric: "Affordability",
      ...Object.fromEntries(
        topAlternatives.map((alt, i) => [
          `Option ${i + 1}`,
          normalizeCost(alt.costRange.min),
        ])
      ),
    },
    {
      metric: "Safety",
      ...Object.fromEntries(
        topAlternatives.map((alt, i) => [
          `Option ${i + 1}`,
          alt.riskLevel === "Low"
            ? 90
            : alt.riskLevel === "Medium"
            ? 70
            : 50,
        ])
      ),
    },
  ];

  const colors = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            Treatment Comparison
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Visual comparison of top treatment options
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setChartType("bar")}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg ${
              chartType === "bar"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Bar Chart
          </button>
          <button
            onClick={() => setChartType("radar")}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg ${
              chartType === "radar"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Radar Chart
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-[300px] sm:h-[400px]">
        {chartType === "bar" ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
              <Tooltip />
              <Legend iconType="circle" />
              <Bar dataKey="Effectiveness" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="Success Rate" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="Cost (scaled)" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarChartData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis
                dataKey="metric"
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: "#6b7280", fontSize: 10 }}
              />
              <Tooltip />
              <Legend />
              {topAlternatives.map((alt, index) => (
                <Radar
                  key={alt.id}
                  name={`Option ${index + 1}`}
                  dataKey={`Option ${index + 1}`}
                  stroke={colors[index]}
                  fill={colors[index]}
                  fillOpacity={0.3}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Info Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded mt-1" />
          <div>
            <p className="text-sm font-medium">Effectiveness</p>
            <p className="text-xs text-gray-600">
              Overall treatment effectiveness score
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="w-3 h-3 bg-green-500 rounded mt-1" />
          <div>
            <p className="text-sm font-medium">Success Rate</p>
            <p className="text-xs text-gray-600">
              Percentage of successful outcomes
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="w-3 h-3 bg-amber-500 rounded mt-1" />
          <div>
            <p className="text-sm font-medium">Affordability</p>
            <p className="text-xs text-gray-600">
              Inverse cost score (higher = cheaper)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
