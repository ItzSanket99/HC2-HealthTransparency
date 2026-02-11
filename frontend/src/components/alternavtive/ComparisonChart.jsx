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

  // Prepare data for bar chart
  const barChartData = alternatives.slice(0, 5).map((alt) => ({
    name:
      alt.name.length > 20
        ? alt.name.substring(0, 20) + "..."
        : alt.name,
    Effectiveness: alt.effectivenessScore,
    "Success Rate": alt.successRate,
    "Cost (scaled)": 100 - (alt.costRange.min / 100000) * 100, // inverse cost
  }));

  // Prepare data for radar chart
  const radarChartData = [
    {
      metric: "Effectiveness",
      ...Object.fromEntries(
        alternatives.slice(0, 5).map((alt, i) => [
          `Option ${i + 1}`,
          alt.effectivenessScore,
        ])
      ),
    },
    {
      metric: "Success Rate",
      ...Object.fromEntries(
        alternatives.slice(0, 5).map((alt, i) => [
          `Option ${i + 1}`,
          alt.successRate,
        ])
      ),
    },
    {
      metric: "Affordability",
      ...Object.fromEntries(
        alternatives.slice(0, 5).map((alt, i) => [
          `Option ${i + 1}`,
          100 - (alt.costRange.min / 100000) * 100,
        ])
      ),
    },
    {
      metric: "Safety",
      ...Object.fromEntries(
        alternatives.slice(0, 5).map((alt, i) => [
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

      {/* Chart */}
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
              <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow:
                    "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
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
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow:
                    "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend />
              {alternatives.slice(0, 5).map((alt, index) => (
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

      {/* Legend */}
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
